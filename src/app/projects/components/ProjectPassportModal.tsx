'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  X,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Zap,
  Users,
  Code2,
  Share2,
} from 'lucide-react';
import { ProjectHubItem } from '../types';

interface ProjectPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectHubItem;
}

export function ProjectPassportModal({
  isOpen,
  onClose,
  project,
}: ProjectPassportModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#E8E5DD] shadow-2xl relative space-y-6 font-sans text-[#1B1B1B]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#E8E5DD] text-[#787774] hover:text-[#1B1B1B]"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Seal */}
          <div className="border-b border-[#F0ECE1] pb-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-[#1B1B1B] text-white flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#C76A2A]" />
                OFFICIAL PROJECT PASSPORT CREDENTIAL
              </span>
              <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ✓ Faculty Verified
              </span>
            </div>

            <h2 className="text-2xl font-black text-[#1B1B1B]">{project.title}</h2>
            <p className="text-xs text-[#575653] font-mono">
              Credential Verification ID: SKB-PRJ-{project.id.toUpperCase()}-2026
            </p>
          </div>

          {/* 1. Project Overview */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-[#787774] uppercase tracking-wider block">
              1. PROJECT OVERVIEW
            </span>
            <p className="text-xs text-[#575653] leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E5DD]">
              {project.description}
            </p>
          </div>

          {/* 2. Tech Stack */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-[#787774] uppercase tracking-wider block">
              2. EVALUATED TECH STACK
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, i) => (
                <span key={i} className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-[#1B1B1B] text-white">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Screenshots Carousel / Grid */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[#787774] uppercase tracking-wider block">
                3. ARCHITECTURE & UI SCREENSHOTS
              </span>
              <div className="grid grid-cols-2 gap-2">
                {project.screenshots.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Screenshot ${i + 1}`}
                    className="w-full h-32 object-cover rounded-xl border border-[#E8E5DD]"
                  />
                ))}
              </div>
            </div>
          )}

          {/* 4. Contributors & 5. Impact Score */}
          <div className="grid sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[#787774] uppercase tracking-wider block">
                4. CONTRIBUTORS
              </span>
              <div className="space-y-1 text-xs">
                {project.teamMembers.map((m) => (
                  <div key={m.id} className="flex justify-between p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E5DD]">
                    <span className="font-bold text-[#1B1B1B]">{m.name}</span>
                    <span className="text-[#787774]">{m.role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[#787774] uppercase tracking-wider block">
                5. IMPACT SCORE
              </span>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                <div className="text-3xl font-black font-mono text-emerald-800">
                  {project.impactScore.overall} / 100
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 block">
                  Top 2% Capability Verification Rating
                </span>
              </div>
            </div>
          </div>

          {/* 6. Verification Status */}
          <div className="space-y-1.5 pt-2 border-t border-[#F0ECE1]">
            <span className="text-[10px] font-mono font-bold text-[#787774] uppercase tracking-wider block">
              6. VERIFICATION STATUS & REPOSITORIES
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] gap-2 text-xs">
              <div>
                <span className="font-bold text-emerald-800">✓ {project.verification.facultyGrade}</span>
                <p className="text-[11px] text-[#787774]">
                  Faculty Reviewer: {project.verification.facultyReviewer}
                </p>
              </div>

              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-4 rounded-xl bg-[#1B1B1B] text-white font-bold flex items-center justify-center gap-1.5"
              >
                <span>Verify on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C76A2A]" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
