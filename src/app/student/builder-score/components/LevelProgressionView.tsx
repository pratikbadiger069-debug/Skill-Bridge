'use client';

import React from 'react';
import { Award, CheckCircle2, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { BUILDER_SCORE_LEVELS, getBuilderLevel } from '@/lib/builder-score-engine';

interface LevelProgressionViewProps {
  score: number;
}

export const LevelProgressionView: React.FC<LevelProgressionViewProps> = ({ score }) => {
  const currentLevel = getBuilderLevel(score);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">7-Tier Builder Capability Progression</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Clear milestone thresholds mapped directly to enterprise job readiness and recruiter visibility filters.
          </p>
        </div>
      </div>

      {/* 7 Levels Timeline List */}
      <div className="space-y-3">
        {BUILDER_SCORE_LEVELS.map((tier) => {
          const isCurrent = currentLevel.level === tier.level;
          const isUnlocked = score >= tier.minScore;

          return (
            <div
              key={tier.level}
              className={`p-6 rounded-3xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isCurrent
                  ? 'bg-white border-[#1B1B1B] shadow-md ring-2 ring-[#1B1B1B]/10'
                  : isUnlocked
                  ? 'bg-white border-[#E8E5DD]'
                  : 'bg-[#FAF9F5] border-[#E8E5DD] opacity-75'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${tier.badgeColor}`}>
                    Level {tier.level}: {tier.title}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#6F6A60]">
                    Score: {tier.minScore} – {tier.maxScore} pts
                  </span>
                  {isCurrent && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-[10px] font-bold uppercase font-mono">
                      Current Tier
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#6F6A60] leading-relaxed">{tier.description}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {isUnlocked ? (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2F7A45] font-mono bg-[#2F7A45]/10 px-3 py-1.5 rounded-xl">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Unlocked</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#6F6A60] font-mono bg-[#E8E5DD] px-3 py-1.5 rounded-xl">
                    <Lock className="w-4 h-4" />
                    <span>{tier.minScore - score} pts needed</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
