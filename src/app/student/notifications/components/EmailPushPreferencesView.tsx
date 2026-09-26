'use client';

import React, { useState } from 'react';
import { Mail, Smartphone, Bell, CheckCircle2, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';
import { useNotificationStore } from '@/lib/notification-store';

export const EmailPushPreferencesView: React.FC = () => {
  const { settings, updateSettings } = useNotificationStore();

  const [emailToggles, setEmailToggles] = useState({
    weeklyProgressReport: true,
    opportunityAlerts: true,
    assessmentResults: true,
    mentorshipUpdates: true,
    projectActivity: true,
  });

  const [pushToggles, setPushToggles] = useState({
    classReminder: true,
    deadlineReminder: true,
    opportunityDeadline: true,
    assessmentReminder: true,
  });

  const toggleEmail = (key: keyof typeof emailToggles) => {
    setEmailToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePush = (key: keyof typeof pushToggles) => {
    setPushToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 text-xs">
      {/* 2-Column Grid: Email Notifications vs Push Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Notifications Controls */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E8E5DD]">
            <Mail className="w-5 h-5 text-[#C76A2A]" />
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B]">Email Dispatch System</h3>
              <p className="text-[11px] text-[#6F6A60]">Configure automated email digests and priority alerts.</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { key: 'weeklyProgressReport', name: 'Weekly Progress Report', desc: 'Summary of Builder Score gains & verified skills.' },
              { key: 'opportunityAlerts', name: 'Opportunity Match Alerts', desc: 'Instant dispatch when a recruiter match score exceeds 90%.' },
              { key: 'assessmentResults', name: 'Assessment & Test Results', desc: 'Detailed score breakdown and AI recommendations.' },
              { key: 'mentorshipUpdates', name: 'Mentorship Updates', desc: 'Office hour booking confirmations & feedback.' },
              { key: 'projectActivity', name: 'Project Verification Activity', desc: 'Peer code review and faculty verification badges.' },
            ].map((item) => {
              const isChecked = emailToggles[item.key as keyof typeof emailToggles];
              return (
                <div
                  key={item.key}
                  className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between gap-3"
                >
                  <div>
                    <strong className="text-xs font-bold text-[#1B1B1B] block">{item.name}</strong>
                    <span className="text-[10px] text-[#6F6A60]">{item.desc}</span>
                  </div>

                  <button
                    onClick={() => toggleEmail(item.key as any)}
                    className="p-1 cursor-pointer transition-colors"
                  >
                    {isChecked ? (
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

        {/* Push Notifications Controls */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E8E5DD]">
            <Smartphone className="w-5 h-5 text-[#2F7A45]" />
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B]">Push Notifications (Mobile &amp; Browser)</h3>
              <p className="text-[11px] text-[#6F6A60]">Time-sensitive reminders sent to your mobile device.</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { key: 'classReminder', name: 'Class Reminder (15 mins prior)', desc: 'Instant push alert when a live room goes active.' },
              { key: 'deadlineReminder', name: 'Assignment Deadline Reminder', desc: 'Alerts at 24h and 3h before lab deadlines.' },
              { key: 'opportunityDeadline', name: 'Opportunity Closing Deadline', desc: 'Reminders for saved job & fellowship applications.' },
              { key: 'assessmentReminder', name: 'Assessment Availability', desc: 'Notification when a new benchmark test opens.' },
            ].map((item) => {
              const isChecked = pushToggles[item.key as keyof typeof pushToggles];
              return (
                <div
                  key={item.key}
                  className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between gap-3"
                >
                  <div>
                    <strong className="text-xs font-bold text-[#1B1B1B] block">{item.name}</strong>
                    <span className="text-[10px] text-[#6F6A60]">{item.desc}</span>
                  </div>

                  <button
                    onClick={() => togglePush(item.key as any)}
                    className="p-1 cursor-pointer transition-colors"
                  >
                    {isChecked ? (
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
    </div>
  );
};
