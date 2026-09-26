'use client';

import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Clock, Activity, FileText, Download, Calendar } from 'lucide-react';

export const SmartPriorityDigestView: React.FC = () => {
  const [activeDigest, setActiveDigest] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const handleGenerateDigest = (type: string) => {
    alert(`Generating & downloading official production-ready ${type.toUpperCase()} Growth Digest PDF...`);
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Smart Priority Matrix Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
        <div className="pb-3 border-b border-[#E8E5DD]">
          <h2 className="text-xl font-bold text-[#1B1B1B]">Smart Priority Routing System</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            SkillBridge automatically categorizes every incoming signal to prevent notification fatigue while guaranteeing critical alerts are never missed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-mono font-bold text-[10px] uppercase">
              Critical Priority
            </span>
            <h4 className="font-bold text-[#1B1B1B]">Immediate Alert</h4>
            <p className="text-[11px] text-[#6F6A60]">Live class starts, assignment deadline &lt; 3h, security alerts.</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-600 text-white font-mono font-bold text-[10px] uppercase">
              Important Priority
            </span>
            <h4 className="font-bold text-[#1B1B1B]">High Value</h4>
            <p className="text-[11px] text-[#6F6A60]">Priority recruiter match, capstone verification, new assessment.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45] text-white font-mono font-bold text-[10px] uppercase">
              Normal Priority
            </span>
            <h4 className="font-bold text-[#1B1B1B]">Standard Update</h4>
            <p className="text-[11px] text-[#6F6A60]">Team invitations, mentorship slot confirmations, community posts.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#1B1B1B] text-white font-mono font-bold text-[10px] uppercase">
              Low Priority
            </span>
            <h4 className="font-bold text-[#1B1B1B]">Background Info</h4>
            <p className="text-[11px] text-[#6F6A60]">System upgrades, platform news, weekly digest archives.</p>
          </div>
        </div>
      </div>

      {/* Digest Generator Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E5DD]">
          <div>
            <h3 className="text-base font-bold text-[#1B1B1B]">Periodic Digest &amp; Growth Report Generator</h3>
            <p className="text-[#6F6A60]">Consolidated summaries of accomplishments, skill progression, and activity.</p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
            {[
              { id: 'daily', label: 'Daily Summary' },
              { id: 'weekly', label: 'Weekly Digest' },
              { id: 'monthly', label: 'Monthly Growth Report' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDigest(d.id as any)}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeDigest === d.id
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'bg-[#FAF9F5] border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Digest Preview Box */}
        <div className="p-6 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C76A2A]" />
              <strong className="text-sm font-bold text-[#1B1B1B] capitalize">
                SkillBridge {activeDigest} Activity Digest
              </strong>
            </div>
            <button
              onClick={() => handleGenerateDigest(activeDigest)}
              className="px-3.5 py-1.5 bg-[#1B1B1B] text-white rounded-xl font-bold hover:bg-[#C76A2A] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-white rounded-xl border border-[#E8E5DD] space-y-1">
              <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Builder Score Gain</span>
              <strong className="text-lg font-bold font-mono text-[#2F7A45]">+45 Points</strong>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#E8E5DD] space-y-1">
              <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">GitHub Commits</span>
              <strong className="text-lg font-bold font-mono text-[#1B1B1B]">18 Commits</strong>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#E8E5DD] space-y-1">
              <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Assessments Completed</span>
              <strong className="text-lg font-bold font-mono text-[#C76A2A]">2 Tests Passed</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
