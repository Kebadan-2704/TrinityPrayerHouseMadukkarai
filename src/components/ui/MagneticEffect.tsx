'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  children: ReactNode;
  strength?: number;
};

export default function MagneticEffect({ children, strength = 0.2 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: 'inline-block', position: 'relative', zIndex: 1 }}
    >
      {children}
    </motion.div>
  );
}
