'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { AIProviderModal } from '@/components/ai/AIProviderModal';
import { ProfileDropdown } from './ProfileDropdown';
import {
  Sparkles,
  Search,
  Palette,
} from 'lucide-react';

export function Navbar() {
  const { aiKeys, activeProvider } = useAppStore();

  const [mounted, setMounted] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasKey = Boolean(aiKeys[activeProvider] && aiKeys[activeProvider].length > 5);

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white border-b border-[#E8E5DD] select-none">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Brand Identity & Title */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-[#1B1B1B] flex items-center justify-center text-white font-heading font-bold text-xs group-hover:bg-[#C76A2A] transition-colors">
                0×
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-bold text-[#1B1B1B] tracking-tight text-sm">
                  ZERO × SkillBridge
                </span>
                <span className="text-[11px] text-[#6F6A60] hidden sm:inline font-medium">
                  Production OS
                </span>
              </div>
            </Link>
          </div>

          {/* Search Input */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F6A60]" />
              <input
                type="text"
                placeholder="Search verified skills, classrooms, opportunities..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl focus:outline-none focus:border-[#C76A2A] text-[#1B1B1B] placeholder:text-[#6F6A60] transition-colors"
              />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Design System Link */}
            <Link
              href="/design-system"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F6F4EE] border border-[#E8E5DD] text-[#1B1B1B] hover:border-[#C76A2A] hover:text-[#C76A2A] transition-all duration-150"
            >
              <Palette className="w-3.5 h-3.5 text-[#C76A2A]" />
              <span>Design System</span>
            </Link>

            {/* AI Provider Status */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                hasKey
                  ? 'bg-[#F6F4EE] border-[#E8E5DD] text-[#1B1B1B] hover:border-[#C76A2A]'
                  : 'bg-[#C76A2A]/10 border-[#C76A2A]/30 text-[#C76A2A] hover:bg-[#C76A2A]/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
              <span className="capitalize">{activeProvider}</span>
            </button>

            {/* User Profile Dropdown Menu */}
            <div className="pl-1 border-l border-[#E8E5DD]">
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      <AIProviderModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </>
  );
}
