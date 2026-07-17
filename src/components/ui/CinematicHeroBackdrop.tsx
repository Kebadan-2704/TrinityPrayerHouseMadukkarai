'use client';

import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import styles from './CinematicHeroBackdrop.module.css';

type Props = {
  /** Called when the background video starts or stops playing. Kept for backwards compatibility if needed. */
  onVideoActive?: (active: boolean) => void;
  /** Custom images to rotate. */
  images?: string[];
};

export default function CinematicHeroBackdrop({ onVideoActive, images }: Props) {
  const reduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver — only activate when visible
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const slides = useMemo(() => {
    return (images || ['/hero-bg.jpg', '/slide-2.webp', '/slide-3.webp', '/slide-4.jpg', '/slide-5.webp']).map(img => ({ type: 'image' as const, src: img }));
  }, [images]);

  const IMAGE_DURATION = 5000;

  const notify = useCallback(
    (active: boolean) => {
      onVideoActive?.(active);
    },
    [onVideoActive]
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!isVisible) return; // Don't auto-advance when off-screen

    // No more video, always report false to onVideoActive
    notify(false);
    
    const timer = setTimeout(nextSlide, IMAGE_DURATION);
    return () => clearTimeout(timer);
  }, [currentIndex, notify, nextSlide, isVisible]);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.mesh} aria-hidden />
      <div className={styles.aurora} aria-hidden />

      {slides.map((slide, index) => {
        const isActive = index === currentIndex;

        // The first image slide is the LCP element — give it maximum priority
        const isFirstImageSlide = index === 0;

        return (
          <div 
            key={slide.src}
            className={`${styles.mediaLayer} ${isActive ? styles.mediaVisible : ''}`}
            style={{ transition: reduceMotion ? 'none' : 'opacity 1.4s ease' }}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
              priority={isFirstImageSlide}
              fetchPriority={isFirstImageSlide ? 'high' : 'low'}
              aria-hidden
            />
          </div>
        );
      })}

      <div className={styles.vignette} aria-hidden />
    </div>
  );
}

