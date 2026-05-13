'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './CinematicHeroBackdrop.module.css';
import {
  HERO_BG_POSTER,
  HERO_BG_VIDEO_MOV,
  HERO_BG_VIDEO_MP4,
  HERO_BG_VIDEO_WEBM,
} from '@/lib/siteMedia';

type Props = {
  /** True while the background video is actually playing (slides can fade out). */
  onVideoActive?: (active: boolean) => void;
};

export default function CinematicHeroBackdrop({ onVideoActive }: Props) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const notify = useCallback(
    (active: boolean) => {
      setVideoPlaying(active);
      onVideoActive?.(active);
    },
    [onVideoActive]
  );

  useEffect(() => {
    if (reduceMotion || !videoRef.current) return;
    const v = videoRef.current;
    v.muted = true;
    const attempt = v.play();
    if (attempt !== undefined) {
      attempt.catch(() => notify(false));
    }
  }, [reduceMotion, notify]);

  return (
    <div className={styles.wrap}>
      <div className={styles.mesh} aria-hidden />
      <div className={styles.aurora} aria-hidden />

      {!reduceMotion && (
        <video
          ref={videoRef}
          className={`${styles.video} ${videoPlaying ? styles.videoVisible : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_BG_POSTER}
          onPlaying={() => notify(true)}
          onError={() => notify(false)}
          onStalled={() => notify(false)}
          aria-hidden
        >
          <source src={HERO_BG_VIDEO_WEBM} type="video/webm" />
          <source src={HERO_BG_VIDEO_MOV} type="video/quicktime" />
          <source src={HERO_BG_VIDEO_MP4} type="video/mp4" />
        </video>
      )}

      <div className={styles.vignette} aria-hidden />
    </div>
  );
}
