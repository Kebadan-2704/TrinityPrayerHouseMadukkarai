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

const variantMap: Record<ScrollRevealVariant, { hidden: Variant; visible: Variant }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -36 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
};

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

  const transition = useMemo(
    () => ({
      duration: variant === 'blurIn' ? 0.82 : 0.68,
      delay: delay / 1000,
      ease: [0.22, 1, 0.36, 1] as const,
    }),
    [delay, variant]
  );

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin }}
      variants={{
        hidden: v.hidden,
        visible: { ...v.visible, transition },
      }}
    >
      {children}
    </motion.div>
  );
}
