'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function PrayerMinistryPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={styles.headerSection}>
        <div className={styles.headerBg}>
          <Image src="/prayer_ministry.png" alt="Prayer Ministry" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>MINISTRY</div>
            <h1>Prayer Ministry</h1>
            <p className={styles.headerSubtext}>Intercessory prayer covering the church, city, and nation. We believe in the power of united prayer.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <Link href="/ministries" className={styles.backBtn}>&larr; Back to Ministries</Link>
          <div className={styles.contentGrid}>
            <ScrollReveal className={styles.textContent}>
              <h2>Standing in the Gap</h2>
              <p>
                Prayer is the engine room of Trinity Prayer House. Our intercessory team meets regularly to stand in the gap for our church family, our leaders, our city, and the nations. We firmly believe that every great movement of God is birthed in prayer.
              </p>
              <p>
                Whether you are seeking prayer or feeling called to join our intercessors, there is a place for you. We host early morning prayer sessions, all-night prayer watches, and dedicated healing services.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
               <Image src="/prayer_gallery_2.png" alt="Prayer group" fill style={{ objectFit: 'cover' }} />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
