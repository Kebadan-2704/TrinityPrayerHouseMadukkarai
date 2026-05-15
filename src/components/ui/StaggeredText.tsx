'use client';

import { motion, useReducedMotion, useInView, Variants } from 'framer-motion';
import React, { useRef } from 'react';

type Props = {
  text: string;
  className?: string;
  el?: React.ElementType;
  once?: boolean;
};

export default function StaggeredText({ text, className = '', el: Wrapper = 'p', once = true }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.2 });
  const reduceMotion = useReducedMotion();

  // Split text by words to keep formatting intact (no character splitting to avoid breaking languages)
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  };

  if (reduceMotion) {
    return <Wrapper className={className}>{text}</Wrapper>;
  }

  return (
    <Wrapper className={className}>
      <motion.span
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }}
      >
        {words.map((word, index) => (
          <motion.span
            variants={child}
            key={index}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
}
