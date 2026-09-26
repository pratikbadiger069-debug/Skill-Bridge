'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Sparkles,
  CheckCircle2,
  UserPlus,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { BuilderTalent, TeamSearchRole } from '../types';

interface TeamFormationViewProps {
  talent: BuilderTalent[];
  onInviteTalent: (t: BuilderTalent) => void;
}

export function TeamFormationView({ talent, onInviteTalent }: TeamFormationViewProps) {
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<TeamSearchRole>('Find Developers');
  const [skillSearch, setSkillSearch] = useState('Java');

  const roleFilters: TeamSearchRole[] = [
    'Find Builders',
    'Find Designers',
    'Find Developers',
    'Find Researchers',
    'Find Founders',
  ];

  // Filter talent list by skill search or role
  const filteredTalent = talent.filter((t) => {
    if (!skillSearch.trim()) return true;
    return (
      t.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
      t.skills.some((s) => s.toLowerCase().includes(skillSearch.toLowerCase())) ||
      t.primaryRole.toLowerCase().includes(skillSearch.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header & Match Search */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#C76A2A]" />
              <h2 className="text-lg font-bold text-[#1B1B1B]">Team Formation & Builder Matching</h2>
            </div>
            <p className="text-xs text-[#575653] mt-0.5">
              Find co-builders, designers, developers, researchers, and founders based on verified capability & skill match.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#787774] absolute left-3 top-3" />
            <input
              type="text"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="Match skills (e.g. Java, Docker)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A] text-xs font-sans"
            />
          </div>
        </div>

        {/* 5 Search Role Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F0ECE1]">
          {roleFilters.map((role) => {
            const isSelected = selectedRoleFilter === role;
            return (
              <button
                key={role}
                onClick={() => setSelectedRoleFilter(role)}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#575653] border border-[#E8E5DD] hover:border-[#1B1B1B]'
                }`}
              >
                {role}
              </button>
            );
          })}
        </div>
      </div>

      {/* Talent Cards Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {filteredTalent.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl p-5 border border-[#E8E5DD] hover:border-[#C76A2A] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1B1B1B] text-white flex items-center justify-center font-bold text-xs font-mono shrink-0">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#1B1B1B]">{member.name}</h3>
                      <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-[#C76A2A]/10 text-[#C76A2A] font-bold">
                        {member.builderLevel}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#575653] mt-0.5">{member.primaryRole}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 block">
                    {member.matchedScore || 92}% Match
                  </span>
                  <span className="text-[10px] text-[#787774]">Reputation: {member.reputationScore}/100</span>
                </div>
              </div>

              <p className="text-xs text-[#575653] leading-relaxed">{member.bio}</p>

              {/* Skills Tags */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#787774] block uppercase">VERIFIED SKILLS:</span>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#FAF8F5] text-[#1B1B1B] border border-[#E8E5DD]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#F0ECE1]">
              <span className={`text-[11px] font-medium ${member.availableForTeams ? 'text-emerald-700' : 'text-[#787774]'}`}>
                {member.availableForTeams ? '✓ Available for Project Teams' : 'Currently in Active Team'}
              </span>

              <button
                onClick={() => onInviteTalent(member)}
                className="py-2 px-3.5 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#C76A2A]" />
                <span>Invite to Team</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
