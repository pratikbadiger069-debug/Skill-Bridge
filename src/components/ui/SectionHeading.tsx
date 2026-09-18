'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  icon?: React.ComponentType<{ className?: string }> | React.ReactNode;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  icon: IconProp,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  const renderIcon = () => {
    if (!IconProp) return null;
    if (typeof IconProp === 'function') {
      const IconComponent = IconProp;
      return <IconComponent className="w-4 h-4 text-[#C76A2A]" />;
    }
    return IconProp;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      className={`space-y-3 max-w-3xl ${alignClass}`}
    >
      {label && (
        <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C76A2A] font-bold">
          {renderIcon()}
          <span>{label}</span>
        </span>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1B1B1B] tracking-tight leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-[#6F6A60] leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
