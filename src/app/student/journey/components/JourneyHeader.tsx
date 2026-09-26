'use client';

import React from 'react';
import {
  Compass,
  Sparkles,
  Award,
  Download,
  TrendingUp,
  Zap,
  BookOpen,
} from 'lucide-react';

interface JourneyHeaderProps {
  onExport: () => void;
}

export function JourneyHeader({ onExport }: JourneyHeaderProps) {
  return (
    <div className="bg-[#1B1B1B] text-white rounded-2xl p-6 sm:p-8 border border-[#2D2D2D] shadow-xl space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#3A3A3A] pb-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-[#C76A2A]/20 border border-[#C76A2A]/40 text-[#E07A5F]">
            <Compass className="w-8 h-8 animate-pulse text-[#E07A5F]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">Builder Journey</h1>
              <span className="px-3 py-0.5 text-xs font-mono font-semibold rounded-full bg-[#C76A2A] text-white flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-white" />
                Personal Growth Story
              </span>
            </div>
            <p className="text-xs text-[#D4D4D4] mt-1">
              Track your growth from learner to industry-ready builder. Every commit, assessment, and project build shapes your capability story.
            </p>
          </div>
        </div>

        <button
          onClick={onExport}
          className="py-2.5 px-4 rounded-xl bg-[#C76A2A] hover:bg-[#b05b22] text-white text-xs font-bold flex items-center gap-2 transition-colors shrink-0 shadow-md"
        >
          <Download className="w-4 h-4" />
          <span>Export Builder Story</span>
        </button>
      </div>

      {/* Story Quote Accent */}
      <div className="p-3 rounded-xl bg-[#262626] border border-[#3A3A3A] text-xs text-[#D4D4D4] flex items-center justify-between font-mono">
        <span>"You are 74% of the way from Learner to Industry Ready Builder."</span>
        <span className="text-[#C76A2A] font-bold">14-Month Growth Narrative</span>
      </div>
    </div>
  );
}
