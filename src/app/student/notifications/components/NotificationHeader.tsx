'use client';

import React from 'react';
import { Bell, CheckCheck, SlidersHorizontal, Sparkles, ShieldCheck, Mail, Smartphone } from 'lucide-react';
import { useNotificationStore } from '@/lib/notification-store';

interface NotificationHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({ activeTab, onTabChange }) => {
  const { unreadCount, markAllAsRead } = useNotificationStore();

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-0.5 rounded-full bg-[#1B1B1B] text-white text-xs font-bold font-mono uppercase tracking-wider">
              Action-Driven Intelligence Engine
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Zero-Spam Policy Enforced
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight mt-2">
            Notification Center
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6A60] mt-1 max-w-2xl leading-relaxed">
            Every notification is contextualized to drive immediate career progress — live classroom invites, priority recruiter matches, assignment deadlines, and AI skill gap alerts.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2.5 rounded-xl bg-[#1B1B1B] text-white text-xs font-bold hover:bg-[#C76A2A] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark All Read ({unreadCount})</span>
            </button>
          )}

          <button
            onClick={() => onTabChange('settings')}
            className="px-3.5 py-2.5 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] text-[#1B1B1B] text-xs font-bold hover:bg-[#eae6db] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#6F6A60]" />
            <span>Preferences</span>
          </button>
        </div>
      </div>

      {/* Top Telemetry Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#E8E5DD] text-xs">
        <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#C76A2A]/10 text-[#C76A2A] flex items-center justify-center font-bold">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Unread Alerts</span>
            <strong className="text-base font-bold font-mono text-[#C76A2A]">{unreadCount} Pending</strong>
          </div>
        </div>

        <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#2F7A45]/10 text-[#2F7A45] flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">AI Insights</span>
            <strong className="text-base font-bold font-mono text-[#2F7A45]">Active</strong>
          </div>
        </div>

        <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#1B1B1B]/5 text-[#1B1B1B] flex items-center justify-center font-bold">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Email Digest</span>
            <strong className="text-base font-bold font-mono text-[#1B1B1B]">Daily 08:00 AM</strong>
          </div>
        </div>

        <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#1B1B1B]/5 text-[#1B1B1B] flex items-center justify-center font-bold">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Push Channel</span>
            <strong className="text-base font-bold font-mono text-[#1B1B1B]">Enabled</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
