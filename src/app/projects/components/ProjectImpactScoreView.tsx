'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Cpu,
  CheckCircle2,
  Activity,
  Users,
  BookOpen,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { ProjectHubItem } from '../types';

interface ProjectImpactScoreViewProps {
  project: ProjectHubItem;
}

export function ProjectImpactScoreView({ project }: ProjectImpactScoreViewProps) {
  const imp = project.impactScore;

  const IMPACT_DIMENSIONS = [
    {
      id: 'complexity',
      title: 'Complexity (20 Pts)',
      score: imp.complexity,
      max: 20,
      icon: Cpu,
      color: 'bg-indigo-600',
      description: 'Evaluates system architecture, multi-threading, concurrency, database schema normalization, and security design.',
    },
    {
      id: 'execution',
      title: 'Execution (20 Pts)',
      score: imp.execution,
      max: 20,
      icon: CheckCircle2,
      color: 'bg-emerald-600',
      description: 'Working features completeness, unit test coverage (>80%), error handling resilience, and zero runtime crashes.',
    },
    {
      id: 'activity',
      title: 'Activity (15 Pts)',
      score: imp.activity,
      max: 15,
      icon: Activity,
      color: 'bg-blue-600',
      description: 'Commit velocity, Pull Request merge cadence, line churn balance, and code review responsiveness.',
    },
    {
      id: 'users',
      title: 'Users & Utility (15 Pts)',
      score: imp.users,
      max: 15,
      icon: Users,
      color: 'bg-purple-600',
      description: 'Real-world deployment, active API request traffic, user adoption, and community engagement.',
    },
    {
      id: 'documentation',
      title: 'Documentation (15 Pts)',
      score: imp.documentation,
      max: 15,
      icon: BookOpen,
      color: 'bg-[#C76A2A]',
      description: 'Clear README.md, OpenAPI/Swagger 3 specification, architecture diagrams, and setup instructions.',
    },
    {
      id: 'consistency',
      title: 'Consistency (15 Pts)',
      score: imp.consistency,
      max: 15,
      icon: Calendar,
      color: 'bg-amber-600',
      description: 'Multi-week building streak without long inactivity gaps, regular milestone check-ins.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Impact Index */}
      <div className="bg-gradient-to-br from-[#1B1B1B] via-[#262626] to-[#1B1B1B] text-white rounded-2xl p-6 border border-[#2D2D2D] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3A3A3A] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#C76A2A]/20 border border-[#C76A2A]/40 text-[#E07A5F]">
              <Zap className="w-7 h-7 animate-pulse text-[#E07A5F]" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider block">
                PROJECT IMPACT SCORE ENGINE
              </span>
              <h2 className="text-xl font-bold text-white">{project.title}</h2>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-black font-mono text-emerald-400">
              {imp.overall} / 100
            </div>
            <span className="text-xs text-[#A3A3A3]">Verified Builder Index</span>
          </div>
        </div>

        <p className="text-xs text-[#D4D4D4] leading-relaxed">
          The Project Impact Score is calculated dynamically across 6 weighted dimensions. High Impact Scores boost your Builder Score and place your project at the top of Recruiter Showcase Pages.
        </p>
      </div>

      {/* 6 Dimension Cards */}
      <div className="grid md:grid-cols-2 gap-5">
        {IMPACT_DIMENSIONS.map((dim) => {
          const Icon = dim.icon;
          const pct = Math.round((dim.score / dim.max) * 100);
          return (
            <div
              key={dim.id}
              className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#1B1B1B]">
                    <Icon className="w-4 h-4 text-[#C76A2A]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#1B1B1B]">{dim.title}</h3>
                </div>

                <div className="text-xs font-mono font-bold text-[#1B1B1B] bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-[#E8E5DD]">
                  {dim.score} / {dim.max} Pts
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full h-2.5 bg-[#F0ECE1] rounded-full overflow-hidden">
                  <div className={`h-full ${dim.color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                </div>
                <div className="text-[10px] font-mono text-[#787774] text-right">{pct}% Rating</div>
              </div>

              <p className="text-xs text-[#575653] leading-relaxed">{dim.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
