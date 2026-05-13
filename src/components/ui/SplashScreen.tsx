'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './SplashScreen.module.css';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.splashContainer}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.splashContent}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className={styles.logoWrap}
            >
              <Image src="/Trinity Prayer prayer Logo.png" alt="Trinity Prayer House" width={140} height={140} className={styles.logoImg} priority />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
              className={styles.textWrap}
            >
              <h1 className={styles.title}>Trinity Prayer House</h1>
              <p className={styles.subtitle}>FAITH . LOVE . GRACE</p>
            </motion.div>
            
            <motion.div 
              className={styles.loaderWrap}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className={styles.loaderLine}>
                <motion.div 
                  className={styles.loaderProgress}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }}
                />
              </div>
            </motion.div>
          </div>
          
          <div className={styles.glowBg} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
