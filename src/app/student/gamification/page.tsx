'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import {
  Award,
  ShieldCheck,
  Target,
  Trophy,
  Calendar,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react';

import { GamificationHeader } from './components/GamificationHeader';
import { XpSourcesRulesView } from './components/XpSourcesRulesView';
import { MissionsView } from './components/MissionsView';
import { AchievementsView } from './components/AchievementsView';
import { VerifiedLeaderboardView } from './components/VerifiedLeaderboardView';
import { SeasonalEventsView } from './components/SeasonalEventsView';

import {
  MOCK_DAILY_MISSIONS,
  MOCK_WEEKLY_MISSIONS,
  MOCK_ACHIEVEMENTS,
  MOCK_SEASONAL_EVENTS,
  MOCK_LEADERBOARD_USERS,
} from '@/lib/mock-gamification';
import { DailyMission, WeeklyMission } from '@/lib/xp-engine';

export default function StudentGamificationPage() {
  const [activeTab, setActiveTab] = useState<'rules' | 'missions' | 'achievements' | 'leaderboard' | 'events'>('missions');
  const [dailyMissions, setDailyMissions] = useState<DailyMission[]>(MOCK_DAILY_MISSIONS);
  const [weeklyMissions, setWeeklyMissions] = useState<WeeklyMission[]>(MOCK_WEEKLY_MISSIONS);
  const [totalXP, setTotalXP] = useState<number>(4250);

  const handleClaimDaily = (id: string) => {
    setDailyMissions((prev) =>
      prev.map((m) => {
        if (m.id === id && !m.isCompleted) {
          setTotalXP((current) => current + m.xpReward);
          return { ...m, isCompleted: true, currentCount: m.targetCount };
        }
        return m;
      })
    );
  };

  const handleClaimWeekly = (id: string) => {
    setWeeklyMissions((prev) =>
      prev.map((wm) => {
        if (wm.id === id && !wm.isCompleted) {
          setTotalXP((current) => current + wm.xpReward);
          return { ...wm, isCompleted: true, currentCount: wm.targetCount };
        }
        return wm;
      })
    );
  };

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-[1280px] mx-auto pb-20">
        {/* Header */}
        <GamificationHeader totalXP={totalXP} />

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8E5DD] text-xs font-bold no-scrollbar">
          {[
            { id: 'missions', label: 'Daily & Weekly Missions', icon: Target },
            { id: 'rules', label: 'XP Rewards & Anti-Spam Rules', icon: ShieldCheck },
            { id: 'achievements', label: 'Achievements & Badges', icon: Award },
            { id: 'leaderboard', label: 'Verified Leaderboards', icon: Trophy, badge: 'Verified' },
            { id: 'events', label: 'Seasonal Events', icon: Calendar },
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
          {activeTab === 'missions' && (
            <MissionsView
              dailyMissions={dailyMissions}
              weeklyMissions={weeklyMissions}
              onClaimDaily={handleClaimDaily}
              onClaimWeekly={handleClaimWeekly}
            />
          )}

          {activeTab === 'rules' && <XpSourcesRulesView />}

          {activeTab === 'achievements' && <AchievementsView achievements={MOCK_ACHIEVEMENTS} />}

          {activeTab === 'leaderboard' && <VerifiedLeaderboardView leaderboardUsers={MOCK_LEADERBOARD_USERS} />}

          {activeTab === 'events' && <SeasonalEventsView events={MOCK_SEASONAL_EVENTS} />}
        </main>
      </div>
    </PortalLayout>
  );
}
