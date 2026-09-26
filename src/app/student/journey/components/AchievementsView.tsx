'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Trophy,
  Zap,
} from 'lucide-react';

export function AchievementsView() {
  const ACHIEVEMENTS_DATA = [
    {
      id: 'ach-1',
      title: 'Top Code Reviewer',
      date: 'Sept 20, 2026',
      description: 'Completed 24 verified peer code reviews with >4.8/5 community feedback rating.',
      verificationStatus: 'Faculty & Peer Verified',
      xpEarned: 150,
      icon: Award,
      badgeColor: 'bg-[#C76A2A]/10 text-[#C76A2A] border-[#C76A2A]/30',
    },
    {
      id: 'ach-2',
      title: 'Hackathon Champion',
      date: 'Sept 15, 2026',
      description: '1st Place Winner in National AI Builder Sprint 2026 out of 110 competing teams.',
      verificationStatus: 'Official Sponsor Verified',
      xpEarned: 300,
      icon: Trophy,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: 'ach-3',
      title: 'Verified Mentor Seal',
      date: 'Sept 10, 2026',
      description: 'Hosted 10+ junior office hours sessions covering Java Spring Boot architecture.',
      verificationStatus: 'HOD Certified',
      xpEarned: 200,
      icon: ShieldCheck,
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    },
    {
      id: 'ach-4',
      title: 'Architecture Specialist',
      date: 'Aug 28, 2026',
      description: 'Built & deployed sub-5ms Redis Token Bucket Rate Limiting Gateway.',
      verificationStatus: 'SonarLint Audit Verified',
      xpEarned: 250,
      icon: Zap,
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8E5DD] shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
        <div>
          <h2 className="text-base font-bold text-[#1B1B1B]">Verified Capability Achievements</h2>
          <p className="text-xs text-[#575653]">Credentials earned through code builds, hackathons, and community contributions.</p>
        </div>
        <span className="text-xs font-mono font-bold text-[#1B1B1B]">4 Badges Earned</span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {ACHIEVEMENTS_DATA.map((ach) => {
          const Icon = ach.icon;
          return (
            <div
              key={ach.id}
              className="p-4 rounded-xl border border-[#E8E5DD] bg-[#FAF8F5] space-y-3 hover:border-[#C76A2A] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#1B1B1B] text-white">
                    <Icon className="w-4 h-4 text-[#C76A2A]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1B1B1B]">{ach.title}</h3>
                    <span className="text-[10px] font-mono text-[#787774]">{ach.date}</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-emerald-600 text-white shadow-xs">
                  +{ach.xpEarned} XP
                </span>
              </div>

              <p className="text-xs text-[#575653] leading-relaxed">{ach.description}</p>

              <div className="pt-2 border-t border-[#E8E5DD] flex items-center justify-between text-[11px]">
                <span className={`px-2 py-0.5 rounded font-semibold border ${ach.badgeColor}`}>
                  ✓ {ach.verificationStatus}
                </span>
                <span className="text-emerald-700 font-bold">Verified Credentials</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
