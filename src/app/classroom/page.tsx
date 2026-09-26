'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useSmartClassroomStore, RoomType, UserClassroomRole } from '@/lib/smart-classroom-store';
import {
  Video,
  Plus,
  LogIn,
  Users,
  Sparkles,
  QrCode,
  Copy,
  Check,
  Play,
  Clock,
  CheckCircle2,
  BrainCircuit,
  BarChart3,
  FileText,
  Shield,
  GraduationCap,
  ChevronRight,
  X,
  ExternalLink,
  Search,
  BookOpen,
  Filter,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SmartClassroomHubPage() {
  const router = useRouter();
  const {
    rooms,
    createRoom,
    joinRoom,
    currentUserRole,
    setCurrentUserRole,
  } = useSmartClassroomStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Create Form State
  const [createTitle, setCreateTitle] = useState('');
  const [createSubject, setCreateSubject] = useState('');
  const [createDepartment, setCreateDepartment] = useState('CSE');
  const [createType, setCreateType] = useState<RoomType>('Live Classroom');
  const [createFaculty, setCreateFaculty] = useState('Dr. Ramesh Sharma');
  const [createCode, setCreateCode] = useState('JAVA-3A-2026');

  // Join Form State
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [studentName, setStudentName] = useState('Manutej Reddy');
  const [studentId, setStudentId] = useState('HITAM-CSE-2023-042');
  const [studentEmail, setStudentEmail] = useState('manutej@hitam.edu');
  const [studentDept, setStudentDept] = useState('CSE');
  const [joinError, setJoinError] = useState<string | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const handleCopy = (text: string, type: 'code' | 'link') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    } else {
      setCopiedLink(text);
      setTimeout(() => setCopiedLink(null), 2000);
    }
  };

  const handleCreateRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTitle || !createSubject) return;

    const generatedCode = createCode.toUpperCase().trim() || `CLASS-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRoom = createRoom({
      code: generatedCode,
      title: createTitle,
      subject: createSubject,
      department: createDepartment,
      type: createType,
      facultyName: createFaculty,
      taNames: ['Ananya Sen'],
      status: 'live',
      uniqueLink: `https://skillbridge.edu/classroom/${generatedCode}`,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://skillbridge.edu/classroom/${generatedCode}`,
    });

    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    setIsCreateModalOpen(false);
    router.push(`/classroom/${newRoom.code}`);
  };

  const handleJoinRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinError(null);
    if (!joinCodeInput) {
      setJoinError('Please enter a room code or link');
      return;
    }

    const cleanedCode = joinCodeInput.replace(/.*\/classroom\//, '').trim().toUpperCase();
    const success = joinRoom(cleanedCode, {
      studentId: studentId || 'st-default',
      name: studentName || 'Student',
      email: studentEmail || 'student@hitam.edu',
      department: studentDept || 'CSE',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    });

    if (success) {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
      setIsJoinModalOpen(false);
      router.push(`/classroom/${cleanedCode}`);
    } else {
      setJoinError(`Room code "${cleanedCode}" not found. Please verify the code.`);
    }
  };

  const filteredRooms = rooms.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.facultyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || r.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const liveRooms = filteredRooms.filter((r) => r.status === 'live');
  const upcomingRooms = filteredRooms.filter((r) => r.status === 'upcoming');

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1200px] mx-auto pb-16 font-sans text-[#1B1B1B]">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E8E5DD]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C76A2A] bg-[#C76A2A]/10 px-2.5 py-0.5 rounded-full">
                Smart Classroom OS
              </span>
              <span className="text-xs text-[#6F6A60]">Real-Time Interactive Learning</span>
            </div>
            <h1 className="text-3xl font-bold text-[#1B1B1B] tracking-tight">
              Intelligent Classrooms &amp; Live Labs
            </h1>
            <p className="text-xs text-[#6F6A60] mt-1 max-w-2xl leading-relaxed">
              Interactive classroom operating system with real-time AI understanding telemetry, MCQ polls, doubt upvoting, confusion heatmaps, and post-class AI notes.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* User Role Switcher */}
            <div className="p-1 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center text-xs font-semibold">
              {(['Faculty', 'Student', 'TA', 'Admin'] as UserClassroomRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => setCurrentUserRole(role)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    currentUserRole === role
                      ? 'bg-[#1B1B1B] text-white shadow-xs'
                      : 'text-[#6F6A60] hover:text-[#1B1B1B]'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* CTAs */}
            <button
              onClick={() => setIsJoinModalOpen(true)}
              className="px-4 py-2.5 bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] text-[#1B1B1B] font-semibold rounded-xl text-xs transition-colors flex items-center gap-2 shadow-xs"
            >
              <LogIn className="w-4 h-4 text-[#C76A2A]" />
              <span>Join Class via Code</span>
            </button>

            {(currentUserRole === 'Faculty' || currentUserRole === 'Admin' || currentUserRole === 'TA') && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2.5 bg-[#1B1B1B] text-white hover:bg-[#C76A2A] font-semibold rounded-xl text-xs transition-colors flex items-center gap-2 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create Smart Room</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#6F6A60] font-medium block">Active Classrooms</span>
              <span className="text-2xl font-bold text-[#1B1B1B] mt-1 block">{liveRooms.length} Live</span>
            </div>
            <div className="p-3 rounded-xl bg-[#2F7A45]/10 text-[#2F7A45]">
              <Video className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#6F6A60] font-medium block">Avg Real-Time AI Understanding</span>
              <span className="text-2xl font-bold text-[#1B1B1B] mt-1 block">82%</span>
            </div>
            <div className="p-3 rounded-xl bg-[#C76A2A]/10 text-[#C76A2A]">
              <BrainCircuit className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#6F6A60] font-medium block">Active Participants</span>
              <span className="text-2xl font-bold text-[#1B1B1B] mt-1 block">84 Students</span>
            </div>
            <div className="p-3 rounded-xl bg-[#1B1B1B]/5 text-[#1B1B1B]">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#6F6A60] font-medium block">Classroom Analytics</span>
              <Link href="/classroom/analytics" className="text-xs font-bold text-[#C76A2A] hover:underline mt-1 block flex items-center gap-1">
                <span>View Insights</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-[#1B1B1B]">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-white border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#6F6A60] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by classroom title, code, subject, or faculty..."
              className="w-full pl-9 pr-3 py-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-xs text-[#1B1B1B] outline-none focus:border-[#C76A2A]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#6F6A60]" />
            <span className="text-xs font-semibold text-[#6F6A60]">Filter:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-xs font-semibold text-[#1B1B1B] outline-none"
            >
              <option value="all">All Room Types</option>
              <option value="Live Classroom">Live Classroom</option>
              <option value="Lab Session">Lab Session</option>
              <option value="Workshop">Workshop</option>
              <option value="Discussion Session">Discussion Session</option>
              <option value="Project Review Session">Project Review Session</option>
            </select>
          </div>
        </div>

        {/* Live Classrooms Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2F7A45] animate-ping" />
              <h2 className="text-lg font-bold text-[#1B1B1B]">Live Classrooms &amp; Active Labs</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold">
                {liveRooms.length} Session{liveRooms.length === 1 ? '' : 's'} Active
              </span>
            </div>
          </div>

          {liveRooms.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white border border-[#E8E5DD]">
              <Video className="w-8 h-8 text-[#6F6A60] mx-auto mb-2 opacity-50" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">No Live Classrooms Active Right Now</h3>
              <p className="text-xs text-[#6F6A60] mt-1">Create a room or join via code to start interactive learning.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {liveRooms.map((room) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-5 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[11px] font-mono font-bold">
                            {room.code}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F5] border border-[#E8E5DD] text-[#6F6A60] text-[11px] font-semibold">
                            {room.type}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md bg-[#C76A2A]/10 text-[#C76A2A] text-[11px] font-bold">
                            {room.department}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[#1B1B1B] leading-snug">{room.title}</h3>
                        <p className="text-xs text-[#6F6A60] mt-0.5 font-medium">{room.subject}</p>
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-[#2F7A45]/15 text-[#2F7A45] text-xs font-bold flex items-center gap-1.5 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2F7A45] animate-pulse" />
                        LIVE NOW
                      </span>
                    </div>

                    {/* Room Quick Data */}
                    <div className="p-3 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-[#6F6A60] block font-semibold uppercase">Attendees</span>
                        <span className="font-bold text-[#1B1B1B]">{room.attendeesCount} Present</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#6F6A60] block font-semibold uppercase">AI Understood</span>
                        <span className="font-bold text-[#2F7A45]">{room.aiMetrics.understoodPct}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#6F6A60] block font-semibold uppercase">Active Polls</span>
                        <span className="font-bold text-[#C76A2A]">{room.polls.length} Polls</span>
                      </div>
                    </div>

                    {/* Faculty Info & Links */}
                    <div className="flex items-center justify-between text-xs text-[#6F6A60]">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#1B1B1B]">Faculty: {room.facultyName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(room.code, 'code')}
                          className="px-2 py-1 bg-white border border-[#E8E5DD] rounded-lg hover:border-[#1B1B1B] text-[11px] font-semibold text-[#1B1B1B] flex items-center gap-1"
                        >
                          {copiedCode === room.code ? <Check className="w-3 h-3 text-[#2F7A45]" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedCode === room.code ? 'Copied' : 'Code'}</span>
                        </button>
                        <button
                          onClick={() => handleCopy(room.uniqueLink, 'link')}
                          className="px-2 py-1 bg-white border border-[#E8E5DD] rounded-lg hover:border-[#1B1B1B] text-[11px] font-semibold text-[#1B1B1B] flex items-center gap-1"
                        >
                          {copiedLink === room.uniqueLink ? <Check className="w-3 h-3 text-[#2F7A45]" /> : <ExternalLink className="w-3 h-3" />}
                          <span>{copiedLink === room.uniqueLink ? 'Copied' : 'Link'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Join / Launch Button */}
                  <div className="pt-2 border-t border-[#E8E5DD] flex items-center justify-between gap-3">
                    <Link
                      href={`/classroom/${room.code}/report`}
                      className="text-xs font-semibold text-[#6F6A60] hover:text-[#1B1B1B] flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#C76A2A]" />
                      <span>Post-Class AI Report</span>
                    </Link>

                    <Link
                      href={`/classroom/${room.code}`}
                      className="px-5 py-2.5 bg-[#1B1B1B] text-white hover:bg-[#C76A2A] rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Enter Smart Room</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Sessions Grid */}
        {upcomingRooms.length > 0 && (
          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-bold text-[#1B1B1B]">Scheduled &amp; Upcoming Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingRooms.map((room) => (
                <div key={room.id} className="p-5 rounded-2xl bg-white border border-[#E8E5DD] flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-[#FAF9F5] border border-[#E8E5DD] text-[11px] font-mono font-bold">
                        {room.code}
                      </span>
                      <span className="text-xs font-semibold text-[#6F6A60]">{room.scheduledTime}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#1B1B1B]">{room.title}</h3>
                    <p className="text-xs text-[#6F6A60] mt-0.5">{room.facultyName} • {room.department}</p>
                  </div>

                  <Link
                    href={`/classroom/${room.code}`}
                    className="px-4 py-2 bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#1B1B1B] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Room Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: FACULTY ROOM CREATION MODAL */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#E8E5DD] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 font-sans"
            >
              <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
                <div>
                  <h2 className="text-lg font-bold text-[#1B1B1B]">Create Smart Classroom Room</h2>
                  <p className="text-xs text-[#6F6A60]">Generates unique room code, QR code, and AI telemetry telemetry engine.</p>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-1.5 rounded-lg text-[#6F6A60] hover:bg-[#F6F4EE]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateRoomSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Classroom Session Title</label>
                  <input
                    type="text"
                    required
                    value={createTitle}
                    onChange={(e) => setCreateTitle(e.target.value)}
                    placeholder="e.g. Distributed Systems & Microservices Deep Dive"
                    className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] outline-none focus:border-[#C76A2A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1">Subject / Topic</label>
                    <input
                      type="text"
                      required
                      value={createSubject}
                      onChange={(e) => setCreateSubject(e.target.value)}
                      placeholder="e.g. Java Spring Boot"
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] outline-none focus:border-[#C76A2A]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1">Department</label>
                    <select
                      value={createDepartment}
                      onChange={(e) => setCreateDepartment(e.target.value)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] outline-none"
                    >
                      <option value="CSE">CSE (Computer Science)</option>
                      <option value="IT">IT (Information Technology)</option>
                      <option value="AIML">AIML (Artificial Intelligence)</option>
                      <option value="ECE">ECE (Electronics &amp; Comm)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1">Room Type</label>
                    <select
                      value={createType}
                      onChange={(e) => setCreateType(e.target.value as RoomType)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] outline-none"
                    >
                      <option value="Live Classroom">Live Classroom</option>
                      <option value="Lab Session">Lab Session</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Discussion Session">Discussion Session</option>
                      <option value="Project Review Session">Project Review Session</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1">Room Code (Auto-Generated)</label>
                    <input
                      type="text"
                      value={createCode}
                      onChange={(e) => setCreateCode(e.target.value.toUpperCase())}
                      placeholder="e.g. JAVA-3A-2026"
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl font-mono font-bold text-[#1B1B1B] outline-none focus:border-[#C76A2A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Faculty Host Name</label>
                  <input
                    type="text"
                    value={createFaculty}
                    onChange={(e) => setCreateFaculty(e.target.value)}
                    className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] outline-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1B1B1B]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
                    <span>Auto-Generated Join Artifacts</span>
                  </div>
                  <p className="text-[11px] text-[#6F6A60]">
                    Direct Link: <code className="font-mono text-[#1B1B1B]">https://skillbridge.edu/classroom/{createCode || 'JAVA-3A-2026'}</code>
                  </p>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 border border-[#E8E5DD] rounded-xl text-xs font-semibold text-[#6F6A60]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#1B1B1B] text-white hover:bg-[#C76A2A] transition-colors rounded-xl text-xs font-semibold"
                  >
                    Launch Live Room
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: STUDENT JOIN ROOM MODAL */}
      <AnimatePresence>
        {isJoinModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#E8E5DD] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 font-sans"
            >
              <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
                <div>
                  <h2 className="text-lg font-bold text-[#1B1B1B]">Join Smart Classroom</h2>
                  <p className="text-xs text-[#6F6A60]">Enter your classroom code or paste unique join link.</p>
                </div>
                <button
                  onClick={() => setIsJoinModalOpen(false)}
                  className="p-1.5 rounded-lg text-[#6F6A60] hover:bg-[#F6F4EE]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {joinError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
                  {joinError}
                </div>
              )}

              <form onSubmit={handleJoinRoomSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Classroom Code or Link</label>
                  <input
                    type="text"
                    required
                    value={joinCodeInput}
                    onChange={(e) => setJoinCodeInput(e.target.value)}
                    placeholder="e.g. JAVA-3A-2026 or link"
                    className="w-full p-3 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-base font-mono font-bold text-[#1B1B1B] outline-none focus:border-[#C76A2A] uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1">Student Name</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1">Student ID / Roll No</label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsJoinModalOpen(false)}
                    className="px-4 py-2 border border-[#E8E5DD] rounded-xl text-xs font-semibold text-[#6F6A60]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#1B1B1B] text-white hover:bg-[#C76A2A] transition-colors rounded-xl text-xs font-semibold flex items-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Join Class</span>
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
