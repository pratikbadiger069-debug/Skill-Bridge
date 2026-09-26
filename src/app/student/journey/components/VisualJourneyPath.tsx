'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  FolderGit2,
  Users,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

export function VisualJourneyPath() {
  const STAGES = [
    {
      id: 'start',
      name: 'Start',
      status: 'completed',
      date: 'Aug 2025',
      icon: Sparkles,
      desc: 'Enrolled in SkillBridge OS & initialized student profile',
      color: 'bg-emerald-600 border-emerald-500 text-white',
    },
    {
      id: 'learner',
      name: 'Learner',
      status: 'completed',
      date: 'Oct 2025',
      icon: BookOpen,
      desc: 'Passed first Java Core assessment & completed fundamental quests',
      color: 'bg-emerald-600 border-emerald-500 text-white',
    },
    {
      id: 'builder',
      name: 'Builder',
      status: 'completed',
      date: 'Jan 2026',
      icon: FolderGit2,
      desc: 'Connected GitHub, built 3 verified repos, reached 700 Builder Score',
      color: 'bg-emerald-600 border-emerald-500 text-white',
    },
    {
      id: 'contributor',
      name: 'Contributor',
      status: 'completed',
      date: 'Apr 2026',
      icon: Users,
      desc: 'Participated in open-source PRs & performed 24 peer code reviews',
      color: 'bg-emerald-600 border-emerald-500 text-white',
    },
    {
      id: 'leader',
      name: 'Leader',
      status: 'active',
      date: 'Active Now',
      icon: Award,
      desc: 'Mentoring junior builders & leading distributed system sprint teams',
      color: 'bg-[#C76A2A] border-[#C76A2A] text-white ring-4 ring-[#C76A2A]/20 shadow-lg',
    },
    {
      id: 'industry-ready',
      name: 'Industry Ready',
      status: 'target',
      date: 'Target Q4 2026',
      icon: ShieldCheck,
      desc: 'Complete placement verification & tier-1 product engineer onboarding',
      color: 'bg-[#FAF8F5] border-[#DCD6C9] text-[#787774]',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8E5DD] shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
        <div>
          <h2 className="text-base font-bold text-[#1B1B1B]">Visual Growth Path</h2>
          <p className="text-xs text-[#575653]">Your progression milestone from day 1 to placement ready.</p>
        </div>
        <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-[#C76A2A]/10 text-[#C76A2A] border border-[#C76A2A]/20">
          Stage 5 of 6: Leader
        </span>
      </div>

      {/* Visual Progression Nodes (Horizontal for Desktop, Vertical for Mobile) */}
      <div className="relative">
        {/* Horizontal Connecting Line */}
        <div className="hidden lg:block absolute top-6 left-8 right-8 h-1 bg-[#F0ECE1] -z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div key={stage.id} className="flex flex-col items-center text-center space-y-2 group">
                <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${stage.color}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xs font-bold text-[#1B1B1B]">{stage.name}</span>
                    {stage.status === 'completed' && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-[#787774] block">{stage.date}</span>
                </div>

                <p className="text-[11px] text-[#575653] leading-tight px-1">
                  {stage.desc}
                </p>

                {idx < STAGES.length - 1 && (
                  <div className="lg:hidden text-[#787774] pt-1">
                    <ChevronDown className="w-4 h-4 mx-auto" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
