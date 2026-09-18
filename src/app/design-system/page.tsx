'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { PaperCard } from '@/components/ui/PaperCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { StatCard } from '@/components/ui/StatCard';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Search,
  Layers,
  GraduationCap,
  Briefcase,
  Users2,
  Award,
  BookOpen,
  Hammer,
  User,
  Layout,
  Type,
  Maximize2,
  Sliders,
} from 'lucide-react';

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState<'tokens' | 'typography' | 'cards' | 'buttons' | 'forms' | 'nav'>('tokens');
  const [inputValue, setInputValue] = useState('');

  return (
    <PortalLayout>
      <div className="space-y-8">
        {/* Banner Section */}
        <PaperCard padding="lg" className="bg-white border-[#E8E5DD]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge variant="accent" size="sm" icon={Sparkles}>
                  ZERO × SkillBridge Specification
                </Badge>
                <Badge variant="neutral" size="sm">
                  v1.0.0 Production
                </Badge>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#1B1B1B] tracking-tight">
                Unified Design System
              </h1>
              <p className="text-sm text-[#6F6A60] leading-relaxed">
                Production-grade design language for Student Growth, Smart Classrooms, Project Building, Skill Verification, Career Development, Communities, and Opportunity Matching.
              </p>
            </div>

            <div className="p-4 bg-[#F6F4EE] border border-[#E8E5DD] rounded-2xl space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6F6A60]">
                Core Philosophy
              </span>
              <p className="font-heading font-bold text-sm text-[#1B1B1B]">
                &ldquo;I am building my future here.&rdquo;
              </p>
              <p className="text-xs text-[#6F6A60]">
                Premium • Minimal • Professional • Trustworthy
              </p>
            </div>
          </div>
        </PaperCard>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#E8E5DD] pb-3 overflow-x-auto">
          {[
            { id: 'tokens', label: 'Color & Spacing Tokens', icon: Sliders },
            { id: 'typography', label: 'Satoshi & Inter Typography', icon: Type },
            { id: 'cards', label: 'Paper & Workspace Cards', icon: Layout },
            { id: 'buttons', label: 'Buttons (150ms)', icon: Maximize2 },
            { id: 'forms', label: 'Form Controls', icon: Search },
            { id: 'nav', label: 'Sidebar & Mobile Navigation', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-[#1B1B1B] text-white'
                    : 'bg-white text-[#6F6A60] border border-[#E8E5DD] hover:text-[#1B1B1B] hover:border-[#1B1B1B]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C76A2A]' : 'text-[#6F6A60]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* SECTION 1: TOKENS */}
        {activeTab === 'tokens' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-heading text-xl font-bold text-[#1B1B1B]">Visual Identity Palette</h2>
              <p className="text-xs text-[#6F6A60]">
                Strict colors enforced across the platform. Zero Dark Mode, zero neon colors, zero gradients, zero glassmorphism.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Background', hex: '#F6F4EE', role: 'Page canvas & backdrop', textDark: true },
                { name: 'Surface', hex: '#FFFFFF', role: 'Cards, Modals & Containers', textDark: true },
                { name: 'Border', hex: '#E8E5DD', role: 'Card & divider borders', textDark: true },
                { name: 'Primary Text', hex: '#1B1B1B', role: 'Headings & primary copy', textDark: false },
                { name: 'Secondary Text', hex: '#6F6A60', role: 'Captions, labels & meta', textDark: false },
                { name: 'Accent', hex: '#C76A2A', role: 'Primary actions, highlights', textDark: false },
                { name: 'Success', hex: '#2F7A45', role: 'Verifications, positive states', textDark: false },
              ].map((color) => (
                <PaperCard key={color.name} padding="sm" className="space-y-3">
                  <div
                    className="h-20 rounded-xl border border-[#E8E5DD] flex items-end p-2"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className={`text-xs font-mono font-bold ${
                        color.textDark ? 'text-[#1B1B1B]' : 'text-white'
                      }`}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-[#1B1B1B]">{color.name}</h3>
                    <p className="text-xs text-[#6F6A60]">{color.role}</p>
                  </div>
                </PaperCard>
              ))}
            </div>

            {/* Spacing Scale */}
            <div className="space-y-3 pt-4 border-t border-[#E8E5DD]">
              <div className="space-y-1">
                <h2 className="font-heading text-xl font-bold text-[#1B1B1B]">Spacing Scale</h2>
                <p className="text-xs text-[#6F6A60]">
                  Strict spacing system: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px. No arbitrary spacing allowed.
                </p>
              </div>

              <PaperCard padding="md" className="space-y-4">
                {[
                  { value: 4, name: 'space-1 (4px)', usage: 'Tight inline gaps & small padding' },
                  { value: 8, name: 'space-2 (8px)', usage: 'Icon gaps, badge padding' },
                  { value: 12, name: 'space-3 (12px)', usage: 'Card inner padding (small)' },
                  { value: 16, name: 'space-4 (16px)', usage: 'Default component padding & stack gap' },
                  { value: 24, name: 'space-5 (24px)', usage: 'Card padding (medium) & section gap' },
                  { value: 32, name: 'space-6 (32px)', usage: 'Large container padding & section gap' },
                  { value: 48, name: 'space-7 (48px)', usage: 'Major block separation' },
                  { value: 64, name: 'space-8 (64px)', usage: 'Hero & landing page vertical gaps' },
                ].map((scale) => (
                  <div key={scale.value} className="flex items-center gap-4">
                    <span className="w-32 text-xs font-mono font-semibold text-[#1B1B1B]">
                      {scale.name}
                    </span>
                    <div
                      className="h-4 bg-[#C76A2A] rounded-xs shrink-0"
                      style={{ width: `${scale.value * 3}px` }}
                    />
                    <span className="text-xs text-[#6F6A60]">{scale.usage}</span>
                  </div>
                ))}
              </PaperCard>
            </div>
          </div>
        )}

        {/* SECTION 2: TYPOGRAPHY */}
        {activeTab === 'typography' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-heading text-xl font-bold text-[#1B1B1B]">Typography System</h2>
              <p className="text-xs text-[#6F6A60]">
                Headings use <strong>Satoshi</strong> (weights 500, 600, 700). Body copy uses <strong>Inter</strong> (weights 500, 600, 700).
              </p>
            </div>

            <PaperCard padding="lg" className="space-y-6">
              <div className="border-b border-[#E8E5DD] pb-4 space-y-1">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase tracking-wider">Heading 1 — Satoshi 700 / 36px</span>
                <h1 className="sb-h1">Building the Future of Student Growth</h1>
              </div>

              <div className="border-b border-[#E8E5DD] pb-4 space-y-1">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase tracking-wider">Heading 2 — Satoshi 700 / 28px</span>
                <h2 className="sb-h2">Verified Skills & Builder Passports</h2>
              </div>

              <div className="border-b border-[#E8E5DD] pb-4 space-y-1">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase tracking-wider">Heading 3 — Satoshi 600 / 22px</span>
                <h3 className="sb-h3">Smart Classrooms & Industry Collaborations</h3>
              </div>

              <div className="border-b border-[#E8E5DD] pb-4 space-y-1">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase tracking-wider">Heading 4 — Satoshi 600 / 18px</span>
                <h4 className="sb-h4">Automated Opportunity Matching System</h4>
              </div>

              <div className="border-b border-[#E8E5DD] pb-4 space-y-1">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase tracking-wider">Body Copy — Inter 500 / 15px</span>
                <p className="sb-body max-w-3xl">
                  ZERO × SkillBridge is an integrated operating system designed for deterministic proof of skill. Students construct verifiable project artifacts, participate in smart classrooms, and directly connect with industry opportunities.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#6F6A60] uppercase tracking-wider">Caption & Microcopy — Inter 600 / 11px</span>
                <p className="sb-caption">DETERMINISTIC VERIFICATION • REPO HASH SHA-256 • LEVEL 12 BUILDER</p>
              </div>
            </PaperCard>
          </div>
        )}

        {/* SECTION 3: CARDS */}
        {activeTab === 'cards' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-heading text-xl font-bold text-[#1B1B1B]">Card System (Paper & Workspace Feel)</h2>
              <p className="text-xs text-[#6F6A60]">
                Cards have a radius of 16px (`rounded-2xl`), 1px solid `#E8E5DD` border, and extremely subtle shadows. Feel like paper, notebook, or workspace.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PaperCard padding="md" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="accent">Standard Paper Card</Badge>
                  <span className="text-xs font-mono text-[#6F6A60]">16px Radius</span>
                </div>
                <h3 className="font-heading font-bold text-base text-[#1B1B1B]">
                  Smart Classroom Session
                </h3>
                <p className="text-xs text-[#6F6A60] leading-relaxed">
                  Real-time interactive session on distributed systems architecture with automated code evaluation.
                </p>
                <div className="pt-2 border-t border-[#E8E5DD] flex items-center justify-between text-xs text-[#6F6A60]">
                  <span>42 Students Joined</span>
                  <span className="font-semibold text-[#2F7A45]">Active Now</span>
                </div>
              </PaperCard>

              <PaperCard padding="md" interactive className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="success">Interactive Hover State</Badge>
                  <span className="text-xs font-mono text-[#6F6A60]">Hover to feel</span>
                </div>
                <h3 className="font-heading font-bold text-base text-[#1B1B1B]">
                  Builder Passport Artifact
                </h3>
                <p className="text-xs text-[#6F6A60] leading-relaxed">
                  Cryptographically signed project proof demonstrating full-stack Next.js and Postgres proficiency.
                </p>
                <div className="pt-2 border-t border-[#E8E5DD] flex items-center justify-between text-xs">
                  <span className="text-[#6F6A60]">Verified by Industry</span>
                  <ArrowRight className="w-4 h-4 text-[#C76A2A]" />
                </div>
              </PaperCard>

              <PaperCard padding="md" className="space-y-4 bg-[#F6F4EE]">
                <div className="flex items-center justify-between">
                  <Badge variant="neutral">Notebook Sub-Section</Badge>
                  <span className="text-xs font-mono text-[#6F6A60]">Surface Contrast</span>
                </div>
                <h3 className="font-heading font-bold text-base text-[#1B1B1B]">
                  Assessment Review Notes
                </h3>
                <p className="text-xs text-[#6F6A60] leading-relaxed">
                  Subtle contrast surface for secondary workspace lists, code previews, and metadata logs.
                </p>
                <div className="pt-2 border-t border-[#E8E5DD] flex items-center justify-between text-xs text-[#6F6A60]">
                  <span>Updated 2m ago</span>
                  <span className="font-semibold text-[#1B1B1B]">98.5% Score</span>
                </div>
              </PaperCard>
            </div>

            {/* Stat Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Verified Skills" value="14" change="+3 this month" positive icon={CheckCircle2} />
              <StatCard title="Projects Completed" value="8" change="Top 5%" positive icon={Hammer} />
              <StatCard title="Smart Classrooms" value="24 hrs" subtitle="This week" icon={GraduationCap} />
              <StatCard title="Opportunities" value="12 Matches" change="94% Match" positive icon={Briefcase} />
            </div>
          </div>
        )}

        {/* SECTION 4: BUTTONS */}
        {activeTab === 'buttons' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-heading text-xl font-bold text-[#1B1B1B]">Button System</h2>
              <p className="text-xs text-[#6F6A60]">
                Primary buttons use solid Accent background (`#C76A2A`). Secondary buttons use White surface (`#FFFFFF`) with border. All hover states use smooth 150ms transitions.
              </p>
            </div>

            <PaperCard padding="lg" className="space-y-6">
              {/* Primary Buttons */}
              <div className="space-y-3">
                <h3 className="font-heading text-sm font-bold text-[#1B1B1B]">Primary Buttons (Accent #C76A2A)</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="sm" icon={Sparkles}>
                    Small Action
                  </Button>
                  <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                    Default Primary Action
                  </Button>
                  <Button variant="primary" size="lg" icon={CheckCircle2}>
                    Large Primary Action
                  </Button>
                  <Button variant="primary" size="md" disabled>
                    Disabled State
                  </Button>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#E8E5DD]">
                <h3 className="font-heading text-sm font-bold text-[#1B1B1B]">Secondary Buttons (White #FFFFFF)</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="secondary" size="sm">
                    View Details
                  </Button>
                  <Button variant="secondary" size="md" icon={Layers}>
                    Secondary Action
                  </Button>
                  <Button variant="secondary" size="lg">
                    Large Secondary
                  </Button>
                  <Button variant="secondary" size="md" disabled>
                    Disabled Secondary
                  </Button>
                </div>
              </div>

              {/* Auxiliary Variants */}
              <div className="space-y-3 pt-4 border-t border-[#E8E5DD]">
                <h3 className="font-heading text-sm font-bold text-[#1B1B1B]">Auxiliary Variants (Outline, Ghost, Danger)</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="outline" size="md">
                    Outline Button
                  </Button>
                  <Button variant="ghost" size="md">
                    Ghost Link
                  </Button>
                  <Button variant="danger" size="md">
                    Remove Artifact
                  </Button>
                </div>
              </div>
            </PaperCard>
          </div>
        )}

        {/* SECTION 5: FORMS */}
        {activeTab === 'forms' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-heading text-xl font-bold text-[#1B1B1B]">Form Controls</h2>
              <p className="text-xs text-[#6F6A60]">
                Clean inputs with 1px border `#E8E5DD` and focus rings in `#C76A2A`.
              </p>
            </div>

            <PaperCard padding="lg" className="space-y-6 max-w-2xl">
              <Input
                label="Full Name"
                placeholder="e.g. Alex Rivera"
                icon={User}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                hint="Your legal name for Builder Passport verification"
              />

              <Input
                label="GitHub Repository URL"
                placeholder="https://github.com/username/project"
                icon={Hammer}
              />

              <Input
                label="Skill Assessment Code"
                placeholder="ABC-123-XYZ"
                error="Invalid or expired assessment code"
              />
            </PaperCard>
          </div>
        )}

        {/* SECTION 6: NAVIGATION */}
        {activeTab === 'nav' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-heading text-xl font-bold text-[#1B1B1B]">Navigation Specification</h2>
              <p className="text-xs text-[#6F6A60]">
                Desktop features a fixed minimal sidebar with 10 exact sections. Mobile uses a bottom navigation bar with 5 items.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sidebar Preview */}
              <PaperCard padding="md" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="accent">Desktop Fixed Sidebar</Badge>
                  <span className="text-xs font-mono text-[#6F6A60]">10 Main Sections</span>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    '1. Home',
                    '2. Smart Classroom',
                    '3. Projects',
                    '4. Assessments',
                    '5. Career Copilot',
                    '6. Community',
                    '7. Opportunities',
                    '8. Builder Passport',
                    '9. Messages',
                    '10. Settings',
                  ].map((item) => (
                    <div key={item} className="p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-lg font-semibold text-[#1B1B1B]">
                      {item}
                    </div>
                  ))}
                </div>
              </PaperCard>

              {/* Mobile Bottom Nav Preview */}
              <PaperCard padding="md" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="success">Mobile Bottom Navigation</Badge>
                  <span className="text-xs font-mono text-[#6F6A60]">5 Responsive Items</span>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { name: 'Home', desc: 'Main Student Hub & Feed' },
                    { name: 'Learn', desc: 'Smart Classrooms & Courses' },
                    { name: 'Build', desc: 'Projects & Repositories' },
                    { name: 'Community', desc: 'Peer Groups & Forums' },
                    { name: 'Profile', desc: 'Builder Passport & Stats' },
                  ].map((item) => (
                    <div key={item.name} className="p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-lg flex items-center justify-between">
                      <span className="font-bold text-[#1B1B1B]">{item.name}</span>
                      <span className="text-[#6F6A60]">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </PaperCard>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
