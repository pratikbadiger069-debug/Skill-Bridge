'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserPlus,
  Shield,
  MessageSquare,
  Megaphone,
  CheckSquare,
  Send,
  Plus,
  CheckCircle2,
} from 'lucide-react';
import { ProjectHubItem, ProjectChatMessage } from '../types';

interface TeamFeaturesViewProps {
  project: ProjectHubItem;
  onUpdateProject: (updated: ProjectHubItem) => void;
}

export function TeamFeaturesView({
  project,
  onUpdateProject,
}: TeamFeaturesViewProps) {
  const [chatInput, setChatInput] = useState('');
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Frontend Engineer' | 'Backend Developer' | 'DevOps Specialist' | 'AI Engineer'>('Backend Developer');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ProjectChatMessage = {
      id: `cm-${Date.now()}`,
      sender: 'Pratik Badiger',
      text: chatInput.trim(),
      timestamp: 'Just now',
      isAnnouncement: isAnnouncement,
    };

    onUpdateProject({
      ...project,
      chatMessages: [...project.chatMessages, newMsg],
    });

    setChatInput('');
    setIsAnnouncement(false);
  };

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember = {
      id: `mem-${Date.now()}`,
      name: inviteEmail.split('@')[0],
      role: inviteRole as any,
      commitsCount: 0,
      linesAdded: 0,
      linesDeleted: 0,
      githubUsername: inviteEmail.split('@')[0],
    };

    onUpdateProject({
      ...project,
      teamMembers: [...project.teamMembers, newMember],
    });

    setInviteEmail('');
    setShowInviteModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Invite Trigger */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#C76A2A]" />
            <h2 className="text-lg font-bold text-[#1B1B1B]">Team Collaboration Workspace</h2>
          </div>
          <p className="text-xs text-[#575653] mt-0.5">
            Manage team roles, track contribution percentage, communicate via team chat & post announcements.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="py-2.5 px-4 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-bold flex items-center gap-2 transition-colors shrink-0"
        >
          <UserPlus className="w-4 h-4 text-[#C76A2A]" />
          <span>Invite Team Member</span>
        </button>
      </div>

      {/* Row 1: Assign Roles & Track Contributions */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Roster & Assign Roles */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Team Members & Roles</h3>
            </div>
            <span className="text-xs font-mono text-[#787774]">{project.teamMembers.length} Members</span>
          </div>

          <div className="space-y-3">
            {project.teamMembers.map((member) => (
              <div key={member.id} className="p-3 rounded-xl border border-[#E8E5DD] bg-[#FAF8F5] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1B1B1B] text-white flex items-center justify-center font-bold text-xs font-mono">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1B1B1B]">{member.name}</div>
                    <div className="text-[10px] text-[#787774]">@{member.githubUsername}</div>
                  </div>
                </div>

                <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-[#E8E5DD] text-[#1B1B1B]">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Track Contributions */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C76A2A]" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Contribution Tracking</h3>
            </div>
            <span className="text-xs font-mono text-emerald-700 font-bold">Git Telemetry Sync</span>
          </div>

          <div className="space-y-3">
            {project.teamMembers.map((member) => {
              const total = project.teamMembers.reduce((acc, m) => acc + m.commitsCount, 0);
              const pct = Math.round((member.commitsCount / Math.max(total, 1)) * 100);
              return (
                <div key={member.id} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span>{member.name}</span>
                    <span className="font-mono text-emerald-700">{pct}% ({member.commitsCount} commits)</span>
                  </div>
                  <div className="w-full h-2 bg-[#F0ECE1] rounded-full overflow-hidden">
                    <div className="h-full bg-[#C76A2A] rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 2: Team Chat & Announcements */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#C76A2A]" />
            <h3 className="text-sm font-bold text-[#1B1B1B]">Project Discussion Channel & Announcements</h3>
          </div>
          <span className="text-xs font-mono text-[#787774]">{project.chatMessages.length} Messages</span>
        </div>

        {/* Chat Feed */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] max-h-64 overflow-y-auto space-y-3">
          {project.chatMessages.length === 0 ? (
            <div className="text-xs text-[#787774] text-center py-6">
              No team messages yet. Start the conversation below!
            </div>
          ) : (
            project.chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-xl border text-xs space-y-1 ${
                  msg.isAnnouncement
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-white border-[#E8E5DD] text-[#1B1B1B]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5">
                    {msg.isAnnouncement && <Megaphone className="w-3.5 h-3.5 text-amber-600" />}
                    {msg.sender}
                  </span>
                  <span className="text-[10px] text-[#787774] font-mono">{msg.timestamp}</span>
                </div>
                <p className="text-xs">{msg.text}</p>
              </div>
            ))
          )}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type message or announcement to project team..."
              className="flex-1 p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A] text-xs"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="py-2.5 px-4 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-xs text-[#575653] cursor-pointer">
              <input
                type="checkbox"
                checked={isAnnouncement}
                onChange={(e) => setIsAnnouncement(e.target.checked)}
                className="rounded text-[#C76A2A] focus:ring-0"
              />
              <span className="font-semibold text-amber-800">Post as Team Announcement</span>
            </label>
          </div>
        </form>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-2xl max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
              <h3 className="text-sm font-bold text-[#1B1B1B]">Invite Teammate to Project</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-[#787774] text-xs font-bold">✕</button>
            </div>

            <form onSubmit={handleInviteMember} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Teammate Email or Username:</label>
                <input
                  type="text"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="ananya@hitam.org or @anasharma"
                  className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Assign Role:</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
                >
                  <option value="Frontend Engineer">Frontend Engineer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="DevOps Specialist">DevOps Specialist</option>
                  <option value="AI Engineer">AI Engineer</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="py-2 px-3 rounded-xl border border-[#E8E5DD] font-semibold text-[#575653]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-[#1B1B1B] text-white font-bold"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
