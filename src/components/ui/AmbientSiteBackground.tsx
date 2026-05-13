'use client';

import styles from './AmbientSiteBackground.module.css';

/** Soft Claude-style drifting gradient mesh behind all content */
export default function AmbientSiteBackground() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.mesh} />
      <div className={styles.aurora} />
      <div className={styles.grid} />
    </div>
  );
}
