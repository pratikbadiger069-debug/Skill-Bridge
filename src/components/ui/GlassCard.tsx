'use client';

import React from 'react';
import { PaperCard } from './PaperCard';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark' | string;
  delay?: number;
  hoverGlow?: boolean;
  gradientBorder?: boolean;
  interactive?: boolean;
}

/**
 * Legacy GlassCard component refactored for ZERO × SkillBridge minimal design system.
 * Glassmorphism removed in favor of clean paper card aesthetics.
 */
export function GlassCard({
  children,
  className = '',
  variant = 'light',
  delay,
  hoverGlow,
  gradientBorder,
  interactive,
  ...props
}: GlassCardProps) {
  return (
    <PaperCard className={className} interactive={interactive} {...props}>
      {children}
    </PaperCard>
  );
}

export default GlassCard;
