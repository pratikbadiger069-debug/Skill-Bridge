'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  ShieldCheck,
  Zap,
  FolderGit2,
  GitBranch,
  FileCheck2,
  Award,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { RecruiterBuilderCard } from '../types';

interface RecruiterDiscoveryViewProps {
  builders: RecruiterBuilderCard[];
}

export function RecruiterDiscoveryView({ builders }: RecruiterDiscoveryViewProps) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#1B1B1B] text-white rounded-2xl p-6 border border-[#2D2D2D] shadow-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#C76A2A]/20 border border-[#C76A2A]/40 text-[#E07A5F]">
            <ShieldCheck className="w-7 h-7 text-[#E07A5F]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">Recruiter Discovery & Talent Pipeline</h2>
              <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-full bg-emerald-600 text-white">
                5 Telemetry Dimensions
              </span>
            </div>
            <p className="text-xs text-[#D4D4D4] mt-1">
              Top tech recruiters discover verified student builders based on 5 verified criteria: Builder Score, Projects, GitHub, Assessments, and Community Contributions.
            </p>
          </div>
        </div>
      </div>

      {/* 5 Recruiter Evaluation Criteria Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
        <div className="bg-white p-3 rounded-xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] font-mono text-[#787774] block">1. BUILDER SCORE</span>
          <span className="font-bold text-[#1B1B1B] font-mono">0 - 1000 Pts</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] font-mono text-[#787774] block">2. VERIFIED PROJECTS</span>
          <span className="font-bold text-emerald-700 font-mono">Build Proof</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] font-mono text-[#787774] block">3. GITHUB TELEMETRY</span>
          <span className="font-bold text-blue-700 font-mono">Commit Velocity</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] font-mono text-[#787774] block">4. ASSESSMENTS</span>
          <span className="font-bold text-purple-700 font-mono">Verified Tests</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E8E5DD] space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-mono text-[#787774] block">5. COMMUNITY</span>
          <span className="font-bold text-amber-700 font-mono">PR Reviews</span>
        </div>
      </div>

      {/* Recruiter View Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#1B1B1B]">Recruiter Talent Shortlist Preview</h3>

        <div className="space-y-3">
          {builders.map((builder) => (
            <div
              key={builder.id}
              className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0ECE1] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1B1B1B] text-white flex items-center justify-center font-bold text-xs font-mono shrink-0">
                    {builder.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#1B1B1B]">{builder.name}</h4>
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#C76A2A]/10 text-[#C76A2A] font-bold">
                        {builder.role}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#787774]">Status: {builder.status}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold">
                    {builder.matchScoreForRole}% Candidate Match
                  </span>
                </div>
              </div>

              {/* 5 Telemetry Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono text-[#575653]">
                <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E5DD]">
                  <span className="text-[9px] text-[#787774] block">BUILDER SCORE</span>
                  <span className="font-bold text-[#1B1B1B]">{builder.builderScore} / 1000</span>
                </div>

                <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E5DD]">
                  <span className="text-[9px] text-[#787774] block">PROJECTS</span>
                  <span className="font-bold text-emerald-700">{builder.verifiedProjectsCount} Verified</span>
                </div>

                <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E5DD]">
                  <span className="text-[9px] text-[#787774] block">COMMITS</span>
                  <span className="font-bold text-blue-700">{builder.commitsCount} Commits</span>
                </div>

                <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E5DD]">
                  <span className="text-[9px] text-[#787774] block">ASSESSMENTS</span>
                  <span className="font-bold text-purple-700">{builder.passedAssessmentsCount} Passed</span>
                </div>

                <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E5DD]">
                  <span className="text-[9px] text-[#787774] block">COMMUNITY</span>
                  <span className="font-bold text-amber-700">{builder.communityContributionsCount} PR Reviews</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {builder.skills.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#FAF8F5] text-[#1B1B1B] border border-[#E8E5DD]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
