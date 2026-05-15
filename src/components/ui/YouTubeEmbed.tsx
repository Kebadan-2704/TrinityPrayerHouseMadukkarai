'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './YouTubeEmbed.module.css';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

export default function YouTubeEmbed({ videoId, title = 'Video' }: YouTubeEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.wrap}>
      {loaded ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      ) : (
        <button
          className={styles.facade}
          onClick={() => setLoaded(true)}
          aria-label={`Play ${title}`}
        >
          <Image
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className={styles.thumb}
            priority={false}
            unoptimized
            fill
          />
          <div className={styles.overlay} />
          <div className={styles.playBtn}>
            <svg viewBox="0 0 68 48" width="68" height="48">
              <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#FF0000"/>
              <path d="M45 24L27 14v20" fill="#fff"/>
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}
