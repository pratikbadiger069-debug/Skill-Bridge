'use client';

import React, { useState } from 'react';
import { Activity, Search, Calendar, Filter, Clock, CheckCircle2, GitCommit, Award, BookOpen } from 'lucide-react';

export const ActivityFeedTimelineView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');

  const activities = [
    {
      id: 'act-1',
      title: 'Joined Live Smart Classroom: JAVA-3A-2026',
      type: 'Classroom',
      time: 'Today at 14:02 PM',
      description: 'Attended session on Spring Boot Auto-Configuration & Circuit Breakers led by Dr. Ramesh Sharma.',
    },
    {
      id: 'act-2',
      title: 'GitHub Commit Pushed: resilience4j-spring-demo',
      type: 'GitHub',
      time: 'Today at 11:45 AM',
      description: 'Pushed 4 commits with exponential backoff fallback logic to repository.',
    },
    {
      id: 'act-3',
      title: 'Assessment Passed: Microservices Circuit Breakers (92%)',
      type: 'Assessment',
      time: 'Yesterday at 18:30 PM',
      description: 'Earned +250 XP and unlocked Resilient Systems Badge.',
    },
    {
      id: 'act-4',
      title: 'Mentorship Session Booked: Capstone Review',
      type: 'Mentorship',
      time: '2 days ago',
      description: 'Booked 1-on-1 architecture review slot with Dr. Ramesh Sharma.',
    },
    {
      id: 'act-5',
      title: 'Project Verification Badge Signed',
      type: 'Project',
      time: '3 days ago',
      description: 'Faculty signed cryptographic verification badge for ZERO-OS Event Broker.',
    },
  ];

  const filtered = activities.filter((a) => {
    const matchesType = filterType === 'All' ? true : a.type === filterType;
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 text-xs">
      {/* Search & Timeline Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#1B1B1B]">Full Platform Activity Audit Feed</h2>
            <p className="text-xs text-[#6F6A60]">Immutable chronological record of all student actions, commits, and milestones.</p>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 text-[#6F6A60] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search history..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-xs focus:outline-none focus:border-[#1B1B1B]"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
          {['All', 'Classroom', 'GitHub', 'Assessment', 'Mentorship', 'Project'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filterType === t
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'bg-[#FAF9F5] border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Chronological Timeline View */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-6">
        <div className="relative border-l-2 border-[#E8E5DD] ml-3 pl-6 space-y-6">
          {filtered.map((item) => (
            <div key={item.id} className="relative space-y-1">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#1B1B1B] border-2 border-white ring-2 ring-[#E8E5DD]" />
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                  {item.type}
                </span>
                <span className="text-[10px] font-mono text-[#6F6A60]">{item.time}</span>
              </div>
              <h4 className="text-sm font-bold text-[#1B1B1B]">{item.title}</h4>
              <p className="text-xs text-[#6F6A60]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
