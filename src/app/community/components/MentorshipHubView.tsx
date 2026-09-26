'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  MessageSquare,
  Search,
  Star,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  FileCheck2,
} from 'lucide-react';
import { MentorProfile } from '../types';

interface MentorshipHubViewProps {
  mentors: MentorProfile[];
  onBookSession: (mentor: MentorProfile) => void;
}

export function MentorshipHubView({ mentors, onBookSession }: MentorshipHubViewProps) {
  const [activeMentorshipTab, setActiveMentorshipTab] = useState<'book' | 'ask' | 'feedback' | 'career' | 'reviews'>('book');

  return (
    <div className="space-y-6">
      {/* Sub-Navigation Bar: Book Sessions, Ask Questions, Get Feedback, Career Guidance, Project Reviews */}
      <div className="bg-white rounded-2xl p-2 border border-[#E8E5DD] shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {[
          { id: 'book', label: 'Book Sessions', icon: Calendar },
          { id: 'ask', label: 'Ask Questions', icon: MessageSquare },
          { id: 'feedback', label: 'Get Feedback', icon: Sparkles },
          { id: 'career', label: 'Career Guidance', icon: BookOpen },
          { id: 'reviews', label: 'Project Reviews', icon: FileCheck2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeMentorshipTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMentorshipTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isSelected
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'text-[#575653] hover:text-[#1B1B1B] hover:bg-[#FAF8F5]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#C76A2A]' : 'text-[#787774]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-Module 1: Book Sessions */}
      {activeMentorshipTab === 'book' && (
        <div className="grid md:grid-cols-2 gap-5">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
                <div>
                  <h3 className="text-sm font-bold text-[#1B1B1B]">{mentor.name}</h3>
                  <p className="text-[11px] text-[#575653] mt-0.5">{mentor.title}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-600 font-mono text-xs font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{mentor.rating} ({mentor.totalSessions} Sessions)</span>
                </div>
              </div>

              <p className="text-xs text-[#575653] leading-relaxed">{mentor.bio}</p>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#787774] block uppercase">EXPERTISE:</span>
                <div className="flex flex-wrap gap-1.5">
                  {mentor.expertise.map((exp, i) => (
                    <span key={i} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#FAF8F5] text-[#1B1B1B] border border-[#E8E5DD]">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#F0ECE1] flex items-center justify-between">
                <div className="text-[10px] font-mono text-[#787774]">
                  Next Slot: <span className="font-bold text-[#1B1B1B]">{mentor.availableSlots[0]}</span>
                </div>
                <button
                  onClick={() => onBookSession(mentor)}
                  className="py-2 px-3.5 rounded-xl bg-[#C76A2A] hover:bg-[#b05b22] text-white text-xs font-bold transition-colors"
                >
                  Book 1-on-1 Session
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub-Module 2: Ask Questions */}
      {activeMentorshipTab === 'ask' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="space-y-1 border-b border-[#F0ECE1] pb-3">
            <h3 className="text-base font-bold text-[#1B1B1B]">Ask Mentor Technical Q&A</h3>
            <p className="text-xs text-[#575653]">Get answers from verified faculty and senior builder mentors within 24 hours.</p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] space-y-1 text-xs">
              <span className="font-bold text-[#1B1B1B]">Q: How do I handle Spring Security 6 stateless JWT refresh tokens safely?</span>
              <p className="text-[#575653] text-[11px]">Answered by Dr. Evelyn Vance: Store refresh tokens in HttpOnly SameSite cookies, not localStorage...</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] space-y-1 text-xs">
              <span className="font-bold text-[#1B1B1B]">Q: What is the best way to optimize multi-stage Dockerfiles for Java apps?</span>
              <p className="text-[#575653] text-[11px]">Answered by Prof. Rajesh Kumar: Use Eclipse Temurin JRE alpine base image and copy compiled JAR...</p>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Module 3: Get Feedback */}
      {activeMentorshipTab === 'feedback' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#1B1B1B]">Request Project Code Feedback</h3>
            <p className="text-xs text-[#575653]">Submit your repository URL for formal code review and architecture rubric scoring.</p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 space-y-2">
            <span className="font-bold block">48-Hour Mentor Code Audit Guarantee</span>
            <p>Your submitted code is evaluated for linter compliance, security vulnerabilities, test coverage, and documentation accuracy.</p>
          </div>
        </div>
      )}

      {/* Sub-Module 4: Career Guidance */}
      {activeMentorshipTab === 'career' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#1B1B1B]">Career & Placement Strategy Sessions</h3>
          <p className="text-xs text-[#575653]">Schedule 1-on-1 placement guidance for SDE-1, AI Engineering, and Product Manager roles.</p>
        </div>
      )}

      {/* Sub-Module 5: Project Reviews */}
      {activeMentorshipTab === 'reviews' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#1B1B1B]">Faculty Project Review Queue</h3>
          <p className="text-xs text-[#575653]">Track the status of your submitted projects pending faculty verification seals.</p>
        </div>
      )}
    </div>
  );
}
