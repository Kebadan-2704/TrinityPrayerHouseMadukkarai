'use client';

import { motion, useReducedMotion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type Props = {
  children: ReactNode;
  className?: string;
  /** Visible portion before animating */
  amount?: number;
};

export default function StaggerIn({ children, className = '', amount = 0.08 }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: '0px 0px -8% 0px' }}
      variants={container}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
