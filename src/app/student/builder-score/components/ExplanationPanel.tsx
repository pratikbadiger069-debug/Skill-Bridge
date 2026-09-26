'use client';

import React from 'react';
import { HelpCircle, Sparkles, ArrowRight, CheckCircle2, Sliders, X } from 'lucide-react';
import { BuilderScoreCategoryBreakdown } from '@/lib/builder-score-engine';

interface ExplanationPanelProps {
  category: BuilderScoreCategoryBreakdown | null;
  onClose: () => void;
}

export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ category, onClose }) => {
  if (!category) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 border border-[#E8E5DD] shadow-2xl max-h-[85vh] overflow-y-auto text-xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E5DD]">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#1B1B1B] text-white text-[10px] font-mono font-bold uppercase">
              Explainable Score Math
            </span>
            <h3 className="text-xl font-bold text-[#1B1B1B] mt-1">
              {category.category} Factor Audit ({category.earnedPoints} / {category.maxPoints} pts)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#6F6A60] hover:text-[#1B1B1B] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Explanation Pillars */}
        <div className="space-y-5">
          {/* Pillar 1: Why Earned? */}
          <div className="p-5 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-3">
            <div className="flex items-center gap-2 text-[#2F7A45] font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>1. Why Were These Points Earned?</span>
            </div>

            <div className="space-y-2">
              {category.factors.map((f, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-[#E8E5DD] space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#1B1B1B]">
                    <span>{f.name} ({f.value})</span>
                    <span className="font-mono text-[#2F7A45]">+{f.impactPoints} / {f.maxImpact} pts</span>
                  </div>
                  <p className="text-[#6F6A60] text-[11px]">{f.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 2: How Calculated? */}
          <div className="p-5 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-2">
            <div className="flex items-center gap-2 text-[#1B1B1B] font-bold text-sm">
              <Sliders className="w-4 h-4" />
              <span>2. How Is This Category Calculated?</span>
            </div>
            <p className="text-[#6F6A60] leading-relaxed">
              Formula: Points = (Sum of Verified Determinants) × {category.weightPct}% Weighting Factor. No subjective manual rating is applied. All factors require cryptographic faculty signature, automated unit test execution, or GitHub API commit diff parsing.
            </p>
          </div>

          {/* Pillar 3: How Improved? */}
          <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-[#C76A2A]" />
              <span>3. How To Improve This Category Score?</span>
            </div>

            <div className="space-y-2 text-[#1B1B1B]">
              {category.improvementTips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-[#C76A2A] shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#1B1B1B] text-white rounded-xl font-bold hover:bg-[#C76A2A] transition-colors cursor-pointer"
          >
            Close Explanation Panel
          </button>
        </div>
      </div>
    </div>
  );
};
