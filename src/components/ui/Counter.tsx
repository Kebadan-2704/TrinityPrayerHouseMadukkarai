'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Counter.module.css';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  label: string;
}

export default function Counter({ end, suffix = '', duration = 2000, label }: CounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.25 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <div ref={ref} className={styles.statCard}>
      <div className={styles.inner}>
        <div className={styles.value}>
          {count}
          {suffix}
        </div>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  );
}
