'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, TrendingUp, CheckCircle2 } from 'lucide-react';

export function SkillEvolutionView() {
  // Matching prompt structure: Java (Month 1: 20%, Month 6: 72%, Month 12: 88%)
  const SKILL_EVOLUTIONS = [
    {
      name: 'Java Core & Architecture',
      m1: 20,
      m6: 72,
      m12: 88,
      status: 'Mastered',
      color: 'bg-[#C76A2A]',
    },
    {
      name: 'Spring Boot Framework',
      m1: 5,
      m6: 22,
      m12: 85,
      status: 'Rapid Growth',
      color: 'bg-amber-600',
    },
    {
      name: 'Docker & Containerization',
      m1: 0,
      m6: 10,
      m12: 80,
      status: 'Active Sprint Focus',
      color: 'bg-rose-600',
    },
    {
      name: 'System Design & Scalability',
      m1: 10,
      m6: 35,
      m12: 85,
      status: 'Developing',
      color: 'bg-blue-600',
    },
    {
      name: 'TypeScript & Next.js',
      m1: 30,
      m6: 82,
      m12: 95,
      status: 'Advanced Mastery',
      color: 'bg-emerald-600',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8E5DD] shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
        <div>
          <h2 className="text-base font-bold text-[#1B1B1B]">Skill Evolution Over Time</h2>
          <p className="text-xs text-[#575653]">Visualization of proficiency growth from Month 1 to Month 6 and Month 12 target.</p>
        </div>
        <span className="text-xs font-mono font-bold text-[#C76A2A]">12-Month Trajectory</span>
      </div>

      <div className="space-y-4">
        {SKILL_EVOLUTIONS.map((skill, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1B1B1B]">{skill.name}</span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-white border border-[#E8E5DD] text-[#787774]">
                {skill.status}
              </span>
            </div>

            {/* 3 Step Milestones Bar */}
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-white border border-[#E8E5DD] space-y-1">
                <span className="text-[10px] text-[#787774] block">MONTH 1</span>
                <div className="font-bold text-[#1B1B1B]">{skill.m1}%</div>
                <div className="w-full h-1.5 bg-[#E8E5DD] rounded-full overflow-hidden">
                  <div className={`h-full ${skill.color}`} style={{ width: `${skill.m1}%` }} />
                </div>
              </div>

              <div className="p-2 rounded-lg bg-white border border-[#E8E5DD] space-y-1">
                <span className="text-[10px] text-[#787774] block">MONTH 6 (CURRENT)</span>
                <div className="font-bold text-[#C76A2A]">{skill.m6}%</div>
                <div className="w-full h-1.5 bg-[#E8E5DD] rounded-full overflow-hidden">
                  <div className={`h-full ${skill.color}`} style={{ width: `${skill.m6}%` }} />
                </div>
              </div>

              <div className="p-2 rounded-lg bg-white border border-[#E8E5DD] space-y-1">
                <span className="text-[10px] text-[#787774] block">MONTH 12 (TARGET)</span>
                <div className="font-bold text-emerald-700">{skill.m12}%</div>
                <div className="w-full h-1.5 bg-[#E8E5DD] rounded-full overflow-hidden">
                  <div className={`h-full ${skill.color}`} style={{ width: `${skill.m12}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
