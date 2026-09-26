'use client';

import React from 'react';
import {
  FolderGit2,
  Award,
  Zap,
  Plus,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

interface InputProjectHeaderProps {
  onCreateProject: () => void;
  onOpenPassport: () => void;
}

export function InputProjectHeader({
  onCreateProject,
  onOpenPassport,
}: InputProjectHeaderProps) {
  return (
    <div className="bg-[#1B1B1B] text-white rounded-2xl p-5 sm:p-6 border border-[#2D2D2D] shadow-xl space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#3A3A3A] pb-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-[#C76A2A]/20 border border-[#C76A2A]/40 text-[#E07A5F]">
            <FolderGit2 className="w-7 h-7 animate-pulse text-[#E07A5F]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Projects Hub</h1>
              <span className="px-2.5 py-0.5 text-xs font-mono font-semibold rounded-full bg-[#C76A2A] text-white flex items-center gap-1">
                <Zap className="w-3 h-3 fill-white" />
                Capability Proof Engine
              </span>
            </div>
            <p className="text-xs text-[#D4D4D4] mt-1">
              Where students prove real-world engineering capability. Verified code builds carry 2.3x higher hiring weight than written tests.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenPassport}
            className="py-2.5 px-4 rounded-xl bg-[#262626] hover:bg-[#333] border border-[#3A3A3A] text-xs font-semibold text-white flex items-center gap-2 transition-colors"
          >
            <Award className="w-4 h-4 text-[#C76A2A]" />
            <span>Project Passport</span>
          </button>

          <button
            onClick={onCreateProject}
            className="py-2.5 px-4 rounded-xl bg-[#C76A2A] hover:bg-[#b05b22] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Create Project</span>
          </button>
        </div>
      </div>

      {/* Capability Importance Notice Banner */}
      <div className="grid sm:grid-cols-3 gap-3 text-xs pt-1">
        <div className="bg-[#262626] p-3 rounded-xl border border-emerald-500/30 flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold text-white block">70% Placement Weight</span>
            <span className="text-[11px] text-[#A3A3A3]">Projects &gt; Assessments (30%)</span>
          </div>
        </div>

        <div className="bg-[#262626] p-3 rounded-xl border border-blue-500/30 flex items-center gap-2.5">
          <GitBranch className="w-5 h-5 text-blue-400 shrink-0" />
          <div>
            <span className="font-bold text-white block">GitHub Telemetry Sync</span>
            <span className="text-[11px] text-[#A3A3A3]">Automated Commit & PR Evaluation</span>
          </div>
        </div>

        <div className="bg-[#262626] p-3 rounded-xl border border-amber-500/30 flex items-center gap-2.5">
          <TrendingUp className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold text-white block">Verified Impact Score</span>
            <span className="text-[11px] text-[#A3A3A3]">Complexity, Activity, Deployment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
