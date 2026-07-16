'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './SplashScreen.module.css';

export default function SplashScreen() {
  // Default to true so it renders on the server and covers the UI immediately
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if seen on client side
    const hasSeenSplash = sessionStorage.getItem('tph-splash-seen');
    if (hasSeenSplash) {
      setIsVisible(false);
      return;
    }

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
    <div 
      id="splash-screen"
      className={`${styles.splashContainer} ${isExiting ? styles.splashExiting : ''}`}
    >
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
