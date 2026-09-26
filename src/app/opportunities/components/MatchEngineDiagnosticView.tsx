'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  Code2,
  FolderGit2,
  GitBranch,
  FileCheck2,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { OpportunityItem } from '../types';

interface MatchEngineDiagnosticViewProps {
  opportunity: OpportunityItem;
  onOpenInsights: (opp: OpportunityItem) => void;
}

export function MatchEngineDiagnosticView({
  opportunity,
  onOpenInsights,
}: MatchEngineDiagnosticViewProps) {
  const m = opportunity.match;

  const ALIGNMENT_CRITERIA = [
    { label: 'Overall Match Score', score: m.overallMatchScore, max: 100, icon: Zap, color: 'bg-emerald-600', status: `${m.overallMatchScore}% Qualified` },
    { label: 'Career Readiness Score', score: m.readinessScore, max: 100, icon: CheckCircle2, color: 'bg-emerald-600', status: `${m.readinessScore}% Job Ready` },
    { label: 'Skill Alignment', score: m.skillAlignmentPct, max: 100, icon: Code2, color: 'bg-blue-600', status: `${m.skillAlignmentPct}% Match` },
    { label: 'Project Alignment', score: m.projectAlignmentPct, max: 100, icon: FolderGit2, color: 'bg-purple-600', status: `${m.projectAlignmentPct}% Matched Projects` },
    { label: 'GitHub Alignment', score: m.githubAlignmentPct, max: 100, icon: GitBranch, color: 'bg-indigo-600', status: `${m.githubAlignmentPct}% Telemetry Match` },
    { label: 'Assessment Alignment', score: m.assessmentAlignmentPct, max: 100, icon: FileCheck2, color: 'bg-amber-600', status: `${m.assessmentAlignmentPct}% Tests Passed` },
    { label: 'Builder Score Alignment', score: m.builderScoreAlignmentPct, max: 100, icon: Award, color: 'bg-emerald-600', status: `Score 885 / 850 Req` },
  ];

  return (
    <div className="space-y-6">
      {/* Target Opportunity Header */}
      <div className="bg-[#1B1B1B] text-white rounded-2xl p-6 border border-[#2D2D2D] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3A3A3A] pb-4">
          <div>
            <span className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider block">
              TARGET OPPORTUNITY MATCH DIAGNOSTIC
            </span>
            <h2 className="text-xl font-bold text-white mt-1">{opportunity.title}</h2>
            <p className="text-xs text-[#D4D4D4] mt-0.5">{opportunity.organization} • {opportunity.compensation}</p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-3xl font-black font-mono text-emerald-400">
              {m.overallMatchScore}%
            </div>
            <span className="text-xs text-[#A3A3A3]">Overall Match Index</span>
          </div>
        </div>

        {/* Example Callout Box from Prompt: Google STEP Match 87% */}
        <div className="p-4 rounded-xl bg-[#262626] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white">Missing Skill Deficits Identified:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {m.missingSkills.map((s, idx) => (
                <span key={idx} className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  ⚠️ {s}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => onOpenInsights(opportunity)}
            className="py-2.5 px-4 rounded-xl bg-[#C76A2A] hover:bg-[#b05b22] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shrink-0 shadow-md"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>Improve Match Rating</span>
          </button>
        </div>
      </div>

      {/* 7 Alignment Criteria Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-[#1B1B1B]">7 Alignment Engine Calculators</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {ALIGNMENT_CRITERIA.map((crit, idx) => {
            const Icon = crit.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-4 border border-[#E8E5DD] shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#FAF8F5] text-[#1B1B1B]">
                      <Icon className="w-4 h-4 text-[#C76A2A]" />
                    </div>
                    <span className="text-xs font-bold text-[#1B1B1B]">{crit.label}</span>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {crit.status}
                  </span>
                </div>

                <div className="w-full h-2.5 bg-[#F0ECE1] rounded-full overflow-hidden">
                  <div className={`h-full ${crit.color} rounded-full`} style={{ width: `${crit.score}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
