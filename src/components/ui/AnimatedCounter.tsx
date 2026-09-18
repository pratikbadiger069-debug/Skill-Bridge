'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  target?: number;
  count?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  target,
  count: propCount,
  suffix = '',
  prefix = '',
  duration = 1.8,
  className = '',
}: AnimatedCounterProps) {
  const finalTarget = target ?? propCount ?? 0;
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCount(Math.floor(eased * finalTarget));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setDisplayCount(finalTarget);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, finalTarget, duration]);

  return (
    <motion.span
      ref={ref}
      className={`font-mono font-bold tabular-nums ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {prefix}{displayCount.toLocaleString()}{suffix}
    </motion.span>
  );
}
