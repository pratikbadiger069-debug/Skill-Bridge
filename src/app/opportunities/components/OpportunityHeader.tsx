'use client';

import React from 'react';
import {
  Briefcase,
  Zap,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Target,
  ShieldCheck,
} from 'lucide-react';

interface OpportunityHeaderProps {
  readinessScore: number;
  qualifiedCount: number;
  onOpenMatchEngine: () => void;
}

export function OpportunityHeader({
  readinessScore,
  qualifiedCount,
  onOpenMatchEngine,
}: OpportunityHeaderProps) {
  return (
    <div className="bg-[#1B1B1B] text-white rounded-2xl p-5 sm:p-6 border border-[#2D2D2D] shadow-xl space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#3A3A3A] pb-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-[#C76A2A]/20 border border-[#C76A2A]/40 text-[#E07A5F]">
            <Briefcase className="w-7 h-7 animate-pulse text-[#E07A5F]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Opportunities Hub</h1>
              <span className="px-2.5 py-0.5 text-xs font-mono font-semibold rounded-full bg-[#C76A2A] text-white flex items-center gap-1">
                <Zap className="w-3 h-3 fill-white" />
                Skill-to-Opportunity Engine
              </span>
            </div>
            <p className="text-xs text-[#D4D4D4] mt-1">
              Not a traditional job board. Powered by live telemetry to match you with opportunities you are actually qualified for (80%+ Match) and provide AI Roadmaps for stretch targets.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenMatchEngine}
            className="py-2.5 px-4 rounded-xl bg-[#C76A2A] hover:bg-[#b05b22] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>Match Engine Diagnostic</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Gauges Bar */}
      <div className="grid sm:grid-cols-3 gap-3 text-xs pt-1">
        <div className="bg-[#262626] p-3 rounded-xl border border-emerald-500/30 flex items-center gap-2.5">
          <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold text-white block">Career Readiness: {readinessScore}%</span>
            <span className="text-[11px] text-[#A3A3A3]">+8% Gain This Month</span>
          </div>
        </div>

        <div className="bg-[#262626] p-3 rounded-xl border border-blue-500/30 flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
          <div>
            <span className="font-bold text-white block">{qualifiedCount} Qualified Matches</span>
            <span className="text-[11px] text-[#A3A3A3]">80%+ Match Rating</span>
          </div>
        </div>

        <div className="bg-[#262626] p-3 rounded-xl border border-amber-500/30 flex items-center gap-2.5">
          <Target className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold text-white block">AI Gap Roadmap</span>
            <span className="text-[11px] text-[#A3A3A3]">Automated Eligibility Boost</span>
          </div>
        </div>
      </div>
    </div>
  );
}
