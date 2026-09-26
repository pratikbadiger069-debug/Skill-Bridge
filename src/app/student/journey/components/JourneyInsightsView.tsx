'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Calendar,
  Zap,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
} from 'lucide-react';

export function JourneyInsightsView() {
  const INSIGHTS = [
    {
      title: 'Most Active Month',
      value: 'September 2026',
      desc: '68 commits pushed, 4 projects shipped, 2 hackathon sprints completed.',
      icon: Calendar,
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      title: 'Fastest Growth Period',
      value: 'Months 4 – 6',
      desc: '+240 Builder Score points added during the Spring Boot & Microservices build sprint.',
      icon: Zap,
      badgeColor: 'text-[#C76A2A] bg-[#C76A2A]/10 border-[#C76A2A]/30',
    },
    {
      title: 'Strongest Skill',
      value: 'Java Core & Architecture (88%)',
      desc: 'Top 5% score in cohort with 4 verified microservices repository evidences.',
      icon: CheckCircle2,
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Weakest Skill (Focus Area)',
      value: 'Docker Containerization (10%)',
      desc: 'Active gap roadmap assigned. Completing Docker Compose sprint will boost readiness by +12%.',
      icon: AlertTriangle,
      badgeColor: 'text-rose-700 bg-rose-50 border-rose-200',
    },
    {
      title: 'Most Impactful Project',
      value: 'SkillBridge Mentorship Engine',
      desc: 'Impact Score 94/100 • 142 commits • Verified by HOD Dr. Evelyn Vance.',
      icon: FolderGit2,
      badgeColor: 'text-purple-700 bg-purple-50 border-purple-200',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8E5DD] shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C76A2A]" />
          <h2 className="text-base font-bold text-[#1B1B1B]">5 Builder Journey Insights</h2>
        </div>
        <span className="text-xs font-mono text-[#787774]">AI Calculated</span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {INSIGHTS.map((insight, idx) => {
          const Icon = insight.icon;
          return (
            <div key={idx} className="p-4 rounded-xl border border-[#E8E5DD] bg-[#FAF8F5] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#787774] uppercase block">
                  {insight.title}
                </span>
                <Icon className="w-4 h-4 text-[#C76A2A]" />
              </div>

              <div className={`p-2 rounded-lg border text-xs font-bold ${insight.badgeColor}`}>
                {insight.value}
              </div>

              <p className="text-[11px] text-[#575653] leading-relaxed">{insight.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
