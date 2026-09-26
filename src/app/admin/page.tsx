'use client';

import React, { useState, useEffect } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import {
  LayoutDashboard,
  Users,
  Award,
  Users2,
  FolderGit2,
  Briefcase,
  BarChart3,
  ShieldCheck,
  Settings,
  FileText,
} from 'lucide-react';

import { AdminHeader } from './components/AdminHeader';
import { AdminOverviewView } from './components/AdminOverviewView';
import { UserManagementView } from './components/UserManagementView';
import { AssessmentManagementView } from './components/AssessmentManagementView';
import { CommunityManagementView } from './components/CommunityManagementView';
import { ProjectManagementView } from './components/ProjectManagementView';
import { OpportunityManagementView } from './components/OpportunityManagementView';
import { AnalyticsView } from './components/AnalyticsView';
import { SecurityDashboardView } from './components/SecurityDashboardView';
import { SystemSettingsView } from './components/SystemSettingsView';
import { AdminReportsView } from './components/AdminReportsView';

import {
  MOCK_ADMIN_USERS,
  MOCK_QUESTION_BANK,
  MOCK_ADMIN_ASSESSMENTS,
  MOCK_COMMUNITY_MODERATION,
  MOCK_ADMIN_PROJECTS,
  MOCK_ADMIN_OPPORTUNITIES,
  MOCK_SECURITY_LOGS,
  MOCK_FEATURE_FLAGS,
} from './mock-admin';

import {
  AdminUser,
  UserRole,
  UserAccountStatus,
  QuestionBankItem,
  AdminAssessmentConfig,
  CommunityModerationItem,
  AdminProjectReview,
  AdminOpportunityItem,
  SystemFeatureFlag,
} from './types';

export default function AdminDashboardPage() {
  const { setRole } = useAppStore();
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'users'
    | 'assessments'
    | 'community'
    | 'project-management'
    | 'opportunities'
    | 'analytics'
    | 'security'
    | 'settings'
    | 'reports'
  >('overview');

  const [usersList, setUsersList] = useState<AdminUser[]>(MOCK_ADMIN_USERS);
  const [questionsList, setQuestionsList] = useState<QuestionBankItem[]>(MOCK_QUESTION_BANK);
  const [assessmentsList, setAssessmentsList] = useState<AdminAssessmentConfig[]>(MOCK_ADMIN_ASSESSMENTS);
  const [moderationList, setModerationList] = useState<CommunityModerationItem[]>(MOCK_COMMUNITY_MODERATION);
  const [projectsList, setProjectsList] = useState<AdminProjectReview[]>(MOCK_ADMIN_PROJECTS);
  const [opportunitiesList, setOpportunitiesList] = useState<AdminOpportunityItem[]>(MOCK_ADMIN_OPPORTUNITIES);
  const [flagsList, setFlagsList] = useState<SystemFeatureFlag[]>(MOCK_FEATURE_FLAGS);

  useEffect(() => {
    setRole('admin');
  }, [setRole]);

  // User Handlers
  const handleAddUser = (newUser: Omit<AdminUser, 'id' | 'joinedDate' | 'lastLogin'>) => {
    const created: AdminUser = {
      ...newUser,
      id: `usr-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Just now',
    };
    setUsersList((prev) => [created, ...prev]);
  };

  const handleUpdateUserRole = (id: string, newRole: UserRole) => {
    setUsersList((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  };

  const handleToggleUserStatus = (id: string, newStatus: UserAccountStatus) => {
    setUsersList((prev) => prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));
  };

  const handleDeleteUser = (id: string) => {
    setUsersList((prev) => prev.filter((u) => u.id !== id));
  };

  // Question & Assessment Handlers
  const handleAddQuestion = (q: Omit<QuestionBankItem, 'id'>) => {
    const created: QuestionBankItem = { ...q, id: `qb-${Date.now()}` };
    setQuestionsList((prev) => [created, ...prev]);
  };

  const handleAddAssessment = (a: Omit<AdminAssessmentConfig, 'id'>) => {
    const created: AdminAssessmentConfig = { ...a, id: `asm-${Date.now()}` };
    setAssessmentsList((prev) => [created, ...prev]);
  };

  // Community Handlers
  const handleApproveCommunityItem = (id: string) => {
    setModerationList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'Approved', flagReason: undefined } : m))
    );
  };

  const handleArchiveCommunityItem = (id: string) => {
    setModerationList((prev) => prev.filter((m) => m.id !== id));
  };

  // Project Handlers
  const handleToggleProjectFeatured = (id: string) => {
    setProjectsList((prev) => prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p)));
  };

  const handleVerifyProject = (id: string, verified: boolean) => {
    setProjectsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: verified ? 'Verified' : 'Rejected' } : p))
    );
  };

  // Opportunity Handlers
  const handleAddOpportunity = (opp: Omit<AdminOpportunityItem, 'id' | 'applicantsCount' | 'createdAt'>) => {
    const created: AdminOpportunityItem = {
      ...opp,
      id: `opp-${Date.now()}`,
      applicantsCount: 0,
      createdAt: 'Just now',
    };
    setOpportunitiesList((prev) => [created, ...prev]);
  };

  const handleArchiveOpportunity = (id: string) => {
    setOpportunitiesList((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'Archived' } : o))
    );
  };

  // Feature Flag Handler
  const handleToggleFlag = (id: string) => {
    setFlagsList((prev) => prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)));
  };

  const handleQuickAction = (action: string) => {
    if (action === 'create-user') {
      setActiveTab('users');
    } else if (action === 'security') {
      setActiveTab('security');
    } else if (action === 'export-report') {
      setActiveTab('reports');
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-[1280px] mx-auto pb-20">
        {/* Header */}
        <AdminHeader onQuickAction={handleQuickAction} activeTab={activeTab} />

        {/* Primary Command Navigation Bar (10 Main Sections) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8E5DD] text-xs font-bold no-scrollbar">
          {[
            { id: 'overview', label: 'Admin Overview', icon: LayoutDashboard },
            { id: 'users', label: 'User Management', icon: Users },
            { id: 'assessments', label: 'Assessment Control', icon: Award },
            { id: 'community', label: 'Community Governance', icon: Users2 },
            { id: 'project-management', label: 'Project Verification', icon: FolderGit2 },
            { id: 'opportunities', label: 'Opportunity Hub', icon: Briefcase },
            { id: 'analytics', label: 'Platform Analytics', icon: BarChart3 },
            { id: 'security', label: 'Security Dashboard', icon: ShieldCheck, badge: 'Zero Trust' },
            { id: 'settings', label: 'System Settings', icon: Settings },
            { id: 'reports', label: 'Platform Reports', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2.5 rounded-2xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'bg-white border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B] hover:border-[#1B1B1B]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C76A2A]' : 'text-[#6F6A60]'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-[#C76A2A] text-white' : 'bg-[#C76A2A]/10 text-[#C76A2A]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Main View */}
        <main>
          {activeTab === 'overview' && (
            <AdminOverviewView
              users={usersList}
              projects={projectsList}
              opportunities={opportunitiesList}
              onNavigateTab={(tab) => setActiveTab(tab as any)}
            />
          )}

          {activeTab === 'users' && (
            <UserManagementView
              users={usersList}
              onAddUser={handleAddUser}
              onUpdateUserRole={handleUpdateUserRole}
              onToggleUserStatus={handleToggleUserStatus}
              onDeleteUser={handleDeleteUser}
            />
          )}

          {activeTab === 'assessments' && (
            <AssessmentManagementView
              questions={questionsList}
              assessments={assessmentsList}
              onAddQuestion={handleAddQuestion}
              onAddAssessment={handleAddAssessment}
            />
          )}

          {activeTab === 'community' && (
            <CommunityManagementView
              moderationItems={moderationList}
              onApproveItem={handleApproveCommunityItem}
              onArchiveItem={handleArchiveCommunityItem}
            />
          )}

          {activeTab === 'project-management' && (
            <ProjectManagementView
              projects={projectsList}
              onToggleFeatured={handleToggleProjectFeatured}
              onVerifyProject={handleVerifyProject}
            />
          )}

          {activeTab === 'opportunities' && (
            <OpportunityManagementView
              opportunities={opportunitiesList}
              onAddOpportunity={handleAddOpportunity}
              onArchiveOpportunity={handleArchiveOpportunity}
            />
          )}

          {activeTab === 'analytics' && <AnalyticsView />}

          {activeTab === 'security' && <SecurityDashboardView logs={MOCK_SECURITY_LOGS} />}

          {activeTab === 'settings' && (
            <SystemSettingsView featureFlags={flagsList} onToggleFlag={handleToggleFlag} />
          )}

          {activeTab === 'reports' && <AdminReportsView />}
        </main>
      </div>
    </PortalLayout>
  );
}
