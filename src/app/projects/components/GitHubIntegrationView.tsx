'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GitBranch,
  RefreshCw,
  GitCommit,
  GitPullRequest,
  Code2,
  Users,
  Activity,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { ProjectHubItem } from '../types';

interface GitHubIntegrationViewProps {
  project: ProjectHubItem;
}

export function GitHubIntegrationView({ project }: GitHubIntegrationViewProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState('10 minutes ago');

  const handleSyncRepo = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSynced('Just Now');
    }, 1000);
  };

  const LANGUAGES = [
    { name: 'TypeScript', pct: 52, color: 'bg-blue-500' },
    { name: 'Java', pct: 28, color: 'bg-amber-500' },
    { name: 'Python', pct: 12, color: 'bg-emerald-500' },
    { name: 'Dockerfile', pct: 8, color: 'bg-purple-500' },
  ];

  const RECENT_ACTIVITY_LOGS = [
    { id: 'act-1', type: 'commit', author: 'Pratik Badiger', msg: 'refactor: Spring Security stateless JWT filter chain', time: '2 hours ago', hash: '8f92a1' },
    { id: 'act-2', type: 'pr', author: 'Ananya Sharma', msg: 'feat: add Mobile responsive sidebar navigation drawer', time: '5 hours ago', hash: 'PR #48' },
    { id: 'act-3', type: 'commit', author: 'Rohan Verma', msg: 'ci: add multi-stage Dockerfile build automation pipeline', time: '1 day ago', hash: '3c4b90' },
    { id: 'act-4', type: 'release', author: 'Pratik Badiger', msg: 'release: v1.4.0 Production Candidate Ready', time: '2 days ago', hash: 'v1.4.0' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Repo Sync Status */}
      <div className="bg-[#1B1B1B] text-white rounded-2xl p-5 border border-[#2D2D2D] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#262626] border border-[#3A3A3A] text-blue-400">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">GitHub Webhook Telemetry Sync</h3>
              <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Webhook Connected
              </span>
            </div>
            <p className="text-xs text-[#A3A3A3] mt-0.5 font-mono">
              Repository: {project.repositoryUrl} • Last Synced: {lastSynced}
            </p>
          </div>
        </div>

        <button
          onClick={handleSyncRepo}
          disabled={isSyncing}
          className="py-2 px-4 rounded-xl bg-[#C76A2A] hover:bg-[#b05b22] text-white text-xs font-semibold flex items-center gap-2 transition-colors shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing Repo...' : 'Sync Repository Now'}</span>
        </button>
      </div>

      {/* Row 1: Language Analysis & Commit Tracking */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Language Analysis */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#C76A2A]" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Language & Code Composition</h3>
            </div>
            <span className="text-xs font-mono text-[#787774]">4 Languages Detected</span>
          </div>

          {/* Multi-color Bar */}
          <div className="w-full h-3 bg-[#F0ECE1] rounded-full overflow-hidden flex">
            {LANGUAGES.map((lang, idx) => (
              <div key={idx} className={`h-full ${lang.color}`} style={{ width: `${lang.pct}%` }} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {LANGUAGES.map((lang, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E5DD]">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${lang.color}`} />
                  <span className="text-[#1B1B1B] font-semibold">{lang.name}</span>
                </div>
                <span className="text-[#787774]">{lang.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Commit Tracking Velocity */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div className="flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Commit Velocity & PR Metrics</h3>
            </div>
            <span className="text-xs font-mono text-emerald-700 font-bold">148 Total Commits</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] space-y-1">
              <span className="text-[10px] text-[#787774] font-medium block">Merged Pull Requests</span>
              <div className="text-lg font-bold font-mono text-[#1B1B1B]">24 PRs</div>
              <span className="text-[10px] text-emerald-600 font-semibold">100% Merge Rate</span>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] space-y-1">
              <span className="text-[10px] text-[#787774] font-medium block">Commit Streak</span>
              <div className="text-lg font-bold font-mono text-[#1B1B1B]">14 Days 🔥</div>
              <span className="text-[10px] text-[#787774]">High Consistency Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Contributor Tracking & Project Activity Feed */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Contributor Tracking */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Contributor Code Share</h3>
            </div>
            <span className="text-xs font-mono text-[#787774]">3 Authors</span>
          </div>

          <div className="space-y-3">
            {project.teamMembers.map((member) => {
              const totalCommits = project.teamMembers.reduce((acc, m) => acc + m.commitsCount, 0);
              const sharePct = Math.round((member.commitsCount / Math.max(totalCommits, 1)) * 100);
              return (
                <div key={member.id} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold text-[#1B1B1B]">
                    <span>{member.name} ({member.role})</span>
                    <span className="font-mono text-emerald-700">{sharePct}% ({member.commitsCount} commits)</span>
                  </div>
                  <div className="w-full h-2 bg-[#F0ECE1] rounded-full overflow-hidden">
                    <div className="h-full bg-[#1B1B1B] rounded-full" style={{ width: `${sharePct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Project Activity Feed */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#C76A2A]" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Live Activity Feed</h3>
            </div>
            <span className="text-xs font-mono text-emerald-600 font-semibold">Real-time Stream</span>
          </div>

          <div className="space-y-2.5">
            {RECENT_ACTIVITY_LOGS.map((log) => (
              <div key={log.id} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-semibold text-[#1B1B1B]">{log.msg}</div>
                  <div className="text-[10px] text-[#787774]">by {log.author} • {log.time}</div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-white border border-[#E8E5DD] font-bold text-[#1B1B1B] shrink-0">
                  {log.hash}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
