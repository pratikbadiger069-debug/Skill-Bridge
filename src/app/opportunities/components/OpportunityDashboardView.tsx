'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Star,
  Flame,
  Bookmark,
  CheckCircle2,
  Clock,
  Zap,
  ChevronRight,
  ExternalLink,
  MapPin,
  Building2,
  Award,
} from 'lucide-react';
import { OpportunityItem, OpportunityType } from '../types';

interface OpportunityDashboardViewProps {
  opportunities: OpportunityItem[];
  onSelectOpportunity: (opp: OpportunityItem) => void;
  onToggleSave: (opp: OpportunityItem) => void;
  onOpenInsights: (opp: OpportunityItem) => void;
}

export function OpportunityDashboardView({
  opportunities,
  onSelectOpportunity,
  onToggleSave,
  onOpenInsights,
}: OpportunityDashboardViewProps) {
  const [selectedDashboardTab, setSelectedDashboardTab] = useState<
    'recommended' | 'trending' | 'saved' | 'applied' | 'deadlines' | 'recent'
  >('recommended');

  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('All');

  const opportunityTypes: { label: string; value: string }[] = [
    { label: 'All Types', value: 'All' },
    { label: 'Internships', value: 'Internships' },
    { label: 'Jobs', value: 'Jobs' },
    { label: 'Hackathons', value: 'Hackathons' },
    { label: 'Research Programs', value: 'Research Programs' },
    { label: 'Competitions', value: 'Competitions' },
    { label: 'Scholarships', value: 'Scholarships' },
    { label: 'Fellowships', value: 'Fellowships' },
    { label: 'Startup Opportunities', value: 'Startup Opportunities' },
    { label: 'Open Source Programs', value: 'Open Source Programs' },
    { label: 'Campus Ambassador Programs', value: 'Campus Ambassador Programs' },
    { label: 'Freelance Projects', value: 'Freelance Projects' },
    { label: 'Industry Challenges', value: 'Industry Challenges' },
  ];

  // Filtering logic
  const typeFiltered = selectedTypeFilter === 'All'
    ? opportunities
    : opportunities.filter((o) => o.type === selectedTypeFilter);

  const recommendedOpps = typeFiltered.filter((o) => o.match.overallMatchScore >= 85);
  const trendingOpps = [...typeFiltered].sort((a, b) => b.match.overallMatchScore - a.match.overallMatchScore);
  const savedOpps = typeFiltered.filter((o) => o.saved);
  const appliedOpps = typeFiltered.filter((o) => o.applied);
  const upcomingDeadlines = [...typeFiltered].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  const recentOpps = [...typeFiltered].sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());

  let activeDisplayList = recommendedOpps;
  if (selectedDashboardTab === 'trending') activeDisplayList = trendingOpps;
  if (selectedDashboardTab === 'saved') activeDisplayList = savedOpps;
  if (selectedDashboardTab === 'applied') activeDisplayList = appliedOpps;
  if (selectedDashboardTab === 'deadlines') activeDisplayList = upcomingDeadlines;
  if (selectedDashboardTab === 'recent') activeDisplayList = recentOpps;

  return (
    <div className="space-y-6">
      {/* 12 Opportunity Type Filter Pills */}
      <div className="bg-white rounded-2xl p-3 border border-[#E8E5DD] shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {opportunityTypes.map((type) => {
          const isSelected = selectedTypeFilter === type.value;
          return (
            <button
              key={type.value}
              onClick={() => setSelectedTypeFilter(type.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                isSelected
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#575653] hover:text-[#1B1B1B] border border-[#E8E5DD]'
              }`}
            >
              {type.label}
            </button>
          );
        })}
      </div>

      {/* 6 Dashboard Section Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-[#E8E5DD] shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {[
          { id: 'recommended', label: 'Recommended', icon: Star, count: recommendedOpps.length },
          { id: 'trending', label: 'Trending', icon: Flame, count: trendingOpps.length },
          { id: 'saved', label: 'Saved', icon: Bookmark, count: savedOpps.length },
          { id: 'applied', label: 'Applied', icon: CheckCircle2, count: appliedOpps.length },
          { id: 'deadlines', label: 'Upcoming Deadlines', icon: Clock, count: upcomingDeadlines.length },
          { id: 'recent', label: 'Recently Added', icon: Zap, count: recentOpps.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = selectedDashboardTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedDashboardTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isSelected
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'text-[#575653] hover:text-[#1B1B1B] hover:bg-[#FAF8F5]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#C76A2A]' : 'text-[#787774]'}`} />
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-[#FAF8F5] border border-[#E8E5DD] text-current">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Opportunities Cards Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {activeDisplayList.length === 0 ? (
          <div className="md:col-span-2 bg-white rounded-2xl p-8 text-center border border-[#E8E5DD] space-y-2">
            <p className="text-xs text-[#787774]">No opportunities found matching selected filters.</p>
          </div>
        ) : (
          activeDisplayList.map((opp) => (
            <div
              key={opp.id}
              className="bg-white rounded-2xl p-5 border border-[#E8E5DD] hover:border-[#C76A2A] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                      {opp.type}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#FAF8F5] text-[#575653] border border-[#E8E5DD]">
                      {opp.difficultyLevel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleSave(opp)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        opp.saved
                          ? 'bg-amber-100 border-amber-300 text-amber-800'
                          : 'bg-[#FAF8F5] border-[#E8E5DD] text-[#787774] hover:text-[#1B1B1B]'
                      }`}
                      title={opp.saved ? 'Unbookmark' : 'Save Opportunity'}
                    >
                      <Bookmark className={`w-4 h-4 ${opp.saved ? 'fill-amber-600 text-amber-600' : ''}`} />
                    </button>

                    <div className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs flex items-center gap-1 shadow-xs">
                      <Zap className="w-3 h-3 fill-white" />
                      <span>{opp.match.overallMatchScore}% Match</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3
                    onClick={() => onSelectOpportunity(opp)}
                    className="text-base font-bold text-[#1B1B1B] hover:text-[#C76A2A] transition-colors cursor-pointer"
                  >
                    {opp.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-semibold text-[#575653]">
                    <span className="flex items-center gap-1 text-[#1B1B1B]">
                      <Building2 className="w-3.5 h-3.5 text-[#C76A2A]" />
                      {opp.organization}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#787774]" />
                      {opp.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#575653] leading-relaxed line-clamp-2">{opp.description}</p>

                {/* Compensation & Deadline */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F0ECE1] text-xs font-mono">
                  <div className="bg-[#FAF8F5] p-2 rounded-lg border border-[#E8E5DD]">
                    <span className="text-[10px] text-[#787774] block">COMPENSATION</span>
                    <span className="font-bold text-[#1B1B1B]">{opp.compensation}</span>
                  </div>
                  <div className="bg-[#FAF8F5] p-2 rounded-lg border border-[#E8E5DD]">
                    <span className="text-[10px] text-[#787774] block">DEADLINE</span>
                    <span className="font-bold text-rose-700">{opp.deadline}</span>
                  </div>
                </div>

                {/* Skills Required */}
                <div className="pt-1">
                  <span className="text-[10px] font-mono text-[#787774] block mb-1">SKILLS REQUIRED:</span>
                  <div className="flex flex-wrap gap-1">
                    {opp.skillsRequired.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#FAF8F5] text-[#1B1B1B] border border-[#E8E5DD]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-[#F0ECE1]">
                <button
                  onClick={() => onSelectOpportunity(opp)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View Full Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenInsights(opp)}
                  className="py-2 px-3 rounded-xl bg-[#C76A2A]/10 border border-[#C76A2A]/30 text-[#C76A2A] hover:bg-[#C76A2A]/20 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 fill-[#C76A2A]" />
                  <span>Improve Match</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
