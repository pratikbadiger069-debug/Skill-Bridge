'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Users,
  Calendar,
  Trophy,
  Heart,
  TrendingUp,
} from 'lucide-react';
import { ZeroReputationProfile } from '../types';

interface ReputationXPViewProps {
  reputation: ZeroReputationProfile;
}

export function ReputationXPView({ reputation }: ReputationXPViewProps) {
  const REPUTATION_GAUGES = [
    { label: 'Builder Reputation', score: reputation.builderReputation, max: 100, color: 'bg-emerald-600', desc: 'Verified code builds & static architecture audits' },
    { label: 'Mentor Reputation', score: reputation.mentorReputation, max: 100, color: 'bg-purple-600', desc: 'Peer review ratings & mentee guidance feedback' },
    { label: 'Community Impact', score: reputation.communityImpact, max: 100, color: 'bg-blue-600', desc: 'Open source contributions & public project stars' },
    { label: 'Contribution Score', score: reputation.contributionScore, max: 2000, color: 'bg-amber-600', desc: 'Aggregate telemetry points from commits & PRs' },
    { label: 'Trust Score', score: reputation.trustScore, max: 100, color: 'bg-emerald-600', desc: 'Empirical identity & zero plagiarism audit score' },
  ];

  const XP_RULES = [
    { action: 'Helping Others', xp: '+45 XP', desc: 'Answering technical questions & providing peer code reviews' },
    { action: 'Mentoring Juniors', xp: '+60 XP', desc: 'Hosting 1-on-1 office hours & architecture guidance' },
    { action: 'Project Contributions', xp: '+80 XP', desc: 'Shipping verified open-source feature PRs' },
    { action: 'Community Events', xp: '+30 XP', desc: 'Attending & presenting at tech talks and workshops' },
    { action: 'Challenge Participation', xp: '+100 XP', desc: 'Submitting functional builds to weekly & sprint challenges' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Verified Contributions Only Notice */}
      <div className="bg-[#1B1B1B] text-white rounded-2xl p-6 border border-[#2D2D2D] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3A3A3A] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <ShieldCheck className="w-8 h-8 animate-pulse text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider block">
                VERIFIED CONTRIBUTION ENGINE
              </span>
              <h2 className="text-xl font-bold text-white">Reputation & Community XP System</h2>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-black font-mono text-emerald-400">
              {reputation.communityXp} XP
            </div>
            <span className="text-xs text-[#A3A3A3] font-mono">Community Level 4</span>
          </div>
        </div>

        <p className="text-xs text-[#D4D4D4] leading-relaxed">
          Community XP is strictly awarded for <strong>Verified Contributions Only</strong>. Unearned vanity metrics (likes, self-promotions) are disabled in favor of peer reviews, verified PR commits, and mentor evaluations.
        </p>
      </div>

      {/* 5 Reputation System Gauges */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-[#1B1B1B]">5 Core Reputation System Gauges</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {REPUTATION_GAUGES.map((g, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 border border-[#E8E5DD] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1B1B1B]">{g.label}</span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  {g.score} {g.max === 2000 ? 'Pts' : '/ 100'}
                </span>
              </div>
              <div className="w-full h-2 bg-[#F0ECE1] rounded-full overflow-hidden">
                <div className={`h-full ${g.color} rounded-full`} style={{ width: `${Math.min((g.score / g.max) * 100, 100)}%` }} />
              </div>
              <p className="text-[11px] text-[#575653]">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Community XP Award Rules */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#C76A2A]" />
            <h3 className="text-sm font-bold text-[#1B1B1B]">Community XP Reward Rules</h3>
          </div>
          <span className="text-xs font-mono text-emerald-700 font-bold">Automated Verification</span>
        </div>

        <div className="space-y-2.5">
          {XP_RULES.map((rule, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[#1B1B1B] block">{rule.action}</span>
                <span className="text-[11px] text-[#575653]">{rule.desc}</span>
              </div>
              <span className="px-3 py-1 font-mono font-bold rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                {rule.xp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
