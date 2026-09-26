'use client';

import React from 'react';
import {
  Users,
  Video,
  Clock,
  ArrowRight,
  FileText,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { FacultyClass, AssignmentItem, StudentSubmission, UpcomingSession } from '../types';
import { SmartRoom } from '@/lib/smart-classroom-store';

interface FacultyHomeViewProps {
  classes: FacultyClass[];
  rooms: SmartRoom[];
  assignments: AssignmentItem[];
  submissions: StudentSubmission[];
  upcomingSessions: UpcomingSession[];
  onNavigateTab: (tab: string) => void;
  onSelectRoom: (code: string) => void;
}

export const FacultyHomeView: React.FC<FacultyHomeViewProps> = ({
  classes,
  rooms,
  assignments,
  submissions,
  upcomingSessions,
  onNavigateTab,
  onSelectRoom,
}) => {
  const activeRooms = rooms.filter((r) => r.status === 'live');
  const pendingSubmissions = submissions.filter((s) => s.status === 'Pending Evaluation');

  return (
    <div className="space-y-6">
      {/* 2-Column Grid: Active Rooms & Upcoming Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Live Smart Rooms & Active Classes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Live Rooms Alert Banner */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2F7A45] animate-pulse" />
                <h3 className="text-base font-bold text-[#1B1B1B]">Active Smart Rooms</h3>
              </div>
              <button
                onClick={() => onNavigateTab('smart-room')}
                className="text-xs font-bold text-[#C76A2A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Control Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {activeRooms.length > 0 ? (
              <div className="space-y-3">
                {activeRooms.map((room) => (
                  <div
                    key={room.id}
                    className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                          {room.code}
                        </span>
                        <span className="text-xs font-semibold text-[#2F7A45] flex items-center gap-1">
                          <Users className="w-3 h-3" /> {room.attendeesCount} Students Live
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#1B1B1B]">{room.title}</h4>
                      <p className="text-xs text-[#6F6A60]">{room.subject} • {room.department}</p>
                    </div>

                    <button
                      onClick={() => {
                        onSelectRoom(room.code);
                        onNavigateTab('smart-room');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#1B1B1B] text-white text-xs font-bold hover:bg-[#C76A2A] transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Enter Room</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-[#FAF9F5] border border-dashed border-[#E8E5DD] text-center space-y-2">
                <Video className="w-8 h-8 text-[#6F6A60] mx-auto" />
                <p className="text-xs font-bold text-[#1B1B1B]">No Live Rooms Currently Active</p>
                <p className="text-xs text-[#6F6A60]">Launch an instant Smart Classroom session with auto-attendance &amp; live polls.</p>
                <button
                  onClick={() => onNavigateTab('smart-room')}
                  className="mt-2 px-4 py-2 bg-[#C76A2A] text-white text-xs font-bold rounded-xl hover:bg-[#b05a22] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Live Room</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Assigned Classes */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
              <div>
                <h3 className="text-base font-bold text-[#1B1B1B]">My Active Classes</h3>
                <p className="text-xs text-[#6F6A60]">Overview of assigned courses, total enrolled builders, and performance.</p>
              </div>
              <button
                onClick={() => onNavigateTab('class-management')}
                className="text-xs font-bold text-[#1B1B1B] hover:text-[#C76A2A] flex items-center gap-1 cursor-pointer"
              >
                <span>Manage All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                        {cls.code}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#2F7A45] bg-[#2F7A45]/10 px-2 py-0.5 rounded-full">
                        {cls.avgAttendanceRate}% Att.
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-[#1B1B1B] leading-snug">{cls.title}</h4>
                    <span className="text-[10px] text-[#6F6A60] block">{cls.semester} • {cls.department}</span>
                  </div>

                  <div className="pt-3 border-t border-[#E8E5DD] space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-[#6F6A60]">
                      <span>{cls.enrolledStudents} Students</span>
                      <span className="font-mono font-bold text-[#1B1B1B]">{cls.avgBuilderScore} Avg BS</span>
                    </div>

                    <button
                      onClick={() => onNavigateTab('class-management')}
                      className="w-full py-2 rounded-xl bg-white border border-[#E8E5DD] hover:bg-[#1B1B1B] hover:text-white text-[#1B1B1B] text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      Class Hub &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pending Reviews & Upcoming Sessions */}
        <div className="space-y-6">
          {/* Pending Reviews Card */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C76A2A]" />
                <h3 className="text-base font-bold text-[#1B1B1B]">Pending Reviews</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-mono font-bold">
                {pendingSubmissions.length} New
              </span>
            </div>

            <div className="space-y-3">
              {pendingSubmissions.map((sub) => (
                <div key={sub.id} className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-[#1B1B1B] font-bold">{sub.studentName}</strong>
                    <span className="text-[10px] font-mono text-[#6F6A60]">{sub.submittedAt}</span>
                  </div>
                  <p className="text-[11px] text-[#6F6A60] truncate">{sub.notes || 'Lab assignment submission'}</p>

                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#2F7A45]">Ready for evaluation</span>
                    <button
                      onClick={() => onNavigateTab('assignments')}
                      className="text-[10px] font-bold text-[#C76A2A] hover:underline cursor-pointer"
                    >
                      Grade Rubric &rarr;
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => onNavigateTab('assignments')}
                className="w-full py-2.5 rounded-xl bg-[#1B1B1B] text-white text-xs font-bold hover:bg-[#333] transition-colors cursor-pointer"
              >
                Open Evaluation Desk
              </button>
            </div>
          </div>

          {/* Upcoming Sessions Card */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#1B1B1B]" />
                <h3 className="text-base font-bold text-[#1B1B1B]">Upcoming Sessions</h3>
              </div>
            </div>

            <div className="space-y-3">
              {upcomingSessions.map((sess) => (
                <div key={sess.id} className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                      {sess.classCode}
                    </span>
                    <span className="text-[10px] font-semibold text-[#C76A2A]">{sess.type}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#1B1B1B]">{sess.title}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#6F6A60]">
                    <Clock className="w-3 h-3" />
                    <span>{sess.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
