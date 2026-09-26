'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
  FileCheck2,
  Briefcase,
  Calendar,
  ChevronRight,
  Zap,
  BookOpen,
  Code2,
  Sparkles,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { StudentProfile } from '@/types';

interface MainDashboardViewProps {
  studentProfile: StudentProfile;
  targetRole: string;
  onSelectTab: (tab: string) => void;
  onOpenMentorDrawer: (prompt?: string) => void;
}

export function MainDashboardView({
  studentProfile,
  targetRole,
  onSelectTab,
  onOpenMentorDrawer,
}: MainDashboardViewProps) {
  // Weekly sprint state
  const [weeklyTasks, setWeeklyTasks] = useState([
    { id: '1', day: 'Monday', title: 'Complete Spring Dependency Injection micro-lesson', done: true, tag: 'Learn' },
    { id: '2', day: 'Tuesday', title: 'Build Spring `@RestController` for Order API', done: true, tag: 'Build' },
    { id: '3', day: 'Wednesday', title: 'Solve 3 LeetCode Java HashMaps & PriorityQueue problems', done: false, tag: 'Practice' },
    { id: '4', day: 'Thursday', title: 'Containerize PostgreSQL with Docker Compose', done: false, tag: 'Build' },
    { id: '5', day: 'Friday', title: 'Attempt SkillBridge Spring Boot REST API Quiz', done: false, tag: 'Assess' },
    { id: '6', day: 'Weekend', title: 'Review System Design Rate Limiter architecture blueprint', done: false, tag: 'Learn' },
  ]);

  const toggleTask = (id: string) => {
    setWeeklyTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const completedCount = weeklyTasks.filter((t) => t.done).length;
  const progressPct = Math.round((completedCount / weeklyTasks.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner: Current Goal & Career Readiness Grid */}
      <div className="grid lg:grid-cols-12 gap-5">
        {/* Current Goal Box (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#C76A2A]/10 text-[#C76A2A] border border-[#C76A2A]/20 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                Current Target Goal
              </span>
              <span className="text-xs text-[#787774] font-mono">Target: Q4 Placement</span>
            </div>

            <h2 className="text-xl font-bold text-[#1B1B1B] mt-3">{targetRole}</h2>
            <p className="text-xs text-[#575653] mt-1">
              Structured 4-month path to SDE-1 placement at tier-1 product organizations.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#F0ECE1]">
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E5DD]">
                <div className="text-[11px] text-[#787774] font-medium">Target Salary Range</div>
                <div className="text-sm font-bold text-[#1B1B1B] mt-0.5 font-mono">₹12 LPA - ₹18 LPA</div>
              </div>
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E5DD]">
                <div className="text-[11px] text-[#787774] font-medium">Est. Time to Ready</div>
                <div className="text-sm font-bold text-[#1B1B1B] mt-0.5 font-mono">3.5 Months</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => onSelectTab('roadmap')}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>View Roadmap</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenMentorDrawer("How can I accelerate my target goal progress?")}
              className="py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#E8E5DD] border border-[#DCD6C9] text-xs font-medium text-[#1B1B1B] flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
              <span>Ask Mentor</span>
            </button>
          </div>
        </div>

        {/* Career Readiness Meter (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#1B1B1B] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#C76A2A]" />
                Career Readiness Diagnostic
              </h3>
              <p className="text-xs text-[#787774]">Compared against industry benchmarks for SDE-1 Backend</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-[#1B1B1B] font-mono">74%</div>
              <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                +8% this month
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-3 bg-[#F0ECE1] rounded-full overflow-hidden relative">
              <div className="h-full bg-gradient-to-r from-[#C76A2A] to-[#E07A5F] rounded-full transition-all duration-500" style={{ width: '74%' }} />
              {/* Benchmark marker */}
              <div className="absolute top-0 bottom-0 w-0.5 bg-[#1B1B1B]" style={{ left: '82%' }} title="Industry Benchmark (82%)" />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-[#787774]">
              <span>Current Score: 74%</span>
              <span className="text-[#1B1B1B] font-semibold">Target Benchmark: 82%</span>
              <span>Top 5%: 91%</span>
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD]">
              <div className="text-[10px] text-[#787774] font-medium">Java / Core Language</div>
              <div className="text-xs font-bold text-emerald-600 mt-1 font-mono">82% • Strong</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD]">
              <div className="text-[10px] text-[#787774] font-medium">Spring Boot & Microservices</div>
              <div className="text-xs font-bold text-amber-600 mt-1 font-mono">22% • Gap</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD]">
              <div className="text-[10px] text-[#787774] font-medium">Docker & Containers</div>
              <div className="text-xs font-bold text-rose-600 mt-1 font-mono">10% • Critical</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD]">
              <div className="text-[10px] text-[#787774] font-medium">System Design & Databases</div>
              <div className="text-xs font-bold text-blue-600 mt-1 font-mono">35% • Developing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Gaps Summary Matrix */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-[#1B1B1B]">Top Identified Skill Gaps</h3>
          </div>
          <button
            onClick={() => onSelectTab('skill-gap')}
            className="text-xs font-semibold text-[#C76A2A] hover:underline flex items-center gap-1"
          >
            <span>Deep Skill Gap Analysis</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Gap 1 */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1B1B1B]">Spring Boot Framework</span>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">22% Score</span>
            </div>
            <p className="text-xs text-[#575653]">
              Required for enterprise Java microservices. Current deficit: Dependency Injection & Spring Security.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-white rounded border border-amber-300 text-amber-800">Learn: DI & Beans</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-white rounded border border-amber-300 text-amber-800">Build: Order Service API</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-white rounded border border-amber-300 text-amber-800">Assess: Spring Core Quiz</span>
            </div>
          </div>

          {/* Gap 2 */}
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1B1B1B]">Docker & Containerization</span>
              <span className="text-xs font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">10% Score</span>
            </div>
            <p className="text-xs text-[#575653]">
              Critical requirement in 88% of Backend Developer job postings. Missing Dockerfile & Compose skills.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-white rounded border border-rose-300 text-rose-800">Learn: Docker Basics</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-white rounded border border-rose-300 text-rose-800">Build: Multi-container App</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-white rounded border border-rose-300 text-rose-800">Practice: CLI Commands</span>
            </div>
          </div>

          {/* Gap 3 */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1B1B1B]">System Design & Scalability</span>
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">35% Score</span>
            </div>
            <p className="text-xs text-[#575653]">
              Needed for technical interviews & high-load API architecture. Need Caching & DB Sharding practice.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-white rounded border border-blue-300 text-blue-800">Learn: Redis Caching</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-white rounded border border-blue-300 text-blue-800">Build: Rate Limiter</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-white rounded border border-blue-300 text-blue-800">Practice: Design Mock</span>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Projects & Assessments Row */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Suggested Projects */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-[#C76A2A]" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Suggested Projects (Gap-Based)</h3>
            </div>
            <button
              onClick={() => onSelectTab('projects')}
              className="text-xs text-[#C76A2A] hover:underline font-semibold"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-[#E8E5DD] hover:border-[#C76A2A] bg-[#FAF8F5] transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1B1B1B]">RESTful E-Commerce Microservice</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-amber-100 text-amber-800">Intermediate</span>
              </div>
              <p className="text-xs text-[#575653]">
                Build a Java Spring Boot order processing REST API with PostgreSQL and Docker containerization.
              </p>
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-emerald-700 font-medium">Bridges: Spring Boot (22%) & Docker (10%)</span>
                <button
                  onClick={() => onOpenMentorDrawer("Guide me on starting the RESTful E-Commerce Microservice project")}
                  className="text-xs font-bold text-[#C76A2A] hover:underline"
                >
                  Start Project →
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-[#E8E5DD] hover:border-[#C76A2A] bg-[#FAF8F5] transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1B1B1B]">High-Throughput Redis Rate Limiter Gateway</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-indigo-100 text-indigo-800">Advanced</span>
              </div>
              <p className="text-xs text-[#575653]">
                Implement Token Bucket algorithm in Java with Redis memory caching for API throttling.
              </p>
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-emerald-700 font-medium">Bridges: System Design (35%)</span>
                <button
                  onClick={() => onOpenMentorDrawer("How do I build the Redis Rate Limiter Gateway project?")}
                  className="text-xs font-bold text-[#C76A2A] hover:underline"
                >
                  Start Project →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Assessments */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Suggested Assessments</h3>
            </div>
            <span className="text-xs text-[#787774]">Ready to Verify</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-[#E8E5DD] hover:border-emerald-500 bg-[#FAF8F5] transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1B1B1B]">Spring Boot REST Architecture Quiz</span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-100 text-emerald-800">+45 XP</span>
              </div>
              <p className="text-xs text-[#575653]">
                20 Scenario questions covering `@RestController`, `@Autowired`, Exception Handling, and JPA.
              </p>
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-[#787774]">Duration: 25 mins • 20 Questions</span>
                <button
                  onClick={() => onSelectTab('interview')}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  Take Test →
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-[#E8E5DD] hover:border-emerald-500 bg-[#FAF8F5] transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1B1B1B]">Docker Containerization & CLI Evaluation</span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-100 text-emerald-800">+50 XP</span>
              </div>
              <p className="text-xs text-[#575653]">
                Practical Dockerfile syntax, multi-stage builds, port bindings, and docker-compose configurations.
              </p>
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-[#787774]">Duration: 30 mins • Practical Lab</span>
                <button
                  onClick={() => onSelectTab('interview')}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  Take Test →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Opportunity Matches & Weekly Sprint Plan */}
      <div className="grid lg:grid-cols-12 gap-5">
        {/* Opportunity Matches (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Opportunity Matches</h3>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-purple-100 text-purple-800">
              2 High Matches
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1B1B1B]">Backend Software Engineer Intern</h4>
                  <p className="text-[11px] text-[#575653]">Razorpay • Remote / Bengaluru</p>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold font-mono rounded-full bg-purple-600 text-white">
                  92% Match
                </span>
              </div>
              <p className="text-xs text-[#575653]">
                Requirements: Strong Java, REST APIs, SQL, Basic Docker. Your current skills fulfill 92% of criteria.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-emerald-700 font-semibold">Missing: Dockerfile optimization (8%)</span>
                <button
                  onClick={() => onOpenMentorDrawer("How do I tailor my resume for Razorpay Backend Intern role?")}
                  className="text-xs font-bold text-purple-700 hover:underline"
                >
                  Apply & Tailor →
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#E8E5DD] bg-[#FAF8F5] space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1B1B1B]">Junior Systems & Cloud Developer</h4>
                  <p className="text-[11px] text-[#575653]">Swiggy • Hyderabad</p>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold font-mono rounded-full bg-[#1B1B1B] text-white">
                  85% Match
                </span>
              </div>
              <p className="text-xs text-[#575653]">
                Requirements: Java/Spring Boot, Microservices, Redis Caching.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-amber-700 font-semibold">Missing: Spring Boot depth (15%)</span>
                <button
                  onClick={() => onOpenMentorDrawer("What skills do I need to reach 100% match for Swiggy?")}
                  className="text-xs font-bold text-[#1B1B1B] hover:underline"
                >
                  View Skill Plan →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Plan Checklist (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C76A2A]" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Weekly Mentor Sprint Plan</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-[#F0ECE1] rounded-full overflow-hidden">
                <div className="h-full bg-[#C76A2A]" style={{ width: `${progressPct}%` }} />
              </div>
              <span className="text-xs font-mono font-bold text-[#1B1B1B]">{progressPct}%</span>
            </div>
          </div>

          <div className="space-y-2">
            {weeklyTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                  task.done
                    ? 'bg-emerald-50/50 border-emerald-200 text-[#787774]'
                    : 'bg-[#FAF8F5] border-[#E8E5DD] text-[#1B1B1B] hover:border-[#C76A2A]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                      task.done
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-[#A3A3A3] bg-white'
                    }`}
                  >
                    {task.done && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="text-[11px] font-mono text-[#787774] w-20 shrink-0">{task.day}</span>
                  <span className={`text-xs truncate font-medium ${task.done ? 'line-through' : ''}`}>
                    {task.title}
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-[#E8E5DD] shrink-0">
                  {task.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
