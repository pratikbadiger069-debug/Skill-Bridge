'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sun,
  Target,
  Calendar,
  Sparkles,
  Quote,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
} from 'lucide-react';

interface DailyMentorViewProps {
  onOpenMentorDrawer: (prompt?: string) => void;
  onSelectTab: (tab: string) => void;
}

export function DailyMentorView({ onOpenMentorDrawer, onSelectTab }: DailyMentorViewProps) {
  const PERSONALIZED_RECOMMENDATIONS = [
    {
      id: 'rec-1',
      title: 'Complete 30-min Spring Boot Dependency Injection Micro-Lesson',
      category: 'Learning Sprint',
      actionText: 'Start Lesson',
      tabTarget: 'skill-gap',
      prompt: 'Explain Spring Dependency Injection and IoC container in simple terms',
    },
    {
      id: 'rec-2',
      title: 'Create Dockerfile for local Java Spring Boot application',
      category: 'Build Task',
      actionText: 'View Project Spec',
      tabTarget: 'projects',
      prompt: 'Help me write an optimized multi-stage Dockerfile for my Java Spring Boot app',
    },
    {
      id: 'rec-3',
      title: 'Attempt Spring Boot REST Architecture Quiz',
      category: 'Verification',
      actionText: 'Take Assessment',
      tabTarget: 'interview',
      prompt: 'What topics are covered in the Spring Boot REST Architecture Quiz?',
    },
    {
      id: 'rec-4',
      title: 'Review System Design Rate Limiter architecture blueprint',
      category: 'Architecture',
      actionText: 'Review Blueprint',
      tabTarget: 'roadmap',
      prompt: 'Walk me through the Redis Token Bucket Rate Limiter architecture',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Mentor Morning Briefing Hero */}
      <div className="bg-gradient-to-br from-[#1B1B1B] via-[#262626] to-[#1B1B1B] text-white rounded-2xl p-6 border border-[#2D2D2D] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3A3A3A] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#C76A2A]/20 border border-[#C76A2A]/40 text-[#E07A5F]">
              <Sun className="w-6 h-6 animate-pulse text-[#E07A5F]" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider block">
                DAILY MENTOR BRIEFING
              </span>
              <h2 className="text-lg font-bold text-white">Good Morning, Pratik!</h2>
            </div>
          </div>

          <div className="text-xs font-mono text-[#A3A3A3] flex items-center gap-2">
            <span>Streak: 14 Days 🔥</span>
            <span className="text-[#404040]">|</span>
            <span className="text-emerald-400">Readiness: 74% (+8%)</span>
          </div>
        </div>

        {/* 3 Pillar Targets Grid: Today's Focus, Weekly Goal, Monthly Target */}
        <div className="grid md:grid-cols-3 gap-4 pt-1">
          {/* Today's Focus */}
          <div className="p-4 rounded-xl bg-[#262626] border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">TODAY'S FOCUS</span>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <h3 className="text-xs font-bold text-white">
              Master Spring Dependency Injection and write `@RestController` unit tests
            </h3>
            <p className="text-[11px] text-[#A3A3A3]">
              Est time: 1.5 hours • Target: Understand `@Component`, `@Service`, `@Autowired`.
            </p>
          </div>

          {/* Weekly Goal */}
          <div className="p-4 rounded-xl bg-[#262626] border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">WEEKLY GOAL</span>
              <Target className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <h3 className="text-xs font-bold text-white">
              Implement 2 Spring Boot micro-modules & Dockerize PostgreSQL
            </h3>
            <p className="text-[11px] text-[#A3A3A3]">
              Sprint progress: 33% complete (2 of 6 tasks finished).
            </p>
          </div>

          {/* Monthly Target */}
          <div className="p-4 rounded-xl bg-[#262626] border border-purple-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">MONTHLY TARGET</span>
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <h3 className="text-xs font-bold text-white">
              Boost Spring Boot score from 22% to 65% & reach 80% Readiness
            </h3>
            <p className="text-[11px] text-[#A3A3A3]">
              Unlocks tier-1 backend internship eligibility on Razorpay.
            </p>
          </div>
        </div>
      </div>

      {/* Career Advice Card */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-[#C76A2A]">
          <Quote className="w-5 h-5 text-[#C76A2A]" />
          <h3 className="text-sm font-bold text-[#1B1B1B]">Mentor Career Wisdom of the Day</h3>
        </div>

        <blockquote className="text-xs text-[#575653] italic leading-relaxed pl-4 border-l-2 border-[#C76A2A]">
          "Top tier backend software engineers aren't judged by how fast they type code; they are evaluated on how cleanly they model domain entities, isolate service boundaries, handle distributed failures, and document API contracts for their team."
        </blockquote>

        <div className="text-[11px] text-[#787774] font-mono pt-1 text-right">
          — Dr. Evelyn Vance, Senior Staff Architect & Career Mentor
        </div>
      </div>

      {/* Personalized Recommendations Feed */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C76A2A]" />
            <h3 className="text-sm font-bold text-[#1B1B1B]">Personalized Mentor Recommendations</h3>
          </div>
          <span className="text-xs font-mono text-[#787774]">4 High-Priority Actions</span>
        </div>

        <div className="space-y-3">
          {PERSONALIZED_RECOMMENDATIONS.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-xl border border-[#E8E5DD] bg-[#FAF8F5] hover:border-[#C76A2A] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-[#E8E5DD] text-[#1B1B1B]">
                  {rec.category}
                </span>
                <h4 className="text-xs font-bold text-[#1B1B1B]">{rec.title}</h4>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onSelectTab(rec.tabTarget)}
                  className="py-1.5 px-3 rounded-lg bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-semibold"
                >
                  {rec.actionText}
                </button>
                <button
                  onClick={() => onOpenMentorDrawer(rec.prompt)}
                  className="py-1.5 px-3 rounded-lg bg-white border border-[#DCD6C9] hover:border-[#C76A2A] text-xs font-medium text-[#1B1B1B] flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
                  <span>Ask Mentor</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
