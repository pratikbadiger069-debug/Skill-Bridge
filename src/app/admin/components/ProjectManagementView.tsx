'use client';

import React from 'react';
import {
  FolderGit2,
  ShieldCheck,
  Star,
  BarChart3,
  ExternalLink,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { AdminProjectReview } from '../types';

interface ProjectManagementViewProps {
  projects: AdminProjectReview[];
  onToggleFeatured: (id: string) => void;
  onVerifyProject: (id: string, verified: boolean) => void;
}

export const ProjectManagementView: React.FC<ProjectManagementViewProps> = ({
  projects,
  onToggleFeatured,
  onVerifyProject,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">Project Review &amp; Capability Proof Hub</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Audit student project submissions, run 6-point verification algorithm, highlight featured projects, and track impact analytics.
          </p>
        </div>
      </div>

      {/* Analytics Counter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white rounded-3xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Total Projects</span>
          <strong className="text-2xl font-bold font-mono text-[#1B1B1B]">3,410</strong>
          <span className="text-[10px] text-[#2F7A45] font-bold block">+142 this week</span>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Verified Projects</span>
          <strong className="text-2xl font-bold font-mono text-[#2F7A45]">2,890</strong>
          <span className="text-[10px] text-[#6F6A60] block">Passes 6-point verification</span>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Featured Projects</span>
          <strong className="text-2xl font-bold font-mono text-[#C76A2A]">48 Featured</strong>
          <span className="text-[10px] text-[#6F6A60] block">Visible on recruit dashboard</span>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Avg Impact Score</span>
          <strong className="text-2xl font-bold font-mono text-[#1B1B1B]">88.4 / 100</strong>
          <span className="text-[10px] text-[#2F7A45] font-bold block">High architectural depth</span>
        </div>
      </div>

      {/* Project Review Queue Table */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
        <h3 className="text-base font-bold text-[#1B1B1B]">Projects Review &amp; Verification Queue</h3>

        <div className="space-y-3 text-xs">
          {projects.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                    By {p.authorName}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#C76A2A]">
                    Verification Score: {p.verificationScore}/100
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#1B1B1B]">{p.title}</h4>
                <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                  {p.techStack.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-white rounded-md border border-[#E8E5DD] text-[#1B1B1B]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onToggleFeatured(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    p.isFeatured
                      ? 'bg-[#C76A2A] text-white'
                      : 'bg-white border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
                  }`}
                >
                  <Star className="w-3.5 h-3.5" />
                  <span>{p.isFeatured ? 'Featured' : 'Feature'}</span>
                </button>

                {p.status === 'Verified' ? (
                  <span className="px-3 py-1 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] font-bold font-mono">
                    Verified
                  </span>
                ) : (
                  <button
                    onClick={() => onVerifyProject(p.id, true)}
                    className="px-3.5 py-1.5 bg-[#2F7A45] text-white font-bold rounded-xl hover:bg-[#256337] cursor-pointer"
                  >
                    Approve Verification
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
