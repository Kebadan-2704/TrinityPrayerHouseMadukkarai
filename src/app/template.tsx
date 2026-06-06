'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Re-mounts on every navigation → drives entrance/exit transitions.
 * Uses a "deck reveal" pattern: pages slide up and scale in from slightly below.
 */
const variants = {
  initial: { opacity: 0, y: 28, scale: 0.98, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0,  scale: 1,    filter: 'blur(0px)' },
  exit:    { opacity: 0, y: -16, scale: 1.01, filter: 'blur(2px)' },
};

const transition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className="page-transition-root">{children}</div>;
  }

  return (
    <motion.div
      className="page-transition-root"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
