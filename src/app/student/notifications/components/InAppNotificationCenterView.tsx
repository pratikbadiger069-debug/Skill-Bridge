'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  CheckCircle2,
  Video,
  Clock,
  Briefcase,
  Award,
  Users2,
  Calendar,
  Sparkles,
  Trash2,
  Check,
  Search,
  Filter,
} from 'lucide-react';
import { useNotificationStore, NotificationType, AppNotification } from '@/lib/notification-store';

export const InAppNotificationCenterView: React.FC = () => {
  const { notifications, markAsRead, deleteNotification } = useNotificationStore();
  const [filterType, setFilterType] = useState<'All' | NotificationType>('All');
  const [readFilter, setReadFilter] = useState<'All' | 'Unread' | 'Read'>('All');
  const [search, setSearch] = useState('');

  const filtered = notifications.filter((n) => {
    const matchesCategory = filterType === 'All' ? true : n.type === filterType;
    const matchesRead =
      readFilter === 'All' ? true : readFilter === 'Unread' ? !n.isRead : n.isRead;
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesRead && matchesSearch;
  });

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-500/10 text-red-700 border-red-200';
      case 'Important':
        return 'bg-amber-500/10 text-amber-700 border-amber-200';
      case 'Normal':
        return 'bg-[#2F7A45]/10 text-[#2F7A45] border-emerald-200';
      default:
        return 'bg-[#FAF9F5] text-[#6F6A60] border-[#E8E5DD]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs & Filter Controls */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Read / Unread Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
            {['All', 'Unread', 'Read'].map((rf) => (
              <button
                key={rf}
                onClick={() => setReadFilter(rf as any)}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  readFilter === rf
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'bg-[#FAF9F5] border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
                }`}
              >
                {rf}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 text-[#6F6A60] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-xs focus:outline-none focus:border-[#1B1B1B]"
            />
          </div>
        </div>

        {/* 8 Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold no-scrollbar">
          <span className="text-[10px] font-bold text-[#6F6A60] uppercase tracking-wider shrink-0 mr-1">
            Category:
          </span>
          {[
            'All',
            'Assessment',
            'Project',
            'Community',
            'Mentorship',
            'Opportunities',
            'Classroom',
            'System',
            'Achievement',
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat as any)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filterType === cat
                  ? 'bg-[#C76A2A] text-white font-bold'
                  : 'bg-[#FAF9F5] border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications Feed */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((notif) => (
            <div
              key={notif.id}
              className={`p-5 rounded-3xl border transition-all space-y-3 ${
                notif.isRead
                  ? 'bg-white border-[#E8E5DD] opacity-90'
                  : 'bg-white border-[#1B1B1B] shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#C76A2A] animate-pulse" />
                    )}

                    <span className="px-2 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                      {notif.type}
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${getPriorityStyle(
                        notif.priority
                      )}`}
                    >
                      {notif.priority}
                    </span>

                    {notif.isAINotification && (
                      <span className="px-2 py-0.5 rounded-md bg-[#C76A2A]/10 text-[#C76A2A] text-[10px] font-mono font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> AI Context
                      </span>
                    )}

                    <span className="text-[10px] font-mono text-[#6F6A60]">{notif.timestamp}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#1B1B1B] leading-snug">
                    {notif.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                  {!notif.isRead && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="px-3 py-1 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] hover:bg-[#1B1B1B] hover:text-white text-[#1B1B1B] text-xs font-bold transition-colors cursor-pointer"
                    >
                      Mark Read
                    </button>
                  )}

                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="p-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#6F6A60] leading-relaxed">{notif.message}</p>

              {/* AI Insight Box if present */}
              {notif.aiContext && (
                <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] text-xs space-y-1">
                  <div className="flex items-center justify-between text-[#C76A2A] font-bold text-[11px]">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> AI Recommendation Rationale:
                    </span>
                    {notif.aiContext.impactPts && (
                      <span className="font-mono text-[#2F7A45]">
                        +{notif.aiContext.impactPts} Impact Pts
                      </span>
                    )}
                  </div>
                  <p className="text-[#6F6A60] text-[11px]">{notif.aiContext.recommendationReason}</p>
                </div>
              )}

              {/* Action Button Link */}
              {notif.actionLabel && notif.actionUrl && (
                <div className="pt-2 border-t border-[#E8E5DD] flex items-center justify-end">
                  <Link
                    href={notif.actionUrl}
                    className="px-4 py-2 rounded-xl bg-[#1B1B1B] text-white text-xs font-bold hover:bg-[#C76A2A] transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>{notif.actionLabel}</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 rounded-3xl bg-white border border-dashed border-[#E8E5DD] text-center space-y-3">
            <Bell className="w-8 h-8 text-[#6F6A60] mx-auto" />
            <p className="text-sm font-bold text-[#1B1B1B]">No Notifications Found</p>
            <p className="text-xs text-[#6F6A60]">No alerts match your current filter settings.</p>
          </div>
        )}
      </div>
    </div>
  );
};
