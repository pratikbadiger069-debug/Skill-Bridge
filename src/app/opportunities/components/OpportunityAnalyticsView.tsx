'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  CheckCircle2,
  PieChart,
  BarChart3,
  Award,
  Zap,
} from 'lucide-react';

export function OpportunityAnalyticsView() {
  const ANALYTICS_CARDS = [
    { title: 'Total Applications Tracked', value: '8 Submissions', change: '+3 this month', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
    { title: 'Acceptance / Shortlist Rate', value: '37.5%', change: '3 of 8 Shortlisted', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
    { title: 'Readiness Growth', value: '+14%', change: 'Readiness score from 60% to 74%', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
    { title: 'Most Applied Category', value: 'Internships (50%)', change: 'Hackathons 25%, Jobs 25%', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  ];

  const PLACEMENT_TRENDS = [
    { role: 'Backend Engineering Intern', demand: 'High Demand', avgPackage: '₹45k - ₹85k / mo', topMatch: 'Razorpay, Google, Swiggy' },
    { role: 'DevOps & Systems Trainee', demand: 'Very High', avgPackage: '₹14 LPA - ₹18 LPA', topMatch: 'Swiggy, Razorpay' },
    { role: 'AI / Agentic Workflow Engineer', demand: 'Emerging Hot', avgPackage: '$15k Hackathons & Grants', topMatch: 'Google Cloud AI' },
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Cards Row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ANALYTICS_CARDS.map((card, idx) => (
          <div key={idx} className={`p-4 rounded-2xl border ${card.bg} space-y-1.5`}>
            <span className="text-[10px] font-mono font-bold text-[#787774] block uppercase">{card.title}</span>
            <div className={`text-xl font-bold font-mono ${card.color}`}>{card.value}</div>
            <span className="text-[11px] font-medium text-[#575653] block">{card.change}</span>
          </div>
        ))}
      </div>

      {/* Placement Trends Breakdown */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#C76A2A]" />
            <h3 className="text-sm font-bold text-[#1B1B1B]">Placement & Industry Hiring Trends 2026</h3>
          </div>
          <span className="text-xs font-mono text-[#787774]">Updated Weekly</span>
        </div>

        <div className="space-y-3">
          {PLACEMENT_TRENDS.map((trend, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[#1B1B1B]">{trend.role}</h4>
                  <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-emerald-100 text-emerald-800 font-bold">
                    {trend.demand}
                  </span>
                </div>
                <p className="text-[#575653] text-[11px]">Top Hirers: {trend.topMatch}</p>
              </div>

              <div className="text-right shrink-0 font-mono">
                <span className="font-bold text-[#C76A2A]">{trend.avgPackage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
