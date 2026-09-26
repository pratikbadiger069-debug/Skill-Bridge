'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useSmartClassroomStore } from '@/lib/smart-classroom-store';
import {
  FileText,
  Download,
  BrainCircuit,
  Users,
  CheckCircle2,
  AlertTriangle,
  Award,
  BookOpen,
  Sparkles,
  ChevronLeft,
  Share2,
  Printer,
  ListChecks,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  BarChart2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PostClassReportPage() {
  const params = useParams();
  const roomCode = typeof params.code === 'string' ? params.code.toUpperCase() : 'JAVA-3A-2026';
  const { getRoomByCode, generateReport } = useSmartClassroomStore();

  const room = getRoomByCode(roomCode);
  const [report, setReport] = useState(() => {
    try {
      return generateReport(roomCode);
    } catch {
      return {
        roomId: 'room-101',
        roomCode: roomCode,
        title: 'Advanced Java Microservices & Spring Boot Architecture',
        facultyName: 'Dr. Ramesh Sharma',
        date: 'Sep 26, 2026',
        totalEnrolled: 52,
        totalAttended: 48,
        attendanceRate: 92,
        avgParticipation: 88,
        avgUnderstanding: 82,
        topicHeatmap: [
          { topic: 'Spring Boot Dependency Injection', score: 92, status: 'Mastered' as const },
          { topic: 'Auto-Configuration & Spring Starters', score: 85, status: 'Mastered' as const },
          { topic: 'Circular Dependencies & @Lazy', score: 64, status: 'Review Needed' as const },
          { topic: 'Custom Actuator Metrics', score: 52, status: 'Critical Gap' as const },
        ],
        weakStudents: [
          { studentId: 'st-03', name: 'Karthik Raja', score: 68, keyGap: 'Circular Bean Dependency Resolution' },
          { studentId: 'st-09', name: 'Vikram Mehta', score: 62, keyGap: 'Spring Boot Actuator Customization' },
        ],
        strongStudents: [
          { studentId: 'st-01', name: 'Manutej Reddy', score: 98, potentialRole: 'Peer Mentor / TA Candidate' },
          { studentId: 'st-02', name: 'Priya Sharma', score: 94, potentialRole: 'Lab Group Leader' },
        ],
        autoNotes: {
          lectureSummary:
            'In today\'s session, Dr. Ramesh Sharma led a comprehensive deep-dive into Spring Boot Auto-Configuration mechanisms, Bean Scopes (@Component vs @Bean), circular dependency resolution using @Lazy, and custom Actuator endpoints for cloud observability.',
          keyConcepts: [
            'Auto-Configuration uses @ConditionalOnClass and spring.factories/AutoConfiguration.imports.',
            'Circular dependencies occur when Bean A requires Bean B and vice versa during constructor initialization.',
            'Use @Lazy annotation or Setter Injection to resolve circular dependency traps cleanly.',
            'Custom Health Indicators implement HealthIndicator interface and return Health.up() or Health.down().',
          ],
          actionItems: [
            'Complete Lab Exercise #4 on Custom Spring Actuator Endpoints before Friday 11:59 PM.',
            'Review peer solutions for Circular Dependency handling in the GitHub repository.',
          ],
          homeworkSuggestions: [
            'Refactor monolithic monolith service to use Spring Boot Starters.',
            'Implement custom HealthIndicator monitoring PostgreSQL connection pool depth.',
          ],
          revisionSuggestions: [
            'Re-watch 15-minute clip on @ConditionalOnMissingBean.',
            'Solve Spring Boot Core 10-Q Practice Assessment in Assessment Hub.',
          ],
        },
        generatedQuiz: [
          {
            id: 'q1',
            question: 'Which annotation is used to auto-configure beans only if a specific class is present on the classpath?',
            options: ['@ConditionalOnClass', '@ConditionalOnBean', '@ConditionalOnProperty', '@EnableAutoConfiguration'],
            correctAnswer: 0,
            explanation: '@ConditionalOnClass checks if the target class exists in the classpath before loading the configuration.',
          },
          {
            id: 'q2',
            question: 'How does Spring Boot handle circular dependency resolution when using constructor injection?',
            options: [
              'It ignores the loop automatically',
              'It throws BeanCurrentlyInCreationException unless @Lazy or setter injection is used',
              'It converts the beans to static singletons',
              'It compiles without error but fails at runtime on first method call',
            ],
            correctAnswer: 1,
            explanation: 'Constructor circular dependencies throw BeanCurrentlyInCreationException at startup unless broke with @Lazy.',
          },
        ],
      };
    }
  });

  const [activeTab, setActiveTab] = useState<'summary' | 'notes' | 'quiz'>('summary');
  const [copiedLink, setCopiedLink] = useState(false);

  const handlePrint = () => {
    confetti({ particleCount: 30, spread: 50 });
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1100px] mx-auto pb-16 font-sans text-[#1B1B1B] print:p-0">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E5DD] print:hidden">
          <div className="flex items-start gap-3.5">
            <Link
              href={`/classroom/${roomCode}`}
              className="p-2 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#1B1B1B] text-[#1B1B1B] transition-colors mt-1"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] text-white text-xs font-mono font-bold">
                  {report.roomCode}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-bold">
                  Post-Class AI Report
                </span>
                <span className="text-xs text-[#6F6A60] font-medium">{report.date}</span>
              </div>
              <h1 className="text-2xl font-bold text-[#1B1B1B] tracking-tight">{report.title}</h1>
              <p className="text-xs text-[#6F6A60]">Faculty Host: {report.facultyName} • Enrolled: {report.totalEnrolled} Students</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5 text-[#C76A2A]" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Report'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#1B1B1B] text-white hover:bg-[#C76A2A] rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export PDF / Print</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#E8E5DD] pb-3 print:hidden">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'summary'
                ? 'bg-[#1B1B1B] text-white shadow-xs'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Class Telemetry &amp; Heatmap</span>
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'notes'
                ? 'bg-[#1B1B1B] text-white shadow-xs'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
            <span>Auto AI Notes &amp; Action Items</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'quiz'
                ? 'bg-[#1B1B1B] text-white shadow-xs'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Generated AI Revision Quiz</span>
          </button>
        </div>

        {/* TAB 1: SUMMARY & HEATMAP */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Metric Overview Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] space-y-1">
                <span className="text-xs text-[#6F6A60] font-medium block">Attendance Rate</span>
                <span className="text-2xl font-bold text-[#2F7A45]">{report.attendanceRate}%</span>
                <span className="text-[11px] text-[#6F6A60] block">{report.totalAttended} of {report.totalEnrolled} Attended</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] space-y-1">
                <span className="text-xs text-[#6F6A60] font-medium block">Avg Participation</span>
                <span className="text-2xl font-bold text-[#1B1B1B]">{report.avgParticipation}%</span>
                <span className="text-[11px] text-[#6F6A60] block">Poll &amp; Doubt Engagement</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] space-y-1">
                <span className="text-xs text-[#6F6A60] font-medium block">AI Understanding Score</span>
                <span className="text-2xl font-bold text-[#C76A2A]">{report.avgUnderstanding}%</span>
                <span className="text-[11px] text-[#6F6A60] block">Real-time Telemetry</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] space-y-1">
                <span className="text-xs text-[#6F6A60] font-medium block">Class Status</span>
                <span className="text-2xl font-bold text-[#2F7A45]">High Output</span>
                <span className="text-[11px] text-[#6F6A60] block">Above Benchmark</span>
              </div>
            </div>

            {/* Concept Understanding & Topic Heatmap */}
            <div className="p-6 rounded-2xl bg-white border border-[#E8E5DD] space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
                <div>
                  <h2 className="text-base font-bold text-[#1B1B1B]">Concept Understanding &amp; Topic Heatmap</h2>
                  <p className="text-xs text-[#6F6A60]">Breakdown of student comprehension across core lecture topics.</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#FAF9F5] border border-[#E8E5DD] text-xs font-semibold text-[#1B1B1B]">
                  4 Sub-Topics Evaluated
                </span>
              </div>

              <div className="space-y-4">
                {report.topicHeatmap.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2 text-xs">
                    <div className="flex items-center justify-between font-bold text-[#1B1B1B]">
                      <span>{item.topic}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{item.score}% Mastery</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.status === 'Mastered'
                              ? 'bg-[#2F7A45]/15 text-[#2F7A45]'
                              : item.status === 'Review Needed'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-rose-100 text-rose-900'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <div className="h-2 rounded-full bg-white border border-[#E8E5DD] overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          item.score >= 80 ? 'bg-[#2F7A45]' : item.score >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Performance Segmentation: Weak vs Strong */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weak Student Detection */}
              <div className="p-6 rounded-2xl bg-white border border-[#E8E5DD] space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-3">
                  <h3 className="text-sm font-bold text-[#1B1B1B] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Weak Student Detection (Remediation)</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-bold">
                    Needs Review
                  </span>
                </div>

                <div className="space-y-3">
                  {report.weakStudents.map((st) => (
                    <div key={st.studentId} className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-rose-900">
                        <span>{st.name}</span>
                        <span className="font-mono">{st.score}% Score</span>
                      </div>
                      <p className="text-[11px] text-rose-800">Primary Gap: {st.keyGap}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strong Student Detection */}
              <div className="p-6 rounded-2xl bg-white border border-[#E8E5DD] space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-3">
                  <h3 className="text-sm font-bold text-[#1B1B1B] flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C76A2A]" />
                    <span>Strong Student Segment (Peer Mentors)</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-[#2F7A45]/15 text-[#2F7A45] text-[10px] font-bold">
                    Top 5%
                  </span>
                </div>

                <div className="space-y-3">
                  {report.strongStudents.map((st) => (
                    <div key={st.studentId} className="p-3.5 rounded-xl bg-[#2F7A45]/5 border border-[#2F7A45]/20 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-[#2F7A45]">
                        <span>{st.name}</span>
                        <span className="font-mono">{st.score}% Score</span>
                      </div>
                      <p className="text-[11px] text-[#1B1B1B]">Role Match: {st.potentialRole}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AUTO AI NOTES & ACTION ITEMS */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E8E5DD] space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C76A2A]" />
                  <h2 className="text-base font-bold text-[#1B1B1B]">Smart Auto Notes &amp; Executive Summary</h2>
                </div>
                <span className="text-xs text-[#6F6A60]">Generated automatically from live transcript &amp; polls</span>
              </div>

              {/* Lecture Summary */}
              <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2 text-xs">
                <h3 className="font-bold text-[#1B1B1B] text-sm">Lecture Executive Summary</h3>
                <p className="text-[#6F6A60] leading-relaxed">{report.autoNotes.lectureSummary}</p>
              </div>

              {/* Key Concepts */}
              <div className="space-y-3">
                <h3 className="font-bold text-[#1B1B1B] text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#C76A2A]" />
                  <span>Key Concepts &amp; Core Takeaways</span>
                </h3>
                <ul className="space-y-2 text-xs">
                  {report.autoNotes.keyConcepts.map((concept, idx) => (
                    <li key={idx} className="p-3 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] font-medium text-[#1B1B1B] flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#1B1B1B] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Items & Homework */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2 text-xs">
                  <h4 className="font-bold text-[#1B1B1B] text-xs flex items-center gap-1.5">
                    <ListChecks className="w-4 h-4 text-[#2F7A45]" />
                    <span>Action Items for Students</span>
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-[#6F6A60]">
                    {report.autoNotes.actionItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2 text-xs">
                  <h4 className="font-bold text-[#1B1B1B] text-xs flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-[#C76A2A]" />
                    <span>Homework &amp; Practice Tasks</span>
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-[#6F6A60]">
                    {report.autoNotes.homeworkSuggestions.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GENERATED AI REVISION QUIZ */}
        {activeTab === 'quiz' && (
          <div className="p-6 rounded-2xl bg-white border border-[#E8E5DD] space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
              <div>
                <h2 className="text-base font-bold text-[#1B1B1B]">Generated AI Revision Quiz</h2>
                <p className="text-xs text-[#6F6A60]">Instant 2-question revision assessment calibrated on class knowledge gaps.</p>
              </div>
              <button
                onClick={() => confetti({ particleCount: 35, spread: 50 })}
                className="px-3.5 py-1.5 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors"
              >
                Launch Live Quiz for Class
              </button>
            </div>

            <div className="space-y-6">
              {report.generatedQuiz.map((quiz, i) => (
                <div key={quiz.id} className="p-5 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1B1B1B] text-sm">Question #{i + 1}</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#E8E5DD] text-[10px] font-mono font-bold">
                      MCQ Single Choice
                    </span>
                  </div>

                  <p className="font-semibold text-[#1B1B1B] leading-snug">{quiz.question}</p>

                  <div className="space-y-2 pl-2">
                    {quiz.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                          optIdx === quiz.correctAnswer
                            ? 'bg-[#2F7A45]/15 border-[#2F7A45] font-bold text-[#2F7A45]'
                            : 'bg-white border-[#E8E5DD] text-[#6F6A60]'
                        }`}
                      >
                        <span>{opt}</span>
                        {optIdx === quiz.correctAnswer && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-[#E8E5DD] text-[11px] text-[#6F6A60]">
                    <strong className="text-[#1B1B1B]">Explanation: </strong> {quiz.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
