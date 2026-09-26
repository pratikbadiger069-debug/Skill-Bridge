'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import {
  MOCK_OPPORTUNITIES,
  MOCK_APPLICATIONS,
  MOCK_RECRUITER_BUILDERS,
} from './mock-opportunities';
import {
  OpportunityItem,
  ApplicationRecord,
  ApplicationStage,
} from './types';

import { OpportunityHeader } from './components/OpportunityHeader';
import { OpportunityDashboardView } from './components/OpportunityDashboardView';
import { MatchEngineDiagnosticView } from './components/MatchEngineDiagnosticView';
import { AIOpportunityInsightsView } from './components/AIOpportunityInsightsView';
import { ApplicationTrackerView } from './components/ApplicationTrackerView';
import { BookmarkCalendarView } from './components/BookmarkCalendarView';
import { RecruiterDiscoveryView } from './components/RecruiterDiscoveryView';
import { OpportunityAnalyticsView } from './components/OpportunityAnalyticsView';
import { OpportunityDetailsModal } from './components/OpportunityDetailsModal';

import {
  Briefcase,
  Zap,
  Sparkles,
  CheckCircle2,
  Bookmark,
  Users,
  BarChart3,
  Target,
} from 'lucide-react';

export default function OpportunitiesHubPage() {
  const [opportunitiesList, setOpportunitiesList] = useState<OpportunityItem[]>(MOCK_OPPORTUNITIES);
  const [applicationsList, setApplicationsList] = useState<ApplicationRecord[]>(MOCK_APPLICATIONS);
  const [selectedOppId, setSelectedOppId] = useState<string>(MOCK_OPPORTUNITIES[0].id);

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'match-engine' | 'ai-insights' | 'tracker' | 'bookmarks' | 'recruiter-discovery' | 'analytics'
  >('dashboard');

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [modalOpportunity, setModalOpportunity] = useState<OpportunityItem>(MOCK_OPPORTUNITIES[0]);

  const activeOpportunity =
    opportunitiesList.find((o) => o.id === selectedOppId) || opportunitiesList[0];

  const qualifiedCount = opportunitiesList.filter((o) => o.match.overallMatchScore >= 80).length;

  const handleToggleSave = (opp: OpportunityItem) => {
    setOpportunitiesList((prev) =>
      prev.map((o) => (o.id === opp.id ? { ...o, saved: !o.saved } : o))
    );
  };

  const handleSelectOpportunity = (opp: OpportunityItem) => {
    setSelectedOppId(opp.id);
    setModalOpportunity(opp);
    setIsDetailsModalOpen(true);
  };

  const handleOpenInsights = (opp: OpportunityItem) => {
    setSelectedOppId(opp.id);
    setActiveTab('ai-insights');
  };

  const handleApplyOpportunity = (opp: OpportunityItem) => {
    setOpportunitiesList((prev) =>
      prev.map((o) => (o.id === opp.id ? { ...o, applied: true, applicationStage: 'Applied' } : o))
    );

    const exists = applicationsList.some((a) => a.opportunityId === opp.id);
    if (!exists) {
      const newApp: ApplicationRecord = {
        id: `app-${Date.now()}`,
        opportunityId: opp.id,
        title: opp.title,
        organization: opp.organization,
        stage: 'Applied',
        appliedDate: 'Just now',
        lastUpdatedDate: 'Just now',
        nextStep: 'Awaiting Recruiter Screening',
      };
      setApplicationsList((prev) => [newApp, ...prev]);
    }
  };

  const handleUpdateStage = (appId: string, newStage: ApplicationStage) => {
    setApplicationsList((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, stage: newStage, lastUpdatedDate: 'Just now' } : a))
    );
  };

  const tabs = [
    { id: 'dashboard', label: 'Opportunity Dashboard', icon: Briefcase, badge: '12 Types' },
    { id: 'match-engine', label: 'Match Diagnostic', icon: Target, badge: '7 Dimensions' },
    { id: 'ai-insights', label: 'AI Insights', icon: Sparkles, badge: 'Roadmap' },
    { id: 'tracker', label: 'Application Tracker', icon: CheckCircle2, badge: 'Kanban' },
    { id: 'bookmarks', label: 'Bookmarks & Calendar', icon: Bookmark, badge: 'Sync' },
    { id: 'recruiter-discovery', label: 'Recruiter Discovery', icon: Users, badge: 'Verified' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: 'Trends' },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Top Header */}
        <OpportunityHeader
          readinessScore={74}
          qualifiedCount={qualifiedCount}
          onOpenMatchEngine={() => setActiveTab('match-engine')}
        />

        {/* Selected Opportunity Selector Bar */}
        {activeTab !== 'dashboard' && activeTab !== 'tracker' && activeTab !== 'recruiter-discovery' && activeTab !== 'analytics' && (
          <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[#787774] uppercase font-bold text-[10px]">
                SELECTED TARGET OPPORTUNITY:
              </span>
              <select
                value={selectedOppId}
                onChange={(e) => setSelectedOppId(e.target.value)}
                className="p-1.5 rounded-lg border border-[#DCD6C9] bg-white font-bold text-[#1B1B1B] focus:outline-none"
              >
                {opportunitiesList.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.title} ({o.organization} • {o.match.overallMatchScore}% Match)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono text-[#787774]">
              <span>Deadline: <strong className="text-rose-700">{activeOpportunity.deadline}</strong></span>
              <span>•</span>
              <span>Match Rating: <strong className="text-emerald-700">{activeOpportunity.match.overallMatchScore}%</strong></span>
            </div>
          </div>
        )}

        {/* 7 Main Navigation Tabs */}
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

        {/* Dynamic Views */}
        <div>
          {activeTab === 'dashboard' && (
            <OpportunityDashboardView
              opportunities={opportunitiesList}
              onSelectOpportunity={handleSelectOpportunity}
              onToggleSave={handleToggleSave}
              onOpenInsights={handleOpenInsights}
            />
          )}

          {activeTab === 'match-engine' && (
            <MatchEngineDiagnosticView
              opportunity={activeOpportunity}
              onOpenInsights={handleOpenInsights}
            />
          )}

          {activeTab === 'ai-insights' && (
            <AIOpportunityInsightsView
              opportunity={activeOpportunity}
              onNavigateTab={(tab) => setActiveTab(tab as any)}
            />
          )}

          {activeTab === 'tracker' && (
            <ApplicationTrackerView
              applications={applicationsList}
              onUpdateStage={handleUpdateStage}
            />
          )}

          {activeTab === 'bookmarks' && (
            <BookmarkCalendarView
              opportunities={opportunitiesList}
              onSelectOpportunity={handleSelectOpportunity}
              onToggleSave={handleToggleSave}
            />
          )}

          {activeTab === 'recruiter-discovery' && (
            <RecruiterDiscoveryView builders={MOCK_RECRUITER_BUILDERS} />
          )}

          {activeTab === 'analytics' && (
            <OpportunityAnalyticsView />
          )}
        </div>
      </div>

      {/* Opportunity Details Modal */}
      <OpportunityDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        opportunity={modalOpportunity}
        onOpenInsights={handleOpenInsights}
        onApply={handleApplyOpportunity}
      />
    </PortalLayout>
  );
}
