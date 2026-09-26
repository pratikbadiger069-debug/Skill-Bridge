'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Building2,
  Calendar,
  ChevronRight,
  ListFilter,
  Activity,
  Award,
  AlertCircle,
} from 'lucide-react';
import { ApplicationRecord, ApplicationStage } from '../types';

interface ApplicationTrackerViewProps {
  applications: ApplicationRecord[];
  onUpdateStage: (appId: string, newStage: ApplicationStage) => void;
}

export function ApplicationTrackerView({
  applications,
  onUpdateStage,
}: ApplicationTrackerViewProps) {
  const [viewMode, setViewMode] = useState<'board' | 'timeline'>('board');

  const STAGES: ApplicationStage[] = [
    'Applied',
    'Shortlisted',
    'Interview',
    'Selected',
    'Rejected',
    'Completed',
  ];

  return (
    <div className="space-y-6">
      {/* Header & View Mode Switcher */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#C76A2A]" />
            <h2 className="text-lg font-bold text-[#1B1B1B]">Application Tracker & Pipeline</h2>
          </div>
          <p className="text-xs text-[#575653] mt-0.5">
            Track your status across Applied, Shortlisted, Interview, Selected, Rejected, and Completed stages.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded-xl border border-[#E8E5DD] shrink-0">
          <button
            onClick={() => setViewMode('board')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'board'
                ? 'bg-[#1B1B1B] text-white shadow-xs'
                : 'text-[#575653] hover:text-[#1B1B1B]'
            }`}
          >
            Kanban Board View
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'timeline'
                ? 'bg-[#1B1B1B] text-white shadow-xs'
                : 'text-[#575653] hover:text-[#1B1B1B]'
            }`}
          >
            Timeline View
          </button>
        </div>
      </div>

      {/* Mode 1: Kanban Stage Columns */}
      {viewMode === 'board' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 overflow-x-auto pb-2">
          {STAGES.map((stage) => {
            const stageApps = applications.filter((a) => a.stage === stage);
            return (
              <div
                key={stage}
                className="bg-[#FAF8F5] rounded-2xl p-3 border border-[#E8E5DD] space-y-3 shrink-0 min-w-[200px]"
              >
                <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-2">
                  <span className="text-xs font-bold text-[#1B1B1B]">{stage}</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-white border border-[#E8E5DD] text-[#787774] font-bold">
                    {stageApps.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {stageApps.length === 0 ? (
                    <div className="text-[11px] text-[#A3A3A3] text-center py-6 border border-dashed border-[#DCD6C9] rounded-xl">
                      Empty
                    </div>
                  ) : (
                    stageApps.map((app) => (
                      <div
                        key={app.id}
                        className="bg-white rounded-xl p-3 border border-[#E8E5DD] shadow-xs space-y-2"
                      >
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-[#1B1B1B] truncate">{app.title}</h4>
                          <span className="text-[11px] font-semibold text-[#575653]">{app.organization}</span>
                        </div>

                        {app.nextStep && (
                          <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-[10px] text-amber-900 font-medium">
                            📌 {app.nextStep}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-[#787774]">
                          <span>Applied {app.appliedDate}</span>
                          <select
                            value={app.stage}
                            onChange={(e) => onUpdateStage(app.id, e.target.value as ApplicationStage)}
                            className="p-1 rounded bg-[#FAF8F5] border border-[#E8E5DD] text-[10px] font-bold text-[#1B1B1B]"
                          >
                            {STAGES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mode 2: Timeline View */}
      {viewMode === 'timeline' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-[#1B1B1B]">{app.title}</h4>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-purple-100 text-purple-800">
                      {app.stage}
                    </span>
                  </div>
                  <p className="text-[#575653]">{app.organization} • {app.notes}</p>
                </div>

                <div className="text-right text-[11px] font-mono text-[#787774] shrink-0">
                  <div>Applied: {app.appliedDate}</div>
                  <div className="text-emerald-700 font-bold mt-0.5">{app.nextStep || 'In Review'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
