'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, FolderGit2, GitCommit, Activity, RefreshCw } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const AnalyticsView: React.FC = () => {
  const userGrowthData = [
    { month: 'Oct', users: 8200, projects: 1200, commits: 14000 },
    { month: 'Nov', users: 9500, projects: 1800, commits: 22000 },
    { month: 'Dec', users: 11200, projects: 2400, commits: 34000 },
    { month: 'Jan', users: 12800, projects: 2900, commits: 45000 },
    { month: 'Feb', users: 14400, projects: 3410, commits: 58000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">Platform Macro Analytics &amp; Growth Telemetry</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Real-time analytics for user adoption, project velocity, GitHub commit volume, assessment completion trends, and 90-day retention metrics.
          </p>
        </div>
      </div>

      {/* 6 Key Analytics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="p-4 bg-white rounded-2xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">User Growth</span>
          <strong className="text-xl font-bold font-mono text-[#1B1B1B]">+28% MoM</strong>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Assessment Trend</span>
          <strong className="text-xl font-bold font-mono text-[#2F7A45]">92% Completion</strong>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Project Growth</span>
          <strong className="text-xl font-bold font-mono text-[#C76A2A]">3,410 Verified</strong>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">GitHub Activity</span>
          <strong className="text-xl font-bold font-mono text-[#1B1B1B]">58k Commits</strong>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Engagement</span>
          <strong className="text-xl font-bold font-mono text-[#2F7A45]">82.4 DAU/MAU</strong>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">90-Day Retention</span>
          <strong className="text-xl font-bold font-mono text-[#C76A2A]">91.2% Retained</strong>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
          <h3 className="text-sm font-bold text-[#1B1B1B]">User Growth &amp; GitHub Code Telemetry</h3>
          <span className="text-xs font-mono font-bold text-[#2F7A45]">Live Telemetry Stream</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C76A2A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C76A2A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8e5dd" />
              <XAxis dataKey="month" tick={{ fill: '#6F6A60', fontSize: 11 }} />
              <YAxis tick={{ fill: '#6F6A60', fontSize: 11 }} />
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
                dataKey="users"
                stroke="#C76A2A"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUsers)"
                name="Total Platform Users"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
