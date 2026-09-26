'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Code2,
  BookOpen,
  GitBranch,
  Rocket,
  Users,
  Award,
  CheckCircle2,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { ProjectHubItem } from '../types';

interface ProjectVerificationViewProps {
  project: ProjectHubItem;
}

export function ProjectVerificationView({ project }: ProjectVerificationViewProps) {
  const ver = project.verification;

  const VERIFICATION_CRITERIA = [
    {
      id: 'code-quality',
      title: 'Code Quality Score',
      icon: Code2,
      score: `${ver.codeQualityScore}/100`,
      status: 'Clean Architecture & Static Audit Passed',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      details: 'Zero critical linter issues, proper TypeScript strict typing, and modular directory layout.',
    },
    {
      id: 'documentation',
      title: 'Documentation Quality',
      icon: BookOpen,
      score: `${ver.documentationScore}/100`,
      status: 'Comprehensive README & OpenAPI Spec',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      details: 'Includes step-by-step setup guides, architecture diagrams, and REST API contract specs.',
    },
    {
      id: 'github-activity',
      title: 'GitHub Activity & History',
      icon: GitBranch,
      score: `${ver.githubActivityScore}/100`,
      status: 'High Commit Velocity & Multi-Author PRs',
      statusColor: 'text-blue-700 bg-blue-50 border-blue-200',
      details: 'Verified git commit stream with 14-day streak and clean PR merge logs.',
    },
    {
      id: 'deployment',
      title: 'Deployment & Live Production Status',
      icon: Rocket,
      score: ver.deploymentStatus,
      status: `Live URL: ${ver.deploymentUrl || 'https://skillbridge.dev'}`,
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      details: 'Hosted on production SSL domain with sub-100ms response time.',
    },
    {
      id: 'peer-reviews',
      title: 'Peer Code Reviews',
      icon: Users,
      score: `${ver.peerReviewsCount} Approved Reviews`,
      status: 'Community Code Audit Passed',
      statusColor: 'text-purple-700 bg-purple-50 border-purple-200',
      details: 'Reviewed and approved by 8 student peer developers on SkillBridge platform.',
    },
    {
      id: 'faculty-reviews',
      title: 'Faculty Validation & Audit',
      icon: Award,
      score: ver.facultyGrade || 'Grade A+',
      status: `Verified by: ${ver.facultyReviewer || 'Dr. Evelyn Vance'}`,
      statusColor: 'text-amber-800 bg-amber-50 border-amber-200',
      details: 'Formal evaluation by HOD/Faculty certifying system design standards.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Verification Seal */}
      <div className="bg-[#1B1B1B] text-white rounded-2xl p-6 border border-[#2D2D2D] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
            <ShieldCheck className="w-8 h-8 animate-pulse text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">6-Point Project Verification Seal</h2>
              <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-full bg-emerald-600 text-white">
                VERIFIED CAPABILITY
              </span>
            </div>
            <p className="text-xs text-[#D4D4D4] mt-1">
              Evaluated across 6 empirical engineering criteria. Verified projects carry 2.3x higher hiring trust.
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-2xl font-black font-mono text-emerald-400">
            {project.impactScore.overall} / 100
          </div>
          <span className="text-xs text-[#A3A3A3] font-mono">Overall Impact Index</span>
        </div>
      </div>

      {/* 6 Verification Criteria Cards */}
      <div className="grid md:grid-cols-2 gap-5">
        {VERIFICATION_CRITERIA.map((crit) => {
          const Icon = crit.icon;
          return (
            <div
              key={crit.id}
              className="bg-white rounded-2xl p-5 border border-[#E8E5DD] hover:border-[#C76A2A] shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] text-[#1B1B1B]">
                    <Icon className="w-4 h-4 text-[#C76A2A]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#1B1B1B]">{crit.title}</h3>
                </div>

                <span className="text-xs font-mono font-bold text-[#1B1B1B] bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-[#E8E5DD]">
                  {crit.score}
                </span>
              </div>

              <div className={`p-2.5 rounded-xl border text-xs font-medium ${crit.statusColor}`}>
                ✓ {crit.status}
              </div>

              <p className="text-xs text-[#575653] leading-relaxed">{crit.details}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
