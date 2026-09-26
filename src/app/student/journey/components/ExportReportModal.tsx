'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, TrendingUp, Calendar, BookOpen, CheckCircle2 } from 'lucide-react';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportReportModal({ isOpen, onClose }: ExportReportModalProps) {
  const [downloading, setDownloading] = useState<string | null>(null);

  if (!isOpen) return null;

  const EXPORTS = [
    {
      id: 'journey-report',
      title: 'Journey Report',
      format: 'PDF Document',
      desc: 'Complete 14-month growth narrative including all milestones, assessments, and faculty approvals.',
      icon: FileText,
    },
    {
      id: 'growth-report',
      title: 'Growth Report',
      format: 'Analytics Chart PDF',
      desc: 'Visual skill evolution trajectory and Builder Score growth history over 12 months.',
      icon: TrendingUp,
    },
    {
      id: 'portfolio-timeline',
      title: 'Portfolio Timeline',
      format: 'Interactive HTML / PDF',
      desc: 'Chronological timeline of all verified project builds, hackathon wins, and open source PRs.',
      icon: Calendar,
    },
    {
      id: 'builder-story-pdf',
      title: 'Builder Story PDF',
      format: 'Recruiter Narrative CV',
      desc: 'Formated 2-page executive summary for placement recruiters highlighting readiness metrics.',
      icon: BookOpen,
    },
  ];

  const handleDownload = (id: string, title: string) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      alert(`Exported "${title}" successfully! Check your downloads folder.`);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E8E5DD] shadow-2xl relative space-y-5 font-sans text-[#1B1B1B]"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#E8E5DD] text-[#787774] hover:text-[#1B1B1B]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="border-b border-[#F0ECE1] pb-3">
            <h2 className="text-lg font-bold text-[#1B1B1B] flex items-center gap-2">
              <Download className="w-5 h-5 text-[#C76A2A]" />
              <span>Export Builder Growth Documentation</span>
            </h2>
            <p className="text-xs text-[#575653] mt-0.5">
              Select your preferred format to export official verification reports for recruiters or faculty.
            </p>
          </div>

          <div className="space-y-3">
            {EXPORTS.map((exp) => {
              const Icon = exp.icon;
              const isProcessing = downloading === exp.id;
              return (
                <div
                  key={exp.id}
                  className="p-4 rounded-xl border border-[#E8E5DD] bg-[#FAF8F5] hover:border-[#C76A2A] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#C76A2A]" />
                      <h3 className="font-bold text-[#1B1B1B]">{exp.title}</h3>
                      <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-white border border-[#E8E5DD] text-[#787774]">
                        {exp.format}
                      </span>
                    </div>
                    <p className="text-[#575653] text-[11px]">{exp.desc}</p>
                  </div>

                  <button
                    onClick={() => handleDownload(exp.id, exp.title)}
                    disabled={!!downloading}
                    className="py-2 px-3.5 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isProcessing ? 'Generating...' : 'Export'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
