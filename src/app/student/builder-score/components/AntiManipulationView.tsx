'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, Lock, Activity, CheckCircle2 } from 'lucide-react';
import { AntiManipulationFlag } from '@/lib/builder-score-engine';

interface AntiManipulationViewProps {
  flags: AntiManipulationFlag[];
}

export const AntiManipulationView: React.FC<AntiManipulationViewProps> = ({ flags }) => {
  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2F7A45]" />
            <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold font-mono">
              Zero-Trust Audit Engine
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#1B1B1B] mt-1">Anti-Manipulation &amp; Fraud Prevention Audit</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Continuously analyzing git diffs, IP patterns, and assessment submission velocity to catch spam commits, fake repos, assessment abuse, or XP farming.
          </p>
        </div>
      </div>

      {/* Audit Detection Checks List */}
      <div className="space-y-3">
        {flags.map((flag) => (
          <div
            key={flag.id}
            className="p-5 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] text-white font-mono font-bold text-[10px]">
                  {flag.type}
                </span>
                <span className="text-[10px] font-mono text-[#6F6A60]">Audited {flag.detectedAt}</span>
              </div>
              <p className="text-xs font-medium text-[#1B1B1B]">{flag.description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {flag.severity === 'Clean' ? (
                <span className="px-3 py-1 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] font-bold font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Clean &amp; Verified
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-700 font-bold font-mono flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Penalty: -{flag.penaltyPointsDeducted} pts
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
