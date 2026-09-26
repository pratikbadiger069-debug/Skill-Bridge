'use client';

import React from 'react';
import { ShieldCheck, Award, TrendingUp, Sparkles, AlertCircle, Info } from 'lucide-react';
import { getBuilderLevel } from '@/lib/builder-score-engine';

interface ScoreHeaderProps {
  score: number; // e.g. 890
  rank: number; // e.g. 4
}

export const ScoreHeader: React.FC<ScoreHeaderProps> = ({ score, rank }) => {
  const levelTier = getBuilderLevel(score);
  const percentOfMax = Math.round((score / 1000) * 100);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-0.5 rounded-full bg-[#1B1B1B] text-white text-xs font-bold font-mono uppercase tracking-wider">
              ZERO × SkillBridge Trust OS
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Deterministic &amp; Auditable Formula
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight">
            Builder Score Diagnostic
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6A60] max-w-2xl leading-relaxed">
            Your Builder Score measures actual technical capability — verified code, proctored assessments, and merged open-source PRs. No popularity, no attendance, no activity spam.
          </p>
        </div>

        {/* Big Score Gauge Box */}
        <div className="p-6 bg-[#FAF9F5] rounded-3xl border border-[#E8E5DD] flex items-center gap-6 shrink-0 shadow-2xs">
          <div className="space-y-1 text-center sm:text-right">
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Current Score</span>
            <div className="flex items-baseline justify-center sm:justify-end gap-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-[#1B1B1B]">
                {score}
              </span>
              <span className="text-sm font-mono font-bold text-[#6F6A60]">/ 1000</span>
            </div>

            <div className="pt-1 flex items-center justify-center sm:justify-end gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${levelTier.badgeColor}`}>
                Lvl {levelTier.level}: {levelTier.title}
              </span>
              <span className="text-[10px] font-mono text-[#2F7A45] font-bold">
                Rank #{rank}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar & Transparency Guarantee */}
      <div className="space-y-2 pt-2 border-t border-[#E8E5DD]">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-[#1B1B1B]">Overall Capability Completion</span>
          <span className="font-mono text-[#C76A2A]">{percentOfMax}% of 1000 Max Score</span>
        </div>

        <div className="w-full h-3 bg-[#E8E5DD] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1B1B1B] via-[#C76A2A] to-[#2F7A45] rounded-full transition-all duration-500"
            style={{ width: `${percentOfMax}%` }}
          />
        </div>
      </div>
    </div>
  );
};
