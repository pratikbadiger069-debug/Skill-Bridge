'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import {
  useSmartClassroomStore,
  UserClassroomRole,
  LivePoll,
} from '@/lib/smart-classroom-store';
import {
  Video,
  Users,
  BrainCircuit,
  MessageSquare,
  HelpCircle,
  ThumbsUp,
  Hand,
  Sparkles,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Code,
  FileUp,
  Image as ImageIcon,
  Send,
  Plus,
  X,
  FileText,
  ChevronLeft,
  Flame,
  Award,
  Lock,
  Play,
  Volume2,
  Maximize2,
  RefreshCw,
  EyeOff,
  UserCheck,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LiveSmartClassroomPage() {
  const params = useParams();
  const router = useRouter();
  const roomCode = typeof params.code === 'string' ? params.code.toUpperCase() : 'JAVA-3A-2026';

  const {
    getRoomByCode,
    currentUserRole,
    setCurrentUserRole,
    createPoll,
    submitPollResponse,
    closePoll,
    submitDoubt,
    upvoteDoubt,
    toggleResolveDoubt,
    toggleRaiseHand,
    sendReaction,
  } = useSmartClassroomStore();

  const room = getRoomByCode(roomCode);

  // Fallback state if room not found initially
  const activeRoom = room || {
    id: 'room-101',
    code: roomCode,
    title: 'Advanced Java Microservices & Spring Boot Architecture',
    subject: 'Distributed Systems & Cloud Computing',
    department: 'CSE',
    type: 'Live Classroom' as const,
    facultyName: 'Dr. Ramesh Sharma',
    taNames: ['Ananya Sen'],
    status: 'live' as const,
    uniqueLink: `https://skillbridge.edu/classroom/${roomCode}`,
    qrCodeUrl: '',
    attendeesCount: 48,
    polls: [],
    doubts: [],
    attendees: [],
    aiMetrics: {
      understoodPct: 82,
      partialPct: 12,
      confusedPct: 6,
      weakConcepts: [
        { concept: 'Circular Dependency Resolution', percentage: 24, recommendation: 'Review @Lazy annotation and constructor injection patterns' },
      ],
      misconceptions: [],
      faqs: [],
      knowledgeGaps: ['Bean Lifecycle Callbacks'],
    },
    createdAt: new Date().toISOString(),
  };

  // Student Mock User Info
  const currentStudentId = 'st-01';
  const currentStudentName = 'Manutej Reddy';

  // State Tabs & Form Controls
  const [activeTab, setActiveTab] = useState<'interactive' | 'doubts' | 'ai_telemetry' | 'faculty_dashboard'>('interactive');
  const [selectedPollOption, setSelectedPollOption] = useState<string | null>(null);
  const [shortAnswerInput, setShortAnswerInput] = useState('');
  const [codeSnippetInput, setCodeSnippetInput] = useState(`// Solve: Implement @Bean initialization logging
@Configuration
public className AppConfig {
    // Add logger interceptor here
}`);

  // Doubt Form
  const [doubtText, setDoubtText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Faculty Create Poll Form State
  const [isCreatePollOpen, setIsCreatePollOpen] = useState(false);
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollType, setNewPollType] = useState<'mcq' | 'short_answer' | 'code' | 'file'>('mcq');
  const [newPollOptions, setNewPollOptions] = useState<string[]>(['', '', '']);

  // Reaction Toast
  const [activeReaction, setActiveReaction] = useState<string | null>(null);
  const currentAttendee = activeRoom.attendees.find((a) => a.studentId === currentStudentId);
  const isHandRaised = currentAttendee?.handRaised || false;

  const handleSendReaction = (emoji: string) => {
    sendReaction(roomCode, currentStudentId, emoji);
    setActiveReaction(emoji);
    setTimeout(() => setActiveReaction(null), 2500);
  };

  const handleToggleRaiseHand = () => {
    toggleRaiseHand(roomCode, currentStudentId);
  };

  const handleSubmitPollResponse = (pollId: string, responseValue: string) => {
    if (!responseValue) return;
    submitPollResponse(roomCode, pollId, currentStudentId, responseValue);
    confetti({ particleCount: 25, spread: 40, origin: { y: 0.8 } });
  };

  const handleSubmitDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim()) return;

    submitDoubt(roomCode, {
      authorId: currentStudentId,
      authorName: isAnonymous ? 'Anonymous Student' : currentStudentName,
      text: doubtText.trim(),
      isAnonymous,
    });

    setDoubtText('');
  };

  const handleCreatePollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPollQuestion.trim()) return;

    const formattedOptions = newPollOptions
      .filter((opt) => opt.trim() !== '')
      .map((optText, idx) => ({
        id: `opt-${idx + 1}`,
        text: optText.trim(),
        count: 0,
      }));

    createPoll(roomCode, {
      question: newPollQuestion.trim(),
      type: newPollType,
      options: newPollType === 'mcq' ? formattedOptions : undefined,
    });

    setIsCreatePollOpen(false);
    setNewPollQuestion('');
    setNewPollOptions(['', '', '']);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
  };

  const activePoll = activeRoom.polls.find((p) => p.status === 'active') || activeRoom.polls[0];

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-[1300px] mx-auto pb-16 font-sans text-[#1B1B1B]">
        {/* Top Room Header */}
        <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <Link
              href="/classroom"
              className="p-2 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#1B1B1B] text-[#1B1B1B] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] text-white text-xs font-mono font-bold">
                  {activeRoom.code}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-[#2F7A45]/15 text-[#2F7A45] text-xs font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F7A45] animate-pulse" />
                  LIVE CLASSROOM
                </span>
                <span className="text-xs text-[#6F6A60] font-medium">{activeRoom.department} • {activeRoom.type}</span>
              </div>
              <h1 className="text-xl font-bold text-[#1B1B1B] tracking-tight">{activeRoom.title}</h1>
              <p className="text-xs text-[#6F6A60]">Faculty Host: {activeRoom.facultyName} • TAs: {activeRoom.taNames.join(', ')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Attendees Badge */}
            <div className="px-3 py-1.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center gap-2 text-xs font-semibold">
              <Users className="w-4 h-4 text-[#C76A2A]" />
              <span>{activeRoom.attendeesCount} Attending</span>
            </div>

            {/* Role Switcher */}
            <div className="p-1 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center text-xs font-semibold">
              {(['Faculty', 'Student', 'TA', 'Admin'] as UserClassroomRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => setCurrentUserRole(role)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    currentUserRole === role
                      ? 'bg-[#1B1B1B] text-white shadow-xs'
                      : 'text-[#6F6A60] hover:text-[#1B1B1B]'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Post Class AI Report Link */}
            <Link
              href={`/classroom/${activeRoom.code}/report`}
              className="px-3.5 py-2 bg-[#FAF9F5] hover:bg-[#E8E5DD] border border-[#E8E5DD] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[#C76A2A]" />
              <span>AI Report &amp; Notes</span>
            </Link>
          </div>
        </div>

        {/* Reaction Floating Toast Banner */}
        <AnimatePresence>
          {activeReaction && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="fixed bottom-6 right-6 z-40 bg-[#1B1B1B] text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold"
            >
              <span className="text-xl">{activeReaction}</span>
              <span>Reaction sent to live classroom feed!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main 2-Column Classroom Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT 7 COLUMNS: LIVE STAGE & INTERACTIVE POLLS */}
          <div className="lg:col-span-7 space-y-6">
            {/* Simulated Live Lecture Stage Window */}
            <div className="p-5 rounded-2xl bg-[#1B1B1B] text-white space-y-4 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-white/70 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="font-semibold text-white">Live Stream • 00:42:15</span>
                  <span className="text-white/50">|</span>
                  <span>Topic: Circular Dependency traps in Spring Boot</span>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-mono">1080p HQ</span>
                </div>
              </div>

              {/* Lecture Presentation Banner */}
              <div className="h-56 rounded-xl bg-gradient-to-br from-[#2b2b2b] to-[#121212] border border-white/10 p-6 flex flex-col justify-between relative">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#C76A2A] text-white text-[10px] font-mono font-bold uppercase">
                    Slide 14 of 32
                  </span>
                  <span className="text-xs font-mono text-white/60">SPRING_BOOT_ARCH_2026.PDF</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    Resolving Circular Bean Dependencies with @Lazy &amp; Setter Injection
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    "When Service A requires Service B during constructor execution, Spring cannot instantiate either bean. Marking the constructor parameter `@Lazy` defers proxy initialization until runtime."
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-white/50 pt-2 border-t border-white/10">
                  <span>Host: Dr. Ramesh Sharma</span>
                  <span className="text-emerald-400 font-medium">82% Audience Understanding</span>
                </div>
              </div>

              {/* Interactive Student Quick Controls Bar */}
              <div className="flex items-center justify-between gap-3 pt-1">
                {/* Reactions */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-white/70 mr-1">Reactions:</span>
                  {['👏', '👍', '🤔', '💡'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleSendReaction(emoji)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-lg transition-transform active:scale-125"
                      title="Send reaction"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                {/* Raise Hand Button */}
                <button
                  onClick={handleToggleRaiseHand}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                    isHandRaised
                      ? 'bg-[#C76A2A] text-white shadow-lg animate-bounce'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <Hand className="w-4 h-4" />
                  <span>{isHandRaised ? 'Hand Raised ✋' : 'Raise Hand'}</span>
                </button>
              </div>
            </div>

            {/* Interactive Polls & Code Exercise Container */}
            <div className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#C76A2A]" />
                  <h2 className="text-base font-bold text-[#1B1B1B]">Live Interactive Poll &amp; Exercises</h2>
                </div>

                {(currentUserRole === 'Faculty' || currentUserRole === 'TA' || currentUserRole === 'Admin') && (
                  <button
                    onClick={() => setIsCreatePollOpen(true)}
                    className="px-3.5 py-1.5 bg-[#1B1B1B] text-white hover:bg-[#C76A2A] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Poll</span>
                  </button>
                )}
              </div>

              {activePoll ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-bold capitalize">
                      {activePoll.type.replace('_', ' ')} Question
                    </span>
                    <span className="text-xs text-[#6F6A60] font-medium">
                      {activePoll.totalVotes} Response{activePoll.totalVotes === 1 ? '' : 's'} Submitted
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#1B1B1B] leading-snug">{activePoll.question}</h3>

                  {/* MCQ Options */}
                  {activePoll.type === 'mcq' && activePoll.options && (
                    <div className="space-y-3">
                      {activePoll.options.map((option) => {
                        const isSelected = selectedPollOption === option.id;
                        const percentage =
                          activePoll.totalVotes > 0
                            ? Math.round((option.count / activePoll.totalVotes) * 100)
                            : 0;

                        return (
                          <div
                            key={option.id}
                            onClick={() => setSelectedPollOption(option.id)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                              isSelected
                                ? 'bg-[#FAF9F5] border-[#C76A2A] shadow-xs'
                                : 'bg-[#F6F4EE] border-[#E8E5DD] hover:border-[#1B1B1B]'
                            }`}
                          >
                            {/* Live Vote Progress Bar */}
                            <div
                              className="absolute left-0 top-0 bottom-0 bg-[#C76A2A]/10 transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />

                            <div className="relative z-10 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="poll-options"
                                  checked={isSelected}
                                  onChange={() => setSelectedPollOption(option.id)}
                                  className="accent-[#C76A2A]"
                                />
                                <span className="font-semibold text-[#1B1B1B]">{option.text}</span>
                              </div>

                              <span className="font-mono font-bold text-[#6F6A60]">
                                {option.count} ({percentage}%)
                              </span>
                            </div>
                          </div>
                        );
                      })}

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => selectedPollOption && handleSubmitPollResponse(activePoll.id, selectedPollOption)}
                          disabled={!selectedPollOption}
                          className="px-6 py-2 bg-[#1B1B1B] disabled:opacity-50 text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors"
                        >
                          Submit Vote
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Short Answer / Code Input */}
                  {activePoll.type === 'code' && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-[#1B1B1B] border border-[#E8E5DD] font-mono text-xs">
                        <textarea
                          rows={6}
                          value={codeSnippetInput}
                          onChange={(e) => setCodeSnippetInput(e.target.value)}
                          className="w-full bg-transparent text-emerald-400 outline-none resize-none"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleSubmitPollResponse(activePoll.id, codeSnippetInput)}
                          className="px-6 py-2 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors"
                        >
                          Submit Code Solution
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-[#6F6A60]">
                  No active poll currently. Waiting for faculty host to launch next question.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT 5 COLUMNS: AI TELEMETRY, DOUBTS & FACULTY CONTROLS */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tabs Bar */}
            <div className="p-1 rounded-2xl bg-white border border-[#E8E5DD] flex items-center justify-between text-xs font-semibold shadow-xs">
              <button
                onClick={() => setActiveTab('interactive')}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'interactive'
                    ? 'bg-[#1B1B1B] text-white'
                    : 'text-[#6F6A60] hover:text-[#1B1B1B]'
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>AI Telemetry</span>
              </button>
              <button
                onClick={() => setActiveTab('doubts')}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'doubts'
                    ? 'bg-[#1B1B1B] text-white'
                    : 'text-[#6F6A60] hover:text-[#1B1B1B]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Doubts ({activeRoom.doubts.length})</span>
              </button>
              {(currentUserRole === 'Faculty' || currentUserRole === 'TA' || currentUserRole === 'Admin') && (
                <button
                  onClick={() => setActiveTab('faculty_dashboard')}
                  className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'faculty_dashboard'
                      ? 'bg-[#1B1B1B] text-white'
                      : 'text-[#6F6A60] hover:text-[#1B1B1B]'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-[#C76A2A]" />
                  <span>Control</span>
                </button>
              )}
            </div>

            {/* TAB 1: AI TELEMETRY */}
            {activeTab === 'interactive' && (
              <div className="space-y-5">
                {/* Understanding Breakdown */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-3">
                    <h3 className="text-sm font-bold text-[#1B1B1B] flex items-center gap-2">
                      <BrainCircuit className="w-4 h-4 text-[#C76A2A]" />
                      <span>Real-Time AI Classroom Understanding</span>
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-[#2F7A45]/10 text-[#2F7A45] text-[10px] font-bold">
                      Telemetry Active
                    </span>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase block">Understood</span>
                      <span className="text-2xl font-bold text-emerald-700">{activeRoom.aiMetrics.understoodPct}%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                      <span className="text-[10px] font-bold text-amber-800 uppercase block">Partial</span>
                      <span className="text-2xl font-bold text-amber-700">{activeRoom.aiMetrics.partialPct}%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                      <span className="text-[10px] font-bold text-rose-800 uppercase block">Confused</span>
                      <span className="text-2xl font-bold text-rose-700">{activeRoom.aiMetrics.confusedPct}%</span>
                    </div>
                  </div>

                  {/* Detected Weak Concepts */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#1B1B1B] block">Detected Weak Concepts &amp; Gaps</span>
                    {activeRoom.aiMetrics.weakConcepts.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-xs space-y-1">
                        <div className="flex items-center justify-between font-semibold text-[#1B1B1B]">
                          <span>{item.concept}</span>
                          <span className="text-rose-700 font-mono">{item.percentage}% Confusion</span>
                        </div>
                        <p className="text-[11px] text-[#6F6A60]">{item.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Frequently Asked Questions */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] space-y-3 shadow-xs">
                  <h3 className="text-sm font-bold text-[#1B1B1B]">AI-Aggregated Class FAQs</h3>
                  {activeRoom.aiMetrics.faqs.map((faq, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] text-xs space-y-1">
                      <strong className="text-[#1B1B1B] block">Q: {faq.question}</strong>
                      <p className="text-[#6F6A60] text-[11px]">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: DOUBTS & ANONYMOUS QUESTIONS */}
            {activeTab === 'doubts' && (
              <div className="space-y-4">
                {/* Submit Doubt Form */}
                <form onSubmit={handleSubmitDoubt} className="p-4 rounded-2xl bg-white border border-[#E8E5DD] space-y-3 shadow-xs">
                  <h3 className="text-xs font-bold text-[#1B1B1B]">Ask a Doubt / Question</h3>
                  <textarea
                    rows={2}
                    value={doubtText}
                    onChange={(e) => setDoubtText(e.target.value)}
                    placeholder="Type your question for faculty or TAs..."
                    className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-xs text-[#1B1B1B] outline-none focus:border-[#C76A2A] resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#6F6A60] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="accent-[#C76A2A]"
                      />
                      <span>Ask Anonymously 🕵️</span>
                    </label>

                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#1B1B1B] text-white hover:bg-[#C76A2A] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Doubt</span>
                    </button>
                  </div>
                </form>

                {/* Doubts Feed */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {activeRoom.doubts.map((doubt) => (
                    <div key={doubt.id} className="p-4 rounded-2xl bg-white border border-[#E8E5DD] space-y-2 text-xs shadow-xs">
                      <div className="flex items-center justify-between text-[#6F6A60]">
                        <span className="font-semibold text-[#1B1B1B]">{doubt.authorName}</span>
                        <span className="text-[10px] font-mono">{doubt.timestamp}</span>
                      </div>

                      <p className="text-[#1B1B1B] font-medium leading-relaxed">{doubt.text}</p>

                      <div className="pt-2 flex items-center justify-between border-t border-[#E8E5DD]">
                        <button
                          onClick={() => upvoteDoubt(roomCode, doubt.id, currentStudentId)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
                            doubt.upvotedBy.includes(currentStudentId)
                              ? 'bg-[#C76A2A]/10 border-[#C76A2A] text-[#C76A2A]'
                              : 'bg-[#F6F4EE] border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{doubt.upvotes} Upvotes</span>
                        </button>

                        {doubt.isResolved ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/15 text-[#2F7A45] text-[11px] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Resolved by {doubt.resolvedBy || 'Faculty'}
                          </span>
                        ) : (
                          (currentUserRole === 'Faculty' || currentUserRole === 'TA') && (
                            <button
                              onClick={() => toggleResolveDoubt(roomCode, doubt.id)}
                              className="text-xs font-bold text-[#C76A2A] hover:underline"
                            >
                              Mark Resolved
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: FACULTY CONTROL DASHBOARD */}
            {activeTab === 'faculty_dashboard' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] space-y-4 shadow-xs">
                  <h3 className="text-sm font-bold text-[#1B1B1B] flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#C76A2A]" />
                    <span>Faculty Live Classroom Control Panel</span>
                  </h3>

                  {/* Attendance & Participation Summary */}
                  <div className="p-3.5 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] grid grid-cols-2 gap-2 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-[#6F6A60] font-semibold uppercase block">Attendance Rate</span>
                      <span className="text-xl font-bold text-[#2F7A45]">92% (48/52)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6F6A60] font-semibold uppercase block">Active Engagement</span>
                      <span className="text-xl font-bold text-[#C76A2A]">88 Score</span>
                    </div>
                  </div>

                  {/* Confusion Heatmap */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#1B1B1B] block">Lecture Timeline Confusion Heatmap</span>
                    <div className="h-6 rounded-xl bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 p-1 flex items-center justify-between text-[10px] font-mono text-white font-bold px-3">
                      <span>0m (Start)</span>
                      <span>20m (@Lazy Proxy)</span>
                      <span>40m (Actuator)</span>
                    </div>
                  </div>

                  {/* Raise Hand Queue */}
                  <div className="space-y-2 pt-2 border-t border-[#E8E5DD]">
                    <span className="text-xs font-bold text-[#1B1B1B] block">Hands Raised Queue</span>
                    {activeRoom.attendees.filter((a) => a.handRaised).length === 0 ? (
                      <p className="text-xs text-[#6F6A60]">No hands currently raised.</p>
                    ) : (
                      activeRoom.attendees
                        .filter((a) => a.handRaised)
                        .map((student) => (
                          <div key={student.id} className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs flex items-center justify-between">
                            <span className="font-semibold text-amber-900">{student.name} ({student.department})</span>
                            <button
                              onClick={() => toggleRaiseHand(roomCode, student.studentId)}
                              className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded font-bold hover:bg-amber-300"
                            >
                              Acknowledge
                            </button>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL: CREATE POLL FORM MODAL FOR FACULTY */}
      <AnimatePresence>
        {isCreatePollOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#E8E5DD] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 font-sans"
            >
              <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-3">
                <h2 className="text-base font-bold text-[#1B1B1B]">Create Live Interactive Poll</h2>
                <button onClick={() => setIsCreatePollOpen(false)} className="p-1 text-[#6F6A60]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreatePollSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Question Text</label>
                  <input
                    type="text"
                    required
                    value={newPollQuestion}
                    onChange={(e) => setNewPollQuestion(e.target.value)}
                    placeholder="e.g. What is the execution order of Spring Bean Lifecycle methods?"
                    className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Poll Format</label>
                  <select
                    value={newPollType}
                    onChange={(e) => setNewPollType(e.target.value as any)}
                    className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] outline-none"
                  >
                    <option value="mcq">Multiple Choice (MCQ)</option>
                    <option value="short_answer">Short Text Response</option>
                    <option value="code">Live Code Snippet Submission</option>
                  </select>
                </div>

                {newPollType === 'mcq' && (
                  <div className="space-y-2">
                    <label className="font-semibold text-[#1B1B1B] block">MCQ Options</label>
                    {newPollOptions.map((opt, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const updated = [...newPollOptions];
                          updated[idx] = e.target.value;
                          setNewPollOptions(updated);
                        }}
                        placeholder={`Option ${idx + 1}`}
                        className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] outline-none"
                      />
                    ))}
                  </div>
                )}

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatePollOpen(false)}
                    className="px-4 py-2 border border-[#E8E5DD] rounded-xl text-xs font-semibold text-[#6F6A60]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#1B1B1B] text-white hover:bg-[#C76A2A] rounded-xl text-xs font-semibold transition-colors"
                  >
                    Broadcast Poll
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PortalLayout>
  );
}
