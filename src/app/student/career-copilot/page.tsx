'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { AIProviderModal } from '@/components/ai/AIProviderModal';
import {
  Compass,
  Sparkles,
  Target,
  Cpu,
  FolderGit2,
  Mic,
  Zap,
  Sun,
  Bot,
  KeyRound,
  ChevronRight,
  TrendingUp,
  Activity,
  MessageSquare,
} from 'lucide-react';

import { InputDataTelemetryBar } from './components/InputDataTelemetryBar';
import { MainDashboardView } from './components/MainDashboardView';
import { RoadmapEngineView } from './components/RoadmapEngineView';
import { SkillGapAnalysisView } from './components/SkillGapAnalysisView';
import { ProjectRecommendationView } from './components/ProjectRecommendationView';
import { InterviewPrepView } from './components/InterviewPrepView';
import { AIInsightsView } from './components/AIInsightsView';
import { DailyMentorView } from './components/DailyMentorView';
import { InteractiveMentorDrawer } from './components/InteractiveMentorDrawer';

export default function CareerCopilotPage() {
  const {
    studentProfile,
    currentUser,
    aiKeys,
    activeProvider,
    aiProviderConfigs,
    githubData,
    copilotMemory,
    assessmentHistory,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'roadmap' | 'skill-gap' | 'projects' | 'interview' | 'insights' | 'daily-mentor'
  >('dashboard');

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isMentorDrawerOpen, setIsMentorDrawerOpen] = useState(false);
  const [drawerPrompt, setDrawerPrompt] = useState<string | undefined>(undefined);

  const targetRole = studentProfile.careerPath || studentProfile.targetRole || 'Backend Engineer';
  const builderScore = studentProfile?.builderScores?.overall || 885;

  const handleOpenMentorDrawer = (prompt?: string) => {
    setDrawerPrompt(prompt);
    setIsMentorDrawerOpen(true);
  };

  const tabs = [
    { id: 'dashboard', label: 'Main Dashboard', icon: Compass, badge: 'Overview' },
    { id: 'roadmap', label: 'Roadmap Engine', icon: Target, badge: 'Month-by-Month' },
    { id: 'skill-gap', label: 'Skill Gap Analysis', icon: Cpu, badge: 'Gap Matrix' },
    { id: 'projects', label: 'Suggested Projects', icon: FolderGit2, badge: 'Tiers' },
    { id: 'interview', label: 'Interview Prep', icon: Mic, badge: '5 Modules' },
    { id: 'insights', label: 'AI Insights', icon: Zap, badge: 'Diagnostics' },
    { id: 'daily-mentor', label: 'Daily Mentor', icon: Sun, badge: 'Daily Focus' },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Top Header & Mentor Telemetry Title */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-[#1B1B1B] text-[#C76A2A] shadow-md border border-[#333]">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-[#1B1B1B]">Career Copilot</h1>
                <span className="px-2.5 py-0.5 text-xs font-mono font-semibold rounded-full bg-[#C76A2A]/10 text-[#C76A2A] border border-[#C76A2A]/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C76A2A] animate-ping" />
                  Mentor Intelligence Active
                </span>
              </div>
              <p className="text-xs text-[#575653] mt-0.5">
                Guided career mentorship engine powered by real-time assessment, code quality, and job-market telemetry.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="py-2 px-3.5 rounded-xl bg-[#FAF8F5] hover:bg-[#E8E5DD] border border-[#DCD6C9] text-xs font-medium text-[#1B1B1B] flex items-center gap-2 transition-colors"
            >
              <KeyRound className="w-4 h-4 text-[#C76A2A]" />
              <span className="capitalize">{activeProvider} AI Config</span>
            </button>

            <button
              onClick={() => handleOpenMentorDrawer()}
              className="py-2 px-4 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#C76A2A]" />
              <span>Talk to AI Mentor</span>
            </button>
          </div>
        </div>

        {/* INPUT DATA TELEMETRY BAR (7 Inputs) */}
        <InputDataTelemetryBar
          studentProfile={studentProfile}
          githubData={githubData}
          builderScore={builderScore}
        />

        {/* NAVIGATION TABS BAR (7 Main Sections) */}
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

        {/* DYNAMIC TAB VIEW DISPLAY */}
        <div>
          {activeTab === 'dashboard' && (
            <MainDashboardView
              studentProfile={studentProfile}
              targetRole={targetRole}
              onSelectTab={(tab) => setActiveTab(tab as any)}
              onOpenMentorDrawer={handleOpenMentorDrawer}
            />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapEngineView onOpenMentorDrawer={handleOpenMentorDrawer} />
          )}

          {activeTab === 'skill-gap' && (
            <SkillGapAnalysisView onOpenMentorDrawer={handleOpenMentorDrawer} />
          )}

          {activeTab === 'projects' && (
            <ProjectRecommendationView onOpenMentorDrawer={handleOpenMentorDrawer} />
          )}

          {activeTab === 'interview' && (
            <InterviewPrepView onOpenMentorDrawer={handleOpenMentorDrawer} />
          )}

          {activeTab === 'insights' && (
            <AIInsightsView
              onOpenMentorDrawer={handleOpenMentorDrawer}
              onSelectTab={(tab) => setActiveTab(tab as any)}
            />
          )}

          {activeTab === 'daily-mentor' && (
            <DailyMentorView
              onOpenMentorDrawer={handleOpenMentorDrawer}
              onSelectTab={(tab) => setActiveTab(tab as any)}
            />
          )}
        </div>
      </div>

      {/* AI Provider Config Modal */}
      <AIProviderModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />

      {/* Interactive AI Mentor Drawer */}
      <InteractiveMentorDrawer
        isOpen={isMentorDrawerOpen}
        onClose={() => setIsMentorDrawerOpen(false)}
        initialPrompt={drawerPrompt}
        studentProfile={studentProfile}
        targetRole={targetRole}
        activeProvider={activeProvider}
        aiKeys={aiKeys}
        copilotMemory={copilotMemory}
        githubData={githubData}
        assessmentHistory={assessmentHistory}
      />
    </PortalLayout>
  );
}
