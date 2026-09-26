'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  AlertTriangle,
  GitCommit,
  FolderGit2,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { StudentRecord } from '../types';

interface StudentInsightsViewProps {
  students: StudentRecord[];
}

export const StudentInsightsView: React.FC<StudentInsightsViewProps> = ({ students }) => {
  const [filter, setFilter] = useState<'All' | 'Watchlist' | 'High Risk'>('All');
  const [search, setSearch] = useState('');

  const filtered = students.filter((s) => {
    const matchesFilter = filter === 'All' ? true : s.riskStatus === filter;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Risk Filters */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">360° Student Telemetry &amp; Risk Detection Engine</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Holistic view of builder scores, GitHub commit frequencies, capstone projects, and proactive academic risk flags.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
          {['All', 'Watchlist', 'High Risk'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                filter === f
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'bg-[#FAF9F5] border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#6F6A60] absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Filter students by name, roll number, or domain..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#E8E5DD] text-xs focus:outline-none focus:border-[#1B1B1B]"
        />
      </div>

      {/* Student Telemetry Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {filtered.map((st) => (
          <div
            key={st.id}
            className="p-6 rounded-3xl bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-4"
          >
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E8E5DD]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1B1B1B] text-white font-bold flex items-center justify-center text-sm">
                  {st.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1B1B1B]">{st.name}</h3>
                  <span className="text-[10px] text-[#6F6A60] font-mono">{st.rollNumber} • {st.department}</span>
                </div>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono ${
                  st.riskStatus === 'Safe'
                    ? 'bg-[#2F7A45]/10 text-[#2F7A45]'
                    : st.riskStatus === 'Watchlist'
                    ? 'bg-amber-500/10 text-amber-700'
                    : 'bg-red-500/10 text-red-700'
                }`}
              >
                {st.riskStatus}
              </span>
            </div>

            {/* Metrics Breakdown 3x2 Grid */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E5DD] text-center">
                <span className="text-[9px] text-[#6F6A60] uppercase font-bold block">Builder Score</span>
                <strong className="text-base font-mono font-bold text-[#C76A2A]">{st.builderScore}</strong>
              </div>

              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E5DD] text-center">
                <span className="text-[9px] text-[#6F6A60] uppercase font-bold block">Projects</span>
                <strong className="text-base font-mono font-bold text-[#1B1B1B]">{st.projectsCompleted} Repos</strong>
              </div>

              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E5DD] text-center">
                <span className="text-[9px] text-[#6F6A60] uppercase font-bold block">GitHub Commits</span>
                <strong className="text-base font-mono font-bold text-[#2F7A45]">{st.githubCommitsThisMonth}</strong>
              </div>

              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E5DD] text-center">
                <span className="text-[9px] text-[#6F6A60] uppercase font-bold block">Participation</span>
                <strong className="text-base font-mono font-bold text-[#1B1B1B]">{st.participationIndex}%</strong>
              </div>

              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E5DD] text-center">
                <span className="text-[9px] text-[#6F6A60] uppercase font-bold block">Assessment Avg</span>
                <strong className="text-base font-mono font-bold text-[#1B1B1B]">{st.assessmentAvg}%</strong>
              </div>

              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E5DD] text-center">
                <span className="text-[9px] text-[#6F6A60] uppercase font-bold block">Attendance</span>
                <strong className="text-base font-mono font-bold text-[#2F7A45]">{st.attendanceRate}%</strong>
              </div>
            </div>

            {/* Risk Reason Alert if present */}
            {st.riskReason && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] space-y-1">
                <div className="flex items-center gap-1 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Risk Alert Triggered:</span>
                </div>
                <p>{st.riskReason}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
