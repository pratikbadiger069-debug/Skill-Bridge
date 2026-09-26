'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { PaperCard } from '@/components/ui/PaperCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/lib/store';
import { getUserDisplayName } from '@/lib/user-utils';
import { getLevelInfo, calculateTransparentBuilderScore } from '@/lib/xp-engine';
import { UserAvatar } from '@/components/avatar/UserAvatar';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Share2,
  Download,
  FileText,
  QrCode,
  Code2,
  Layers,
  Sparkles,

  Trophy,
  Users2,
  Calendar,
  Flame,
  Star,
  GitFork,
  GitCommit,
  Check,
  X,
  Target,
  BarChart3,
  BookOpen,
} from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function BuilderPassportPage() {
  const { studentProfile, currentUser, xp, streakDays, githubData } = useAppStore();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'projects' | 'skills' | 'github' | 'assessments' | 'achievements' | 'community'
  >('overview');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const displayName = getUserDisplayName({ user: currentUser, profile: studentProfile });
  const levelInfo = getLevelInfo(xp);
  const college = studentProfile?.academic?.college || 'Hyderabad Institute of Technology and Management';
  const department = studentProfile?.academic?.department || 'Computer Science & Engineering';

  const builderScoreData = calculateTransparentBuilderScore({
    verifiedSkillsCount: (studentProfile.verifiedSkills || []).length,
    projectsCount: (studentProfile.evidences || []).length,
    githubConnected: githubData?.connected,
    githubReposCount: (githubData?.pinnedRepos || []).length,
    consistencyStreakDays: streakDays,
    completedChallengesCount: 5,
  });

  const passportProofHash = `sha256:7f8a9b2c3d4e5f6a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a`;
  const passportUrl = `https://zero.skillbridge.io/passport/verify/${currentUser?.id || 'std-1049'}`;

  const handleShare = () => {
    navigator.clipboard.writeText(passportUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-16">

        {/* 1. HEADER BLOCK */}
        <PaperCard padding="lg" className="bg-white border-[#E8E5DD] space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Identity Details */}
            <div className="flex items-center gap-4">
              <UserAvatar
                src={studentProfile?.avatar || currentUser?.avatar}
                name={displayName}
                size="lg"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-heading text-2xl font-bold text-[#1B1B1B] tracking-tight">
                    {displayName}
                  </h1>
                  <Badge variant="success" size="sm" icon={ShieldCheck}>
                    Verified SHA-256 Proof
                  </Badge>
                </div>
                <p className="text-xs font-semibold text-[#6F6A60]">
                  {college} • {department}
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-[#6F6A60]">
                  <span>Passport Hash:</span>
                  <span className="truncate max-w-[240px] font-bold text-[#1B1B1B]">{passportProofHash}</span>
                </div>
              </div>
            </div>

            {/* Builder Score & Level Badges */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="p-3 bg-[#F6F4EE] border border-[#E8E5DD] rounded-2xl space-y-1 text-center min-w-[120px]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6A60]">Builder Score</span>
                <span className="font-heading text-2xl font-bold text-[#1B1B1B] block">
                  {builderScoreData.totalScore}
                </span>
                <span className="text-[10px] text-[#2F7A45] font-semibold block">Top 5% National</span>
              </div>

              <div className="p-3 bg-[#F6F4EE] border border-[#E8E5DD] rounded-2xl space-y-1 text-center min-w-[120px]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6A60]">Builder Level</span>
                <span className="font-heading text-xl font-bold text-[#C76A2A] block">
                  Lvl {levelInfo.level}
                </span>
                <span className="text-[10px] text-[#1B1B1B] font-semibold block">{levelInfo.title}</span>
              </div>
            </div>
          </div>

          {/* Action Utility Bar: Share, QR Code, Export PDF, Generate Resume */}
          <div className="pt-4 border-t border-[#E8E5DD] flex items-center justify-between gap-3 overflow-x-auto">
            <div className="flex items-center gap-2">
              <Button variant="primary" size="sm" icon={QrCode} onClick={() => setIsQrModalOpen(true)}>
                View QR Code
              </Button>
              <Button variant="secondary" size="sm" icon={Share2} onClick={handleShare}>
                {copiedLink ? 'Link Copied!' : 'Share Builder Passport'}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" icon={Download}>
                Export PDF
              </Button>
              <Button variant="secondary" size="sm" icon={FileText}>
                Generate Verified Resume
              </Button>
            </div>
          </div>
        </PaperCard>

        {/* 2. 7 INTERACTIVE TABS */}
        <div className="flex items-center gap-2 border-b border-[#E8E5DD] pb-3 overflow-x-auto select-none">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'projects', label: 'Projects', icon: Layers },
            { id: 'skills', label: 'Skills', icon: CheckCircle2 },
            { id: 'github', label: 'GitHub', icon: GithubIcon },
            { id: 'assessments', label: 'Assessments', icon: BookOpen },
            { id: 'achievements', label: 'Achievements', icon: Trophy },
            { id: 'community', label: 'Community', icon: Users2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'bg-white text-[#6F6A60] border border-[#E8E5DD] hover:text-[#1B1B1B] hover:border-[#1B1B1B]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C76A2A]' : 'text-[#6F6A60]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Overview Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <PaperCard padding="md" className="space-y-2">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase tracking-wider">Builder Score</span>
                <span className="font-heading text-3xl font-bold text-[#1B1B1B] block">{builderScoreData.totalScore} / 1000</span>
                <p className="text-xs text-[#2F7A45] font-semibold">Deterministic verification formula</p>
              </PaperCard>

              <PaperCard padding="md" className="space-y-2">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase tracking-wider">Career Readiness</span>
                <span className="font-heading text-3xl font-bold text-[#2F7A45] block">84%</span>
                <p className="text-xs text-[#6F6A60]">Benchmark for AI &amp; Backend Engineer</p>
              </PaperCard>

              <PaperCard padding="md" className="space-y-2">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase tracking-wider">Industry Readiness</span>
                <span className="font-heading text-3xl font-bold text-[#1B1B1B] block">88%</span>
                <p className="text-xs text-[#6F6A60]">Production repository architecture score</p>
              </PaperCard>

              <PaperCard padding="md" className="space-y-2">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase tracking-wider">Skill Confidence</span>
                <span className="font-heading text-3xl font-bold text-[#C76A2A] block">92%</span>
                <p className="text-xs text-[#6F6A60]">Average verified skill assessment score</p>
              </PaperCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PaperCard padding="md" className="space-y-2">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase tracking-wider">Project Impact</span>
                <span className="font-heading text-2xl font-bold text-[#1B1B1B] block">85 / 100</span>
                <p className="text-xs text-[#6F6A60]">Evaluated via SHA-256 code commits</p>
              </PaperCard>

              <PaperCard padding="md" className="space-y-2">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase tracking-wider">Leadership Score</span>
                <span className="font-heading text-2xl font-bold text-[#1B1B1B] block">78 / 100</span>
                <p className="text-xs text-[#6F6A60]">Peer code reviews &amp; capstone team leads</p>
              </PaperCard>

              <PaperCard padding="md" className="space-y-2">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase tracking-wider">Consistency Score</span>
                <span className="font-heading text-2xl font-bold text-[#2F7A45] block">90 / 100</span>
                <p className="text-xs text-[#6F6A60]">{streakDays}-day active builder streak</p>
              </PaperCard>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            {[
              {
                name: 'Zero SkillBridge Operating System',
                desc: 'Production-grade student growth & skill verification SaaS built with Next.js 16, TypeScript, PostgreSQL & Prisma.',
                github: 'https://github.com/alex-dev-builder/zero-skillbridge-os',
                members: ['Alex Rivera', 'Manutej Reddy', 'Radhika Sen'],
                tech: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Prisma', 'TailwindCSS'],
                impact: 94,
                hash: 'sha256:a1b2c3d4e5f6',
              },
              {
                name: 'Distributed Vault API & Rate Limiter',
                desc: 'Token bucket rate-limiting engine handling 10k req/sec with Redis cluster backing and SHA-256 payload validation.',
                github: 'https://github.com/alex-dev-builder/distributed-vault-api',
                members: ['Alex Rivera', 'David Kim'],
                tech: ['Rust', 'Redis', 'Docker', 'REST APIs'],
                impact: 89,
                hash: 'sha256:b2c3d4e5f6a1',
              },
              {
                name: 'Neural Skill Verification Model',
                desc: 'AST-based code analysis model extracting skill confidence scores directly from raw git repository commits.',
                github: 'https://github.com/alex-dev-builder/neural-skill-verifier',
                members: ['Alex Rivera'],
                tech: ['Python', 'PyTorch', 'AST Engine', 'FastAPI'],
                impact: 86,
                hash: 'sha256:c3d4e5f6a1b2',
              },
            ].map((p) => (
              <PaperCard key={p.name} padding="md" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-base text-[#1B1B1B]">{p.name}</h3>
                    <Badge variant="success" size="sm" icon={ShieldCheck}>
                      Verified Hash
                    </Badge>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#C76A2A]">Impact {p.impact}/100</span>
                </div>

                <p className="text-xs text-[#6F6A60] leading-relaxed">{p.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-[#F6F4EE] border border-[#E8E5DD] rounded-lg text-[11px] font-mono text-[#1B1B1B]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#E8E5DD] flex items-center justify-between text-xs text-[#6F6A60]">
                  <span>Team: {p.members.join(', ')}</span>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1B1B1B] hover:text-[#C76A2A] flex items-center gap-1">
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </PaperCard>
            ))}
          </div>
        )}

        {/* TAB 3: SKILLS */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Java', level: 'Advanced', confidence: 92, source: 'Assessment & Project Proof', updated: 'Oct 2025' },
                { name: 'Python', level: 'Advanced', confidence: 89, source: 'GitHub Code Analysis', updated: 'Sep 2025' },
                { name: 'DBMS / PostgreSQL', level: 'Intermediate', confidence: 84, source: '10-Q Assessment', updated: 'Oct 2025' },
                { name: 'React & Next.js', level: 'Advanced', confidence: 94, source: 'Project Evidence', updated: 'Oct 2025' },
                { name: 'Spring Boot', level: 'Intermediate', confidence: 80, source: 'Faculty Validation', updated: 'Aug 2025' },
                { name: 'Docker & Microservices', level: 'Intermediate', confidence: 82, source: 'Hands-on Lab', updated: 'Sep 2025' },
                { name: 'System Design', level: 'Intermediate', confidence: 78, source: 'Architecture Review', updated: 'Oct 2025' },
                { name: 'Rust', level: 'Beginner', confidence: 72, source: 'GitHub Repositories', updated: 'Aug 2025' },
              ].map((s) => (
                <PaperCard key={s.name} padding="md" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-sm text-[#1B1B1B]">{s.name}</h4>
                    <span className="text-xs font-mono font-bold text-[#C76A2A]">{s.confidence}% Confidence</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-[#6F6A60]">
                      <span>Level: {s.level}</span>
                      <span>Updated {s.updated}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-full overflow-hidden">
                      <div className="h-full bg-[#C76A2A] rounded-full" style={{ width: `${s.confidence}%` }} />
                    </div>
                  </div>

                  <span className="text-[10px] text-[#6F6A60] block font-mono">
                    Source: {s.source}
                  </span>
                </PaperCard>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GITHUB */}
        {activeTab === 'github' && (
          <div className="space-y-6">
            {/* GitHub Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <PaperCard padding="md" className="space-y-1">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase">Repositories</span>
                <span className="font-heading text-2xl font-bold text-[#1B1B1B] block">24</span>
              </PaperCard>
              <PaperCard padding="md" className="space-y-1">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase">Commits</span>
                <span className="font-heading text-2xl font-bold text-[#1B1B1B] block">342</span>
              </PaperCard>
              <PaperCard padding="md" className="space-y-1">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase">Stars</span>
                <span className="font-heading text-2xl font-bold text-[#C76A2A] block">275</span>
              </PaperCard>
              <PaperCard padding="md" className="space-y-1">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase">Forks</span>
                <span className="font-heading text-2xl font-bold text-[#1B1B1B] block">69</span>
              </PaperCard>
            </div>

            {/* Contribution Graph Heatmap Simulation */}
            <PaperCard padding="md" className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-2">
                <h4 className="font-heading font-bold text-xs text-[#1B1B1B] uppercase tracking-wider">
                  Contribution Heatmap (52 Weeks)
                </h4>
                <span className="text-[10px] font-mono text-[#2F7A45] font-bold">342 commits in the last year</span>
              </div>

              <div className="grid grid-cols-26 gap-1 overflow-x-auto py-2">
                {Array.from({ length: 130 }).map((_, i) => {
                  const intensity = [0, 1, 2, 3, 4][i % 5];
                  const bgColors = ['#F6F4EE', '#D4E7D7', '#92CE9A', '#4FAD5B', '#2F7A45'];
                  return (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-xs border border-[#E8E5DD]"
                      style={{ backgroundColor: bgColors[intensity] }}
                      title={`Activity index ${intensity}`}
                    />
                  );
                })}
              </div>
            </PaperCard>
          </div>
        )}

        {/* TAB 5: ASSESSMENTS */}
        {activeTab === 'assessments' && (
          <div className="space-y-4">
            {[
              { title: 'Java Core & Object Oriented Programming', score: 92, attempts: 1, confidence: 94, weak: 'Generics & Wildcards' },
              { title: 'Distributed Systems & Microservices', score: 88, attempts: 2, confidence: 90, weak: 'Raft Consensus Protocol' },
              { title: 'PostgreSQL Query Optimization & Indexing', score: 84, attempts: 1, confidence: 86, weak: 'B-Tree Index Tuning' },
              { title: 'React Server Components & Next.js 16', score: 96, attempts: 1, confidence: 98, weak: 'Streaming SSR Hydration' },
            ].map((a) => (
              <PaperCard key={a.title} padding="md" className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm text-[#1B1B1B]">{a.title}</h4>
                  <span className="text-xs font-mono font-bold text-[#2F7A45]">{a.score}% Score</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs text-[#6F6A60] border-t border-b border-[#E8E5DD] py-2">
                  <span>Attempts: <strong>{a.attempts}</strong></span>
                  <span>Confidence: <strong>{a.confidence}%</strong></span>
                  <span className="text-right">Weak Area: <strong className="text-[#C2410C]">{a.weak}</strong></span>
                </div>
              </PaperCard>
            ))}
          </div>
        )}

        {/* TAB 6: ACHIEVEMENTS */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'First Project Verified', desc: 'Successfully submitted and cryptographically verified first project repo.', icon: Trophy, unlocked: true },
              { title: 'GitHub Connected', desc: 'Connected active developer account with 300+ commits synced.', icon: GithubIcon, unlocked: true },
              { title: 'Top Builder Rank', desc: 'Ranked in Top 5% National Builder leaderboard.', icon: Award, unlocked: true },
              { title: '7-Day Builder Streak', desc: 'Maintained 7 consecutive days of active code verification.', icon: Flame, unlocked: true },
              { title: 'Hackathon Participant', desc: 'Submitted verified prototype to National AI Hackathon.', icon: Sparkles, unlocked: true },
              { title: '100% Assessment Score', desc: 'Achieved perfect score on React & Next.js assessment.', icon: CheckCircle2, unlocked: true },
            ].map((ac) => (
              <PaperCard key={ac.title} padding="md" className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C76A2A]/10 text-[#C76A2A] border border-[#C76A2A]/20 flex items-center justify-center shrink-0">
                    <ac.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#1B1B1B]">{ac.title}</h4>
                    <span className="text-[10px] font-mono text-[#2F7A45] font-bold">Unlocked</span>
                  </div>
                </div>
                <p className="text-xs text-[#6F6A60] leading-relaxed">{ac.desc}</p>
              </PaperCard>
            ))}
          </div>
        )}

        {/* TAB 7: COMMUNITY */}
        {activeTab === 'community' && (
          <div className="space-y-4">
            <PaperCard padding="md" className="space-y-3">
              <h4 className="font-heading font-bold text-sm text-[#1B1B1B]">Collaborative Projects</h4>
              <p className="text-xs text-[#6F6A60]">Active member of AI Systems Capstone Team #4 and Open Source Verification Working Group.</p>
            </PaperCard>

            <PaperCard padding="md" className="space-y-3">
              <h4 className="font-heading font-bold text-sm text-[#1B1B1B]">Faculty Validations</h4>
              <p className="text-xs text-[#6F6A60]">Validated by Prof. S. K. Sharma (Dept of CSE) for Advanced Data Structures &amp; Microservices architecture.</p>
            </PaperCard>
          </div>
        )}

      </div>

      {/* QR CODE MODAL */}
      <AnimatePresence>
        {isQrModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#E8E5DD] rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl relative"
            >
              <button
                onClick={() => setIsQrModalOpen(false)}
                className="absolute top-4 right-4 text-[#6F6A60] hover:text-[#1B1B1B]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-1">
                <Badge variant="accent" size="sm">Public Passport QR</Badge>
                <h3 className="font-heading font-bold text-lg text-[#1B1B1B]">{displayName}</h3>
                <p className="text-xs text-[#6F6A60]">Scan to verify Proof-of-Work Identity</p>
              </div>

              {/* SVG QR Code Simulation */}
              <div className="p-4 bg-[#F6F4EE] border border-[#E8E5DD] rounded-2xl flex items-center justify-center">
                <svg className="w-48 h-48 text-[#1B1B1B]" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="0" y="0" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="8" y="8" width="14" height="14" fill="currentColor" />
                  <rect x="70" y="0" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="78" y="8" width="14" height="14" fill="currentColor" />
                  <rect x="0" y="70" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="8" y="78" width="14" height="14" fill="currentColor" />
                  <rect x="40" y="10" width="8" height="8" />
                  <rect x="52" y="10" width="8" height="8" />
                  <rect x="40" y="40" width="20" height="20" rx="2" />
                  <rect x="70" y="40" width="10" height="10" />
                  <rect x="10" y="40" width="10" height="10" />
                  <rect x="40" y="70" width="10" height="20" />
                  <rect x="60" y="70" width="20" height="10" />
                  <rect x="80" y="80" width="10" height="10" />
                </svg>
              </div>

              <div className="text-center pt-2">
                <span className="text-[10px] font-mono text-[#6F6A60] break-all block">{passportUrl}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PortalLayout>
  );
}
