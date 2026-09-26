'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Archive,
  Edit2,
  Users,
  Search,
  X,
  Check,
} from 'lucide-react';
import { AdminOpportunityItem } from '../types';

interface OpportunityManagementViewProps {
  opportunities: AdminOpportunityItem[];
  onAddOpportunity: (opp: Omit<AdminOpportunityItem, 'id' | 'applicantsCount' | 'createdAt'>) => void;
  onArchiveOpportunity: (id: string) => void;
}

export const OpportunityManagementView: React.FC<OpportunityManagementViewProps> = ({
  opportunities,
  onAddOpportunity,
  onArchiveOpportunity,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [type, setType] = useState('Internship');
  const [location, setLocation] = useState('Bengaluru / Remote');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company) return;

    onAddOpportunity({
      title,
      company,
      type,
      location,
      status: 'Active',
    });

    setTitle('');
    setCompany('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">Corporate Opportunity &amp; Match Engine Management</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Post industry opportunities, manage corporate partnerships, track student applicant funnels, and archive stale listings.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#C76A2A] text-white text-xs font-bold hover:bg-[#b05a22] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Opportunity</span>
        </button>
      </div>

      {/* Opportunity Table */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
        <h3 className="text-base font-bold text-[#1B1B1B]">Active Corporate Listings ({opportunities.length})</h3>

        <div className="space-y-3 text-xs">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                    {opp.company}
                  </span>
                  <span className="text-[10px] text-[#6F6A60]">{opp.type} • {opp.location}</span>
                </div>
                <h4 className="text-sm font-bold text-[#1B1B1B]">{opp.title}</h4>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right font-mono">
                  <strong className="text-[#C76A2A] block">{opp.applicantsCount} Applicants</strong>
                  <span className="text-[10px] text-[#2F7A45]">{opp.status}</span>
                </div>

                <button
                  onClick={() => onArchiveOpportunity(opp.id)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#E8E5DD] hover:bg-red-50 text-red-600 font-bold transition-colors cursor-pointer"
                >
                  Archive
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Opportunity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#E8E5DD] shadow-2xl">
            <h3 className="text-base font-bold text-[#1B1B1B]">Post New Opportunity</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Opportunity Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Systems Fellow"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Sponsoring Enterprise</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google Cloud & NVIDIA"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1B1B1B] block mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Full-time Job">Full-time Job</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Research Fellowship">Research Fellowship</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#1B1B1B] block mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 rounded-xl bg-[#FAF9F5] text-[#6F6A60] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#C76A2A] text-white font-bold hover:bg-[#b05a22]"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
