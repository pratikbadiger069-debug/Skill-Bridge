'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function Input({
  label,
  error,
  hint,
  icon: Icon,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-[#1B1B1B]">
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full">
        {Icon && (
          <div className="absolute left-3 text-[#6F6A60] pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-white border border-[#E8E5DD] rounded-xl text-sm text-[#1B1B1B] placeholder-[#9B9589] py-2.5 ${
            Icon ? 'pl-9 pr-3' : 'px-3.5'
          } transition-all duration-150 focus:outline-none focus:border-[#C76A2A] focus:ring-1 focus:ring-[#C76A2A] disabled:bg-[#F6F4EE] disabled:cursor-not-allowed ${
            error ? 'border-[#C2410C] focus:border-[#C2410C] focus:ring-[#C2410C]' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-[#C2410C]">{error}</span>}
      {hint && !error && <span className="text-xs text-[#6F6A60]">{hint}</span>}
    </div>
  );
}
