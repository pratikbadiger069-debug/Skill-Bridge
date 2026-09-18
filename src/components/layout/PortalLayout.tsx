'use client';

import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';

export function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F4EE] text-[#1B1B1B] selection:bg-[#C76A2A]/20 selection:text-[#C76A2A]">
      <Navbar />
      <div className="flex-1 flex w-full">
        {/* Fixed Desktop Sidebar */}
        <Sidebar />

        {/* Main Content Area — Offset for fixed sidebar on desktop, bottom nav on mobile */}
        <main className="flex-1 md:pl-64 pb-16 md:pb-0 min-w-0">
          <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
}
