'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import {
  Bell,
  Mail,
  Smartphone,
  Sparkles,
  Activity,
  BarChart3,
  Sliders,
  ShieldCheck,
  Clock,
  Layers,
} from 'lucide-react';

import { NotificationHeader } from './components/NotificationHeader';
import { InAppNotificationCenterView } from './components/InAppNotificationCenterView';
import { EmailPushPreferencesView } from './components/EmailPushPreferencesView';
import { SmartPriorityDigestView } from './components/SmartPriorityDigestView';
import { PersonalizationSettingsView } from './components/PersonalizationSettingsView';
import { AINotificationsView } from './components/AINotificationsView';
import { ActivityFeedTimelineView } from './components/ActivityFeedTimelineView';
import { NotificationAnalyticsView } from './components/NotificationAnalyticsView';

export default function StudentNotificationsPage() {
  const [activeTab, setActiveTab] = useState<
    | 'center'
    | 'email-push'
    | 'digest'
    | 'settings'
    | 'ai-feed'
    | 'activity-feed'
    | 'analytics'
  >('center');

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-[1280px] mx-auto pb-20">
        {/* Header */}
        <NotificationHeader activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as any)} />

        {/* Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8E5DD] text-xs font-bold no-scrollbar">
          {[
            { id: 'center', label: 'Notification Center', icon: Bell },
            { id: 'ai-feed', label: 'AI Intelligence Feed', icon: Sparkles, badge: 'AI' },
            { id: 'email-push', label: 'Email & Push Rules', icon: Mail },
            { id: 'digest', label: 'Priority & Digest System', icon: Clock },
            { id: 'activity-feed', label: 'Activity Feed Timeline', icon: Activity },
            { id: 'settings', label: 'User Controls & Quiet Hours', icon: Sliders },
            { id: 'analytics', label: 'Notification Telemetry', icon: BarChart3 },
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

        {/* Dynamic Views */}
        <main>
          {activeTab === 'center' && <InAppNotificationCenterView />}
          {activeTab === 'ai-feed' && <AINotificationsView />}
          {activeTab === 'email-push' && <EmailPushPreferencesView />}
          {activeTab === 'digest' && <SmartPriorityDigestView />}
          {activeTab === 'activity-feed' && <ActivityFeedTimelineView />}
          {activeTab === 'settings' && <PersonalizationSettingsView />}
          {activeTab === 'analytics' && <NotificationAnalyticsView />}
        </main>
      </div>
    </PortalLayout>
  );
}
