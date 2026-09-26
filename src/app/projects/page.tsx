'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { MOCK_PROJECTS } from './mock-projects';
import { ProjectHubItem } from './types';
import { InputProjectHeader } from './components/InputProjectHeader';
import { ShowcaseView } from './components/ShowcaseView';
import { ProjectDashboardView } from './components/ProjectDashboardView';
import { GitHubIntegrationView } from './components/GitHubIntegrationView';
import { ProjectVerificationView } from './components/ProjectVerificationView';
import { ProjectImpactScoreView } from './components/ProjectImpactScoreView';
import { TeamFeaturesView } from './components/TeamFeaturesView';
import { ProjectPassportModal } from './components/ProjectPassportModal';
import { CreateProjectModal } from './components/CreateProjectModal';
import {
  FolderGit2,
  Star,
  GitBranch,
  ShieldCheck,
  Zap,
  Users,
  Award,
  ChevronDown,
} from 'lucide-react';

export default function ProjectsHubPage() {
  const [projectsList, setProjectsList] = useState<ProjectHubItem[]>(MOCK_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(MOCK_PROJECTS[0].id);

  const [activeTab, setActiveTab] = useState<
    'showcase' | 'dashboard' | 'github' | 'verification' | 'impact' | 'team'
  >('showcase');

  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [passportProject, setPassportProject] = useState<ProjectHubItem>(MOCK_PROJECTS[0]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const activeProject =
    projectsList.find((p) => p.id === selectedProjectId) || projectsList[0];

  const handleUpdateProject = (updated: ProjectHubItem) => {
    setProjectsList((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const handleCreateProject = (newProject: ProjectHubItem) => {
    setProjectsList((prev) => [newProject, ...prev]);
    setSelectedProjectId(newProject.id);
    setActiveTab('dashboard');
  };

  const handleOpenPassport = (proj?: ProjectHubItem) => {
    if (proj) setPassportProject(proj);
    else setPassportProject(activeProject);
    setIsPassportOpen(true);
  };

  const tabs = [
    { id: 'showcase', label: 'Showcase Page', icon: Star, badge: 'Community' },
    { id: 'dashboard', label: 'Project Dashboard', icon: FolderGit2, badge: 'Workspace' },
    { id: 'github', label: 'GitHub Integration', icon: GitBranch, badge: 'Telemetry' },
    { id: 'verification', label: 'Project Verification', icon: ShieldCheck, badge: '6-Point Seal' },
    { id: 'impact', label: 'Impact Score', icon: Zap, badge: 'Formula' },
    { id: 'team', label: 'Team Features', icon: Users, badge: 'Collaboration' },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Top Header: Capability Proof Banner */}
        <InputProjectHeader
          onCreateProject={() => setIsCreateModalOpen(true)}
          onOpenPassport={() => handleOpenPassport()}
        />

        {/* Active Project Selector Bar (when in workspace views) */}
        {activeTab !== 'showcase' && (
          <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[#787774] uppercase font-bold text-[10px]">
                ACTIVE PROJECT WORKSPACE:
              </span>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="p-1.5 rounded-lg border border-[#DCD6C9] bg-white font-bold text-[#1B1B1B] focus:outline-none"
              >
                {projectsList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.difficulty} • Impact: {p.impactScore.overall}/100)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono text-[#787774]">
              <span>Status: <strong className="text-[#1B1B1B]">{activeProject.status}</strong></span>
              <span>•</span>
              <span>Impact: <strong className="text-emerald-700">{activeProject.impactScore.overall}/100</strong></span>
            </div>
          </div>
        )}

        {/* Main Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 border border-[#E8E5DD] shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isSelected = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'text-[#575653] hover:text-[#1B1B1B] hover:bg-[#FAF8F5]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#C76A2A]' : 'text-[#787774]'}`} />
                <span>{t.label}</span>
                <span
                  className={`px-1.5 py-0.5 text-[9px] font-mono rounded ${
                    isSelected
                      ? 'bg-[#C76A2A] text-white'
                      : 'bg-[#FAF8F5] text-[#787774] border border-[#E8E5DD]'
                  }`}
                >
                  {t.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Views */}
        <div>
          {activeTab === 'showcase' && (
            <ShowcaseView
              projects={projectsList}
              onSelectProject={(p) => {
                setSelectedProjectId(p.id);
                setActiveTab('dashboard');
              }}
              onOpenPassport={(p) => handleOpenPassport(p)}
            />
          )}

          {activeTab === 'dashboard' && (
            <ProjectDashboardView
              project={activeProject}
              onUpdateProject={handleUpdateProject}
            />
          )}

          {activeTab === 'github' && (
            <GitHubIntegrationView project={activeProject} />
          )}

          {activeTab === 'verification' && (
            <ProjectVerificationView project={activeProject} />
          )}

          {activeTab === 'impact' && (
            <ProjectImpactScoreView project={activeProject} />
          )}

          {activeTab === 'team' && (
            <TeamFeaturesView
              project={activeProject}
              onUpdateProject={handleUpdateProject}
            />
          )}
        </div>
      </div>

      {/* Project Passport Credential Modal */}
      <ProjectPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        project={passportProject}
      />

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </PortalLayout>
  );
}
