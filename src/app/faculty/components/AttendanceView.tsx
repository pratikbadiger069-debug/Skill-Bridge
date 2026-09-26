'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  QrCode,
  Users,
  Clock,
  BarChart3,
  Search,
  Check,
  X,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { StudentRecord } from '../types';

interface AttendanceViewProps {
  students: StudentRecord[];
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({ students }) => {
  const [mode, setMode] = useState<'manual' | 'qr' | 'auto' | 'analytics'>('manual');
  const [search, setSearch] = useState('');
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'Present' | 'Late' | 'Absent'>>(() => {
    const initial: Record<string, 'Present' | 'Late' | 'Absent'> = {};
    students.forEach((st) => {
      initial[st.id] = st.attendanceRate > 80 ? 'Present' : st.attendanceRate > 70 ? 'Late' : 'Absent';
    });
    return initial;
  });

  const handleToggleStatus = (id: string, status: 'Present' | 'Late' | 'Absent') => {
    setAttendanceMap((prev) => ({ ...prev, [id]: status }));
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNumber.toLowerCase().includes(search.toLowerCase())
  );

  const presentCount = Object.values(attendanceMap).filter((s) => s === 'Present').length;
  const lateCount = Object.values(attendanceMap).filter((s) => s === 'Late').length;
  const absentCount = Object.values(attendanceMap).filter((s) => s === 'Absent').length;

  return (
    <div className="space-y-6">
      {/* Attendance Mode Selector Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">Classroom Attendance System</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Automated room-join logging, dynamic QR codes, manual override, and predictive attendance telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
          {[
            { id: 'manual', label: 'Manual Attendance', icon: CheckCircle2 },
            { id: 'auto', label: 'Auto & Room Join Log', icon: Clock },
            { id: 'qr', label: 'Live QR Code Check-in', icon: QrCode },
            { id: 'analytics', label: 'Attendance Analytics', icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = mode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id as any)}
                className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'bg-[#FAF9F5] border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode 1: Manual Attendance Checklist */}
      {mode === 'manual' && (
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E5DD]">
            <div className="flex items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] font-bold font-mono">
                Present: {presentCount}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 font-bold font-mono">
                Late: {lateCount}
              </span>
              <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-700 font-bold font-mono">
                Absent: {absentCount}
              </span>
            </div>

            <div className="relative max-w-xs w-full">
              <Search className="w-3.5 h-3.5 text-[#6F6A60] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-xs"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filtered.map((st) => {
              const currentStatus = attendanceMap[st.id] || 'Present';
              return (
                <div
                  key={st.id}
                  className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1B1B1B] text-white flex items-center justify-center font-bold text-xs">
                      {st.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <strong className="text-[#1B1B1B] font-bold block">{st.name}</strong>
                      <span className="text-[10px] text-[#6F6A60] font-mono">{st.rollNumber} • {st.department}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleStatus(st.id, 'Present')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentStatus === 'Present'
                          ? 'bg-[#2F7A45] text-white shadow-xs'
                          : 'bg-white border border-[#E8E5DD] text-[#6F6A60]'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleToggleStatus(st.id, 'Late')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentStatus === 'Late'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-white border border-[#E8E5DD] text-[#6F6A60]'
                      }`}
                    >
                      Late
                    </button>
                    <button
                      onClick={() => handleToggleStatus(st.id, 'Absent')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentStatus === 'Absent'
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-white border border-[#E8E5DD] text-[#6F6A60]'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 2: Auto & Room Join Log */}
      {mode === 'auto' && (
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B]">Automated Room Join Telemetry Log</h3>
              <p className="text-[#6F6A60]">Real-time audit log of student connection timestamps and network IP validation.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] font-mono font-bold">
              Auto-Sync Active
            </span>
          </div>

          <div className="space-y-2.5">
            {students.map((st, i) => (
              <div key={st.id} className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between">
                <div>
                  <strong className="text-[#1B1B1B] font-bold block">{st.name}</strong>
                  <span className="text-[10px] text-[#6F6A60]">Verified Connection • Session JAVA-3A</span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[#2F7A45] font-bold block">Joined 14:0{i + 1} PM</span>
                  <span className="text-[10px] text-[#6F6A60]">Duration: 45m</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode 3: QR Code Attendance */}
      {mode === 'qr' && (
        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DD] text-center max-w-md mx-auto space-y-5">
          <div className="space-y-1">
            <span className="px-3 py-0.5 rounded-full bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
              Dynamic Refresh: Every 30s
            </span>
            <h3 className="text-lg font-bold text-[#1B1B1B] mt-2">Scan Live QR for Attendance</h3>
            <p className="text-xs text-[#6F6A60]">Students scan with SkillBridge Mobile App inside classroom radius.</p>
          </div>

          <div className="p-4 bg-[#FAF9F5] rounded-3xl border border-[#E8E5DD] inline-block">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://skillbridge.edu/classroom/JAVA-3A-2026"
              alt="Live Attendance QR Code"
              className="w-56 h-56 mx-auto rounded-2xl"
            />
          </div>

          <p className="text-xs font-mono font-semibold text-[#2F7A45]">
            48 / 52 Students Successfully Scanned Code
          </p>
        </div>
      )}

      {/* Mode 4: Attendance Analytics */}
      {mode === 'analytics' && (
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B]">Cohort Attendance Telemetry &amp; Risk Insights</h3>
              <p className="text-xs text-[#6F6A60]">Monthly attendance trends and automated notification triggers for low-attendance students.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-1">
              <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Highest Attendance</span>
              <strong className="text-2xl font-bold font-mono text-[#2F7A45]">98% (Manutej Reddy)</strong>
            </div>

            <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-1">
              <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Lowest Attendance</span>
              <strong className="text-2xl font-bold font-mono text-red-600">64% (Aarav Patel)</strong>
            </div>

            <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-1">
              <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Students Below 75%</span>
              <strong className="text-2xl font-bold font-mono text-amber-700">2 Students Alert</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
