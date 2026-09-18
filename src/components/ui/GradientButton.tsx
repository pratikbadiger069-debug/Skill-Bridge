'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './Button';

export interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'hero' | 'accent' | 'secondary' | 'glass' | string;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ComponentType<{ className?: string }> | React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  href?: string;
}

/**
 * Legacy GradientButton component refactored for ZERO × SkillBridge minimal design system.
 * Gradients removed in favor of clean solid accent background and soft 150ms transitions.
 */
export function GradientButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  href,
  className = '',
  ...props
}: GradientButtonProps) {
  const btnVariant = variant === 'secondary' ? 'secondary' : 'primary';

  // If icon is an Element, wrap in helper if needed or pass if component
  const IconComponent = typeof icon === 'function' ? icon : undefined;

  const buttonElement = (
    <Button
      variant={btnVariant}
      size={size as 'sm' | 'md' | 'lg'}
      icon={IconComponent}
      iconPosition={iconPosition}
      fullWidth={fullWidth}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );

  if (href) {
    return <Link href={href} className={fullWidth ? 'w-full' : ''}>{buttonElement}</Link>;
  }

  return buttonElement;
}

export default GradientButton;
