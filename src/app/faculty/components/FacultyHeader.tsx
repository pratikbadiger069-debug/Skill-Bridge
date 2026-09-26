'use client';

import React from 'react';
import { ShieldCheck, Plus, Sparkles, Video, FileText, CheckCircle2, Users } from 'lucide-react';

interface FacultyHeaderProps {
  onQuickAction: (action: string) => void;
  activeTab: string;
}

export const FacultyHeader: React.FC<FacultyHeaderProps> = ({ onQuickAction, activeTab }) => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-0.5 rounded-full bg-[#1B1B1B] text-white text-xs font-bold font-mono uppercase tracking-wider">
              Faculty Command Hub
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Automated Operations &amp; Outcome OS
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight mt-2">
            Welcome, Dr. Ramesh Sharma
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6A60] mt-1 max-w-2xl leading-relaxed">
            Reduce manual administration, conduct interactive smart classrooms, grade code rubrics with automated insights, and elevate student industry readiness.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onQuickAction('smart-room')}
            className="px-4 py-2.5 rounded-xl bg-[#C76A2A] text-white text-xs font-bold hover:bg-[#b05a22] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Video className="w-4 h-4" />
            <span>Launch Live Room</span>
          </button>

          <button
            onClick={() => onQuickAction('create-assignment')}
            className="px-4 py-2.5 rounded-xl bg-[#1B1B1B] text-white text-xs font-bold hover:bg-[#333] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>

          <button
            onClick={() => onQuickAction('take-attendance')}
            className="px-3.5 py-2.5 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] text-[#1B1B1B] text-xs font-bold hover:bg-[#eae6db] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-[#2F7A45]" />
            <span>Quick Attendance</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#E8E5DD] text-xs">
        <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1B1B1B]/5 text-[#1B1B1B] flex items-center justify-center font-bold">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Active Students</span>
            <strong className="text-base font-bold font-mono text-[#1B1B1B]">144 Enrolled</strong>
          </div>
        </div>

        <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#2F7A45]/10 text-[#2F7A45] flex items-center justify-center font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Avg Attendance</span>
            <strong className="text-base font-bold font-mono text-[#2F7A45]">91.0%</strong>
          </div>
        </div>

        <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#C76A2A]/10 text-[#C76A2A] flex items-center justify-center font-bold">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Pending Reviews</span>
            <strong className="text-base font-bold font-mono text-[#C76A2A]">24 Submissions</strong>
          </div>
        </div>

        <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1B1B1B]/5 text-[#1B1B1B] flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Class Readiness</span>
            <strong className="text-base font-bold font-mono text-[#1B1B1B]">82.4 / 100</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
