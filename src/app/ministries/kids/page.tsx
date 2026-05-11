'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function KidsMinistryPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={styles.headerSection}>
        <div className={styles.headerBg}>
          <Image src="/kids_ministry.png" alt="Kids Ministry" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>MINISTRY</div>
            <h1>Kids Ministry</h1>
            <p className={styles.headerSubtext}>Building a strong foundation of faith for the next generation.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <Link href="/ministries" className={styles.backBtn}>&larr; Back to Ministries</Link>
          <div className={styles.contentGrid}>
            <ScrollReveal className={styles.textContent}>
              <h2>Nurturing Young Hearts</h2>
              <p>
                Our Kids Ministry is dedicated to providing a safe, fun, and engaging environment where children can learn about God's love. We believe that spiritual growth starts early, and we are committed to partnering with parents to build a strong biblical foundation.
              </p>
              <p>
                Through interactive lessons, worship, and age-appropriate activities, children discover their identity in Christ and learn to apply biblical truths to their everyday lives.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
               <Image src="/kids_gallery_2.png" alt="Kids activity" fill style={{ objectFit: 'cover' }} />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
