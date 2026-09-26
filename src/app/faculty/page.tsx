'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import {
  Home,
  BookOpen,
  Video,
  CheckCircle2,
  FileText,
  BarChart3,
  Users,
  Sparkles,
  Printer,
  ShieldCheck,
  Briefcase,
  Cpu,
} from 'lucide-react';
import { FacultyHeader } from './components/FacultyHeader';
import { FacultyHomeView } from './components/FacultyHomeView';
import { ClassManagementView } from './components/ClassManagementView';
import { SmartClassroomControlView } from './components/SmartClassroomControlView';
import { AttendanceView } from './components/AttendanceView';
import { AssignmentsView } from './components/AssignmentsView';
import { AssessmentAnalyticsView } from './components/AssessmentAnalyticsView';
import { StudentInsightsView } from './components/StudentInsightsView';
import { AIInsightsView } from './components/AIInsightsView';
import { ReportsView } from './components/ReportsView';

import {
  MOCK_FACULTY_CLASSES,
  MOCK_STUDENTS,
  MOCK_ASSIGNMENTS,
  MOCK_SUBMISSIONS,
  MOCK_UPCOMING_SESSIONS,
  MOCK_AI_HELP_STUDENTS,
  MOCK_COMMON_CONFUSIONS,
} from './mock-faculty';
import { useSmartClassroomStore } from '@/lib/smart-classroom-store';
import { FacultyClass, AssignmentItem } from './types';

export default function AcademicianFacultyPortalPage() {
  const { rooms } = useSmartClassroomStore();
  const [activeTab, setActiveTab] = useState<
    | 'home'
    | 'class-management'
    | 'smart-room'
    | 'attendance'
    | 'assignments'
    | 'assessment-analytics'
    | 'student-insights'
    | 'ai-insights'
    | 'reports'
  >('home');

  const [classesList, setClassesList] = useState<FacultyClass[]>(MOCK_FACULTY_CLASSES);
  const [assignmentsList, setAssignmentsList] = useState<AssignmentItem[]>(MOCK_ASSIGNMENTS);
  const [selectedRoomCode, setSelectedRoomCode] = useState<string>('JAVA-3A-2026');

  const handleAddClass = (newClass: Omit<FacultyClass, 'id'>) => {
    const created: FacultyClass = {
      ...newClass,
      id: `cls-${Date.now()}`,
    };
    setClassesList((prev) => [created, ...prev]);
  };

  const handleCreateAssignment = (
    newAsg: Omit<AssignmentItem, 'id' | 'submissionsCount' | 'evaluatedCount'>
  ) => {
    const created: AssignmentItem = {
      ...newAsg,
      id: `asg-${Date.now()}`,
      submissionsCount: 0,
      evaluatedCount: 0,
    };
    setAssignmentsList((prev) => [created, ...prev]);
  };

  const handleQuickAction = (action: string) => {
    if (action === 'smart-room') {
      setActiveTab('smart-room');
    } else if (action === 'create-assignment') {
      setActiveTab('assignments');
    } else if (action === 'take-attendance') {
      setActiveTab('attendance');
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-[1280px] mx-auto pb-20">
        {/* Faculty Header */}
        <FacultyHeader onQuickAction={handleQuickAction} activeTab={activeTab} />

        {/* Primary Command Navigation Bar (9 Main Sections) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8E5DD] text-xs font-bold no-scrollbar">
          {[
            { id: 'home', label: 'Faculty Home', icon: Home },
            { id: 'class-management', label: 'Class Management', icon: BookOpen },
            { id: 'smart-room', label: 'Smart Classroom Control', icon: Video, badge: 'Live' },
            { id: 'attendance', label: 'Attendance System', icon: CheckCircle2 },
            { id: 'assignments', label: 'Assignments & Rubrics', icon: FileText },
            { id: 'assessment-analytics', label: 'Assessment Analytics', icon: BarChart3 },
            { id: 'student-insights', label: 'Student Telemetry & Risk', icon: Users },
            { id: 'ai-insights', label: 'AI Teaching Insights', icon: Sparkles },
            { id: 'reports', label: 'Executive Reports', icon: Printer },
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

        {/* Dynamic Section Render */}
        <main>
          {activeTab === 'home' && (
            <FacultyHomeView
              classes={classesList}
              rooms={rooms}
              assignments={assignmentsList}
              submissions={MOCK_SUBMISSIONS}
              upcomingSessions={MOCK_UPCOMING_SESSIONS}
              onNavigateTab={(tab) => setActiveTab(tab as any)}
              onSelectRoom={(code) => setSelectedRoomCode(code)}
            />
          )}

          {activeTab === 'class-management' && (
            <ClassManagementView
              classes={classesList}
              students={MOCK_STUDENTS}
              assignments={assignmentsList}
              onAddClass={handleAddClass}
            />
          )}

          {activeTab === 'smart-room' && (
            <SmartClassroomControlView
              selectedRoomCode={selectedRoomCode}
              onSelectRoom={(code) => setSelectedRoomCode(code)}
            />
          )}

          {activeTab === 'attendance' && <AttendanceView students={MOCK_STUDENTS} />}

          {activeTab === 'assignments' && (
            <AssignmentsView
              assignments={assignmentsList}
              submissions={MOCK_SUBMISSIONS}
              onCreateAssignment={handleCreateAssignment}
            />
          )}

          {activeTab === 'assessment-analytics' && (
            <AssessmentAnalyticsView classes={classesList} students={MOCK_STUDENTS} />
          )}

          {activeTab === 'student-insights' && <StudentInsightsView students={MOCK_STUDENTS} />}

          {activeTab === 'ai-insights' && (
            <AIInsightsView helpStudents={MOCK_AI_HELP_STUDENTS} confusions={MOCK_COMMON_CONFUSIONS} />
          )}

          {activeTab === 'reports' && <ReportsView classes={classesList} students={MOCK_STUDENTS} />}
        </main>
      </div>
    </PortalLayout>
  );
}
