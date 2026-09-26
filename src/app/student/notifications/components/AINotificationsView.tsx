'use client';

import React from 'react';
import { Sparkles, TrendingUp, Briefcase, FolderGit2, ArrowRight, Award, ShieldCheck } from 'lucide-react';

export const AINotificationsView: React.FC = () => {
  const aiAlerts = [
    {
      id: 'ai-1',
      title: 'Skill Gap Alert: Circular Bean Dependency Resolution',
      category: 'Skill Gap Alert',
      impact: '+30 pts',
      description: 'Your recent Micro-Quiz #4 identified a gap in Spring Boot @Lazy bean injection. Review the 10-min interactive code clinic to boost your backend score.',
      actionText: 'Start Skill Clinic',
      actionUrl: '/student/assessments',
    },
    {
      id: 'ai-2',
      title: 'Career Readiness Milestone: 84.2% Placement Match',
      category: 'Career Readiness Update',
      impact: 'Top 8%',
      description: 'Your verified GitHub commits and capstone project pass 9 out of 10 Tier-1 enterprise recruiter filters.',
      actionText: 'View Readiness Diagnostic',
      actionUrl: '/student/career-copilot',
    },
    {
      id: 'ai-3',
      title: 'New Opportunity Match: Razorpay Distributed Systems Fellow',
      category: 'Opportunity Match',
      impact: '94% Match',
      description: 'Razorpay Systems Team posted a fellowship matching your PostgreSQL, Go, and fault-tolerance project portfolio.',
      actionText: 'View Opportunity',
      actionUrl: '/opportunities',
    },
    {
      id: 'ai-4',
      title: 'Project Recommendation: Resilience4j Circuit Breaker Sandbox',
      category: 'Project Recommendation',
      impact: '+45 BS Pts',
      description: 'Adding a Resilience4j circuit breaker lab repository to your portfolio will unlock Tier-1 backend recruiter searches.',
      actionText: 'Explore Project Template',
      actionUrl: '/projects',
    },
    {
      id: 'ai-5',
      title: 'Builder Score Improvement Suggestion: Complete AWS Cloud Test',
      category: 'Builder Score Suggestion',
      impact: '+50 XP',
      description: 'Passing the 15-min Cloud Architecture assessment will increase your Builder Score from 890 to 940 pts.',
      actionText: 'Take Benchmark Test',
      actionUrl: '/student/assessments',
    },
  ];

  return (
    <div className="space-y-6 text-xs">
      {/* AI Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C76A2A]" />
            <span className="px-2.5 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-bold font-mono">
              AI Pedagogical &amp; Career Copilot Feed
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#1B1B1B] mt-1">Contextual AI Notifications</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Generative AI continuously analyzes your telemetry to deliver targeted skill gap alerts, project suggestions, and recruiter matches.
          </p>
        </div>
      </div>

      {/* AI Feed Cards */}
      <div className="space-y-3">
        {aiAlerts.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-3xl bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                  {item.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-[#2F7A45]/10 text-[#2F7A45] text-[10px] font-mono font-bold">
                  {item.impact}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#6F6A60]">AI Generated</span>
            </div>

            <h3 className="text-sm font-bold text-[#1B1B1B]">{item.title}</h3>
            <p className="text-xs text-[#6F6A60] leading-relaxed">{item.description}</p>

            <div className="pt-2 border-t border-[#E8E5DD] flex justify-end">
              <a
                href={item.actionUrl}
                className="px-4 py-2 rounded-xl bg-[#1B1B1B] text-white text-xs font-bold hover:bg-[#C76A2A] transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>{item.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
