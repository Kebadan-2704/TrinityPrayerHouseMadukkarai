'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './SplashScreen.module.css';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Only show splash once per session
    const hasSeenSplash = sessionStorage.getItem('tph-splash-seen');
    if (hasSeenSplash) return;

    setIsVisible(true);
    sessionStorage.setItem('tph-splash-seen', 'true');

    // Start exit animation at 2s, fully hidden by 2.8s
    const exitTimer = setTimeout(() => setIsExiting(true), 2000);
    const hideTimer = setTimeout(() => setIsVisible(false), 2800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`${styles.splashContainer} ${isExiting ? styles.splashExiting : ''}`}>
      <div className={styles.splashContent}>
        <div className={styles.logoWrap}>
          <Image
            src="/tph-logo.png"
            alt="Trinity Prayer House"
            width={140}
            height={140}
            className={styles.logoImg}
            priority={true}
          />
        </div>

        <div className={styles.textWrap}>
          <h1 className={styles.title}>Trinity Prayer House</h1>
          <p className={styles.subtitle}>FAITH . LOVE . GRACE</p>
        </div>

        <div className={styles.loaderWrap}>
          <div className={styles.loaderLine}>
            <div className={styles.loaderProgress} />
          </div>
        </div>
      </div>

      <div className={styles.glowBg} />
    </div>
  );
}
