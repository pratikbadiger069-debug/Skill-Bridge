'use client';

import React, { useState } from 'react';
import {
  Award,
  Plus,
  HelpCircle,
  Zap,
  CheckCircle2,
  Sliders,
  Sparkles,
  BookOpen,
  X,
} from 'lucide-react';
import { QuestionBankItem, AdminAssessmentConfig } from '../types';

interface AssessmentManagementViewProps {
  questions: QuestionBankItem[];
  assessments: AdminAssessmentConfig[];
  onAddQuestion: (q: Omit<QuestionBankItem, 'id'>) => void;
  onAddAssessment: (a: Omit<AdminAssessmentConfig, 'id'>) => void;
}

export const AssessmentManagementView: React.FC<AssessmentManagementViewProps> = ({
  questions,
  assessments,
  onAddQuestion,
  onAddAssessment,
}) => {
  const [activeTab, setActiveTab] = useState<'bank' | 'assessments' | 'rules'>('bank');
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);

  // Question Form State
  const [qText, setQText] = useState('');
  const [qCat, setQCat] = useState('Backend Development');
  const [qDiff, setQDiff] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');
  const [qXp, setQXp] = useState('100');

  // Assessment Form State
  const [aTitle, setATitle] = useState('');
  const [aCat, setACat] = useState('Distributed Systems');
  const [aDiff, setADiff] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Advanced');
  const [aXp, setAXp] = useState('500');
  const [aMaxAttempts, setAMaxAttempts] = useState('3');
  const [aPassPct, setAPassPct] = useState('75');

  const handleCreateQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText) return;

    onAddQuestion({
      question: qText,
      category: qCat,
      difficulty: qDiff,
      xpReward: parseInt(qXp) || 100,
      tags: [qCat.split(' ')[0], qDiff],
    });

    setQText('');
    setShowQuestionModal(false);
  };

  const handleCreateAssessmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aTitle) return;

    onAddAssessment({
      title: aTitle,
      category: aCat,
      difficulty: aDiff,
      xpReward: parseInt(aXp) || 500,
      certificationEligible: true,
      maxAttempts: parseInt(aMaxAttempts) || 3,
      totalQuestions: 20,
      passingPercentage: parseInt(aPassPct) || 75,
    });

    setATitle('');
    setShowAssessmentModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Navigation Tabs */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">Assessment Engine &amp; Question Bank Control</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Manage central question repositories, configure XP reward scaling, attempt caps, and certification benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
          {[
            { id: 'bank', label: 'Question Bank', icon: HelpCircle },
            { id: 'assessments', label: 'Assessment Creation', icon: Award },
            { id: 'rules', label: 'XP & Attempt Rules', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'bg-[#FAF9F5] border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Question Bank */}
      {activeTab === 'bank' && (
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B]">Central Question Repository ({questions.length} Items)</h3>
              <p className="text-xs text-[#6F6A60]">Curated micro-questions for diagnostic tests and skill passports.</p>
            </div>
            <button
              onClick={() => setShowQuestionModal(true)}
              className="px-4 py-2 bg-[#C76A2A] text-white text-xs font-bold rounded-xl hover:bg-[#b05a22] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Question</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {questions.map((q) => (
              <div key={q.id} className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#1B1B1B] text-white text-[10px] font-mono font-bold rounded-md">
                      {q.category}
                    </span>
                    <span className="px-2 py-0.5 bg-[#C76A2A]/10 text-[#C76A2A] text-[10px] font-mono font-bold rounded-md">
                      {q.difficulty}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[#2F7A45]">{q.xpReward} XP</span>
                </div>
                <h4 className="text-xs font-bold text-[#1B1B1B]">{q.question}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Assessment Creation */}
      {activeTab === 'assessments' && (
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B]">Published Skill Assessments</h3>
              <p className="text-xs text-[#6F6A60]">Active tests providing verified skill badges and XP rewards.</p>
            </div>
            <button
              onClick={() => setShowAssessmentModal(true)}
              className="px-4 py-2 bg-[#1B1B1B] text-white text-xs font-bold rounded-xl hover:bg-[#333] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Assessment</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {assessments.map((a) => (
              <div key={a.id} className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#1B1B1B] text-white text-[10px] font-mono font-bold rounded-md">
                      {a.category}
                    </span>
                    {a.certificationEligible && (
                      <span className="px-2 py-0.5 bg-[#2F7A45]/10 text-[#2F7A45] text-[10px] font-bold rounded-md">
                        Certification Badge
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#1B1B1B]">{a.title}</h4>
                </div>

                <div className="text-left sm:text-right font-mono shrink-0 space-y-1">
                  <span className="text-xs font-bold text-[#C76A2A] block">{a.xpReward} XP Reward</span>
                  <span className="text-[10px] text-[#6F6A60]">Max Attempts: {a.maxAttempts} • Pass: {a.passingPercentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Difficulty & XP Rules Configuration */}
      {activeTab === 'rules' && (
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-6 text-xs">
          <div className="pb-3 border-b border-[#E8E5DD]">
            <h3 className="text-base font-bold text-[#1B1B1B]">Platform XP Scaling &amp; Attempt Rules Configuration</h3>
            <p className="text-xs text-[#6F6A60]">Define standard reward weightages and anti-cheating retake cooling periods.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-2">
              <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Beginner Tier XP</span>
              <strong className="text-2xl font-bold font-mono text-[#1B1B1B]">100 XP / Test</strong>
              <p className="text-[11px] text-[#6F6A60]">1 retake allowed per 24 hours</p>
            </div>

            <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-2">
              <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Intermediate Tier XP</span>
              <strong className="text-2xl font-bold font-mono text-[#2F7A45]">250 XP / Test</strong>
              <p className="text-[11px] text-[#6F6A60]">Cooldown: 48 hours between retakes</p>
            </div>

            <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-2">
              <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Expert Tier XP</span>
              <strong className="text-2xl font-bold font-mono text-[#C76A2A]">500 XP / Test</strong>
              <p className="text-[11px] text-[#6F6A60]">Proctored verification required</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#E8E5DD] shadow-2xl">
            <h3 className="text-base font-bold text-[#1B1B1B]">Add Question to Bank</h3>
            <form onSubmit={handleCreateQuestionSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Question Prompt</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. How does PyTorch handle autograd computation graphs?"
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1B1B1B] block mb-1">Category</label>
                  <input
                    type="text"
                    value={qCat}
                    onChange={(e) => setQCat(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1B1B1B] block mb-1">Difficulty</label>
                  <select
                    value={qDiff}
                    onChange={(e) => setQDiff(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowQuestionModal(false)}
                  className="px-3 py-2 rounded-xl bg-[#FAF9F5] text-[#6F6A60] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#C76A2A] text-white font-bold hover:bg-[#b05a22]"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
