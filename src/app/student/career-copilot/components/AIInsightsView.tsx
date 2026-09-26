'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Zap,
  ArrowRight,
  ShieldCheck,
  Award,
  Target,
} from 'lucide-react';

interface AIInsightsViewProps {
  onOpenMentorDrawer: (prompt?: string) => void;
  onSelectTab: (tab: string) => void;
}

export function AIInsightsView({ onOpenMentorDrawer, onSelectTab }: AIInsightsViewProps) {
  return (
    <div className="space-y-6">
      {/* Top Banner: Next Best Action Card */}
      <div className="bg-[#1B1B1B] text-white rounded-2xl p-6 border border-[#2D2D2D] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Zap className="w-48 h-48 text-[#C76A2A]" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-[#C76A2A] text-white flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-white" />
              PRIORITY #1 NEXT BEST ACTION
            </span>
            <span className="text-xs text-[#A3A3A3] font-mono">Calculated by Mentor Engine</span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Bridge your 22% Spring Boot gap by completing the Order Service Microservice API
            </h2>
            <p className="text-xs text-[#D4D4D4] mt-1.5 max-w-2xl leading-relaxed">
              Based on your strong Java base (82%), completing this 12-hour project sprint will boost your Backend Career Readiness from 74% to 83% and unlock 3 tier-1 internship matches on Razorpay & Swiggy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectTab('projects')}
              className="py-2.5 px-5 rounded-xl bg-[#C76A2A] hover:bg-[#b05b22] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
            >
              <span>Execute Next Best Action</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenMentorDrawer("Why is building the Order Service API my top priority next best action?")}
              className="py-2.5 px-4 rounded-xl bg-[#262626] hover:bg-[#333] border border-[#3A3A3A] text-xs font-medium text-white flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
              <span>Discuss Rationale with Mentor</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Grid Columns: Strong Areas, Weak Areas, Growth Opportunities */}
      <div className="grid md:grid-cols-3 gap-5">
        {/* Strong Areas */}
        <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold">Strong Areas</h3>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800">
              Top Strengths
            </span>
          </div>

          <div className="space-y-3 text-xs text-[#575653]">
            <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
              <span className="font-bold text-[#1B1B1B] block">Core Java Mastery (82%)</span>
              <p className="text-[11px]">Strong understanding of Object-Oriented Design, Generics, and Collections API.</p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
              <span className="font-bold text-[#1B1B1B] block">Data Structures & Algorithms (80%)</span>
              <p className="text-[11px]">High accuracy on Arrays, HashMaps, Trees, and Two-Pointer algorithm sets.</p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
              <span className="font-bold text-[#1B1B1B] block">Commit Consistency & Git Habits</span>
              <p className="text-[11px]">Active 14-day commit streak with 142 total commits in last 30 days.</p>
            </div>
          </div>
        </div>

        {/* Weak Areas */}
        <div className="bg-white rounded-2xl p-5 border border-rose-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-rose-100 pb-3">
            <div className="flex items-center gap-2 text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <h3 className="text-sm font-bold">Weak Areas (Blockers)</h3>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-100 text-rose-800">
              Needs Focus
            </span>
          </div>

          <div className="space-y-3 text-xs text-[#575653]">
            <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 space-y-1">
              <span className="font-bold text-[#1B1B1B] block">Docker & Containers (10%)</span>
              <p className="text-[11px]">Missing containerization skills required by 88% of Backend engineering teams.</p>
            </div>

            <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 space-y-1">
              <span className="font-bold text-[#1B1B1B] block">Spring Boot Framework (22%)</span>
              <p className="text-[11px]">Deficit in Dependency Injection, JPA repository methods, and Spring Security.</p>
            </div>

            <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 space-y-1">
              <span className="font-bold text-[#1B1B1B] block">System Design & Caching (35%)</span>
              <p className="text-[11px]">Need practice with Redis cache-aside patterns, rate limiting, and DB sharding.</p>
            </div>
          </div>
        </div>

        {/* Growth Opportunities */}
        <div className="bg-white rounded-2xl p-5 border border-blue-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-blue-100 pb-3">
            <div className="flex items-center gap-2 text-blue-800">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold">Growth Opportunities</h3>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-100 text-blue-800">
              High Leverage
            </span>
          </div>

          <div className="space-y-3 text-xs text-[#575653]">
            <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 space-y-1">
              <span className="font-bold text-[#1B1B1B] block">Complete Docker Practical Lab (+50 XP)</span>
              <p className="text-[11px]">Quick 30-min evaluation that immediately unlocks container verification status.</p>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 space-y-1">
              <span className="font-bold text-[#1B1B1B] block">Build 1 Microservice Project (+120 XP)</span>
              <p className="text-[11px]">Bridges both Spring Boot and REST API gaps simultaneously.</p>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 space-y-1">
              <span className="font-bold text-[#1B1B1B] block">Participate in Peer Code Reviews</span>
              <p className="text-[11px]">Unlocks Community Top Contributor badge and improves code review score.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
