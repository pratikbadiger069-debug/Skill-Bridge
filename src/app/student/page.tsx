'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { PaperCard } from '@/components/ui/PaperCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import { useAppStore } from '@/lib/store';
import { getUserFirstName } from '@/lib/user-utils';
import { getLevelInfo, calculateTransparentBuilderScore } from '@/lib/xp-engine';
import { analyzeStudentCareerContext, ROLE_BENCHMARKS } from '@/lib/copilot-engine';
import {
  Target,
  ArrowRight,
  ShieldCheck,
  Bot,
  Calendar,
  CheckCircle2,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  BookOpen,
  MessageSquare,
  Users2,
  Briefcase,
  PlusCircle,
  FileCheck,
  Flame,
  Clock,
  ExternalLink,
  ChevronRight,
  Check,
} from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function StudentDashboardPage() {
  const {
    studentProfile,
    currentUser,
    setRole,
    updateStudentTargetRole,
    xp,
    addXP,
    streakDays,
    quests,
    githubData,
  } = useAppStore();

  const [mounted, setMounted] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(studentProfile.targetRole || 'Backend Engineer');

  // Interactive Daily Missions state
  const [dailyMissions, setDailyMissions] = useState([
    { id: 'm1', text: 'Complete Java Core Assessment', xp: 25, completed: true },
    { id: 'm2', text: 'Push GitHub Commit (zero-skillbridge-os)', xp: 15, completed: true },
    { id: 'm3', text: 'Update Project Evidence & SHA-256 Hash', xp: 20, completed: false },
    { id: 'm4', text: 'Join Community Discussion on Microservices', xp: 10, completed: false },
  ]);

  useEffect(() => {
    setRole('student');
    setMounted(true);
  }, [setRole]);

  const toggleMission = (id: string) => {
    setDailyMissions((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          if (!m.completed) addXP(m.xp);
          return { ...m, completed: !m.completed };
        }
        return m;
      })
    );
  };

  const handleSaveGoal = (newRole: string) => {
    setSelectedRole(newRole);
    updateStudentTargetRole(newRole);
    setIsEditingGoal(false);
  };

  const firstName = getUserFirstName({ user: currentUser, profile: studentProfile });
  const levelInfo = getLevelInfo(xp);
  const builderScoreData = calculateTransparentBuilderScore({
    verifiedSkillsCount: (studentProfile.verifiedSkills || []).length,
    projectsCount: (studentProfile.evidences || []).length,
    githubConnected: githubData?.connected,
    githubReposCount: (githubData?.pinnedRepos || []).length,
    consistencyStreakDays: streakDays,
    completedChallengesCount: (quests || []).filter((q) => q.completed).length,
  });

  const context = analyzeStudentCareerContext(studentProfile, selectedRole);
  const sampleRoles = Object.keys(ROLE_BENCHMARKS);

  // Greeting based on current hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (!mounted) {
    return (
      <PortalLayout>
        <div className="py-24 text-center text-xs text-[#6F6A60]">
          <div className="w-5 h-5 rounded-full border-2 border-[#C76A2A] border-t-transparent animate-spin mx-auto mb-2" />
          Loading ZERO × SkillBridge Dashboard...
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-16">

        {/* 1. HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <PaperCard padding="lg" className="bg-white border-[#E8E5DD] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="accent" size="sm" icon={Sparkles}>
                  ZERO × SkillBridge Operating System
                </Badge>
                <Badge variant="neutral" size="sm">
                  {streakDays}-Day Builder Streak
                </Badge>
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#1B1B1B] tracking-tight">
                {getGreeting()}, {firstName}
              </h1>
              <p className="text-sm text-[#6F6A60]">
                Let&apos;s build something meaningful today.
              </p>
            </div>

            {/* Builder Status Pill */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="p-3 bg-[#F6F4EE] border border-[#E8E5DD] rounded-2xl flex items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#6F6A60] uppercase block">Builder Level</span>
                  <span className="font-heading font-bold text-xs text-[#1B1B1B]">
                    Lvl {levelInfo.level} • {levelInfo.title}
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-[#E8E5DD]" />
                <div>
                  <span className="text-[10px] font-mono text-[#6F6A60] uppercase block">Rank</span>
                  <span className="font-heading font-bold text-xs text-[#C76A2A]">
                    #{levelInfo.rank} National
                  </span>
                </div>
              </div>
            </div>
          </PaperCard>
        </motion.div>

        {/* 2. TOP CARDS (7 KEY METRIC CARDS) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 overflow-x-auto pb-1">
          <PaperCard padding="sm" className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6A60]">Builder Score</span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-lg font-bold text-[#1B1B1B]">{builderScoreData.totalScore}</span>
              <span className="text-[10px] text-[#2F7A45] font-semibold">+35</span>
            </div>
            <span className="text-[10px] text-[#6F6A60] block truncate">Out of 1000</span>
          </PaperCard>

          <PaperCard padding="sm" className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6A60]">Level</span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-lg font-bold text-[#1B1B1B]">Lvl {levelInfo.level}</span>
            </div>
            <span className="text-[10px] text-[#C76A2A] font-semibold block truncate">{levelInfo.title}</span>
          </PaperCard>

          <PaperCard padding="sm" className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6A60]">XP</span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-lg font-bold text-[#1B1B1B]">{xp}</span>
            </div>
            <span className="text-[10px] text-[#6F6A60] block truncate">+{levelInfo.nextLevelXP - levelInfo.currentLevelProgress} to Lvl {levelInfo.level + 1}</span>
          </PaperCard>

          <PaperCard padding="sm" className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6A60]">Current Goal</span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-xs font-bold text-[#1B1B1B] truncate">{selectedRole}</span>
            </div>
            <span className="text-[10px] text-[#2F7A45] font-semibold block truncate">Track Active</span>
          </PaperCard>

          <PaperCard padding="sm" className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6A60]">Weekly Progress</span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-lg font-bold text-[#1B1B1B]">72%</span>
            </div>
            <span className="text-[10px] text-[#2F7A45] font-semibold block truncate">5 of 7 Completed</span>
          </PaperCard>

          <PaperCard padding="sm" className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6A60]">Readiness</span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-lg font-bold text-[#2F7A45]">84%</span>
            </div>
            <span className="text-[10px] text-[#6F6A60] block truncate">Top 10% Benchmark</span>
          </PaperCard>

          <PaperCard padding="sm" className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6A60]">Match</span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-lg font-bold text-[#C76A2A]">94%</span>
            </div>
            <span className="text-[10px] text-[#6F6A60] block truncate">Razorpay Backend</span>
          </PaperCard>
        </div>

        {/* 9. QUICK ACTIONS BAR */}
        <PaperCard padding="sm" className="bg-white border-[#E8E5DD] flex items-center justify-between gap-3 overflow-x-auto">
          <span className="text-xs font-mono font-bold text-[#6F6A60] uppercase tracking-wider shrink-0 px-2">
            Quick Actions
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/student/assessments">
              <Button variant="secondary" size="sm" icon={CheckCircle2}>
                Start Assessment
              </Button>
            </Link>
            <Link href="/student/portfolio">
              <Button variant="secondary" size="sm" icon={PlusCircle}>
                Create Project
              </Button>
            </Link>
            <Link href="/collaborations">
              <Button variant="secondary" size="sm" icon={Users2}>
                Join Room
              </Button>
            </Link>
            <Link href="/passport">
              <Button variant="secondary" size="sm" icon={Award}>
                View Passport
              </Button>
            </Link>
            <Link href="/student/career-copilot">
              <Button variant="primary" size="sm" icon={Bot}>
                Open Copilot
              </Button>
            </Link>
          </div>
        </PaperCard>

        {/* MAIN DASHBOARD 2-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT COLUMN (8 COLS): Daily Mission, Current Goal, Recent Activity, Team Updates */}
          <div className="lg:col-span-8 space-y-6">

            {/* 3. DAILY MISSION CHECKLIST */}
            <PaperCard padding="md" className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="accent" size="sm" icon={Zap}>Daily Missions</Badge>
                  <span className="text-xs font-mono text-[#6F6A60]">
                    {dailyMissions.filter(m => m.completed).length} / {dailyMissions.length} Complete
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#2F7A45]">
                  +{dailyMissions.filter(m => m.completed).reduce((acc, m) => acc + m.xp, 0)} XP Earned Today
                </span>
              </div>

              <div className="space-y-2">
                {dailyMissions.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => toggleMission(m.id)}
                    className={`p-3 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${
                      m.completed
                        ? 'bg-[#F6F4EE] border-[#E8E5DD]'
                        : 'bg-white border-[#E8E5DD] hover:border-[#C76A2A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                          m.completed
                            ? 'bg-[#2F7A45] border-[#2F7A45] text-white'
                            : 'border-[#E8E5DD] bg-white'
                        }`}
                      >
                        {m.completed && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`text-xs font-semibold ${m.completed ? 'text-[#6F6A60] line-through' : 'text-[#1B1B1B]'}`}>
                        {m.text}
                      </span>
                    </div>

                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      m.completed ? 'bg-[#2F7A45]/10 text-[#2F7A45]' : 'bg-[#C76A2A]/10 text-[#C76A2A]'
                    }`}>
                      +{m.xp} XP
                    </span>
                  </div>
                ))}
              </div>
            </PaperCard>

            {/* 4. CURRENT GOAL CARD WITH ROADMAP BUTTON */}
            <PaperCard padding="md" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="neutral" size="sm" icon={Target}>Target Role</Badge>
                  <span className="text-xs text-[#6F6A60]">Primary Career Focus</span>
                </div>
                <button
                  onClick={() => setIsEditingGoal(!isEditingGoal)}
                  className="text-xs font-semibold text-[#C76A2A] hover:underline"
                >
                  {isEditingGoal ? 'Cancel' : 'Change Goal'}
                </button>
              </div>

              {isEditingGoal ? (
                <div className="space-y-3 pt-1">
                  <p className="text-xs text-[#6F6A60]">Select target role benchmark:</p>
                  <div className="flex flex-wrap gap-2">
                    {sampleRoles.map((r) => (
                      <button
                        key={r}
                        onClick={() => handleSaveGoal(r)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          selectedRole === r
                            ? 'bg-[#1B1B1B] text-white'
                            : 'bg-[#F6F4EE] border border-[#E8E5DD] text-[#1B1B1B] hover:border-[#C76A2A]'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-[#1B1B1B]">{selectedRole}</h3>
                      <p className="text-xs text-[#6F6A60]">
                        38% Roadmap Progress • {studentProfile.verifiedSkills.length} verified competencies
                      </p>
                    </div>
                    <Link href="/student/roadmap">
                      <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                        Roadmap Button
                      </Button>
                    </Link>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#1B1B1B]">Overall Role Mastery</span>
                      <span className="text-[#C76A2A] font-mono">38%</span>
                    </div>
                    <div className="w-full h-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-full overflow-hidden">
                      <div className="h-full bg-[#C76A2A] rounded-full" style={{ width: '38%' }} />
                    </div>
                  </div>
                </div>
              )}
            </PaperCard>

            {/* 5. RECENT ACTIVITY STREAM */}
            <PaperCard padding="md" className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-3">
                <h3 className="font-heading font-bold text-sm text-[#1B1B1B] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#6F6A60]" />
                  <span>Recent Activity</span>
                </h3>
                <Link href="/student/journey" className="text-xs font-semibold text-[#C76A2A] hover:underline">
                  Full Stream →
                </Link>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  {
                    title: 'Assessment Completed',
                    detail: 'Passed Java Foundations 10-Q with 88% Score (+25 XP)',
                    time: '2 hours ago',
                    badge: 'success',
                  },
                  {
                    title: 'Project Updated',
                    detail: 'Pushed SHA-256 evidence hash for Distributed Vault API',
                    time: '5 hours ago',
                    badge: 'accent',
                  },
                  {
                    title: 'Opportunity Added',
                    detail: 'Matched with Razorpay Backend Engineering Internship',
                    time: '1 day ago',
                    badge: 'neutral',
                  },
                  {
                    title: 'Team Joined',
                    detail: 'Joined AI Systems Capstone Project Team #4',
                    time: '2 days ago',
                    badge: 'accent',
                  },
                  {
                    title: 'GitHub Commit',
                    detail: 'Pushed 4 commits to zero-skillbridge-os main branch',
                    time: '3 days ago',
                    badge: 'neutral',
                  },
                ].map((act, i) => (
                  <div key={i} className="p-3 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="font-heading font-bold text-[#1B1B1B] block">{act.title}</span>
                      <p className="text-[#6F6A60]">{act.detail}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#6F6A60] shrink-0">{act.time}</span>
                  </div>
                ))}
              </div>
            </PaperCard>

            {/* 8. TEAM UPDATES */}
            <PaperCard padding="md" className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-3">
                <h3 className="font-heading font-bold text-sm text-[#1B1B1B] flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#6F6A60]" />
                  <span>Team Updates</span>
                </h3>
                <Link href="/community" className="text-xs font-semibold text-[#C76A2A] hover:underline">
                  View Community →
                </Link>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-white border border-[#E8E5DD] rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1B1B1B]">Prof. S. K. Sharma (Faculty)</span>
                    <span className="text-[10px] font-mono text-[#6F6A60]">Message</span>
                  </div>
                  <p className="text-[#6F6A60] leading-relaxed">
                    &ldquo;API Architecture review completed for Capstone #4. Great job on Redis rate-limiting design.&rdquo;
                  </p>
                </div>

                <div className="p-3 bg-white border border-[#E8E5DD] rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1B1B1B]">Alex Chen (Team Member)</span>
                    <span className="text-[10px] font-mono text-[#6F6A60]">PR Submission</span>
                  </div>
                  <p className="text-[#6F6A60] leading-relaxed">
                    Submitted PR #14 on Redis Caching Layer. Ready for code review.
                  </p>
                </div>

                <div className="p-3 bg-white border border-[#E8E5DD] rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1B1B1B]">Community Forum</span>
                    <span className="text-[10px] font-mono text-[#6F6A60]">Discussion</span>
                  </div>
                  <p className="text-[#6F6A60] leading-relaxed">
                    Hot Thread: &ldquo;Best practices for PostgreSQL indexing in Next.js 16 Server Components&rdquo;
                  </p>
                </div>
              </div>
            </PaperCard>

          </div>

          {/* RIGHT COLUMN (4 COLS): Career Copilot Widget, Upcoming Events */}
          <div className="lg:col-span-4 space-y-6">

            {/* 6. CAREER COPILOT WIDGET */}
            <PaperCard padding="md" className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="accent" size="sm" icon={Bot}>Career Copilot</Badge>
                </div>
                <Link href="/student/career-copilot" className="text-xs font-semibold text-[#C76A2A] hover:underline">
                  Full Analysis →
                </Link>
              </div>

              <div className="space-y-3 text-xs">
                {/* Skill Gap Analysis */}
                <div className="p-3 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#C76A2A] uppercase">Skill Gap Analysis</span>
                  <p className="font-bold text-[#1B1B1B]">Distributed Caching &amp; Redis</p>
                  <p className="text-[#6F6A60] text-[11px]">Primary gap identified for {selectedRole} benchmark.</p>
                </div>

                {/* Suggested Project */}
                <div className="p-3 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#2F7A45] uppercase">Suggested Project</span>
                  <p className="font-bold text-[#1B1B1B]">High-Throughput Redis Rate Limiter</p>
                  <p className="text-[#6F6A60] text-[11px]">Build a token bucket algorithm with Node.js &amp; Redis.</p>
                </div>

                {/* Suggested Course */}
                <div className="p-3 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#1B1B1B] uppercase">Suggested Course</span>
                  <p className="font-bold text-[#1B1B1B]">Production Systems Architecture</p>
                  <p className="text-[#6F6A60] text-[11px]">Docker containerization &amp; microservice orchestration.</p>
                </div>

                {/* Suggested Assessment */}
                <div className="p-3 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#6F6A60] uppercase">Suggested Assessment</span>
                  <p className="font-bold text-[#1B1B1B]">Distributed Systems 10-Q</p>
                  <p className="text-[#6F6A60] text-[11px]">Test consensus algorithms &amp; fault tolerance.</p>
                </div>
              </div>
            </PaperCard>

            {/* 7. UPCOMING EVENTS */}
            <PaperCard padding="md" className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-3">
                <h3 className="font-heading font-bold text-sm text-[#1B1B1B] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#6F6A60]" />
                  <span>Upcoming Events</span>
                </h3>
                <span className="text-[10px] font-mono text-[#6F6A60]">Next 14 Days</span>
              </div>

              <div className="space-y-3 text-xs">
                {/* Assignment */}
                <div className="p-3 bg-white border border-[#E8E5DD] rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge variant="accent" size="sm">Assignment</Badge>
                    <span className="text-[10px] font-mono text-[#C2410C] font-bold">Due Tomorrow</span>
                  </div>
                  <p className="font-bold text-[#1B1B1B]">Docker Microservices Challenge</p>
                  <p className="text-[#6F6A60] text-[11px]">Submit docker-compose configuration &amp; test logs.</p>
                </div>

                {/* Deadline */}
                <div className="p-3 bg-white border border-[#E8E5DD] rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge variant="neutral" size="sm">Deadline</Badge>
                    <span className="text-[10px] font-mono text-[#6F6A60]">Oct 2, 11:59 PM</span>
                  </div>
                  <p className="font-bold text-[#1B1B1B]">Sprint 3 Capstone Submission</p>
                  <p className="text-[#6F6A60] text-[11px]">Finalize API endpoints &amp; SHA-256 evidence commit.</p>
                </div>

                {/* Hackathon */}
                <div className="p-3 bg-white border border-[#E8E5DD] rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge variant="success" size="sm">Hackathon</Badge>
                    <span className="text-[10px] font-mono text-[#2F7A45] font-bold">Oct 12–14</span>
                  </div>
                  <p className="font-bold text-[#1B1B1B]">National AI Builder Hackathon</p>
                  <p className="text-[#6F6A60] text-[11px]">$10,000 Prize Pool • Verified Project Badges.</p>
                </div>

                {/* Workshop */}
                <div className="p-3 bg-white border border-[#E8E5DD] rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge variant="neutral" size="sm">Workshop</Badge>
                    <span className="text-[10px] font-mono text-[#6F6A60]">Oct 5, 4:00 PM</span>
                  </div>
                  <p className="font-bold text-[#1B1B1B]">System Design at Scale</p>
                  <p className="text-[#6F6A60] text-[11px]">Live session with Senior Principal Architect.</p>
                </div>
              </div>
            </PaperCard>

          </div>

        </div>

      </div>
    </PortalLayout>
  );
}
