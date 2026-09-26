'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Clock,
  Zap,
  Users,
  Award,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { CommunityChallenge, ChallengeCategory } from '../types';

interface ChallengesViewProps {
  challenges: CommunityChallenge[];
  onEnterChallenge: (c: CommunityChallenge) => void;
}

export function ChallengesView({ challenges, onEnterChallenge }: ChallengesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { label: 'All Challenges', value: 'All' },
    { label: 'Weekly Challenges', value: 'Weekly Challenge' },
    { label: 'Monthly Challenges', value: 'Monthly Challenge' },
    { label: 'Hackathons', value: 'Hackathon' },
    { label: 'Build Sprints', value: 'Build Sprint' },
    { label: 'Innovation Challenges', value: 'Innovation Challenge' },
  ];

  const filteredChallenges = selectedCategory === 'All'
    ? challenges
    : challenges.filter((c) => c.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter Chips */}
      <div className="bg-white rounded-2xl p-2 border border-[#E8E5DD] shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isSelected
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'text-[#575653] hover:text-[#1B1B1B] hover:bg-[#FAF8F5]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Challenges Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-white rounded-2xl p-5 border border-[#E8E5DD] hover:border-[#C76A2A] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#C76A2A]/10 text-[#C76A2A] border border-[#C76A2A]/20">
                  {challenge.category}
                </span>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[#787774] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {challenge.deadline}
                  </span>
                  <span className="font-bold text-[#C76A2A]">+{challenge.xpReward} XP</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-[#1B1B1B]">{challenge.title}</h3>
              <p className="text-xs text-[#575653] leading-relaxed">{challenge.description}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {challenge.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#FAF8F5] text-[#1B1B1B] border border-[#E8E5DD]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#F0ECE1]">
              <div className="text-[11px] font-mono text-[#787774]">
                Sponsor: <span className="font-bold text-[#1B1B1B]">{challenge.sponsor}</span> • {challenge.participantsCount} Builders Entered
              </div>

              <button
                onClick={() => onEnterChallenge(challenge)}
                className="py-2 px-3.5 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <span>Enter Challenge</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C76A2A]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
