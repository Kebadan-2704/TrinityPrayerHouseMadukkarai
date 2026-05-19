'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

type Props = {
  text: string;
  className?: string;
  el?: React.ElementType;
  once?: boolean;
};

/**
 * Previously animated text word-by-word (stagger). Now renders a single
 * clean fade-in so content is readable without distraction.
 */
export default function StaggeredText({ text, className = '', el: Wrapper = 'p', once = true }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.2 });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <Wrapper className={className}>{text}</Wrapper>;
  }

  return (
    <Wrapper className={className}>
      <motion.span
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'inline-block' }}
      >
        {text}
      </motion.span>
    </Wrapper>
  );
}
