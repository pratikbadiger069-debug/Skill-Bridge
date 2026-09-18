'use client';

import React from 'react';

interface PaperCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function PaperCard({
  children,
  interactive = false,
  className = '',
  padding = 'md',
  ...props
}: PaperCardProps) {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3', // 12px
    md: 'p-4 md:p-6', // 16px / 24px
    lg: 'p-6 md:p-8', // 24px / 32px
  };

  return (
    <div
      className={`bg-white border border-[#E8E5DD] rounded-2xl shadow-[0_1px_2px_rgba(27,27,27,0.04)] ${
        paddingClasses[padding]
      } ${
        interactive
          ? 'transition-all duration-150 cubic-bezier(0.4,0,0.2,1) hover:border-[#C76A2A] hover:shadow-[0_4px_12px_rgba(27,27,27,0.06)] hover:-translate-y-0.5 cursor-pointer'
          : 'transition-colors duration-150 hover:border-[#D6D1C4]'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
