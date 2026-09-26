'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FileCheck2,
  FolderGit2,
  GitBranch,
  Users,
  MessageSquare,
  Cpu,
  Trophy,
  Briefcase,
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export function MilestonesChecklist() {
  const MILESTONES_DATA = [
    { id: 'm-1', title: 'First Assessment', status: 'completed', date: 'Sept 02, 2025', badge: 'Java Core Eval (86%)', icon: FileCheck2 },
    { id: 'm-2', title: 'First Project', status: 'completed', date: 'Oct 14, 2025', badge: 'Inventory REST API', icon: FolderGit2 },
    { id: 'm-3', title: 'GitHub Connected', status: 'completed', date: 'Nov 01, 2025', badge: '@pratikbadiger069', icon: GitBranch },
    { id: 'm-4', title: 'First Team Project', status: 'completed', date: 'Jan 20, 2026', badge: 'SkillBridge Engine', icon: Users },
    { id: 'm-5', title: 'Community Contribution', status: 'completed', date: 'Mar 15, 2026', badge: '24 Code Reviews', icon: MessageSquare },
    { id: 'm-6', title: 'Skill Verification', status: 'completed', date: 'May 10, 2026', badge: 'Spring Boot REST', icon: Cpu },
    { id: 'm-7', title: 'Industry Challenge', status: 'completed', date: 'Jul 04, 2026', badge: 'Redis Rate Limiter', icon: Trophy },
    { id: 'm-8', title: 'Internship', status: 'completed', date: 'Aug 18, 2026', badge: 'Razorpay Backend Intern', icon: Briefcase },
    { id: 'm-9', title: 'Certification', status: 'completed', date: 'Sept 05, 2026', badge: 'AWS Developer Assoc.', icon: Award },
    { id: 'm-10', title: 'Placed', status: 'target', date: 'Target Q4 2026', badge: 'Tier-1 Product Placement', icon: ShieldCheck },
  ];

  const completedCount = MILESTONES_DATA.filter((m) => m.status === 'completed').length;
  const progressPct = Math.round((completedCount / MILESTONES_DATA.length) * 100);

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8E5DD] shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
        <div>
          <h2 className="text-base font-bold text-[#1B1B1B]">10 Key Capability Checkpoints</h2>
          <p className="text-xs text-[#575653]">Empirical milestones that define your engineering readiness.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-[#F0ECE1] rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="text-xs font-mono font-bold text-[#1B1B1B]">{progressPct}% ({completedCount}/10)</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {MILESTONES_DATA.map((item) => {
          const Icon = item.icon;
          const isDone = item.status === 'completed';
          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 transition-all ${
                isDone
                  ? 'bg-emerald-50/40 border-emerald-200 text-[#1B1B1B]'
                  : 'bg-[#FAF8F5] border-[#E8E5DD] text-[#787774]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-1.5 rounded-lg ${isDone ? 'bg-emerald-600 text-white' : 'bg-[#E8E5DD] text-[#787774]'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Clock className="w-4 h-4 text-[#A3A3A3]" />
                )}
              </div>

              <div>
                <span className="text-xs font-bold block truncate">{item.title}</span>
                <span className="text-[10px] font-mono block text-[#787774] mt-0.5">{item.badge}</span>
              </div>

              <div className="text-[10px] font-mono text-[#787774] pt-1 border-t border-[#E8E5DD]">
                {item.date}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
