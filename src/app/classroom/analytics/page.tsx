'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import {
  BarChart3,
  TrendingUp,
  Users,
  BrainCircuit,
  Award,
  ChevronLeft,
  Calendar,
  Building,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  Filter,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SmartClassroomAnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'student' | 'faculty' | 'department'>('overview');
  const [timeRange, setTimeRange] = useState<'weekly' | 'semester' | 'yearly'>('weekly');

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1200px] mx-auto pb-16 font-sans text-[#1B1B1B]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E5DD]">
          <div className="flex items-start gap-3.5">
            <Link
              href="/classroom"
              className="p-2 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#1B1B1B] text-[#1B1B1B] transition-colors mt-1"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] text-white text-xs font-mono font-bold">
                  Classroom Analytics Suite
                </span>
                <span className="text-xs text-[#6F6A60]">Institutional &amp; Departmental Intelligence</span>
              </div>
              <h1 className="text-2xl font-bold text-[#1B1B1B] tracking-tight">
                Smart Classroom Analytics &amp; Trends
              </h1>
              <p className="text-xs text-[#6F6A60] mt-0.5">
                Real-time tracking of lecture comprehension, student engagement, faculty performance, and departmental trends.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-3.5 py-2 bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-xs font-semibold text-[#1B1B1B] outline-none"
            >
              <option value="weekly">This Week (Weekly Trend)</option>
              <option value="semester">Fall Semester 2026</option>
              <option value="yearly">Academic Year 2025–26</option>
            </select>

            <button
              onClick={() => confetti({ particleCount: 25, spread: 45 })}
              className="px-4 py-2 bg-[#1B1B1B] text-white hover:bg-[#C76A2A] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Top Metric Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] space-y-1">
            <span className="text-xs text-[#6F6A60] font-medium block">Total Conducted Sessions</span>
            <span className="text-2xl font-bold text-[#1B1B1B]">142 Sessions</span>
            <span className="text-[11px] text-[#2F7A45] font-semibold block">+12% vs last month</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] space-y-1">
            <span className="text-xs text-[#6F6A60] font-medium block">Avg Classroom Attendance</span>
            <span className="text-2xl font-bold text-[#2F7A45]">91.4%</span>
            <span className="text-[11px] text-[#6F6A60] block">Target: &gt;85%</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] space-y-1">
            <span className="text-xs text-[#6F6A60] font-medium block">Avg AI Understanding</span>
            <span className="text-2xl font-bold text-[#C76A2A]">84.2%</span>
            <span className="text-[11px] text-[#2F7A45] font-semibold block">+3.8% improvement</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] space-y-1">
            <span className="text-xs text-[#6F6A60] font-medium block">Doubt Resolution Rate</span>
            <span className="text-2xl font-bold text-[#1B1B1B]">96.8%</span>
            <span className="text-[11px] text-[#6F6A60] block">Avg time: 4.2 mins</span>
          </div>
        </div>

        {/* Multi-Tab Selector */}
        <div className="flex items-center gap-2 border-b border-[#E8E5DD] pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-[#1B1B1B] text-white shadow-xs'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Class Performance &amp; Trends</span>
          </button>
          <button
            onClick={() => setActiveTab('student')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'student'
                ? 'bg-[#1B1B1B] text-white shadow-xs'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Student Performance Leaderboard</span>
          </button>
          <button
            onClick={() => setActiveTab('faculty')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'faculty'
                ? 'bg-[#1B1B1B] text-white shadow-xs'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#C76A2A]" />
            <span>Faculty Insights &amp; Engagement</span>
          </button>
          <button
            onClick={() => setActiveTab('department')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'department'
                ? 'bg-[#1B1B1B] text-white shadow-xs'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Departmental Comparison</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & WEEKLY TRENDS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Weekly Understanding Trajectory */}
            <div className="p-6 rounded-2xl bg-white border border-[#E8E5DD] space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-3">
                <div>
                  <h2 className="text-base font-bold text-[#1B1B1B]">Weekly AI Understanding Trajectory</h2>
                  <p className="text-xs text-[#6F6A60]">Average comprehension scores recorded across 142 live lectures.</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#2F7A45]/15 text-[#2F7A45] text-xs font-bold">
                  +4.2% Growth
                </span>
              </div>

              {/* Bar Chart Simulation */}
              <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
                {[
                  { day: 'Mon', score: 78, label: '78%' },
                  { day: 'Tue', score: 82, label: '82%' },
                  { day: 'Wed', score: 88, label: '88%' },
                  { day: 'Thu', score: 85, label: '85%' },
                  { day: 'Fri', score: 91, label: '91%' },
                  { day: 'Sat', score: 94, label: '94%' },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#1B1B1B]">{item.label}</span>
                    <div className="w-full rounded-t-xl bg-[#FAF9F5] border border-[#E8E5DD] h-32 flex items-end overflow-hidden">
                      <div
                        className="w-full bg-[#1B1B1B] hover:bg-[#C76A2A] transition-all duration-500 rounded-t-lg"
                        style={{ height: `${item.score}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#6F6A60]">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Classroom Logs */}
            <div className="p-6 rounded-2xl bg-white border border-[#E8E5DD] space-y-4 shadow-xs">
              <h2 className="text-base font-bold text-[#1B1B1B]">Recent Classroom Performance Records</h2>
              <div className="space-y-3 text-xs">
                {[
                  { code: 'JAVA-3A-2026', title: 'Advanced Java Microservices', faculty: 'Dr. Ramesh Sharma', att: '92%', und: '82%', status: 'High' },
                  { code: 'AI-LAB-4B', title: 'PyTorch Transformer Attention', faculty: 'Prof. S. K. Gupta', att: '96%', und: '90%', status: 'Optimal' },
                  { code: 'DBMS-2C', title: 'PostgreSQL Indexing & B-Trees', faculty: 'Dr. Anita Roy', att: '88%', und: '76%', status: 'Normal' },
                ].map((row, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-[#1B1B1B] mr-2">{row.code}</span>
                      <span className="font-semibold text-[#1B1B1B]">{row.title}</span>
                      <span className="text-[#6F6A60] block text-[11px]">Faculty: {row.faculty}</span>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <span className="text-[10px] text-[#6F6A60] block uppercase">Attendance</span>
                        <span className="font-bold text-[#2F7A45]">{row.att}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#6F6A60] block uppercase">AI Understood</span>
                        <span className="font-bold text-[#C76A2A]">{row.und}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STUDENT PERFORMANCE LEADERBOARD */}
        {activeTab === 'student' && (
          <div className="p-6 rounded-2xl bg-white border border-[#E8E5DD] space-y-4 shadow-xs text-xs">
            <h2 className="text-base font-bold text-[#1B1B1B]">Student Classroom Participation Leaderboard</h2>
            <div className="space-y-3">
              {[
                { rank: '#1', name: 'Manutej Reddy', dept: 'CSE', score: 98, polls: 24, doubts: 14, badge: 'Classroom Master' },
                { rank: '#2', name: 'Priya Sharma', dept: 'CSE', score: 94, polls: 22, doubts: 10, badge: 'Top Contributor' },
                { rank: '#3', name: 'Ananya Sen', dept: 'IT', score: 91, polls: 20, doubts: 8, badge: 'Active Listener' },
              ].map((st) => (
                <div key={st.rank} className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#1B1B1B] text-white font-bold text-xs flex items-center justify-center">
                      {st.rank}
                    </span>
                    <div>
                      <strong className="text-[#1B1B1B] block">{st.name} ({st.dept})</strong>
                      <span className="text-[#6F6A60] text-[11px]">{st.polls} Polls Answered • {st.doubts} Doubts Resolved</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-sm text-[#C76A2A] block">{st.score} XP</span>
                    <span className="px-2 py-0.5 rounded bg-[#C76A2A]/10 text-[#C76A2A] text-[10px] font-bold">
                      {st.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FACULTY INSIGHTS */}
        {activeTab === 'faculty' && (
          <div className="p-6 rounded-2xl bg-white border border-[#E8E5DD] space-y-4 shadow-xs text-xs">
            <h2 className="text-base font-bold text-[#1B1B1B]">Faculty Interactive Rating &amp; Output Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2">
                <strong className="text-[#1B1B1B] block text-sm">Dr. Ramesh Sharma (CSE)</strong>
                <p className="text-[#6F6A60]">Avg AI Comprehension: 86% • Poll Frequency: 4 polls/hour • Resolution Rate: 98%</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2">
                <strong className="text-[#1B1B1B] block text-sm">Prof. S. K. Gupta (AIML)</strong>
                <p className="text-[#6F6A60]">Avg AI Comprehension: 90% • Poll Frequency: 5 polls/hour • Resolution Rate: 96%</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DEPARTMENTAL COMPARISON */}
        {activeTab === 'department' && (
          <div className="p-6 rounded-2xl bg-white border border-[#E8E5DD] space-y-4 shadow-xs text-xs">
            <h2 className="text-base font-bold text-[#1B1B1B]">Departmental Classroom Output Comparison</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-900 block text-sm">CSE (Computer Science)</span>
                <span className="text-2xl font-bold text-emerald-700 mt-1 block">91.8%</span>
                <span className="text-[10px] text-emerald-800">Avg Attendance</span>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <span className="font-bold text-amber-900 block text-sm">AIML (AI &amp; ML)</span>
                <span className="text-2xl font-bold text-amber-700 mt-1 block">94.2%</span>
                <span className="text-[10px] text-amber-800">Avg Attendance</span>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <span className="font-bold text-blue-900 block text-sm">IT (Info Tech)</span>
                <span className="text-2xl font-bold text-blue-700 mt-1 block">88.5%</span>
                <span className="text-[10px] text-blue-800">Avg Attendance</span>
              </div>
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                <span className="font-bold text-purple-900 block text-sm">ECE (Electronics)</span>
                <span className="text-2xl font-bold text-purple-700 mt-1 block">86.4%</span>
                <span className="text-[10px] text-purple-800">Avg Attendance</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
