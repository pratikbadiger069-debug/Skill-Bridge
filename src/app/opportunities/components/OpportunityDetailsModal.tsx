'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Building2,
  MapPin,
  Clock,
  Zap,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Award,
  AlertTriangle,
} from 'lucide-react';
import { OpportunityItem } from '../types';

interface OpportunityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: OpportunityItem;
  onOpenInsights: (opp: OpportunityItem) => void;
  onApply: (opp: OpportunityItem) => void;
}

export function OpportunityDetailsModal({
  isOpen,
  onClose,
  opportunity,
  onOpenInsights,
  onApply,
}: OpportunityDetailsModalProps) {
  if (!isOpen) return null;

  const m = opportunity.match;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#E8E5DD] shadow-2xl relative space-y-5 font-sans text-[#1B1B1B]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#E8E5DD] text-[#787774] hover:text-[#1B1B1B]"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header & Title */}
          <div className="border-b border-[#F0ECE1] pb-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-purple-100 text-purple-800">
                {opportunity.type}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-600 text-white font-mono flex items-center gap-1">
                <Zap className="w-3 h-3 fill-white" />
                {m.overallMatchScore}% Match
              </span>
            </div>

            <h2 className="text-2xl font-black text-[#1B1B1B]">{opportunity.title}</h2>

            <div className="flex items-center gap-4 text-xs font-semibold text-[#575653]">
              <span className="flex items-center gap-1 text-[#1B1B1B]">
                <Building2 className="w-4 h-4 text-[#C76A2A]" />
                {opportunity.organization}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#787774]" />
                {opportunity.location}
              </span>
            </div>
          </div>

          {/* Grid Metadata: Compensation, Deadline, Difficulty */}
          <div className="grid grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E5DD]">
              <span className="text-[10px] text-[#787774] block">COMPENSATION</span>
              <span className="font-bold text-[#1B1B1B]">{opportunity.compensation}</span>
            </div>

            <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E5DD]">
              <span className="text-[10px] text-[#787774] block">DEADLINE</span>
              <span className="font-bold text-rose-700">{opportunity.deadline}</span>
            </div>

            <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E5DD]">
              <span className="text-[10px] text-[#787774] block">DIFFICULTY</span>
              <span className="font-bold text-purple-700">{opportunity.difficultyLevel}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#787774] uppercase tracking-wider block">
              DESCRIPTION & RESPONSIBILITIES
            </span>
            <p className="text-xs text-[#575653] leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E5DD]">
              {opportunity.description}
            </p>
          </div>

          {/* Eligibility */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#787774] uppercase tracking-wider block">
              ELIGIBILITY CRITERIA
            </span>
            <p className="text-xs text-[#575653] leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E5DD]">
              {opportunity.eligibility}
            </p>
          </div>

          {/* Skills Required */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#787774] uppercase tracking-wider block">
              SKILLS REQUIRED
            </span>
            <div className="flex flex-wrap gap-1.5">
              {opportunity.skillsRequired.map((s, i) => (
                <span key={i} className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-[#1B1B1B] text-white">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center gap-3 pt-3 border-t border-[#F0ECE1]">
            <button
              onClick={() => {
                onClose();
                onOpenInsights(opportunity);
              }}
              className="py-3 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#E8E5DD] border border-[#DCD6C9] text-xs font-bold text-[#C76A2A] flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-4 h-4 fill-[#C76A2A]" />
              <span>AI Match Insights</span>
            </button>

            <a
              href={opportunity.applicationUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => onApply(opportunity)}
              className="flex-1 py-3 px-5 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <span>Apply Now on External Site</span>
              <ExternalLink className="w-4 h-4 text-[#C76A2A]" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
