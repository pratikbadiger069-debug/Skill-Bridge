'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
  FileCheck2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { OpportunityItem } from '../types';

interface AIOpportunityInsightsViewProps {
  opportunity: OpportunityItem;
  onNavigateTab?: (tab: string) => void;
}

export function AIOpportunityInsightsView({
  opportunity,
  onNavigateTab,
}: AIOpportunityInsightsViewProps) {
  const m = opportunity.match;

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#1B1B1B] via-[#262626] to-[#1B1B1B] text-white rounded-2xl p-6 border border-[#2D2D2D] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3A3A3A] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#C76A2A]/20 border border-[#C76A2A]/40 text-[#E07A5F]">
              <Sparkles className="w-7 h-7 animate-pulse text-[#E07A5F]" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider block">
                AI OPPORTUNITY MATCH INSIGHTS & ROADMAP
              </span>
              <h2 className="text-xl font-bold text-white">{opportunity.title}</h2>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-2xl font-black font-mono text-emerald-400">
              {m.expectedReadinessGain}
            </div>
            <span className="text-xs text-[#A3A3A3]">Expected Target Improvement</span>
          </div>
        </div>

        <p className="text-xs text-[#D4D4D4] leading-relaxed">
          AI Diagnostic Roadmap designed to bridge your missing skill gaps and elevate your eligibility for {opportunity.organization} from {m.overallMatchScore}% to 98%+.
        </p>
      </div>

      {/* 5 AI Insight Pillars Grid */}
      <div className="space-y-5">
        {/* 1. Why Matched? */}
        <div className="bg-white rounded-2xl p-5 border border-emerald-200 bg-emerald-50/20 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 border-b border-emerald-100 pb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold">1. Why Are You Matched? ({m.overallMatchScore}% Match)</h3>
          </div>
          <p className="text-xs text-[#575653] leading-relaxed">
            Your telemetry matches {opportunity.organization}'s hiring criteria because of your verified Java base, 885 Builder Score, and active GitHub commit streak.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {m.matchedSkills.map((s, idx) => (
              <span key={idx} className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                ✓ {s}
              </span>
            ))}
          </div>
        </div>

        {/* 2. What Skills Are Missing? */}
        <div className="bg-white rounded-2xl p-5 border border-amber-200 bg-amber-50/20 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-800 border-b border-amber-100 pb-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold">2. What Skills Are Missing?</h3>
          </div>
          <div className="space-y-2 text-xs text-[#575653]">
            {m.missingSkills.map((s, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-bold text-[#1B1B1B]">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. What Projects Should Be Built? */}
        <div className="bg-white rounded-2xl p-5 border border-purple-200 bg-purple-50/20 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-purple-800 border-b border-purple-100 pb-2">
            <FolderGit2 className="w-5 h-5 text-purple-600" />
            <h3 className="text-sm font-bold">3. What Projects Should Be Built? (+7% Match Gain)</h3>
          </div>
          <div className="space-y-2 text-xs text-[#575653]">
            {m.recommendedProjectsToBuild.map((proj, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-purple-200">
                <span className="font-bold text-[#1B1B1B]">{proj}</span>
                <span className="text-xs font-bold text-purple-700">Build Project →</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. What Assessments Should Be Completed? */}
        <div className="bg-white rounded-2xl p-5 border border-blue-200 bg-blue-50/20 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-blue-800 border-b border-blue-100 pb-2">
            <FileCheck2 className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold">4. What Assessments Should Be Completed? (+4% Match Gain)</h3>
          </div>
          <div className="space-y-2 text-xs text-[#575653]">
            {m.recommendedAssessmentsToTake.map((test, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-blue-200">
                <span className="font-bold text-[#1B1B1B]">{test}</span>
                <span className="text-xs font-bold text-blue-700">Take Assessment →</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Expected Readiness Improvement */}
        <div className="bg-[#1B1B1B] text-white rounded-2xl p-5 border border-[#2D2D2D] shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#A3A3A3] uppercase block">5. EXPECTED READINESS IMPROVEMENT</span>
            <div className="text-base font-bold text-white">{m.expectedReadinessGain}</div>
          </div>
          <button
            onClick={() => onNavigateTab && onNavigateTab('tracker')}
            className="py-2.5 px-4 rounded-xl bg-[#C76A2A] hover:bg-[#b05b22] text-white text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <span>Track Application Progress</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
