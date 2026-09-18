'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  Hammer,
  Users2,
  User,
} from 'lucide-react';

interface BottomNavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function BottomNav() {
  const pathname = usePathname();

  const mobileNavItems: BottomNavItem[] = [
    { name: 'Home', href: '/student', icon: Home },
    { name: 'Learn', href: '/classroom', icon: BookOpen },
    { name: 'Build', href: '/projects', icon: Hammer },
    { name: 'Community', href: '/community', icon: Users2 },
    { name: 'Profile', href: '/passport', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#E8E5DD] flex items-center justify-around md:hidden z-50 select-none shadow-[0_-2px_10px_rgba(27,27,27,0.03)]">
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== '/student' && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full text-[10px] font-semibold transition-all duration-150 ${
              isActive ? 'text-[#C76A2A]' : 'text-[#6F6A60] hover:text-[#1B1B1B]'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-[#C76A2A]' : 'text-[#6F6A60]'}`} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
