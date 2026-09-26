'use client';

import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Cpu, Award } from 'lucide-react';
import { FacultyClass, StudentRecord } from '../types';

interface AssessmentAnalyticsViewProps {
  classes: FacultyClass[];
  students: StudentRecord[];
}

export const AssessmentAnalyticsView: React.FC<AssessmentAnalyticsViewProps> = ({ classes, students }) => {
  const scores = students.map((s) => s.assessmentAvg);
  const classAvg = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '84.0';
  const highestScore = Math.max(...scores, 98);
  const lowestScore = Math.min(...scores, 58);

  const topStudent = students.find((s) => s.assessmentAvg === highestScore) || students[0];
  const lowStudent = students.find((s) => s.assessmentAvg === lowestScore) || students[3];

  const weakAreas = [
    { topic: 'Circular Bean Dependency Resolution', failurePct: 34, classCode: 'JAVA-3A', priority: 'High' },
    { topic: 'Custom Spring Boot Actuator Endpoints', failurePct: 28, classCode: 'JAVA-3A', priority: 'Medium' },
    { topic: 'LoRA Target Module Layer Selection', failurePct: 24, classCode: 'AI-4B', priority: 'Medium' },
  ];

  const strongAreas = [
    { topic: 'Spring Boot Auto-Configuration', masteryPct: 92, classCode: 'JAVA-3A' },
    { topic: 'RESTful API Endpoint Security', masteryPct: 88, classCode: 'JAVA-3A' },
    { topic: 'PyTorch Model Training Loop', masteryPct: 86, classCode: 'AI-4B' },
  ];

  const skillGaps = [
    { skill: 'Docker Containerization & Compose', targetPct: 85, currentPct: 62, gap: '23% Gap' },
    { skill: 'Microservices Circuit Breakers', targetPct: 80, currentPct: 68, gap: '12% Gap' },
    { skill: 'Kafka Real-Time Telemetry', targetPct: 75, currentPct: 54, gap: '21% Gap' },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-2">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Class Average</span>
          <strong className="text-3xl font-bold font-mono text-[#1B1B1B]">{classAvg}%</strong>
          <span className="text-[10px] text-[#2F7A45] font-bold block">+4.2% from previous month</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-2">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Highest Score</span>
          <strong className="text-3xl font-bold font-mono text-[#2F7A45]">{highestScore}%</strong>
          <span className="text-[10px] text-[#6F6A60] block">{topStudent.name}</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-2">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Lowest Score</span>
          <strong className="text-3xl font-bold font-mono text-red-600">{lowestScore}%</strong>
          <span className="text-[10px] text-red-600 font-bold block">{lowStudent.name} (Needs Help)</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-2">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Skill Gap Benchmark</span>
          <strong className="text-3xl font-bold font-mono text-[#C76A2A]">82.4%</strong>
          <span className="text-[10px] text-[#6F6A60] block">Industry benchmark readiness</span>
        </div>
      </div>

      {/* 2-Column Grid: Weak Areas vs Strong Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weak Areas Card */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="text-base font-bold text-[#1B1B1B]">Identified Weak Areas</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 text-xs font-mono font-bold">
              3 Topics Alert
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {weakAreas.map((w, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                    {w.classCode}
                  </span>
                  <span className="text-[10px] font-mono text-red-600 font-bold">
                    {w.failurePct}% Failure Rate
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#1B1B1B]">{w.topic}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Strong Areas Card */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2F7A45]" />
              <h3 className="text-base font-bold text-[#1B1B1B]">Mastered Strong Areas</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-mono font-bold">
              High Proficiency
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {strongAreas.map((s, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                    {s.classCode}
                  </span>
                  <span className="text-[10px] font-mono text-[#2F7A45] font-bold">
                    {s.masteryPct}% Mastery Rate
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#1B1B1B]">{s.topic}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Gaps Breakdown Bar Progress */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#C76A2A]" />
            <h3 className="text-base font-bold text-[#1B1B1B]">Cohort Skill Gap Matrix vs Industry Expectations</h3>
          </div>
        </div>

        <div className="space-y-4">
          {skillGaps.map((sg, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-center font-bold">
                <span className="text-[#1B1B1B]">{sg.skill}</span>
                <span className="font-mono text-[#C76A2A]">
                  Current {sg.currentPct}% / Target {sg.targetPct}% ({sg.gap})
                </span>
              </div>

              <div className="w-full h-3 bg-[#E8E5DD] rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-[#C76A2A] rounded-full transition-all duration-300"
                  style={{ width: `${sg.currentPct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
