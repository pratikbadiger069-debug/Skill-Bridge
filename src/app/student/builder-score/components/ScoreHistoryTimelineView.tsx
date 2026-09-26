'use client';

import React from 'react';
import { Calendar, TrendingUp, Award, ArrowUpRight, Activity } from 'lucide-react';
import { ScoreHistoryPoint } from '@/lib/builder-score-engine';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ScoreHistoryTimelineViewProps {
  history: ScoreHistoryPoint[];
}

export const ScoreHistoryTimelineView: React.FC<ScoreHistoryTimelineViewProps> = ({ history }) => {
  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">Historical Score Progression &amp; Milestones</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Track your Builder Score growth trajectory, milestone unlocks, and rank improvements over time.
          </p>
        </div>
      </div>

      {/* Score Growth Area Chart */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
          <h3 className="text-sm font-bold text-[#1B1B1B]">Score Trajectory (6 Months)</h3>
          <span className="text-xs font-mono font-bold text-[#2F7A45]">+270 Points Growth</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2F7A45" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2F7A45" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8e5dd" />
              <XAxis dataKey="date" tick={{ fill: '#6F6A60', fontSize: 11 }} />
              <YAxis domain={[500, 1000]} tick={{ fill: '#6F6A60', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#E8E5DD',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#2F7A45"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorScore)"
                name="Builder Score"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Timeline Events List */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
        <h3 className="text-base font-bold text-[#1B1B1B]">Audit Event History Log</h3>

        <div className="relative border-l-2 border-[#E8E5DD] ml-3 pl-6 space-y-6">
          {history.map((h, i) => (
            <div key={i} className="relative space-y-1">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#1B1B1B] border-2 border-white ring-2 ring-[#E8E5DD]" />

              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#6F6A60]">{h.date}</span>
                {h.change > 0 && (
                  <span className="px-2 py-0.5 rounded bg-[#2F7A45]/10 text-[#2F7A45] font-mono font-bold text-[10px]">
                    +{h.change} pts
                  </span>
                )}
                {h.milestone && (
                  <span className="px-2 py-0.5 rounded bg-[#C76A2A]/10 text-[#C76A2A] font-mono font-bold text-[10px]">
                    Milestone: {h.milestone}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#1B1B1B]">{h.reason}</h4>
                <span className="font-mono font-bold text-[#1B1B1B]">Score: {h.score} (Rank #{h.rank})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
