'use client';

import React from 'react';
import {
  Users2,
  Zap,
  ShieldCheck,
  Award,
  Plus,
  TrendingUp,
  HeartOff,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { ZeroReputationProfile } from '../types';

interface CommunityHeaderProps {
  reputation: ZeroReputationProfile;
  onPostUpdate: () => void;
}

export function CommunityHeader({
  reputation,
  onPostUpdate,
}: CommunityHeaderProps) {
  return (
    <div className="bg-[#1B1B1B] text-white rounded-2xl p-5 sm:p-6 border border-[#2D2D2D] shadow-xl space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#3A3A3A] pb-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-[#C76A2A]/20 border border-[#C76A2A]/40 text-[#E07A5F]">
            <Users2 className="w-7 h-7 animate-pulse text-[#E07A5F]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">ZERO Community</h1>
              <span className="px-2.5 py-0.5 text-xs font-mono font-semibold rounded-full bg-[#C76A2A] text-white flex items-center gap-1">
                <Zap className="w-3 h-3 fill-white" />
                Builder Ecosystem
              </span>
            </div>
            <p className="text-xs text-[#D4D4D4] mt-1">
              University innovation ecosystem focused exclusively on engineering progress & capability proof. No Likes — interactions are verified Appreciations, Endorsements & Peer Reviews.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onPostUpdate}
            className="py-2.5 px-4 rounded-xl bg-[#C76A2A] hover:bg-[#b05b22] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Share Builder Progress</span>
          </button>
        </div>
      </div>

      {/* 5 Reputation Gauges Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
        <div className="bg-[#262626] p-2.5 rounded-xl border border-[#3A3A3A]">
          <span className="text-[10px] text-[#A3A3A3] font-mono block">BUILDER REPUTATION</span>
          <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
            {reputation.builderReputation} / 100
          </div>
        </div>

        <div className="bg-[#262626] p-2.5 rounded-xl border border-[#3A3A3A]">
          <span className="text-[10px] text-[#A3A3A3] font-mono block">MENTOR REPUTATION</span>
          <div className="text-base font-bold text-purple-400 font-mono mt-0.5">
            {reputation.mentorReputation} / 100
          </div>
        </div>

        <div className="bg-[#262626] p-2.5 rounded-xl border border-[#3A3A3A]">
          <span className="text-[10px] text-[#A3A3A3] font-mono block">COMMUNITY IMPACT</span>
          <div className="text-base font-bold text-blue-400 font-mono mt-0.5">
            {reputation.communityImpact} / 100
          </div>
        </div>

        <div className="bg-[#262626] p-2.5 rounded-xl border border-[#3A3A3A]">
          <span className="text-[10px] text-[#A3A3A3] font-mono block">CONTRIBUTION SCORE</span>
          <div className="text-base font-bold text-amber-400 font-mono mt-0.5">
            {reputation.contributionScore} Pts
          </div>
        </div>

        <div className="bg-[#262626] p-2.5 rounded-xl border border-[#3A3A3A] col-span-2 sm:col-span-1">
          <span className="text-[10px] text-[#A3A3A3] font-mono block">TRUST SCORE</span>
          <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
            {reputation.trustScore}% Verified
          </div>
        </div>
      </div>
    </div>
  );
}
