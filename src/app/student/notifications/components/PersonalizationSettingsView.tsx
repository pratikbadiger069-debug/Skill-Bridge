'use client';

import React from 'react';
import { Sliders, Moon, Clock, ToggleLeft, ToggleRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useNotificationStore, NotificationType } from '@/lib/notification-store';

export const PersonalizationSettingsView: React.FC = () => {
  const { settings, updateSettings, toggleCategory } = useNotificationStore();

  const categories: { key: NotificationType; label: string; desc: string }[] = [
    { key: 'Assessment', label: 'Assessments & Quizzes', desc: 'Alerts for new tests, score results, and retake availability.' },
    { key: 'Project', label: 'Projects & Code Verification', desc: 'Faculty verification badges, code reviews, and project comments.' },
    { key: 'Community', label: 'ZERO Community Ecosystem', desc: 'Team invites, hackathon wins, and peer endorsements.' },
    { key: 'Mentorship', label: 'Mentorship & Office Hours', desc: 'Session bookings, Q&A feedback, and instructor notes.' },
    { key: 'Opportunities', label: 'Corporate Opportunities', desc: 'Recruiter matches, fellowship deadlines, and job alerts.' },
    { key: 'Classroom', label: 'Smart Classroom Events', desc: 'Live room start alerts, active polls, and post-class reports.' },
    { key: 'System', label: 'System Announcements', desc: 'Platform maintenance and feature releases.' },
    { key: 'Achievement', label: 'Achievements & Milestones', desc: 'Builder score rank updates and level completions.' },
  ];

  return (
    <div className="space-y-6 text-xs">
      {/* Quiet Hours & Frequency Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quiet Hours Controls */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E8E5DD]">
            <Moon className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B]">Quiet Hours Schedule</h3>
              <p className="text-[11px] text-[#6F6A60]">Mute push and email alerts during study &amp; sleep windows.</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD]">
              <div>
                <strong className="text-xs font-bold text-[#1B1B1B] block">Enable Quiet Hours</strong>
                <span className="text-[10px] text-[#6F6A60]">Non-critical notifications will be held in queue.</span>
              </div>

              <button
                onClick={() => updateSettings({ quietHoursEnabled: !settings.quietHoursEnabled })}
                className="p-1 cursor-pointer"
              >
                {settings.quietHoursEnabled ? (
                  <ToggleRight className="w-8 h-8 text-[#2F7A45]" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-[#6F6A60]" />
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-[#1B1B1B] block">Start Time</label>
                <input
                  type="time"
                  value={settings.quietHoursStart}
                  onChange={(e) => updateSettings({ quietHoursStart: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#1B1B1B] block">End Time</label>
                <input
                  type="time"
                  value={settings.quietHoursEnd}
                  onChange={(e) => updateSettings({ quietHoursEnd: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Email Digest Frequency */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E8E5DD]">
            <Clock className="w-5 h-5 text-[#C76A2A]" />
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B]">Digest Frequency</h3>
              <p className="text-[11px] text-[#6F6A60]">Select how often email digests are generated.</p>
            </div>
          </div>

          <div className="space-y-2">
            {['Instant', 'Daily Digest', 'Weekly Digest', 'Disabled'].map((freq) => (
              <label
                key={freq}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  settings.emailDigestFrequency === freq
                    ? 'bg-[#1B1B1B] text-white border-[#1B1B1B]'
                    : 'bg-[#FAF9F5] border-[#E8E5DD] text-[#1B1B1B] hover:border-[#1B1B1B]'
                }`}
              >
                <span className="font-bold text-xs">{freq}</span>
                <input
                  type="radio"
                  name="frequency"
                  checked={settings.emailDigestFrequency === freq}
                  onChange={() => updateSettings({ emailDigestFrequency: freq as any })}
                  className="hidden"
                />
                {settings.emailDigestFrequency === freq && <CheckCircle2 className="w-4 h-4 text-[#C76A2A]" />}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Category Toggles Section */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
        <h3 className="text-base font-bold text-[#1B1B1B]">Notification Category Controls</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((cat) => {
            const isEnabled = settings.categoryPreferences[cat.key];
            return (
              <div
                key={cat.key}
                className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between gap-3"
              >
                <div>
                  <strong className="text-xs font-bold text-[#1B1B1B] block">{cat.label}</strong>
                  <span className="text-[10px] text-[#6F6A60]">{cat.desc}</span>
                </div>

                <button onClick={() => toggleCategory(cat.key)} className="p-1 cursor-pointer">
                  {isEnabled ? (
                    <ToggleRight className="w-8 h-8 text-[#2F7A45]" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-[#6F6A60]" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
