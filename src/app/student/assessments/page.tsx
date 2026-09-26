'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { getLevelInfo } from '@/lib/xp-engine';
import {
  DEPARTMENT_TRACKS,
  generatePersonalizedAssessment,
  buildAssessmentAttemptRecord,
  ComprehensiveAssessmentQuestion,
  GeneratedAssessment,
} from '@/lib/assessment-bank';
import {
  calculateStrictXP,
  calculateBuilderScoreImpact,
  calculateSkillConfidence,
  evaluateAntiCheatingLogs,
  PASSING_THRESHOLDS,
  AssessmentDifficulty,
  AntiCheatingLog,
  SkillConfidenceMatrix,
} from '@/lib/assessment-engine';
import {
  AssessmentAttemptRecord,
  QuestionReviewItem,
} from '@/types';
import {
  CheckCircle2,
  Lock,
  Play,
  X,
  ArrowRight,
  Award,
  Clock,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Check,
  ShieldCheck,
  Target,
  Flame,
  Brain,
  Zap,
  BookOpen,
  FileText,
  HelpCircle,
  BarChart3,
  TrendingUp,
  XCircle,
  GraduationCap,
  Layers,
  Code,
  AlertCircle,
  Copy,
  ExternalLink,
  Shield,
  EyeOff,
  Terminal,
  FileCode,
  MessageSquare,
  Trophy,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StudentAssessmentsPage() {
  const {
    xp,
    streakDays,
    studentProfile,
    addVerifiedSkill,
    githubData,
    assessmentHistory,
    recordAssessmentAttempt,
    addXP,
  } = useAppStore();

  const userDept = studentProfile.academic?.department || studentProfile.branch || 'Computer Science';
  const targetRole = studentProfile.targetRole || studentProfile.careerPath || 'Software Development';
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    userDept.includes('AI') ? 'AI & Machine Learning' : userDept.includes('Cyber') ? 'Cybersecurity' : 'Computer Science'
  );

  // Certification Mode Toggle
  const [certificationMode, setCertificationMode] = useState<boolean>(false);

  // Test Runner State
  const [activeSession, setActiveSession] = useState<GeneratedAssessment | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [sessionStartTime, setSessionStartTime] = useState<number>(Date.now());
  const [timeLeftSec, setTimeLeftSec] = useState(1200); // 20 minutes
  const [currentAttemptNumber, setCurrentAttemptNumber] = useState<number>(1);

  // Anti-Cheating Tracking State
  const [tabSwitches, setTabSwitches] = useState(0);
  const [copyPasteAttempts, setCopyPasteAttempts] = useState(0);
  const [rapidClicks, setRapidClicks] = useState(0);
  const [lastQuestionTimestamp, setLastQuestionTimestamp] = useState<number>(Date.now());
  const [antiCheatingLog, setAntiCheatingLog] = useState<AntiCheatingLog | null>(null);

  // Viewing Results Modal State
  const [viewingRecord, setViewingRecord] = useState<AssessmentAttemptRecord | null>(null);
  const [activeResultTab, setActiveResultTab] = useState<'summary' | 'review' | 'skill_matrix' | 'plan'>('summary');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [skillMatrix, setSkillMatrix] = useState<SkillConfidenceMatrix | null>(null);

  // Main Page View Mode
  const [mainTab, setMainTab] = useState<'assessments' | 'leaderboard'>('assessments');

  const levelInfo = getLevelInfo(xp);

  // Anti-Cheating Event Listeners during Active Test
  useEffect(() => {
    if (!activeSession || viewingRecord) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches((prev) => prev + 1);
      }
    };

    const handleCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      setCopyPasteAttempts((prev) => prev + 1);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
    };
  }, [activeSession, viewingRecord]);

  // Timer countdown during active session
  useEffect(() => {
    if (!activeSession || viewingRecord) return;
    const interval = setInterval(() => {
      setTimeLeftSec((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeSession, viewingRecord]);

  const handleStartTopic = (topic: string, deptName: string, attemptNum = 1) => {
    const session = generatePersonalizedAssessment(topic, {
      department: deptName,
      branch: studentProfile.branch || userDept,
      targetRole,
      careerGoal: studentProfile.careerGoal,
      builderLevel: levelInfo.level,
      xp,
      streakDays,
      verifiedSkills: (studentProfile.verifiedSkills || []).map((s) => ({ name: s.name, score: s.score })),
      githubConnected: githubData.connected,
      attemptNumber: attemptNum,
    });

    setActiveSession(session);
    setCurrentQIndex(0);
    setSelectedOptionIndex(null);
    setUserAnswers({});
    setSessionStartTime(Date.now());
    setCurrentAttemptNumber(attemptNum);
    setViewingRecord(null);
    setTimeLeftSec(certificationMode ? 15 * 60 : session.estimatedMinutes * 60);

    // Reset Anti-Cheating Counters
    setTabSwitches(0);
    setCopyPasteAttempts(0);
    setRapidClicks(0);
    setLastQuestionTimestamp(Date.now());
    setAntiCheatingLog(null);
  };

  const handleSelectOption = (idx: number) => {
    setSelectedOptionIndex(idx);
  };

  const handleNextQuestion = () => {
    if (selectedOptionIndex === null || !activeSession) return;

    const now = Date.now();
    const elapsedSinceLastQ = now - lastQuestionTimestamp;
    if (elapsedSinceLastQ < 500) {
      setRapidClicks((prev) => prev + 1);
    }
    setLastQuestionTimestamp(now);

    const currentQ = activeSession.questions[currentQIndex];
    const updatedAnswers = {
      ...userAnswers,
      [currentQ.id]: selectedOptionIndex,
    };
    setUserAnswers(updatedAnswers);

    if (currentQIndex < activeSession.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      const nextQId = activeSession.questions[currentQIndex + 1]?.id;
      setSelectedOptionIndex(updatedAnswers[nextQId] !== undefined ? updatedAnswers[nextQId] : null);
    } else {
      handleFinishAssessment(updatedAnswers);
    }
  };

  const handleFinishAssessment = (finalAnswers?: Record<string, number>) => {
    if (!activeSession) return;
    const answers = finalAnswers || userAnswers;
    const timeTakenSeconds = Math.max(10, Math.round((Date.now() - sessionStartTime) / 1000));

    // Calculate score & strict passing rules
    let correctCount = 0;
    activeSession.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correctCount++;
    });
    const scorePct = Math.round((correctCount / activeSession.questions.length) * 100);

    // Determine difficulty level
    const difficultyKey: AssessmentDifficulty =
      activeSession.difficultyTier === 'Industry Expert'
        ? 'Expert'
        : activeSession.difficultyTier === 'Advanced'
        ? 'Advanced'
        : activeSession.difficultyTier === 'Intermediate'
        ? 'Medium'
        : 'Easy';

    const strictResult = calculateStrictXP(scorePct, difficultyKey);
    const builderImpact = calculateBuilderScoreImpact(scorePct, strictResult.passed, difficultyKey);

    // Evaluate anti-cheating logs
    const evaluatedAntiCheat = evaluateAntiCheatingLogs({
      tabSwitches,
      copyPasteAttempts,
      rapidClicks,
      uniformPatternDetected: false,
    });
    setAntiCheatingLog(evaluatedAntiCheat);

    // Build base attempt record
    const baseAttemptRecord = buildAssessmentAttemptRecord(
      activeSession,
      answers,
      timeTakenSeconds,
      currentAttemptNumber
    );

    // Enforce Strict XP rules
    const finalRecord: AssessmentAttemptRecord = {
      ...baseAttemptRecord,
      score: scorePct,
      passed: strictResult.passed,
      xpEarned: strictResult.xpEarned,
      builderScoreImpact: builderImpact,
    };

    // Save attempt to Zustand store
    recordAssessmentAttempt(finalRecord);
    if (finalRecord.xpEarned > 0) {
      addXP(finalRecord.xpEarned);
    }

    // Update Skill Confidence Matrix
    const updatedMatrix = calculateSkillConfidence(
      activeSession.topic,
      scorePct,
      88,
      githubData.connected ? 90 : 75,
      92
    );
    setSkillMatrix(updatedMatrix);

    // If passed, auto-record verified skill
    if (finalRecord.passed) {
      addVerifiedSkill(
        activeSession.topic,
        difficultyKey,
        (activeSession.department.includes('AI') ? 'AI & ML' : 'Programming') as any
      );
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    }

    setActiveSession(null);
    setViewingRecord(finalRecord);
    setActiveResultTab('summary');
  };

  const activeTrack = DEPARTMENT_TRACKS.find((t) => t.name === selectedDepartment) || DEPARTMENT_TRACKS[0];

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1240px] mx-auto pb-20 font-sans text-[#1B1B1B]">
        {/* Header Banner */}
        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-bold font-mono uppercase">
                  Strict Verification Engine
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  No Participation XP
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight mt-1.5">
                Benchmark Skill Verification Engine
              </h1>
              <p className="text-xs sm:text-sm text-[#6F6A60] mt-1 max-w-3xl leading-relaxed">
                Production assessment suite with strict passing thresholds (Easy: 60%, Medium: 70%, Advanced: 75%, Expert: 80%), scaled XP rewards, anti-cheating tracking, and multi-source skill confidence matrix.
              </p>
            </div>

            {/* Mode Toggle & Profile Context */}
            <div className="flex items-center gap-3 flex-wrap self-start md:self-auto">
              <div className="p-1 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center text-xs font-semibold">
                <button
                  onClick={() => setMainTab('assessments')}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    mainTab === 'assessments'
                      ? 'bg-[#1B1B1B] text-white shadow-xs'
                      : 'text-[#6F6A60] hover:text-[#1B1B1B]'
                  }`}
                >
                  Diagnostic Suite
                </button>
                <button
                  onClick={() => setMainTab('leaderboard')}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    mainTab === 'leaderboard'
                      ? 'bg-[#1B1B1B] text-white shadow-xs'
                      : 'text-[#6F6A60] hover:text-[#1B1B1B]'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 text-[#C76A2A]" />
                  <span>Verified Leaderboard</span>
                </button>
              </div>
            </div>
          </div>

          {/* Strict Threshold Rules Bar */}
          <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-[#E8E5DD] grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-[#E8E5DD]">
              <span className="text-[10px] text-[#6F6A60] uppercase block font-semibold">Easy Passing</span>
              <span className="font-bold text-[#1B1B1B]">60% Score • Min 25 XP</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#E8E5DD]">
              <span className="text-[10px] text-[#6F6A60] uppercase block font-semibold">Medium Passing</span>
              <span className="font-bold text-[#1B1B1B]">70% Score • Min 50 XP</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#E8E5DD]">
              <span className="text-[10px] text-[#6F6A60] uppercase block font-semibold">Advanced Passing</span>
              <span className="font-bold text-[#1B1B1B]">75% Score • Min 87 XP</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#E8E5DD]">
              <span className="text-[10px] text-[#6F6A60] uppercase block font-semibold">Expert Passing</span>
              <span className="font-bold text-[#C76A2A]">80% Score • Min 125 XP</span>
            </div>
          </div>
        </div>

        {/* MAIN TAB 1: ASSESSMENTS SUITE */}
        {mainTab === 'assessments' && (
          <div className="space-y-6">
            {/* Domain Tracks Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6F6A60]">
                  Select Engineering &amp; Professional Domain
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#6F6A60]">Certification Mode:</span>
                  <button
                    onClick={() => setCertificationMode(!certificationMode)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      certificationMode
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-[#E8E5DD] text-[#6F6A60]'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{certificationMode ? 'Strict Proctored ON' : 'Standard Practice'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {DEPARTMENT_TRACKS.map((track) => {
                  const isSelected = selectedDepartment === track.name;
                  return (
                    <button
                      key={track.id}
                      onClick={() => setSelectedDepartment(track.name)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#1B1B1B] text-white border-[#1B1B1B] shadow-sm'
                          : 'bg-white border-[#E8E5DD] hover:border-[#C76A2A] text-[#1B1B1B]'
                      }`}
                    >
                      <div className="text-2xl">{track.icon}</div>
                      <div>
                        <h3 className="text-xs font-bold leading-snug">{track.name}</h3>
                        <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-gray-300' : 'text-[#6F6A60]'}`}>
                          {track.topics.length} benchmark topics
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Domain Topic Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#1B1B1B]">{activeTrack.name} Evaluation Topics</h2>
                  <p className="text-xs text-[#6F6A60]">{activeTrack.description}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-white border border-[#E8E5DD] text-xs font-mono font-bold text-[#1B1B1B]">
                  {activeTrack.topics.length} Available Assessments
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {activeTrack.topics.map((topic, idx) => {
                  const historyRecords = (assessmentHistory && (assessmentHistory as Record<string, AssessmentAttemptRecord[]>)[topic]) || [];
                  const bestRecord = historyRecords.length > 0
                    ? [...historyRecords].sort((a, b) => b.score - a.score)[0]
                    : undefined;

                  const difficultyLabel: AssessmentDifficulty =
                    idx % 4 === 3 ? 'Expert' : idx % 4 === 2 ? 'Advanced' : idx % 4 === 1 ? 'Medium' : 'Easy';
                  const threshold = PASSING_THRESHOLDS[difficultyLabel];

                  return (
                    <motion.div
                      key={topic}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="p-6 rounded-2xl bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-4 flex flex-col justify-between shadow-xs"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-md bg-[#F6F4EE] border border-[#E8E5DD] text-xs font-mono font-bold text-[#1B1B1B]">
                            Topic #{idx + 1}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              difficultyLabel === 'Expert'
                                ? 'bg-rose-100 text-rose-800'
                                : difficultyLabel === 'Advanced'
                                ? 'bg-amber-100 text-amber-900'
                                : difficultyLabel === 'Medium'
                                ? 'bg-blue-100 text-blue-900'
                                : 'bg-emerald-100 text-emerald-900'
                            }`}
                          >
                            {difficultyLabel} ({threshold}% Threshold)
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-[#1B1B1B]">{topic}</h3>

                        {/* Best Record Status */}
                        {bestRecord ? (
                          <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between text-xs">
                            <div>
                              <span className="text-[10px] text-[#6F6A60] block uppercase font-semibold">Best Attempt</span>
                              <span className="font-bold text-[#1B1B1B]">{bestRecord.score}% Score</span>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                bestRecord.passed ? 'bg-[#2F7A45]/15 text-[#2F7A45]' : 'bg-rose-100 text-rose-700'
                              }`}
                            >
                              {bestRecord.passed ? 'Verified Passed' : 'Below Threshold'}
                            </span>
                          </div>
                        ) : (
                          <p className="text-xs text-[#6F6A60] font-medium">
                            Not attempted yet. Minimum {threshold}% required for skill verification.
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-[#E8E5DD] flex items-center justify-between gap-3">
                        <span className="text-xs font-mono font-bold text-[#C76A2A]">
                          Up to {difficultyLabel === 'Expert' ? 250 : difficultyLabel === 'Advanced' ? 175 : 100} XP
                        </span>

                        <button
                          onClick={() => handleStartTopic(topic, activeTrack.name, (historyRecords.length || 0) + 1)}
                          className="px-4 py-2 bg-[#1B1B1B] text-white hover:bg-[#C76A2A] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{historyRecords.length > 0 ? 'Retake Diagnostic' : 'Start Assessment'}</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* MAIN TAB 2: VERIFIED LEADERBOARD */}
        {mainTab === 'leaderboard' && (
          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#1B1B1B]">Strict Verified Leaderboard</h2>
                <p className="text-xs text-[#6F6A60]">
                  Ranks students based exclusively on verified assessment &amp; project proof. Zero participation points awarded.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#2F7A45]/15 text-[#2F7A45] text-xs font-bold">
                Anti-Exploit Enabled
              </span>
            </div>

            <div className="space-y-3">
              {[
                { rank: '#1', name: 'Manutej Reddy', college: 'HITAM', dept: 'CSE', score: 890, verifiedSkills: 14, badge: 'Master Architect' },
                { rank: '#2', name: 'Priya Sharma', college: 'IIT Hyderabad', dept: 'CSE', score: 840, verifiedSkills: 12, badge: 'Systems Engineer' },
                { rank: '#3', name: 'Ananya Sen', college: 'HITAM', dept: 'IT', score: 790, verifiedSkills: 10, badge: 'Full Stack Dev' },
                { rank: '#4', name: 'Karthik Raja', college: 'VNR VJIET', dept: 'AIML', score: 720, verifiedSkills: 8, badge: 'AI Practitioner' },
              ].map((row) => (
                <div key={row.rank} className="p-4 rounded-2xl bg-[#F6F4EE] border border-[#E8E5DD] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#1B1B1B] text-white font-bold font-mono text-xs flex items-center justify-center">
                      {row.rank}
                    </span>
                    <div>
                      <strong className="text-[#1B1B1B] text-sm block">{row.name}</strong>
                      <span className="text-[#6F6A60] text-[11px]">{row.college} • {row.dept}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <span className="text-[10px] text-[#6F6A60] uppercase block font-semibold">Verified Skills</span>
                      <span className="font-bold text-[#2F7A45]">{row.verifiedSkills} Skills</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6F6A60] uppercase block font-semibold">Builder Score</span>
                      <span className="font-mono font-bold text-sm text-[#C76A2A]">{row.score} pts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVE TEST RUNNER MODAL */}
        <AnimatePresence>
          {activeSession && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-[#E8E5DD] rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-6 font-sans"
              >
                {/* Active Test Header */}
                <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-[#1B1B1B] text-white text-xs font-mono font-bold">
                        {activeSession.topic}
                      </span>
                      {certificationMode && (
                        <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> Proctored Mode
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-[#1B1B1B] mt-1">{activeSession.title}</h2>
                  </div>

                  {/* Countdown Timer & Anti-Cheat Trust Meter */}
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center gap-2 text-xs font-mono font-bold text-[#C76A2A]">
                      <Clock className="w-4 h-4" />
                      <span>{Math.floor(timeLeftSec / 60)}:{(timeLeftSec % 60).toString().padStart(2, '0')}</span>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-xs font-semibold text-[#6F6A60]">
                      Tab Switches: <span className="font-bold text-rose-600">{tabSwitches}</span>
                    </div>
                  </div>
                </div>

                {/* Active Question Box */}
                {activeSession.questions[currentQIndex] && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between text-xs text-[#6F6A60]">
                      <span className="font-bold text-[#1B1B1B]">
                        Question {currentQIndex + 1} of {activeSession.questions.length}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#F6F4EE] font-mono font-semibold">
                        Type: {activeSession.questions[currentQIndex].type || 'MCQ'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#1B1B1B] leading-snug">
                      {activeSession.questions[currentQIndex].question}
                    </h3>

                    {/* Code Snippet Box if present */}
                    {activeSession.questions[currentQIndex].codeSnippet && (
                      <div className="p-4 rounded-xl bg-[#1B1B1B] text-emerald-400 font-mono text-xs overflow-x-auto border border-[#E8E5DD]">
                        <pre>{activeSession.questions[currentQIndex].codeSnippet}</pre>
                      </div>
                    )}

                    {/* Options List */}
                    <div className="space-y-3">
                      {activeSession.questions[currentQIndex].options.map((opt, optIdx) => {
                        const isSelected = selectedOptionIndex === optIdx;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption(optIdx)}
                            className={`w-full p-4 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-3 cursor-pointer ${
                              isSelected
                                ? 'bg-[#FAF9F5] border-[#C76A2A] text-[#1B1B1B] shadow-xs'
                                : 'bg-[#F6F4EE] border-[#E8E5DD] hover:border-[#1B1B1B] text-[#6F6A60]'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-[#C76A2A] bg-[#C76A2A] text-white' : 'border-[#E8E5DD]'}`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Footer Controls */}
                <div className="pt-4 border-t border-[#E8E5DD] flex items-center justify-between">
                  <button
                    onClick={() => setActiveSession(null)}
                    className="px-4 py-2 border border-[#E8E5DD] rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50"
                  >
                    Quit Assessment
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedOptionIndex === null}
                    className="px-6 py-2.5 bg-[#1B1B1B] disabled:opacity-50 text-white hover:bg-[#C76A2A] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>{currentQIndex === activeSession.questions.length - 1 ? 'Finish Evaluation' : 'Next Question'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* POST ASSESSMENT REPORT MODAL */}
        <AnimatePresence>
          {viewingRecord && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-[#E8E5DD] rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto font-sans"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-[#1B1B1B] text-white text-xs font-mono font-bold">
                        {viewingRecord.topic}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                          viewingRecord.passed ? 'bg-[#2F7A45]/15 text-[#2F7A45]' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {viewingRecord.passed ? 'PASSED VERIFICATION' : 'BELOW THRESHOLD (0 XP)'}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-[#1B1B1B] mt-1">Diagnostic Evaluation Report</h2>
                  </div>

                  <button
                    onClick={() => setViewingRecord(null)}
                    className="p-1.5 rounded-lg text-[#6F6A60] hover:bg-[#F6F4EE]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Score & Metric Summary Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
                  <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-[#E8E5DD]">
                    <span className="text-[10px] text-[#6F6A60] uppercase font-semibold block">Final Score</span>
                    <span className="text-2xl font-bold text-[#1B1B1B]">{viewingRecord.score}%</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-[#E8E5DD]">
                    <span className="text-[10px] text-[#6F6A60] uppercase font-semibold block">Strict XP Earned</span>
                    <span className="text-2xl font-bold text-[#C76A2A]">+{viewingRecord.xpEarned} XP</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-[#E8E5DD]">
                    <span className="text-[10px] text-[#6F6A60] uppercase font-semibold block">Builder Score Impact</span>
                    <span className="text-2xl font-bold text-[#2F7A45]">+{viewingRecord.builderScoreImpact} pts</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-[#E8E5DD]">
                    <span className="text-[10px] text-[#6F6A60] uppercase font-semibold block">Trust Score</span>
                    <span className="text-2xl font-bold text-[#1B1B1B]">
                      {antiCheatingLog?.trustScore || 100}%
                    </span>
                  </div>
                </div>

                {/* Skill Confidence Matrix Visualization */}
                {skillMatrix && (
                  <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] space-y-3">
                    <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-2">
                      <h3 className="text-sm font-bold text-[#1B1B1B] flex items-center gap-2">
                        <Brain className="w-4 h-4 text-[#C76A2A]" />
                        <span>Dynamic Skill Confidence Matrix</span>
                      </h3>
                      <span className="text-xs font-mono font-bold text-[#2F7A45]">
                        Confidence: {skillMatrix.confidencePct}%
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      {skillMatrix.sources.map((src, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD]">
                          <span className="text-[10px] text-[#6F6A60] block font-semibold">{src.name} ({src.weightPct}%)</span>
                          <span className="font-bold text-[#1B1B1B]">{src.score}% Score</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Close Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setViewingRecord(null)}
                    className="px-6 py-2.5 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors"
                  >
                    Close Report
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PortalLayout>
  );
}
