'use client';

import React, { useState } from 'react';
import { Target, CheckCircle2, Calendar, Award, Sparkles } from 'lucide-react';
import { DailyMission, WeeklyMission } from '@/lib/xp-engine';

interface MissionsViewProps {
  dailyMissions: DailyMission[];
  weeklyMissions: WeeklyMission[];
  onClaimDaily: (id: string) => void;
  onClaimWeekly: (id: string) => void;
}

export const MissionsView: React.FC<MissionsViewProps> = ({
  dailyMissions,
  weeklyMissions,
  onClaimDaily,
  onClaimWeekly,
}) => {
  return (
    <div className="space-y-6 text-xs">
      {/* 2-Column Grid: Daily Missions vs Weekly Missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Missions Card */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-[#C76A2A]" />
              <div>
                <h3 className="text-base font-bold text-[#1B1B1B]">Daily Missions</h3>
                <p className="text-[11px] text-[#6F6A60]">Resetting every 24 hours at 00:00 UTC.</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] font-mono font-bold text-[10px]">
              3/5 Completed
            </span>
          </div>

          <div className="space-y-3">
            {dailyMissions.map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                      {m.category}
                    </span>
                    <span className="font-mono font-bold text-[#2F7A45] text-[10px]">+{m.xpReward} XP</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#1B1B1B]">{m.title}</h4>
                </div>

                <div className="shrink-0">
                  {m.isCompleted ? (
                    <span className="px-3 py-1 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] font-mono font-bold text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                    </span>
                  ) : (
                    <button
                      onClick={() => onClaimDaily(m.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#1B1B1B] text-white font-bold hover:bg-[#C76A2A] transition-colors cursor-pointer"
                    >
                      Complete &rarr;
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Missions Card */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#2F7A45]" />
              <div>
                <h3 className="text-base font-bold text-[#1B1B1B]">Weekly Sprints</h3>
                <p className="text-[11px] text-[#6F6A60]">Resetting every Monday at 00:00 UTC.</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] font-mono font-bold text-[10px]">
              2/4 Completed
            </span>
          </div>

          <div className="space-y-3">
            {weeklyMissions.map((wm) => (
              <div
                key={wm.id}
                className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                      {wm.category}
                    </span>
                    <span className="font-mono font-bold text-[#2F7A45] text-[10px]">+{wm.xpReward} XP</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#1B1B1B]">{wm.title}</h4>
                </div>

                <div className="shrink-0">
                  {wm.isCompleted ? (
                    <span className="px-3 py-1 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] font-mono font-bold text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                    </span>
                  ) : (
                    <button
                      onClick={() => onClaimWeekly(wm.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#1B1B1B] text-white font-bold hover:bg-[#C76A2A] transition-colors cursor-pointer"
                    >
                      Complete &rarr;
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
