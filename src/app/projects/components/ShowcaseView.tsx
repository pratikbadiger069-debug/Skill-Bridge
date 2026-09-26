'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Flame,
  Award,
  Clock,
  ShieldCheck,
  ExternalLink,
  GitBranch,
  Eye,
  Users,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { ProjectHubItem } from '../types';

interface ShowcaseViewProps {
  projects: ProjectHubItem[];
  onSelectProject: (proj: ProjectHubItem) => void;
  onOpenPassport: (proj: ProjectHubItem) => void;
}

export function ShowcaseView({
  projects,
  onSelectProject,
  onOpenPassport,
}: ShowcaseViewProps) {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<
    'featured' | 'trending' | 'builders' | 'newest' | 'industry'
  >('featured');

  const featuredProjects = projects.filter((p) => p.impactScore.overall >= 90);
  const trendingProjects = [...projects].sort((a, b) => b.starsCount - a.starsCount);
  const newestProjects = [...projects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const industryReadyProjects = projects.filter((p) => p.status === 'Production Ready' || p.status === 'Verified');

  const bestBuilders = [
    { rank: 1, name: 'Pratik Badiger', avatar: 'https://github.com/pratikbadiger069.png', handle: '@pratikbadiger069', impactScore: 94, totalProjects: 8, stars: 164, badge: 'Elite Builder' },
    { rank: 2, name: 'Ananya Sharma', avatar: '', handle: '@anasharma', impactScore: 91, totalProjects: 6, stars: 120, badge: 'Architect' },
    { rank: 3, name: 'Rohan Verma', avatar: '', handle: '@rohanv', impactScore: 88, totalProjects: 5, stars: 95, badge: 'DevOps Lead' },
    { rank: 4, name: 'Kavya Nair', avatar: '', handle: '@kavyan', impactScore: 86, totalProjects: 4, stars: 82, badge: 'AI Creator' },
  ];

  return (
    <div className="space-y-6">
      {/* Showcase Sub-Navigation Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-[#E8E5DD] shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {[
          { id: 'featured', label: 'Featured Projects', icon: Star, count: featuredProjects.length },
          { id: 'trending', label: 'Trending Projects', icon: Flame, count: trendingProjects.length },
          { id: 'builders', label: 'Best Builders', icon: Award, count: bestBuilders.length },
          { id: 'newest', label: 'Newest Submissions', icon: Clock, count: newestProjects.length },
          { id: 'industry', label: 'Industry Ready', icon: ShieldCheck, count: industryReadyProjects.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeShowcaseTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveShowcaseTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isSelected
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'text-[#575653] hover:text-[#1B1B1B] hover:bg-[#FAF8F5]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#C76A2A]' : 'text-[#787774]'}`} />
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-white/20 text-current">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 1. Featured Projects Grid */}
      {activeShowcaseTab === 'featured' && (
        <div className="grid md:grid-cols-2 gap-5">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl p-5 border border-[#E8E5DD] hover:border-[#C76A2A] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#C76A2A]/10 text-[#C76A2A] border border-[#C76A2A]/20">
                      ★ Featured Showcase
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#FAF8F5] border border-[#E8E5DD] text-[#575653]">
                      {project.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    <span>Impact: {project.impactScore.overall}/100</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#1B1B1B] hover:text-[#C76A2A] transition-colors cursor-pointer" onClick={() => onSelectProject(project)}>
                  {project.title}
                </h3>
                <p className="text-xs text-[#575653] leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#FAF8F5] text-[#1B1B1B] border border-[#E8E5DD]">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Team & Activity Metrics */}
                <div className="flex items-center justify-between pt-2 text-[11px] text-[#787774] border-t border-[#F0ECE1]">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#1B1B1B]">Lead: {project.teamMembers[0]?.name || 'Student'}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {project.starsCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#787774]" />
                      {project.viewsCount}
                    </span>
                  </div>

                  <span className="text-emerald-700 font-semibold">{project.verification.facultyGrade}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => onSelectProject(project)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Open Workspace</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenPassport(project)}
                  className="py-2 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#E8E5DD] border border-[#DCD6C9] text-xs font-medium text-[#1B1B1B] flex items-center gap-1"
                >
                  <Award className="w-3.5 h-3.5 text-[#C76A2A]" />
                  <span>Passport Seal</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Trending Projects List */}
      {activeShowcaseTab === 'trending' && (
        <div className="space-y-3">
          {trendingProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="bg-white rounded-2xl p-4 border border-[#E8E5DD] hover:border-[#C76A2A] shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] flex items-center justify-center font-mono font-bold text-xs text-[#1B1B1B] shrink-0">
                  #{idx + 1}
                </div>
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#1B1B1B] truncate">{project.title}</h4>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-amber-100 text-amber-800 font-bold shrink-0">
                      🔥 High Velocity
                    </span>
                  </div>
                  <p className="text-xs text-[#575653] truncate">{project.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 text-xs font-mono text-[#787774]">
                <div className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{project.starsCount} Stars</span>
                </div>
                <div className="text-emerald-700 font-bold">
                  Score: {project.impactScore.overall}
                </div>
                <ChevronRight className="w-4 h-4 text-[#1B1B1B]" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Best Builders Leaderboard */}
      {activeShowcaseTab === 'builders' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C76A2A]" />
                Top Student Builder Leaderboard
              </h3>
              <p className="text-xs text-[#575653]">Ranked by aggregate verified Project Impact Scores & code quality</p>
            </div>
            <span className="text-xs font-mono text-[#787774]">Updated Daily</span>
          </div>

          <div className="space-y-3">
            {bestBuilders.map((builder) => (
              <div
                key={builder.rank}
                className="p-4 rounded-xl border border-[#E8E5DD] bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1B1B1B] text-white flex items-center justify-center font-mono font-bold text-xs">
                    #{builder.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#1B1B1B]">{builder.name}</h4>
                      <span className="text-xs font-mono text-[#787774]">{builder.handle}</span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-[#C76A2A]/10 text-[#C76A2A]">
                        {builder.badge}
                      </span>
                    </div>
                    <div className="text-xs text-[#575653] mt-0.5">
                      {builder.totalProjects} Verified Projects • {builder.stars} Stars Received
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-bold font-mono text-emerald-700">{builder.impactScore} Score</div>
                    <span className="text-[10px] text-[#787774]">Top 2% Builder</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Newest Projects */}
      {activeShowcaseTab === 'newest' && (
        <div className="grid md:grid-cols-2 gap-5">
          {newestProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="bg-white rounded-2xl p-5 border border-[#E8E5DD] hover:border-[#C76A2A] shadow-xs cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-blue-100 text-blue-800 font-bold">
                  {project.type}
                </span>
                <span className="text-[11px] font-mono text-[#787774]">Added {project.createdAt}</span>
              </div>
              <h3 className="text-sm font-bold text-[#1B1B1B]">{project.title}</h3>
              <p className="text-xs text-[#575653] line-clamp-2">{project.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* 5. Industry Ready Projects */}
      {activeShowcaseTab === 'industry' && (
        <div className="grid md:grid-cols-2 gap-5">
          {industryReadyProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl p-5 border border-emerald-200 bg-emerald-50/20 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-600 text-white flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% Industry Ready
                </span>
                <span className="text-xs font-bold text-emerald-800 font-mono">
                  Grade: {project.verification.facultyGrade}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#1B1B1B]">{project.title}</h3>
              <p className="text-xs text-[#575653]">{project.description}</p>
              <div className="flex items-center justify-between pt-2 text-xs border-t border-emerald-200">
                <span className="text-emerald-900 font-semibold">
                  Verified by: {project.verification.facultyReviewer}
                </span>
                <button
                  onClick={() => onOpenPassport(project)}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  View Credential Seal →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
