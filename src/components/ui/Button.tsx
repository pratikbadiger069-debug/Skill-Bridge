'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 cubic-bezier(0.4,0,0.2,1) select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[32px]',
    md: 'text-sm px-4 py-2.5 gap-2 min-h-[40px]',
    lg: 'text-base px-6 py-3 gap-2.5 min-h-[48px]',
  };

  const variantClasses = {
    primary:
      'bg-[#C76A2A] text-white hover:bg-[#B45C20] active:scale-[0.99] border border-transparent shadow-xs',
    secondary:
      'bg-white text-[#1B1B1B] border border-[#E8E5DD] hover:border-[#1B1B1B] hover:bg-[#FAF9F5] active:scale-[0.99]',
    outline:
      'bg-transparent text-[#1B1B1B] border border-[#E8E5DD] hover:border-[#C76A2A] hover:text-[#C76A2A]',
    ghost:
      'bg-transparent text-[#6F6A60] hover:text-[#1B1B1B] hover:bg-black/5',
    danger:
      'bg-[#C2410C]/10 text-[#C2410C] border border-[#C2410C]/20 hover:bg-[#C2410C]/15',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
