'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bookmark,
  Bell,
  Calendar as CalendarIcon,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Download,
} from 'lucide-react';
import { OpportunityItem } from '../types';

interface BookmarkCalendarViewProps {
  opportunities: OpportunityItem[];
  onSelectOpportunity: (opp: OpportunityItem) => void;
  onToggleSave: (opp: OpportunityItem) => void;
}

export function BookmarkCalendarView({
  opportunities,
  onSelectOpportunity,
  onToggleSave,
}: BookmarkCalendarViewProps) {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [browserAlerts, setBrowserAlerts] = useState(true);

  const savedOpportunities = opportunities.filter((o) => o.saved);

  const handleExportICS = () => {
    alert('Exported .ics calendar file containing 3 upcoming deadline events!');
  };

  return (
    <div className="space-y-6">
      {/* Header & Integration Buttons */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#C76A2A]" />
            <h2 className="text-lg font-bold text-[#1B1B1B]">Bookmarked Opportunities & Calendar Sync</h2>
          </div>
          <p className="text-xs text-[#575653] mt-0.5">
            Manage your saved opportunities, deadline reminder notifications, and Google Calendar / Apple Calendar sync.
          </p>
        </div>

        <button
          onClick={handleExportICS}
          className="py-2.5 px-4 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-bold flex items-center gap-2 transition-colors shrink-0"
        >
          <CalendarIcon className="w-4 h-4 text-[#C76A2A]" />
          <span>Export .ICS Calendar File</span>
        </button>
      </div>

      {/* Row 1: Reminder Notification Settings & Calendar Integration */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Reminder Notifications */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#C76A2A]" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Deadline Reminder Alerts</h3>
            </div>
            <span className="text-xs font-mono text-emerald-700 font-bold">Active</span>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] cursor-pointer">
              <div>
                <span className="font-bold text-[#1B1B1B] block">Email Deadline Alerts (48h before)</span>
                <span className="text-[11px] text-[#575653]">Receive email reminders before application cutoff</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded text-[#C76A2A] focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] cursor-pointer">
              <div>
                <span className="font-bold text-[#1B1B1B] block">Browser Push Notifications</span>
                <span className="text-[11px] text-[#575653]">Instant push notification when new 90%+ match opens</span>
              </div>
              <input
                type="checkbox"
                checked={browserAlerts}
                onChange={(e) => setBrowserAlerts(e.target.checked)}
                className="rounded text-[#C76A2A] focus:ring-0"
              />
            </label>
          </div>
        </div>

        {/* Calendar Sync Status */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Calendar Integration</h3>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-100 text-emerald-800 font-bold">
              Google Calendar Synced
            </span>
          </div>

          <div className="space-y-2 text-xs text-[#575653]">
            <p className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E5DD] leading-relaxed">
              All saved opportunities automatically sync application deadlines and interview rounds directly to your Google Calendar.
            </p>
            <div className="text-[11px] text-purple-700 font-semibold pt-1">
              ✓ 3 Saved deadlines active on Google Calendar
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Saved Opportunities Cards List */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#C76A2A]" />
            <h3 className="text-sm font-bold text-[#1B1B1B]">Saved Opportunities ({savedOpportunities.length})</h3>
          </div>
        </div>

        <div className="space-y-3">
          {savedOpportunities.length === 0 ? (
            <div className="text-xs text-[#787774] text-center py-6">
              No saved opportunities. Click the bookmark icon on any opportunity card to save it here!
            </div>
          ) : (
            savedOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] hover:border-[#C76A2A] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-[#1B1B1B]">{opp.title}</h4>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-purple-100 text-purple-800">
                      {opp.type}
                    </span>
                  </div>
                  <p className="text-[#575653]">{opp.organization} • Deadline: <strong className="text-rose-700">{opp.deadline}</strong></p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onSelectOpportunity(opp)}
                    className="py-1.5 px-3 rounded-lg bg-[#1B1B1B] text-white text-xs font-semibold"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onToggleSave(opp)}
                    className="py-1.5 px-3 rounded-lg bg-white border border-[#E8E5DD] text-[#787774] text-xs font-semibold hover:bg-rose-50 hover:text-rose-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
