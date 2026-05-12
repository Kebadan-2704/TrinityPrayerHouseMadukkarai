'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function HindiMinistryPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={styles.headerSection}>
        <div className={styles.headerBg}>
          <Image src="/prayer_ministry.png" alt="Hindi Ministry" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>MINISTRY</div>
            <h1>Hindi Ministry</h1>
            <p className={styles.headerSubtext}>Reaching out to the Hindi-speaking community with worship and the Word.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <Link href="/ministries" className={styles.backBtn}>&larr; Back to Ministries</Link>
          <div className={styles.contentGrid}>
            <ScrollReveal className={styles.textContent}>
              <h2>Worship in Our Heart Language</h2>
              <p>
                Our Hindi Ministry is dedicated to serving the Hindi-speaking population in and around Madukkarai. We believe that language should never be a barrier to encountering God's love.
              </p>
              <p>
                Join us for our special Hindi services where we worship, study the Bible, and fellowship together. We are building a family of believers who encourage and support one another in Christ.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
               <Image src="/prayer_gallery_2.png" alt="Hindi Ministry group" fill style={{ objectFit: 'cover' }} />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
