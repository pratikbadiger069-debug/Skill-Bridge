'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Zap,
  Award,
  Cpu,
  FolderGit2,
  CheckCircle2,
} from 'lucide-react';

export function ProgressMetricsView() {
  const METRICS = [
    {
      id: 'score',
      title: 'Builder Score Growth',
      start: '420 Pts',
      current: '885 Pts',
      gain: '+465 Pts Gain',
      pct: 88.5,
      icon: Zap,
      color: 'text-amber-600',
      barColor: 'bg-amber-500',
    },
    {
      id: 'xp',
      title: 'XP Growth',
      start: '200 XP',
      current: '1,450 XP',
      gain: '+1,250 XP Gain',
      pct: 82,
      icon: Award,
      color: 'text-purple-600',
      barColor: 'bg-purple-600',
    },
    {
      id: 'skill',
      title: 'Skill Growth',
      start: '3 Skills',
      current: '12 Mastered Skills',
      gain: '+9 Skills Added',
      pct: 75,
      icon: Cpu,
      color: 'text-blue-600',
      barColor: 'bg-blue-600',
    },
    {
      id: 'readiness',
      title: 'Career Readiness Growth',
      start: '35% Ready',
      current: '74% Ready',
      gain: '+39% Readiness Gain',
      pct: 74,
      icon: TrendingUp,
      color: 'text-emerald-600',
      barColor: 'bg-emerald-600',
    },
    {
      id: 'impact',
      title: 'Project Impact Growth',
      start: '45 / 100 Index',
      current: '94 / 100 Index',
      gain: '+49 Index Gain',
      pct: 94,
      icon: FolderGit2,
      color: 'text-[#C76A2A]',
      barColor: 'bg-[#C76A2A]',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8E5DD] shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
        <div>
          <h2 className="text-base font-bold text-[#1B1B1B]">Progress Metrics Trajectories</h2>
          <p className="text-xs text-[#575653]">Comparative growth analysis comparing day 1 starting values against today.</p>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
          Positive Trajectory
        </span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
        {METRICS.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.id} className="p-4 rounded-xl border border-[#E8E5DD] bg-[#FAF8F5] space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="p-1.5 rounded-lg bg-white border border-[#E8E5DD]">
                  <Icon className={`w-4 h-4 ${m.color}`} />
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  {m.gain}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-[#1B1B1B] block truncate">{m.title}</span>
                <div className="text-sm font-bold font-mono text-[#1B1B1B] mt-0.5">{m.current}</div>
                <span className="text-[10px] text-[#787774]">Started at: {m.start}</span>
              </div>

              <div className="w-full h-2 bg-[#E8E5DD] rounded-full overflow-hidden">
                <div className={`h-full ${m.barColor} rounded-full`} style={{ width: `${m.pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
