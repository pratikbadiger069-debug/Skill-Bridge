'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'success' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  icon: Icon,
  className = '',
}: BadgeProps) {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 font-mono uppercase tracking-wider',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
  };

  const variantClasses = {
    accent: 'bg-[#C76A2A]/10 text-[#C76A2A] border border-[#C76A2A]/20',
    success: 'bg-[#2F7A45]/10 text-[#2F7A45] border border-[#2F7A45]/20',
    neutral: 'bg-[#F0EDE5] text-[#6F6A60] border border-[#E8E5DD]',
    outline: 'bg-transparent text-[#1B1B1B] border border-[#E8E5DD]',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full shrink-0 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {Icon && <Icon className="w-3 h-3" />}
      <span>{children}</span>
    </span>
  );
}
