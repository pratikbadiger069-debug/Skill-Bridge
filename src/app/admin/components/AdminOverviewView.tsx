'use client';

import React from 'react';
import {
  Users,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Award,
  Users2,
  Activity,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { AdminUser, AdminProjectReview, AdminOpportunityItem } from '../types';

interface AdminOverviewViewProps {
  users: AdminUser[];
  projects: AdminProjectReview[];
  opportunities: AdminOpportunityItem[];
  onNavigateTab: (tab: string) => void;
}

export const AdminOverviewView: React.FC<AdminOverviewViewProps> = ({
  users,
  projects,
  opportunities,
  onNavigateTab,
}) => {
  const totalUsers = 14400;
  const activeUsers = 11850;
  const totalStudents = 13200;
  const totalFaculty = 480;
  const totalProjects = 3410;
  const totalAssessments = 1240;
  const totalOpportunities = 186;
  const totalCommunityPosts = 8920;

  return (
    <div className="space-y-6">
      {/* 8 Metric Cards Grid (2 rows of 4) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-5 rounded-3xl bg-white border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold">Total Users</span>
            <div className="w-8 h-8 rounded-xl bg-[#1B1B1B]/5 text-[#1B1B1B] flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <strong className="text-2xl sm:text-3xl font-bold font-mono text-[#1B1B1B]">
            {totalUsers.toLocaleString()}
          </strong>
          <span className="text-[10px] text-[#2F7A45] font-bold block">+18.4% MoM Growth</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold">Active Users</span>
            <div className="w-8 h-8 rounded-xl bg-[#2F7A45]/10 text-[#2F7A45] flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <strong className="text-2xl sm:text-3xl font-bold font-mono text-[#2F7A45]">
            {activeUsers.toLocaleString()}
          </strong>
          <span className="text-[10px] text-[#6F6A60] block">82.3% DAU/MAU ratio</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold">Students</span>
            <div className="w-8 h-8 rounded-xl bg-[#C76A2A]/10 text-[#C76A2A] flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <strong className="text-2xl sm:text-3xl font-bold font-mono text-[#C76A2A]">
            {totalStudents.toLocaleString()}
          </strong>
          <span className="text-[10px] text-[#6F6A60] block">Across 48 Partner Insitutes</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold">Faculty</span>
            <div className="w-8 h-8 rounded-xl bg-[#1B1B1B]/5 text-[#1B1B1B] flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <strong className="text-2xl sm:text-3xl font-bold font-mono text-[#1B1B1B]">
            {totalFaculty.toLocaleString()}
          </strong>
          <span className="text-[10px] text-[#2F7A45] font-bold block">100% Verified Educators</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold">Projects</span>
            <div className="w-8 h-8 rounded-xl bg-[#1B1B1B]/5 text-[#1B1B1B] flex items-center justify-center font-bold">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <strong className="text-2xl sm:text-3xl font-bold font-mono text-[#1B1B1B]">
            {totalProjects.toLocaleString()}
          </strong>
          <span className="text-[10px] text-[#6F6A60] block">Verified capstones &amp; code</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold">Assessments</span>
            <div className="w-8 h-8 rounded-xl bg-[#2F7A45]/10 text-[#2F7A45] flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <strong className="text-2xl sm:text-3xl font-bold font-mono text-[#2F7A45]">
            {totalAssessments.toLocaleString()}
          </strong>
          <span className="text-[10px] text-[#6F6A60] block">Published benchmarks</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold">Opportunities</span>
            <div className="w-8 h-8 rounded-xl bg-[#C76A2A]/10 text-[#C76A2A] flex items-center justify-center font-bold">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <strong className="text-2xl sm:text-3xl font-bold font-mono text-[#C76A2A]">
            {totalOpportunities.toLocaleString()}
          </strong>
          <span className="text-[10px] text-[#2F7A45] font-bold block">320 Partner Companies</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold">Community Activity</span>
            <div className="w-8 h-8 rounded-xl bg-[#1B1B1B]/5 text-[#1B1B1B] flex items-center justify-center font-bold">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <strong className="text-2xl sm:text-3xl font-bold font-mono text-[#1B1B1B]">
            {totalCommunityPosts.toLocaleString()}
          </strong>
          <span className="text-[10px] text-[#6F6A60] block">Posts &amp; Code Reviews</span>
        </div>
      </div>

      {/* Quick Access Operational Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Management Quick Overview */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B]">Recent Platform Registrations</h3>
              <p className="text-xs text-[#6F6A60]">Audit user onboarding status across students and faculty.</p>
            </div>
            <button
              onClick={() => onNavigateTab('users')}
              className="text-xs font-bold text-[#C76A2A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>User Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {users.slice(0, 3).map((u) => (
              <div key={u.id} className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between">
                <div>
                  <strong className="text-[#1B1B1B] font-bold block">{u.name}</strong>
                  <span className="text-[10px] text-[#6F6A60]">{u.email} • {u.role}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#2F7A45]/10 text-[#2F7A45]">
                  {u.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Queue Quick Overview */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B]">Project Verification Queue</h3>
              <p className="text-xs text-[#6F6A60]">High-impact student submissions awaiting admin verification badge.</p>
            </div>
            <button
              onClick={() => onNavigateTab('project-management')}
              className="text-xs font-bold text-[#1B1B1B] hover:text-[#C76A2A] flex items-center gap-1 cursor-pointer"
            >
              <span>Project Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {projects.slice(0, 2).map((p) => (
              <div key={p.id} className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#1B1B1B]">{p.title}</h4>
                  <span className="font-mono font-bold text-[#C76A2A] text-[10px]">
                    Score: {p.verificationScore}/100
                  </span>
                </div>
                <span className="text-[10px] text-[#6F6A60]">By {p.authorName} • {p.techStack.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
