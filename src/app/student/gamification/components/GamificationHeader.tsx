'use client';

import React from 'react';
import { ShieldCheck, Award, Zap, Sparkles, TrendingUp } from 'lucide-react';
import { getLevelInfo } from '@/lib/xp-engine';

interface GamificationHeaderProps {
  totalXP: number;
}

export const GamificationHeader: React.FC<GamificationHeaderProps> = ({ totalXP }) => {
  const levelInfo = getLevelInfo(totalXP);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-0.5 rounded-full bg-[#1B1B1B] text-white text-xs font-bold font-mono uppercase tracking-wider">
              XP &amp; Capability Gamification OS
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified XP Only • Zero Spam Policy
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight">
            Builder Progression Engine
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6A60] max-w-2xl leading-relaxed">
            Gamification designed for intrinsic motivation, not addiction. XP is strictly awarded for verified technical output, proctored assessments, and open-source contributions.
          </p>
        </div>

        {/* Big XP & Level Badge Box */}
        <div className="p-6 bg-[#FAF9F5] rounded-3xl border border-[#E8E5DD] flex items-center gap-6 shrink-0 shadow-2xs">
          <div className="space-y-1 text-center sm:text-right">
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Current Verified XP</span>
            <div className="flex items-baseline justify-center sm:justify-end gap-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-[#1B1B1B]">
                {totalXP.toLocaleString()}
              </span>
              <span className="text-sm font-mono font-bold text-[#C76A2A]">XP</span>
            </div>

            <div className="pt-1 flex items-center justify-center sm:justify-end gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#1B1B1B] text-white text-[10px] font-bold font-mono">
                Level {levelInfo.level}: {levelInfo.title}
              </span>
              <span className="text-[10px] font-mono text-[#2F7A45] font-bold">
                Rank #{levelInfo.rank}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Area */}
      <div className="space-y-2 pt-2 border-t border-[#E8E5DD] text-xs">
        <div className="flex justify-between items-center font-bold">
          <span className="text-[#1B1B1B]">
            Level {levelInfo.level} Progress ({levelInfo.currentLevelProgress} / {levelInfo.nextLevelXP} XP)
          </span>
          <span className="font-mono text-[#C76A2A]">
            {levelInfo.percentToNext}% to Next Level ({levelInfo.xpRemaining} XP needed)
          </span>
        </div>

        <div className="w-full h-3 bg-[#E8E5DD] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1B1B1B] via-[#C76A2A] to-[#2F7A45] rounded-full transition-all duration-300"
            style={{ width: `${levelInfo.percentToNext}%` }}
          />
        </div>
      </div>
    </div>
  );
};
