'use client';

import React, { useState } from 'react';
import { Trophy, ShieldCheck, Search, Award, Users } from 'lucide-react';
import { LeaderboardUser } from '@/lib/xp-engine';

interface VerifiedLeaderboardViewProps {
  leaderboardUsers: LeaderboardUser[];
}

export const VerifiedLeaderboardView: React.FC<VerifiedLeaderboardViewProps> = ({ leaderboardUsers }) => {
  const [scope, setScope] = useState<'Global' | 'Department' | 'Year' | 'Class' | 'Community'>('Global');
  const [search, setSearch] = useState('');

  const filtered = leaderboardUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 text-xs">
      {/* Scope Selector Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#C76A2A]" />
            <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold font-mono">
              Strictly Verified XP Only
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#1B1B1B] mt-1">Institutional Leaderboards</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Ranked purely by faculty-verified code repositories, proctored assessments, and merged pull requests.
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto font-bold">
          {['Global', 'Department', 'Year', 'Class', 'Community'].map((s) => (
            <button
              key={s}
              onClick={() => setScope(s as any)}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                scope === s
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'bg-[#FAF9F5] border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
          <h3 className="text-base font-bold text-[#1B1B1B]">{scope} Scope Rankings</h3>
          <span className="text-xs font-mono font-bold text-[#2F7A45]">Top Builders Filtered</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#E8E5DD]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#FAF9F5] border-b border-[#E8E5DD] text-[#6F6A60] font-mono uppercase text-[10px]">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">Builder Name</th>
                <th className="p-3">Department</th>
                <th className="p-3">Level Title</th>
                <th className="p-3">Verified Repos</th>
                <th className="p-3 text-right">Verified XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E5DD] bg-white">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-[#FAF9F5]/50 transition-colors">
                  <td className="p-3 font-mono font-bold text-[#1B1B1B]">
                    {user.rank === 1 ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold">🥇 #1</span>
                    ) : user.rank === 2 ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-300 text-slate-900 text-xs font-bold">🥈 #2</span>
                    ) : user.rank === 3 ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-700 text-white text-xs font-bold">🥉 #3</span>
                    ) : (
                      <span>#{user.rank}</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#1B1B1B] text-white flex items-center justify-center font-bold text-[10px]">
                        {user.name.substring(0, 2).toUpperCase()}
                      </div>
                      <strong className="text-[#1B1B1B] font-bold block">{user.name}</strong>
                    </div>
                  </td>
                  <td className="p-3 text-[#6F6A60]">{user.department}</td>
                  <td className="p-3 font-mono font-bold text-[#C76A2A]">Lvl {user.level}: {user.levelTitle}</td>
                  <td className="p-3 font-mono text-[#1B1B1B]">{user.githubProjectsCount} Repos</td>
                  <td className="p-3 text-right font-mono font-bold text-[#2F7A45]">{user.verifiedXP.toLocaleString()} XP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
