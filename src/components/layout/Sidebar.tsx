'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  GraduationCap,
  FolderGit2,
  CheckCircle2,
  Bot,
  Users2,
  Briefcase,
  Award,
  MessageSquare,
  Settings,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { getLevelInfo } from '@/lib/xp-engine';

interface NavSection {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export function Sidebar() {
  const pathname = usePathname();
  const { xp } = useAppStore();
  const levelInfo = getLevelInfo(xp);

  // Exact 10 main sections from ZERO × SkillBridge spec
  const navSections: NavSection[] = [
    { name: 'Home', href: '/student', icon: Home },
    { name: 'Smart Classroom', href: '/classroom', icon: GraduationCap, badge: 'Live' },
    { name: 'Projects', href: '/projects', icon: FolderGit2 },
    { name: 'Assessments', href: '/assessments', icon: CheckCircle2 },
    { name: 'Career Copilot', href: '/copilot', icon: Bot },
    { name: 'Community', href: '/community', icon: Users2 },
    { name: 'Opportunities', href: '/opportunities', icon: Briefcase, badge: 'Hot' },
    { name: 'Builder Passport', href: '/passport', icon: Award },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-[#E8E5DD] flex-col z-40 select-none">
      {/* Brand Header */}
      <div className="h-16 px-6 border-b border-[#E8E5DD] flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-[#1B1B1B] text-white flex items-center justify-center font-heading font-bold text-xs">
          0×
        </div>
        <div className="flex flex-col">
          <span className="font-heading text-sm font-bold tracking-tight text-[#1B1B1B]">
            ZERO × SkillBridge
          </span>
          <span className="text-[10px] text-[#6F6A60] tracking-wider uppercase font-semibold">
            Production OS
          </span>
        </div>
      </div>

      {/* Fixed Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navSections.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/student' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'text-[#6F6A60] hover:text-[#1B1B1B] hover:bg-[#F6F4EE]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-[#C76A2A]' : 'text-[#6F6A60]'
                  }`}
                />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#C76A2A]/10 text-[#C76A2A]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Builder Passport Footer Card */}
      <div className="p-4 border-t border-[#E8E5DD] shrink-0">
        <div className="p-3.5 bg-[#F6F4EE] rounded-2xl border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1B1B1B]">
                Lvl {levelInfo.level} {levelInfo.title}
              </span>
              <span className="text-[10px] text-[#6F6A60]">
                Rank #{levelInfo.rank} • Builder Status
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-[#C76A2A]">
              {xp} XP
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-[#E8E5DD] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C76A2A] rounded-full transition-all duration-300"
              style={{ width: `${levelInfo.percentToNext}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
