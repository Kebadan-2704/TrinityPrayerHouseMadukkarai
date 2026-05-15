'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

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
};

type Slide =
  | { type: 'video' }
  | { type: 'image'; src: string };

const SLIDES: Slide[] = [
  { type: 'video' },
  { type: 'image', src: '/hero-new.jpg' },
  { type: 'image', src: '/slide-2.jpg' },
  { type: 'image', src: '/slide-5.jpg' },
];

const IMAGE_DURATION = 6000;

export default function CinematicHeroBackdrop({ onVideoActive }: Props) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const notify = useCallback(
    (active: boolean) => {
      onVideoActive?.(active);
    },
    [onVideoActive]
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    
    const currentSlide = SLIDES[currentIndex];
    
    if (currentSlide.type === 'video') {
      const v = videoRef.current;
      if (!v) return;
      v.muted = true;
      v.currentTime = 0;
      const attempt = v.play();
      if (attempt !== undefined) {
        attempt.catch(() => {
          notify(false);
          // If video fails, skip to next slide after a short delay
          setTimeout(nextSlide, 1000);
        });
      }
    } else {
      notify(false); // Video is not active
      const timer = setTimeout(nextSlide, IMAGE_DURATION);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, reduceMotion, notify, nextSlide]);

  return (
    <div className={styles.wrap}>
      <div className={styles.mesh} aria-hidden />
      <div className={styles.aurora} aria-hidden />

      {!reduceMotion && SLIDES.map((slide, index) => {
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
        } else if (slide.type === 'image') { // slide is { type: 'image'; src: string }
          const { src } = slide;
          return (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
            decoding="async"
            className={`${styles.mediaLayer} ${isActive ? styles.mediaVisible : ''}`}
            aria-hidden
          />
          );
        }
      })}

      <div className={styles.vignette} aria-hidden />
    </div>
  );
}
