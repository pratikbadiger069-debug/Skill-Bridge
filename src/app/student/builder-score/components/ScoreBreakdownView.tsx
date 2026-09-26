'use client';

import React, { useState } from 'react';
import {
  Award,
  FolderGit2,
  GitCommit,
  Trophy,
  MessageSquare,
  Activity,
  ChevronRight,
  Info,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { BuilderScoreCategoryBreakdown } from '@/lib/builder-score-engine';

interface ScoreBreakdownViewProps {
  breakdown: BuilderScoreCategoryBreakdown[];
  onSelectCategory: (category: BuilderScoreCategoryBreakdown) => void;
}

export const ScoreBreakdownView: React.FC<ScoreBreakdownViewProps> = ({ breakdown, onSelectCategory }) => {
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Assessments':
        return Award;
      case 'Projects':
        return FolderGit2;
      case 'GitHub':
        return GitCommit;
      case 'Challenges':
        return Trophy;
      case 'Communication':
        return MessageSquare;
      case 'Consistency':
        return Activity;
      default:
        return Award;
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">Deterministic 6-Dimensional Category Weighting</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            1000 Total Points distributed across verified technical factors. Click any category for detailed math breakdown.
          </p>
        </div>
      </div>

      {/* 6 Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {breakdown.map((item) => {
          const Icon = getCategoryIcon(item.category);
          return (
            <div
              key={item.category}
              onClick={() => onSelectCategory(item)}
              className="p-6 rounded-3xl bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-4 cursor-pointer flex flex-col justify-between shadow-xs group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-[#1B1B1B]/5 text-[#1B1B1B] flex items-center justify-center font-bold group-hover:bg-[#1B1B1B] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1B1B1B]">{item.category}</h3>
                      <span className="text-[10px] font-mono text-[#6F6A60]">
                        Weight: {item.weightPct}% ({item.maxPoints} pts)
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-[#6F6A60] group-hover:text-[#1B1B1B] group-hover:translate-x-0.5 transition-all" />
                </div>

                {/* Big Score Number */}
                <div className="flex items-baseline gap-1.5 pt-1">
                  <span className="text-3xl font-extrabold font-mono text-[#1B1B1B]">
                    {item.earnedPoints}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#6F6A60]">/ {item.maxPoints} pts</span>
                  <span className="ml-auto text-xs font-mono font-bold text-[#2F7A45]">
                    {item.scorePercentage}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-[#E8E5DD] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C76A2A] rounded-full transition-all duration-300"
                    style={{ width: `${item.scorePercentage}%` }}
                  />
                </div>
              </div>

              {/* Factors Summary List */}
              <div className="pt-3 border-t border-[#E8E5DD] space-y-1.5 text-xs">
                <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Key Determinants:</span>
                {item.factors.slice(0, 2).map((f, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px]">
                    <span className="text-[#1B1B1B] font-medium truncate max-w-[170px]">{f.name}</span>
                    <span className="font-mono text-[#2F7A45] font-bold">+{f.impactPoints}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
