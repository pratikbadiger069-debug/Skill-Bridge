'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Zap,
  ShieldCheck,
  FolderGit2,
  GitCommit,
  BookOpen,
  CheckCircle2,
  Star,
  Users,
} from 'lucide-react';
import { ZeroReputationProfile } from '../types';

interface ZeroProfileViewProps {
  reputation: ZeroReputationProfile;
}

export function ZeroProfileView({ reputation }: ZeroProfileViewProps) {
  return (
    <div className="space-y-6">
      {/* ZERO Profile Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#E8E5DD] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0ECE1] pb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#1B1B1B] text-white flex items-center justify-center font-bold text-xl font-mono shadow-md">
              PB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#1B1B1B]">Pratik Badiger</h2>
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-full bg-[#C76A2A]/10 text-[#C76A2A]">
                  Elite Builder • Lvl 4
                </span>
              </div>
              <p className="text-xs text-[#575653] mt-0.5">
                Lead Systems Architect • @pratikbadiger069 • HITAM Department of CSE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#787774]">
            <div className="text-center">
              <div className="text-lg font-bold text-emerald-700">{reputation.builderReputation}/100</div>
              <span className="text-[10px]">Builder Rep</span>
            </div>
            <div className="text-center border-l border-[#E8E5DD] pl-4">
              <div className="text-lg font-bold text-blue-700">{reputation.communityImpact}/100</div>
              <span className="text-[10px]">Impact Index</span>
            </div>
          </div>
        </div>

        {/* 6 Profile Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs pt-1">
          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD]">
            <span className="text-[10px] text-[#787774] font-medium block">BUILDER REPUTATION</span>
            <div className="text-sm font-bold text-emerald-700 mt-0.5 font-mono">{reputation.builderReputation} / 100</div>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD]">
            <span className="text-[10px] text-[#787774] font-medium block">COMMUNITY IMPACT</span>
            <div className="text-sm font-bold text-blue-700 mt-0.5 font-mono">{reputation.communityImpact} / 100</div>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD]">
            <span className="text-[10px] text-[#787774] font-medium block">CONTRIBUTIONS</span>
            <div className="text-sm font-bold text-amber-700 mt-0.5 font-mono">{reputation.contributionScore} Pts</div>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD]">
            <span className="text-[10px] text-[#787774] font-medium block">TRUST SCORE</span>
            <div className="text-sm font-bold text-emerald-700 mt-0.5 font-mono">{reputation.trustScore}% Verified</div>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD]">
            <span className="text-[10px] text-[#787774] font-medium block">PROJECTS</span>
            <div className="text-sm font-bold text-[#1B1B1B] mt-0.5 font-mono">8 Verified</div>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD]">
            <span className="text-[10px] text-[#787774] font-medium block">MENTOR SESSIONS</span>
            <div className="text-sm font-bold text-purple-700 mt-0.5 font-mono">14 Hosted</div>
          </div>
        </div>
      </div>

      {/* Row 2: Achievements & Mentorship History */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Unlocked Achievements */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C76A2A]" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Unlocked Community Badges</h3>
            </div>
            <span className="text-xs font-mono text-[#787774]">3 Badges Verified</span>
          </div>

          <div className="space-y-2.5">
            {reputation.unlockedBadges.map((badge, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#1B1B1B] block">{badge.title}</span>
                  <span className="text-[10px] text-[#787774]">{badge.category} Category</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 font-bold">{badge.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mentorship History */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Mentorship History</h3>
            </div>
            <span className="text-xs font-mono text-[#787774]">Avg Rating: 5.0 ⭐</span>
          </div>

          <div className="space-y-2.5">
            {reputation.mentorshipHistory.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1B1B1B]">{item.sessionTitle}</span>
                  <span className="text-[10px] font-mono text-amber-600 font-bold">5.0 ⭐</span>
                </div>
                <div className="text-[11px] text-[#575653]">Mentee: {item.menteeName} • {item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
