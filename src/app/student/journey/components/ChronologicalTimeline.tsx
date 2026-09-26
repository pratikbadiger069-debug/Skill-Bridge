'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileCheck2,
  FolderGit2,
  Trophy,
  Calendar,
  GitBranch,
  BookOpen,
  Briefcase,
  Award,
  ChevronDown,
} from 'lucide-react';

export function ChronologicalTimeline() {
  const [filter, setFilter] = useState<string>('All');

  const TIMELINE_EVENTS = [
    {
      id: 'e-1',
      date: 'Sept 24, 2026',
      type: 'Achievement Unlocked',
      icon: Award,
      title: 'Unlocked "Top Code Reviewer" Badge',
      description: 'Completed 24 verified peer code reviews with >4.8/5 community feedback rating.',
      xp: '+150 XP',
      color: 'border-emerald-200 bg-emerald-50/30',
    },
    {
      id: 'e-2',
      date: 'Sept 22, 2026',
      type: 'Opportunity Applied',
      icon: Briefcase,
      title: 'Applied to Google STEP Software Engineering Intern 2026',
      description: 'Application matched with 87% Readiness Index. Resume & Builder Passport attached.',
      xp: '+50 XP',
      color: 'border-blue-200 bg-blue-50/30',
    },
    {
      id: 'e-3',
      date: 'Sept 21, 2026',
      type: 'Mentorship Session',
      icon: BookOpen,
      title: '1-on-1 System Design Strategy with Dr. Evelyn Vance',
      description: 'Discussed Redis rate-limiting Lua script concurrency & database sharding trade-offs.',
      xp: '+60 XP',
      color: 'border-purple-200 bg-purple-50/30',
    },
    {
      id: 'e-4',
      date: 'Sept 18, 2026',
      type: 'GitHub Milestone',
      icon: GitBranch,
      title: 'Passed 140 Commits & 14-Day Commit Streak',
      description: 'GitHub Webhook Telemetry synced 8 active production repos to Builder Passport.',
      xp: '+80 XP',
      color: 'border-indigo-200 bg-indigo-50/30',
    },
    {
      id: 'e-5',
      date: 'Sept 15, 2026',
      type: 'Hackathon Joined',
      icon: Trophy,
      title: '1st Place Win at National AI Builder Sprint 2026',
      description: 'Co-authored multi-agent CRDT collaborative workflow engine with LangGraph.',
      xp: '+300 XP',
      color: 'border-amber-200 bg-amber-50/30',
    },
    {
      id: 'e-6',
      date: 'Sept 01, 2026',
      type: 'Project Created',
      icon: FolderGit2,
      title: 'Created "Distributed Event-Driven Order Processing API"',
      description: 'Spring Boot 3 + Kafka microservice with PostgreSQL sharded database.',
      xp: '+120 XP',
      color: 'border-[#C76A2A]/30 bg-[#C76A2A]/5',
    },
    {
      id: 'e-7',
      date: 'Aug 25, 2026',
      type: 'Assessment Completed',
      icon: FileCheck2,
      title: 'Passed Spring Boot REST Architecture Quiz (86%)',
      description: 'Verified Spring IoC `@Autowired` annotations & JPA `@Query` optimization.',
      xp: '+45 XP',
      color: 'border-emerald-200 bg-emerald-50/30',
    },
    {
      id: 'e-8',
      date: 'Aug 15, 2026',
      type: 'Community Event',
      icon: Calendar,
      title: 'Attended Tech Talk on Distributed System Sharding',
      description: 'Interactive session hosted by HOD Dr. Evelyn Vance at HITAM Auditorium.',
      xp: '+30 XP',
      color: 'border-[#E8E5DD] bg-[#FAF8F5]',
    },
  ];

  const categories = [
    'All',
    'Assessment Completed',
    'Project Created',
    'Hackathon Joined',
    'Community Event',
    'GitHub Milestone',
    'Mentorship Session',
    'Opportunity Applied',
    'Achievement Unlocked',
  ];

  const filteredEvents = filter === 'All'
    ? TIMELINE_EVENTS
    : TIMELINE_EVENTS.filter((e) => e.type === filter);

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8E5DD] shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F0ECE1] pb-3 gap-2">
        <div>
          <h2 className="text-base font-bold text-[#1B1B1B]">Chronological Builder Growth Feed</h2>
          <p className="text-xs text-[#575653]">A complete timeline of your actions, submissions, and achievements.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                filter === cat
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#575653] hover:bg-[#E8E5DD]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Timeline Feed */}
      <div className="space-y-3 relative pl-4 border-l-2 border-[#F0ECE1] ml-2">
        {filteredEvents.map((ev) => {
          const Icon = ev.icon;
          return (
            <div key={ev.id} className="relative space-y-1">
              {/* Bullet Node */}
              <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#1B1B1B] border-2 border-white ring-2 ring-[#E8E5DD]" />

              <div className={`p-4 rounded-xl border ${ev.color} space-y-1 text-xs transition-all`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#C76A2A]" />
                    <span className="font-bold text-[#1B1B1B]">{ev.title}</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-[#E8E5DD]">
                    {ev.xp}
                  </span>
                </div>

                <p className="text-[#575653] leading-relaxed">{ev.description}</p>

                <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-[#787774]">
                  <span>Category: {ev.type}</span>
                  <span>{ev.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
