'use client';

import React from 'react';
import { PaperCard } from './PaperCard';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  positive?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export function StatCard({
  title,
  value,
  subtitle,
  change,
  positive = true,
  icon: Icon,
}: StatCardProps) {
  return (
    <PaperCard padding="md" className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#6F6A60] uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-[#F6F4EE] border border-[#E8E5DD] flex items-center justify-center text-[#1B1B1B]">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mt-1">
        <span className="font-heading text-2xl font-bold text-[#1B1B1B]">
          {value}
        </span>
        {change && (
          <span
            className={`text-xs font-semibold ${
              positive ? 'text-[#2F7A45]' : 'text-[#C2410C]'
            }`}
          >
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <span className="text-xs text-[#6F6A60]">{subtitle}</span>
      )}
    </PaperCard>
  );
}
