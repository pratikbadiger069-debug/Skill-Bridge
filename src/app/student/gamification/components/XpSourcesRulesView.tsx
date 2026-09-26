'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Award, FolderGit2, AlertTriangle } from 'lucide-react';
import { ASSESSMENT_XP_REWARDS, PROJECT_XP_REWARDS } from '@/lib/xp-engine';

export const XpSourcesRulesView: React.FC = () => {
  return (
    <div className="space-y-6 text-xs">
      {/* 2-Column Grid: Valid XP Sources vs Anti-Addiction NO-XP Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1: Valid XP Sources */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E8E5DD]">
            <CheckCircle2 className="w-5 h-5 text-[#2F7A45]" />
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B]">Verified XP Reward Sources</h3>
              <p className="text-[11px] text-[#6F6A60]">Earned exclusively through verified technical capability &amp; output.</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Assessment XP Scale */}
            <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-2">
              <div className="flex items-center justify-between font-bold text-[#1B1B1B]">
                <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-[#C76A2A]" /> Assessment Completion</span>
                <span className="font-mono text-[#2F7A45]">Up to 200 XP</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                <div className="p-2 bg-white rounded-xl border border-[#E8E5DD]">
                  <span className="block text-[#6F6A60]">Easy</span>
                  <strong className="text-[#1B1B1B] text-xs">25 XP</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-[#E8E5DD]">
                  <span className="block text-[#6F6A60]">Medium</span>
                  <strong className="text-[#1B1B1B] text-xs">50 XP</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-[#E8E5DD]">
                  <span className="block text-[#6F6A60]">Advanced</span>
                  <strong className="text-[#1B1B1B] text-xs">100 XP</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-[#E8E5DD]">
                  <span className="block text-[#6F6A60]">Expert</span>
                  <strong className="text-[#2F7A45] text-xs">200 XP</strong>
                </div>
              </div>
            </div>

            {/* Project XP Scale */}
            <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-2">
              <div className="flex items-center justify-between font-bold text-[#1B1B1B]">
                <span className="flex items-center gap-1.5"><FolderGit2 className="w-4 h-4 text-[#1B1B1B]" /> Verified Project Completion</span>
                <span className="font-mono text-[#2F7A45]">Up to 1000 XP</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                <div className="p-2 bg-white rounded-xl border border-[#E8E5DD]">
                  <span className="block text-[#6F6A60]">Beginner</span>
                  <strong className="text-[#1B1B1B] text-xs">100 XP</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-[#E8E5DD]">
                  <span className="block text-[#6F6A60]">Intermediate</span>
                  <strong className="text-[#1B1B1B] text-xs">250 XP</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-[#E8E5DD]">
                  <span className="block text-[#6F6A60]">Advanced</span>
                  <strong className="text-[#1B1B1B] text-xs">500 XP</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-[#E8E5DD]">
                  <span className="block text-[#6F6A60]">Industry</span>
                  <strong className="text-[#2F7A45] text-xs">1000 XP</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Explicit NO XP Anti-Spam Rules */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E8E5DD]">
            <XCircle className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B]">Anti-Addiction Rules (Strictly NO XP)</h3>
              <p className="text-[11px] text-[#6F6A60]">Activities that never grant XP to prevent artificial farming.</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {[
              { rule: 'Daily App Logins', reason: 'Logging in without completing tasks yields 0 XP.' },
              { rule: 'Page Refresh / Navigation', reason: 'Browsing pages or refreshing dashboards yields 0 XP.' },
              { rule: 'Random Interface Clicks', reason: 'Superficial clicking yields 0 XP.' },
              { rule: 'Failed / Wrong Answers', reason: 'Failing assessments without passing threshold yields 0 XP.' },
              { rule: 'Spam Commits / Diff Farming', reason: 'Trivial single-character git commits yield 0 XP.' },
              { rule: 'Fake Engagement', reason: 'Self-liking or bot accounts yield 0 XP.' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-red-50/50 rounded-2xl border border-red-200 flex items-center justify-between gap-3">
                <div>
                  <strong className="text-xs font-bold text-red-800 block">{item.rule}</strong>
                  <span className="text-[10px] text-red-700/80">{item.reason}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-red-600 text-white font-mono font-bold text-[10px]">
                  0 XP
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
