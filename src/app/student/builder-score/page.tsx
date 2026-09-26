'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import {
  Award,
  Sliders,
  ShieldCheck,
  TrendingUp,
  HelpCircle,
  BarChart3,
  Layers,
} from 'lucide-react';

import { ScoreHeader } from './components/ScoreHeader';
import { ScoreBreakdownView } from './components/ScoreBreakdownView';
import { LevelProgressionView } from './components/LevelProgressionView';
import { ExplanationPanel } from './components/ExplanationPanel';
import { AntiManipulationView } from './components/AntiManipulationView';
import { ScoreHistoryTimelineView } from './components/ScoreHistoryTimelineView';

import {
  MOCK_BUILDER_SCORE_BREAKDOWN,
  MOCK_ANTI_MANIPULATION_FLAGS,
  MOCK_SCORE_HISTORY,
  BuilderScoreCategoryBreakdown,
} from '@/lib/builder-score-engine';

export default function StudentBuilderScorePage() {
  const [activeTab, setActiveTab] = useState<'breakdown' | 'progression' | 'audit' | 'history'>('breakdown');
  const [selectedCategory, setSelectedCategory] = useState<BuilderScoreCategoryBreakdown | null>(null);

  const currentScore = 890;
  const currentRank = 4;

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-[1280px] mx-auto pb-20">
        {/* Header */}
        <ScoreHeader score={currentScore} rank={currentRank} />

        {/* Command Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8E5DD] text-xs font-bold no-scrollbar">
          {[
            { id: 'breakdown', label: 'Score Breakdown (6 Categories)', icon: Sliders },
            { id: 'progression', label: '7-Tier Level Progression', icon: Award },
            { id: 'audit', label: 'Anti-Manipulation Audit', icon: ShieldCheck, badge: 'Zero Trust' },
            { id: 'history', label: 'History & Growth Trends', icon: TrendingUp },
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

        {/* Main Content Area */}
        <main>
          {activeTab === 'breakdown' && (
            <ScoreBreakdownView
              breakdown={MOCK_BUILDER_SCORE_BREAKDOWN}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
            />
          )}

          {activeTab === 'progression' && <LevelProgressionView score={currentScore} />}

          {activeTab === 'audit' && <AntiManipulationView flags={MOCK_ANTI_MANIPULATION_FLAGS} />}

          {activeTab === 'history' && <ScoreHistoryTimelineView history={MOCK_SCORE_HISTORY} />}
        </main>

        {/* Explainable Score Panel Modal */}
        <ExplanationPanel category={selectedCategory} onClose={() => setSelectedCategory(null)} />
      </div>
    </PortalLayout>
  );
}
