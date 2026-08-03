'use client';

import { motion, useReducedMotion, Variant } from 'framer-motion';
import { ReactNode, useMemo } from 'react';

export type ScrollRevealVariant = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'blurIn';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  amount?: number | 'some' | 'all';
  margin?: string;
  variant?: ScrollRevealVariant;
}

/* Smaller transforms → less jarring, faster perceived load */
const variantMap: Record<ScrollRevealVariant, { hidden: Variant; visible: Variant }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
};

/** Max delay cap — prevents stacked delays from making pages feel broken */
const MAX_DELAY_MS = 300;

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  amount = 0.12,
  margin,
  variant = 'fadeUp',
}: ScrollRevealProps) {
  const reduce = useReducedMotion();

  const v = variantMap[variant];
  const clampedDelay = Math.min(delay, MAX_DELAY_MS);

  const transition = useMemo(
    () => ({
      duration: variant === 'blurIn' ? 0.7 : 0.55,
      delay: clampedDelay / 1000,
      ease: [0.22, 1, 0.36, 1] as const,
    }),
    [clampedDelay, variant]
  );

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: margin || '200px 0px' }}
      variants={{
        hidden: v.hidden,
        visible: { ...v.visible, transition },
      }}
    >
      {children}
    </motion.div>
  );
}
