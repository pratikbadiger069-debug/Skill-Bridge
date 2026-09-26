'use client';

import React from 'react';
import { ShieldCheck, Plus, Sparkles, Users, Lock, Download, AlertTriangle } from 'lucide-react';

interface AdminHeaderProps {
  onQuickAction: (action: string) => void;
  activeTab: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onQuickAction, activeTab }) => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-0.5 rounded-full bg-[#1B1B1B] text-white text-xs font-bold font-mono uppercase tracking-wider">
              Super Admin Control Plane
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Global Governance &amp; Security OS
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight mt-2">
            Ecosystem Command Console
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6A60] mt-1 max-w-2xl leading-relaxed">
            Monitor overall user activity, enforce zero-trust security policies, audit assessments &amp; projects, configure system XP algorithms, and manage enterprise opportunities.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onQuickAction('create-user')}
            className="px-4 py-2.5 rounded-xl bg-[#C76A2A] text-white text-xs font-bold hover:bg-[#b05a22] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create User</span>
          </button>

          <button
            onClick={() => onQuickAction('security')}
            className="px-4 py-2.5 rounded-xl bg-[#1B1B1B] text-white text-xs font-bold hover:bg-[#333] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Lock className="w-4 h-4" />
            <span>Security Logs</span>
          </button>

          <button
            onClick={() => onQuickAction('export-report')}
            className="px-3.5 py-2.5 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] text-[#1B1B1B] text-xs font-bold hover:bg-[#eae6db] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#2F7A45]" />
            <span>Platform Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};
