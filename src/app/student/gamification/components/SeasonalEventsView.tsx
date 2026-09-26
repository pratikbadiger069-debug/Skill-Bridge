'use client';

import React from 'react';
import { Sparkles, Calendar, Users, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SeasonalEvent } from '@/lib/xp-engine';

interface SeasonalEventsViewProps {
  events: SeasonalEvent[];
}

export const SeasonalEventsView: React.FC<SeasonalEventsViewProps> = ({ events }) => {
  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">Seasonal Events &amp; Innovation Challenges</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            High-reward community hackathons, build sprints, and innovation weeks with boosted XP prize pools.
          </p>
        </div>
      </div>

      {/* Events List Grid */}
      <div className="space-y-4">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="p-6 rounded-3xl bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E5DD]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                    {ev.type}
                  </span>
                  <span className="text-[10px] font-mono text-[#2F7A45] font-bold bg-[#2F7A45]/10 px-2 py-0.5 rounded-full">
                    {ev.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#1B1B1B] mt-1">{ev.title}</h3>
              </div>

              <div className="text-left sm:text-right font-mono">
                <span className="text-sm font-bold text-[#C76A2A] block">+{ev.prizePoolXP.toLocaleString()} XP Prize Pool</span>
                <span className="text-[10px] text-[#6F6A60]">{ev.registeredCount} Builders Enrolled</span>
              </div>
            </div>

            <p className="text-xs text-[#6F6A60] leading-relaxed">{ev.description}</p>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-[#6F6A60] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Duration: {ev.duration}
              </span>

              <button
                onClick={() => alert(`Registered for ${ev.title}!`)}
                className="px-4 py-2 rounded-xl bg-[#1B1B1B] text-white text-xs font-bold hover:bg-[#C76A2A] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Register for Event</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
