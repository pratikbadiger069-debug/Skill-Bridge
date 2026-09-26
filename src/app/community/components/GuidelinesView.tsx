'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Heart,
  Code2,
  Share2,
  BookOpen,
  Users,
  Compass,
  CheckCircle2,
} from 'lucide-react';

export function GuidelinesView() {
  const GUIDELINES = [
    {
      title: '1. Respect',
      icon: Heart,
      color: 'text-rose-600',
      description: 'Treat every builder, peer, and mentor with absolute professionalism. Zero tolerance for toxicity, arrogance, or non-constructive criticism.',
    },
    {
      title: '2. Build',
      icon: Code2,
      color: 'text-[#C76A2A]',
      description: 'Prioritize functional proof, working code, and verified deployments over speculative discussion. Code talks.',
    },
    {
      title: '3. Share',
      icon: Share2,
      color: 'text-blue-600',
      description: 'Share open-source repositories, architectural post-mortems, and technical learnings to uplift the entire cohort.',
    },
    {
      title: '4. Learn',
      icon: BookOpen,
      color: 'text-purple-600',
      description: 'Embrace continuous growth. Welcome peer code reviews, faculty feedback, and diagnostic skill gap analysis.',
    },
    {
      title: '5. Contribute',
      icon: Users,
      color: 'text-emerald-600',
      description: 'Give back actively by mentoring junior builders, answering technical Q&A, and conducting pull request reviews.',
    },
    {
      title: '6. Lead',
      icon: Compass,
      color: 'text-amber-600',
      description: 'Lead innovation by organizing build sprints, hosting tech talks, and fostering a culture of high engineering trust.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#1B1B1B] text-white rounded-2xl p-6 border border-[#2D2D2D] shadow-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">ZERO Community Ecosystem Guidelines</h2>
            <p className="text-xs text-[#A3A3A3] mt-0.5">
              The 6 foundational principles governing our university innovation & builder network.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {GUIDELINES.map((g, idx) => {
          const Icon = g.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-3"
            >
              <div className="flex items-center gap-2.5 border-b border-[#F0ECE1] pb-3">
                <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#1B1B1B]">
                  <Icon className={`w-4 h-4 ${g.color}`} />
                </div>
                <h3 className="text-sm font-bold text-[#1B1B1B]">{g.title}</h3>
              </div>

              <p className="text-xs text-[#575653] leading-relaxed">{g.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
