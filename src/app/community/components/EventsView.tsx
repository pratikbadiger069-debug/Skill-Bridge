'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  ChevronRight,
  Video,
} from 'lucide-react';
import { CommunityEvent, EventCategory } from '../types';

interface EventsViewProps {
  events: CommunityEvent[];
  onRegisterEvent: (ev: CommunityEvent) => void;
}

export function EventsView({ events, onRegisterEvent }: EventsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { label: 'All Events', value: 'All' },
    { label: 'Workshops', value: 'Workshop' },
    { label: 'Hackathons', value: 'Hackathon' },
    { label: 'Tech Talks', value: 'Tech Talk' },
    { label: 'Founder Sessions', value: 'Founder Session' },
    { label: 'Industry Sessions', value: 'Industry Session' },
  ];

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter((e) => e.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Filter Chips */}
      <div className="bg-white rounded-2xl p-2 border border-[#E8E5DD] shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isSelected
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'text-[#575653] hover:text-[#1B1B1B] hover:bg-[#FAF8F5]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-2xl p-5 border border-[#E8E5DD] hover:border-[#C76A2A] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                  {ev.category}
                </span>

                <span className="text-xs font-mono text-[#787774] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {ev.dateTime}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#1B1B1B]">{ev.title}</h3>
              <p className="text-xs text-[#575653] leading-relaxed">{ev.description}</p>

              <div className="pt-2 border-t border-[#F0ECE1] space-y-1.5 text-xs text-[#575653]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1B1B1B]">Host: {ev.hostName}</span>
                  <span className="text-[10px] text-[#787774]">({ev.hostRole})</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#787774]">
                  <MapPin className="w-3.5 h-3.5 text-[#C76A2A]" />
                  <span>{ev.venueOrUrl}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#F0ECE1]">
              <span className="text-[11px] font-mono text-[#787774]">
                {ev.attendeesCount} Registered Builders
              </span>

              <button
                onClick={() => onRegisterEvent(ev)}
                className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  ev.registered
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-[#1B1B1B] hover:bg-[#333] text-white'
                }`}
              >
                {ev.registered ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Registered</span>
                  </>
                ) : (
                  <>
                    <span>Register Spot</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#C76A2A]" />
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
