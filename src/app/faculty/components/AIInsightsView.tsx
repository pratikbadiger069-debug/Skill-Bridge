'use client';

import React from 'react';
import { Sparkles, AlertTriangle, HelpCircle, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';
import { AIHelpStudent, CommonConfusion } from '../types';

interface AIInsightsViewProps {
  helpStudents: AIHelpStudent[];
  confusions: CommonConfusion[];
}

export const AIInsightsView: React.FC<AIInsightsViewProps> = ({ helpStudents, confusions }) => {
  return (
    <div className="space-y-6">
      {/* AI Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C76A2A]" />
            <span className="px-2.5 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-bold font-mono">
              AI Pedagogical Assistant
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#1B1B1B] mt-1">AI Automated Teaching Insights &amp; Interventions</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Continuously analyzing student micro-quizzes, doubt patterns, and lab submissions to synthesize target recommendations.
          </p>
        </div>

        <div className="p-3.5 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] text-center shrink-0">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Class Readiness Score</span>
          <strong className="text-2xl font-bold font-mono text-[#2F7A45]">84.2 / 100</strong>
          <span className="text-[10px] text-[#2F7A45] font-bold block">+3.8% vs last week</span>
        </div>
      </div>

      {/* 2-Column Grid: Students Needing Help & Common Confusion Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Students Needing Immediate Help */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <h3 className="text-base font-bold text-[#1B1B1B]">Students Needing Academic Help</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-700 text-xs font-mono font-bold">
              {helpStudents.length} Interventions
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {helpStudents.map((hs, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <strong className="text-[#1B1B1B] font-bold text-sm">{hs.name}</strong>
                    <span className="px-2 py-0.5 bg-[#1B1B1B] text-white text-[10px] font-mono font-bold rounded-md">
                      {hs.classCode}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-red-600">
                    BS: {hs.builderScore}
                  </span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-[#E8E5DD] space-y-1">
                  <span className="text-[10px] font-bold text-[#6F6A60] block uppercase">Primary Struggle:</span>
                  <p className="text-[#1B1B1B] font-medium">{hs.primaryStruggle}</p>
                </div>

                <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-200 text-[#2F7A45] space-y-1">
                  <span className="text-[10px] font-bold block uppercase">Suggested AI Action:</span>
                  <p>{hs.suggestedAction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Confusion Areas */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#C76A2A]" />
              <h3 className="text-base font-bold text-[#1B1B1B]">Common Confusion Areas</h3>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {confusions.map((c, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                    {c.classCode}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#C76A2A]">
                    {c.affectedPct}% Students Confused
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#1B1B1B]">{c.topic}</h4>

                <div className="p-2.5 bg-white rounded-xl border border-[#E8E5DD] text-[#6F6A60]">
                  <strong className="text-[#1B1B1B] block">Sample Student Doubt:</strong>
                  <p className="italic">{c.sampleQuestion}</p>
                </div>

                <div className="p-2.5 bg-[#FAF9F5] rounded-xl border border-[#E8E5DD] text-[#1B1B1B]">
                  <strong className="text-[#2F7A45] block">AI Recommended Clarification:</strong>
                  <p>{c.aiClarification}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Revision Topics Section */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#1B1B1B]" />
            <h3 className="text-base font-bold text-[#1B1B1B]">AI Suggested Revision Topics for Next Session</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-1.5">
            <span className="px-2 py-0.5 bg-[#1B1B1B] text-white text-[10px] font-mono font-bold rounded-md">JAVA-3A</span>
            <h4 className="font-bold text-[#1B1B1B]">10-min Recap: @Lazy vs Setter Injection</h4>
            <p className="text-[#6F6A60] text-[11px]">82% of class will benefit from quick live code demonstration of circular bean resolution.</p>
          </div>

          <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-1.5">
            <span className="px-2 py-0.5 bg-[#1B1B1B] text-white text-[10px] font-mono font-bold rounded-md">AI-4B</span>
            <h4 className="font-bold text-[#1B1B1B]">15-min Lab Recap: Tensor Shape Broadcast Rules</h4>
            <p className="text-[#6F6A60] text-[11px]">Address recurring batch dimension mismatch issues seen in Lab Assignment #3.</p>
          </div>

          <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-1.5">
            <span className="px-2 py-0.5 bg-[#1B1B1B] text-white text-[10px] font-mono font-bold rounded-md">DS-2C</span>
            <h4 className="font-bold text-[#1B1B1B]">5-min Quick Quiz: Kafka Consumer Group Offsets</h4>
            <p className="text-[#6F6A60] text-[11px]">Reinforce offset commit semantics before proceeding to Kafka Stream joins.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
