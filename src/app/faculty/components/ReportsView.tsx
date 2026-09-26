'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  BarChart3,
  Users,
  Award,
  Cpu,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { FacultyClass, StudentRecord } from '../types';

interface ReportsViewProps {
  classes: FacultyClass[];
  students: StudentRecord[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ classes, students }) => {
  const [selectedReportType, setSelectedReportType] = useState<
    'attendance' | 'assessment' | 'performance' | 'skillgap'
  >('performance');

  const handleExportPDF = () => {
    alert(`Generating & downloading official production-ready ${selectedReportType.toUpperCase()} Report PDF...`);
  };

  return (
    <div className="space-y-6">
      {/* Header & Export Bar */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">Faculty Executive Reports &amp; PDF Exporter</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Generate formal academic compliance reports, attendance logs, assessment analytics, and skill gap audit documents.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            className="px-4 py-2.5 rounded-xl bg-[#1B1B1B] text-white text-xs font-bold hover:bg-[#C76A2A] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>PDF Export</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-[#1B1B1B] text-xs font-bold hover:bg-[#E8E5DD] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold border-b border-[#E8E5DD] pb-2">
        {[
          { id: 'performance', label: 'Class Performance Report', icon: BarChart3 },
          { id: 'attendance', label: 'Attendance Compliance Report', icon: CheckCircle2 },
          { id: 'assessment', label: 'Assessment Analytics Report', icon: Award },
          { id: 'skillgap', label: 'Skill Gap & Readiness Report', icon: Cpu },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedReportType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedReportType(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'bg-white border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Printable Report Preview Document Card */}
      <div className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-sm space-y-6">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E5DD]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#C76A2A]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B1B1B]">
                HITAM UNIVERSITY • ACADEMIC OUTCOMES REPORT
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#1B1B1B] mt-2 capitalize">
              {selectedReportType.replace(/([A-Z])/g, ' $1')} Report — Batch 2026
            </h1>
            <p className="text-xs text-[#6F6A60] mt-1">
              Department of Computer Science &amp; Engineering • Generated on Sept 26, 2026
            </p>
          </div>

          <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] text-right font-mono text-xs shrink-0">
            <span className="text-[10px] text-[#6F6A60] block">Faculty Coordinator</span>
            <strong className="text-[#1B1B1B] block font-bold">Dr. Ramesh Sharma</strong>
            <span className="text-[#2F7A45] text-[10px]">Verified Output</span>
          </div>
        </div>

        {/* 1. Class Performance Report Content */}
        {selectedReportType === 'performance' && (
          <div className="space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-1">
                <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Overall Class Average</span>
                <strong className="text-2xl font-mono font-bold text-[#1B1B1B]">84.2%</strong>
              </div>
              <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-1">
                <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Average Builder Score</span>
                <strong className="text-2xl font-mono font-bold text-[#C76A2A]">784 / 1000</strong>
              </div>
              <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-1">
                <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Industry Placement Ready</span>
                <strong className="text-2xl font-mono font-bold text-[#2F7A45]">82%</strong>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-[#1B1B1B] text-sm">Course Performance Summary:</h3>
              <div className="overflow-x-auto rounded-2xl border border-[#E8E5DD]">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#FAF9F5] border-b border-[#E8E5DD] font-mono text-[10px] text-[#6F6A60] uppercase">
                    <tr>
                      <th className="p-3">Course Code</th>
                      <th className="p-3">Course Title</th>
                      <th className="p-3">Enrolled</th>
                      <th className="p-3">Avg Attendance</th>
                      <th className="p-3">Avg Builder Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E5DD]">
                    {classes.map((c) => (
                      <tr key={c.id}>
                        <td className="p-3 font-mono font-bold text-[#1B1B1B]">{c.code}</td>
                        <td className="p-3 font-semibold text-[#1B1B1B]">{c.title}</td>
                        <td className="p-3 font-mono">{c.enrolledStudents}</td>
                        <td className="p-3 font-mono text-[#2F7A45] font-bold">{c.avgAttendanceRate}%</td>
                        <td className="p-3 font-mono text-[#C76A2A] font-bold">{c.avgBuilderScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. Attendance Compliance Report Content */}
        {selectedReportType === 'attendance' && (
          <div className="space-y-6 text-xs">
            <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-2">
              <strong className="text-[#1B1B1B] block">Executive Attendance Compliance Summary:</strong>
              <p className="text-[#6F6A60] leading-relaxed">
                The overall department attendance for Batch 2026 stands at 91.0%. 2 students are currently flagged under 75% mandatory threshold and have received automated notification alerts.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#E8E5DD]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#FAF9F5] border-b border-[#E8E5DD] font-mono text-[10px] text-[#6F6A60] uppercase">
                  <tr>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Roll No</th>
                    <th className="p-3">Attendance Rate</th>
                    <th className="p-3">Compliance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E5DD]">
                  {students.map((st) => (
                    <tr key={st.id}>
                      <td className="p-3 font-bold text-[#1B1B1B]">{st.name}</td>
                      <td className="p-3 font-mono text-[#6F6A60]">{st.rollNumber}</td>
                      <td className="p-3 font-mono font-bold text-[#2F7A45]">{st.attendanceRate}%</td>
                      <td className="p-3 font-mono font-bold">
                        {st.attendanceRate >= 75 ? (
                          <span className="text-[#2F7A45]">Compliant</span>
                        ) : (
                          <span className="text-red-600">Shortage Alert</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Assessment Analytics Report Content */}
        {selectedReportType === 'assessment' && (
          <div className="space-y-6 text-xs">
            <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-2">
              <strong className="text-[#1B1B1B] block">Assessment Diagnostic Summary:</strong>
              <p className="text-[#6F6A60] leading-relaxed">
                Evaluated 3 comprehensive micro-quizzes and 4 lab assignments across 144 total students. Class average stands at 84.2%.
              </p>
            </div>
          </div>
        )}

        {/* 4. Skill Gap Report Content */}
        {selectedReportType === 'skillgap' && (
          <div className="space-y-6 text-xs">
            <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-2">
              <strong className="text-[#1B1B1B] block">Skill Gap Analysis &amp; Industry Alignment:</strong>
              <p className="text-[#6F6A60] leading-relaxed">
                Identified critical gap in Docker Containerization (23% gap) and Kafka Real-time Telemetry (21% gap). Remedial weekend workshops have been scheduled.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
