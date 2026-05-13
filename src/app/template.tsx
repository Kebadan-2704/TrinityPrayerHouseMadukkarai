'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Wraps each route segment — new instance every navigation → smooth “deck” entrances.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className="page-transition-root">{children}</div>;
  }

  return (
    <motion.div
      className="page-transition-root"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
