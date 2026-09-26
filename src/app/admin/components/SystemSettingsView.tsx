'use client';

import React, { useState } from 'react';
import { Settings, Sliders, Bell, Mail, Award, Zap, ToggleLeft, ToggleRight, Check } from 'lucide-react';
import { SystemFeatureFlag } from '../types';

interface SystemSettingsViewProps {
  featureFlags: SystemFeatureFlag[];
  onToggleFlag: (id: string) => void;
}

export const SystemSettingsView: React.FC<SystemSettingsViewProps> = ({
  featureFlags,
  onToggleFlag,
}) => {
  const [platformName, setPlatformName] = useState('ZERO × SkillBridge');
  const [baseXp, setBaseXp] = useState('100');
  const [builderScoreWeight, setBuilderScoreWeight] = useState('40% GitHub, 40% Projects, 20% Assessments');

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">Platform System Settings &amp; Feature Flags</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Configure system branding, email notification templates, XP reward algorithms, Builder Score formula weights, and live feature toggles.
          </p>
        </div>
      </div>

      {/* Feature Flags Section */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
        <h3 className="text-base font-bold text-[#1B1B1B]">Ecosystem Feature Flags</h3>

        <div className="space-y-3">
          {featureFlags.map((ff) => (
            <div
              key={ff.id}
              className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#1B1B1B] text-white">
                    {ff.key}
                  </span>
                  <strong className="text-xs font-bold text-[#1B1B1B]">{ff.name}</strong>
                </div>
                <p className="text-[11px] text-[#6F6A60] mt-1">{ff.description}</p>
              </div>

              <button
                onClick={() => onToggleFlag(ff.id)}
                className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                  ff.enabled ? 'text-[#2F7A45]' : 'text-[#6F6A60]'
                }`}
              >
                {ff.enabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column Grid: System Configuration & Algorithm Weights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Branding & Notifications */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <h3 className="text-base font-bold text-[#1B1B1B]">Branding &amp; Notifications Config</h3>

          <div className="space-y-3">
            <div>
              <label className="font-bold text-[#1B1B1B] block mb-1">Platform Brand Title</label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
              />
            </div>

            <div>
              <label className="font-bold text-[#1B1B1B] block mb-1">Email Template Signature</label>
              <input
                type="text"
                defaultValue="SkillBridge Academic Operations Team"
                className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
              />
            </div>
          </div>
        </div>

        {/* XP & Builder Score Configuration */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <h3 className="text-base font-bold text-[#1B1B1B]">XP &amp; Builder Score Algorithm Weights</h3>

          <div className="space-y-3">
            <div>
              <label className="font-bold text-[#1B1B1B] block mb-1">Base Level Up XP Scale</label>
              <input
                type="number"
                value={baseXp}
                onChange={(e) => setBaseXp(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-[#1B1B1B] block mb-1">Builder Score Weight Distribution</label>
              <input
                type="text"
                value={builderScoreWeight}
                onChange={(e) => setBuilderScoreWeight(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
