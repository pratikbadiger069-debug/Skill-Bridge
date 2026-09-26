'use client';

import React from 'react';
import { BarChart3, TrendingUp, CheckCircle2, Zap, Activity, MousePointer, ShieldCheck } from 'lucide-react';

export const NotificationAnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">Notification System Telemetry &amp; Effectiveness</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Real-time analytics measuring open rates, user click-through engagement, CTA conversions, and notification zero-spam quality index.
          </p>
        </div>
      </div>

      {/* 4 Primary Analytics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-3xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Open Rate</span>
          <strong className="text-3xl font-mono font-bold text-[#2F7A45]">84.2%</strong>
          <span className="text-[10px] text-[#2F7A45] font-bold block">+6.4% above industry avg</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Engagement Rate</span>
          <strong className="text-3xl font-mono font-bold text-[#C76A2A]">76.5%</strong>
          <span className="text-[10px] text-[#6F6A60] block">Direct action conversion</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Effectiveness Score</span>
          <strong className="text-3xl font-mono font-bold text-[#1B1B1B]">92 / 100</strong>
          <span className="text-[10px] text-[#2F7A45] font-bold block">Zero-spam rating</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Avg Response Time</span>
          <strong className="text-3xl font-mono font-bold text-[#1B1B1B]">4.2 mins</strong>
          <span className="text-[10px] text-[#6F6A60] block">Action taken after dispatch</span>
        </div>
      </div>

      {/* Channel Breakdown */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
        <h3 className="text-base font-bold text-[#1B1B1B]">Notification Channel CTR &amp; User Response Tracking</h3>

        <div className="space-y-3">
          {[
            { channel: 'Smart Classroom Invites (Live Room)', ctr: '94%', count: '1,420 dispatches' },
            { channel: 'Recruiter Priority Opportunity Matches', ctr: '88%', count: '980 dispatches' },
            { channel: 'Lab Assignment Deadline Reminders', ctr: '82%', count: '2,100 dispatches' },
            { channel: 'AI Skill Gap Alerts', ctr: '78%', count: '1,650 dispatches' },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] flex items-center justify-between">
              <div>
                <strong className="text-xs font-bold text-[#1B1B1B] block">{item.channel}</strong>
                <span className="text-[10px] text-[#6F6A60] font-mono">{item.count}</span>
              </div>
              <span className="font-mono text-sm font-bold text-[#2F7A45]">{item.ctr} Click-Through Rate</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
