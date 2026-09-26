'use client';

import React, { useState } from 'react';
import {
  Users2,
  ShieldCheck,
  AlertTriangle,
  Flag,
  CheckCircle2,
  XCircle,
  Calendar,
  Award,
  Users,
  MessageSquare,
} from 'lucide-react';
import { CommunityModerationItem } from '../types';

interface CommunityManagementViewProps {
  moderationItems: CommunityModerationItem[];
  onApproveItem: (id: string) => void;
  onArchiveItem: (id: string) => void;
}

export const CommunityManagementView: React.FC<CommunityManagementViewProps> = ({
  moderationItems,
  onApproveItem,
  onArchiveItem,
}) => {
  const [filterType, setFilterType] = useState<'All' | 'Post' | 'Team' | 'Event' | 'Challenge' | 'Mentorship'>('All');

  const filtered = moderationItems.filter((m) => (filterType === 'All' ? true : m.type === filterType));

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">Community Governance &amp; Ecosystem Moderation</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Monitor Builder Feed posts, project team creations, hackathon challenges, mentorship sessions, and anti-spam filters.
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
          {['All', 'Post', 'Team', 'Event', 'Challenge', 'Mentorship'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t as any)}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                filterType === t
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'bg-[#FAF9F5] border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white rounded-3xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Builder Posts</span>
          <strong className="text-2xl font-bold font-mono text-[#1B1B1B]">8,920</strong>
          <span className="text-[10px] text-[#2F7A45] font-bold block">No likes; Appreciations only</span>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Active Teams</span>
          <strong className="text-2xl font-bold font-mono text-[#2F7A45]">340 Teams</strong>
          <span className="text-[10px] text-[#6F6A60] block">Cross-college project squads</span>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Active Events</span>
          <strong className="text-2xl font-bold font-mono text-[#C76A2A]">18 Events</strong>
          <span className="text-[10px] text-[#6F6A60] block">Hackathons &amp; Office Hours</span>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Flagged Content</span>
          <strong className="text-2xl font-bold font-mono text-red-600">1 Item Pending</strong>
          <span className="text-[10px] text-red-600 font-bold block">Automated AI filter trigger</span>
        </div>
      </div>

      {/* Moderation Items Feed */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
        <h3 className="text-base font-bold text-[#1B1B1B]">Moderation Audit Queue</h3>

        <div className="space-y-3 text-xs">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                    {item.type}
                  </span>
                  <span className="text-[10px] text-[#6F6A60]">By {item.author} • {item.createdAt}</span>
                </div>
                <h4 className="text-sm font-bold text-[#1B1B1B]">{item.title}</h4>
                {item.flagReason && (
                  <p className="text-[11px] text-red-600 font-semibold">{item.flagReason}</p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.status === 'Flagged' ? (
                  <>
                    <button
                      onClick={() => onApproveItem(item.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#2F7A45] text-white font-bold hover:bg-[#256337] cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onArchiveItem(item.id)}
                      className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 cursor-pointer"
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] font-bold font-mono">
                    Approved
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
