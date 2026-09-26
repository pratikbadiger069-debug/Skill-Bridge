'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { JourneyHeader } from './components/JourneyHeader';
import { VisualJourneyPath } from './components/VisualJourneyPath';
import { MilestonesChecklist } from './components/MilestonesChecklist';
import { ChronologicalTimeline } from './components/ChronologicalTimeline';
import { ProgressMetricsView } from './components/ProgressMetricsView';
import { AchievementsView } from './components/AchievementsView';
import { SkillEvolutionView } from './components/SkillEvolutionView';
import { JourneyInsightsView } from './components/JourneyInsightsView';
import { ExportReportModal } from './components/ExportReportModal';

export default function MyJourneyPage() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-6xl mx-auto pb-16 font-sans text-[#1B1B1B]">
        {/* HEADER */}
        <JourneyHeader onExport={() => setIsExportModalOpen(true)} />

        {/* VISUAL JOURNEY PATH */}
        <VisualJourneyPath />

        {/* MILESTONES */}
        <MilestonesChecklist />

        {/* PROGRESS METRICS */}
        <ProgressMetricsView />

        {/* SKILL EVOLUTION */}
        <SkillEvolutionView />

        {/* ACHIEVEMENTS */}
        <AchievementsView />

        {/* JOURNEY INSIGHTS */}
        <JourneyInsightsView />

        {/* CHRONOLOGICAL TIMELINE */}
        <ChronologicalTimeline />
      </div>

      {/* EXPORT REPORT MODAL */}
      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </PortalLayout>
  );
}
