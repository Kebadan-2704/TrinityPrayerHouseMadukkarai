'use client';

import { useCallback, useEffect, useRef, useState, useMemo } from 'react';

import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import styles from './CinematicHeroBackdrop.module.css';
import {
  HERO_BG_POSTER,
  HERO_BG_VIDEO_MOV,
  HERO_BG_VIDEO_MP4,
  HERO_BG_VIDEO_WEBM,
} from '@/lib/siteMedia';

type Props = {
  /** Called when the background video starts or stops playing. */
  onVideoActive?: (active: boolean) => void;
  /** Custom images to rotate if video is not active or as part of rotation. */
  images?: string[];
};

export default function CinematicHeroBackdrop({ onVideoActive, images }: Props) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine video with images for the full rotation
  const slides = useMemo(() => [
    { type: 'video' as const },
    ...(images || ['/hero-bg.jpg', '/slide-2.jpg', '/slide-3.jpg', '/slide-4.jpg', '/slide-5.jpg']).map(img => ({ type: 'image' as const, src: img }))
  ], [images]);

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
    // We still want auto-scroll even if reduced motion is on, 
    // just maybe without the heavy effects (handled in render).
    
    const currentSlide = slides[currentIndex];
    
    if (currentSlide.type === 'video') {
      const v = videoRef.current;
      if (!v) return;
      v.muted = true;
      v.currentTime = 0;
      const attempt = v.play();
      
      // Safety timeout in case video gets stuck or fails to fire events
      const watchdog = setTimeout(() => {
        if (currentIndex === 0) nextSlide();
      }, 15000);

      if (attempt !== undefined) {
        attempt.catch(() => {
          notify(false);
          const timer = setTimeout(nextSlide, 2000);
          return () => {
            clearTimeout(timer);
            clearTimeout(watchdog);
          };
        });
      }
      return () => clearTimeout(watchdog);
    } else {
      notify(false);
      const timer = setTimeout(nextSlide, IMAGE_DURATION);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, notify, nextSlide, slides]);

  return (
    <div className={styles.wrap}>
      <div className={styles.mesh} aria-hidden />
      <div className={styles.aurora} aria-hidden />

      {slides.map((slide, index) => {
        const isActive = index === currentIndex;

        if (slide.type === 'video') {
          return (
            <video
              key="video"
              ref={videoRef}
              className={`${styles.mediaLayer} ${isActive ? styles.mediaVisible : ''}`}
              muted
              playsInline
              preload="auto"
              poster={HERO_BG_POSTER}
              onPlaying={() => notify(true)}
              onEnded={nextSlide}
              onError={() => { notify(false); nextSlide(); }}
              aria-hidden
            >
              <source src={HERO_BG_VIDEO_WEBM} type="video/webm" />
              <source src={HERO_BG_VIDEO_MOV} type="video/quicktime" />
              <source src={HERO_BG_VIDEO_MP4} type="video/mp4" />
            </video>
          );
        } else {
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
                priority={index <= 1}
                aria-hidden
              />
            </div>
          );
        }
      })}

      <div className={styles.vignette} aria-hidden />
    </div>
  );
}
