'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileCheck2,
  GitBranch,
  FolderGit2,
  Zap,
  Target,
  Users2,
  Cpu,
  ChevronRight,
  X,
  CheckCircle2,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { StudentProfile, GitHubData } from '@/types';

interface InputDataTelemetryBarProps {
  studentProfile: StudentProfile;
  githubData?: GitHubData;
  builderScore: number;
}

export function InputDataTelemetryBar({
  studentProfile,
  githubData,
  builderScore,
}: InputDataTelemetryBarProps) {
  const [selectedTelemetry, setSelectedTelemetry] = useState<string | null>(null);

  const telemetryStreams = [
    {
      id: 'assessments',
      label: 'Assessments',
      icon: FileCheck2,
      value: '4 Passed (Avg 86%)',
      status: 'Active Sync',
      badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
      detailTitle: 'Verified Skill Assessments Telemetry',
      detailContent: [
        'Java Core Architecture Assessment — 86% (Passed)',
        'Data Structures & Algorithms Eval — 82% (Passed)',
        'REST API Design & HTTP Standards — 90% (Passed)',
        'Frontend Fundamentals (React/TS) — 84% (Passed)',
      ],
    },
    {
      id: 'github',
      label: 'GitHub Activity',
      icon: GitBranch,
      value: `${githubData?.recentCommitsCount || (githubData as any)?.summary?.totalCommitsLast30Days || 142} Commits • ${githubData?.repositories?.length || githubData?.publicRepos || 8} Repos`,
      status: 'Live Webhook',
      badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-200',
      detailTitle: 'GitHub Repository & Commit Velocity',
      detailContent: [
        `Active Username: @${githubData?.username || (studentProfile as any).githubUsername || (studentProfile as any).github || 'pratikbadiger'}`,
        `Commit Streak: ${githubData?.streakDays || (githubData as any)?.summary?.streakDays || 14} days straight`,
        `Top Language Detected: TypeScript (48%), Java (32%), Dockerfile (12%)`,
        `Latest Push: "Refactor Spring Security JWT authentication filter" (2 hours ago)`,
      ],
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: FolderGit2,
      value: '3 Verified Builds',
      status: 'Evaluated',
      badgeColor: 'bg-indigo-500/10 text-indigo-700 border-indigo-200',
      detailTitle: 'Verified Project Telemetry',
      detailContent: [
        'SkillBridge Mentorship Engine — Full-Stack (Grade: A+)',
        'Microservice Order Management API — Java Spring Boot (Grade: A)',
        'Personal Portfolio & Interactive Builder Passport (Grade: A)',
      ],
    },
    {
      id: 'score',
      label: 'Builder Score',
      icon: Zap,
      value: `${builderScore} Score (Top 8%)`,
      status: 'Verified Lvl 4',
      badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-200',
      detailTitle: 'Builder Score Metrics',
      detailContent: [
        `Current Overall Score: ${builderScore} / 1000`,
        'Code Quality Score: 92/100',
        'System Architecture Index: 84/100',
        'Consistency Score: 95/100',
      ],
    },
    {
      id: 'skills',
      label: 'Skills Matrix',
      icon: Cpu,
      value: '12 Evaluated Skills',
      status: 'Mapped',
      badgeColor: 'bg-purple-500/10 text-purple-700 border-purple-200',
      detailTitle: 'Evaluated Skill Telemetry',
      detailContent: [
        'Java (82%) — Strong Foundation',
        'Spring Boot (22%) — Critical Gap',
        'Docker (10%) — Severe Gap',
        'System Design (35%) — Developing',
      ],
    },
    {
      id: 'goals',
      label: 'Career Goals',
      icon: Target,
      value: studentProfile.careerPath || 'Backend Engineer',
      status: 'Active Target',
      badgeColor: 'bg-rose-500/10 text-rose-700 border-rose-200',
      detailTitle: 'Career Goal & Benchmark Target',
      detailContent: [
        `Primary Target Role: ${studentProfile.careerPath || 'Backend Engineer'}`,
        'Target Timeline: 4 Months to Job-Ready',
        'Target Tier: Product-based Companies & High-growth Startups',
        'Required Readiness Score: 85%+',
      ],
    },
    {
      id: 'community',
      label: 'Community Activity',
      icon: Users2,
      value: '24 PR Reviews • Lvl 3',
      status: 'Peer Sync',
      badgeColor: 'bg-teal-500/10 text-teal-700 border-teal-200',
      detailTitle: 'Community & Peer Collaboration',
      detailContent: [
        'Peer Code Reviews Completed: 24',
        'Hackathon Collaborations: 2',
        'Mentorship Questions Answered: 18',
        'Community Contribution Ranking: Top 5%',
      ],
    },
  ];

  const activeTelemetryData = telemetryStreams.find((t) => t.id === selectedTelemetry);

  return (
    <div className="w-full bg-[#1B1B1B] text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-[#2D2D2D] space-y-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2D2D2D] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#C76A2A]/20 border border-[#C76A2A]/40 text-[#F59E0B]">
            <Activity className="w-4 h-4 animate-pulse text-[#E07A5F]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-mono tracking-widest text-[#A3A3A3] uppercase">
                AI MENTOR INPUT DATA TELEMETRY
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                7 Data Streams Active
              </span>
            </div>
            <p className="text-xs text-[#D4D4D4] mt-0.5">
              Live data feeding your personalized Career Mentor engine
            </p>
          </div>
        </div>
        <div className="text-xs font-mono text-[#A3A3A3] flex items-center gap-2">
          <span>Synced: Just Now</span>
          <span className="text-[#404040]">|</span>
          <span className="text-[#C76A2A]">Real-Time Guidance Engine</span>
        </div>
      </div>

      {/* Grid of 7 Input Streams */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {telemetryStreams.map((stream) => {
          const Icon = stream.icon;
          return (
            <button
              key={stream.id}
              onClick={() => setSelectedTelemetry(stream.id)}
              className="flex flex-col p-2.5 rounded-xl bg-[#262626] hover:bg-[#333333] border border-[#3A3A3A] hover:border-[#C76A2A]/50 transition-all text-left group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="p-1.5 rounded-lg bg-[#1B1B1B] text-[#D4D4D4] group-hover:text-[#C76A2A] transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className={`px-1.5 py-0.5 text-[9px] font-medium rounded-md border ${stream.badgeColor}`}>
                  {stream.status}
                </span>
              </div>

              <div className="text-[11px] font-semibold text-[#E5E5E5] group-hover:text-white truncate">
                {stream.label}
              </div>
              <div className="text-[10px] text-[#A3A3A3] truncate mt-0.5 font-mono">
                {stream.value}
              </div>
            </button>
          );
        })}
      </div>

      {/* Telemetry Detail Modal */}
      <AnimatePresence>
        {selectedTelemetry && activeTelemetryData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-xl bg-[#262626] border border-[#C76A2A]/40 text-xs space-y-3 relative">
              <button
                onClick={() => setSelectedTelemetry(null)}
                className="absolute top-3 right-3 p-1 rounded-lg hover:bg-[#333333] text-[#A3A3A3] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[#E07A5F] font-semibold">
                <activeTelemetryData.icon className="w-4 h-4" />
                <span>{activeTelemetryData.detailTitle}</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-2 text-[#D4D4D4]">
                {activeTelemetryData.detailContent.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-[#1B1B1B] p-2 rounded-lg border border-[#333]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
