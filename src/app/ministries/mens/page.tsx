'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function MensMinistryPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={styles.headerSection}>
        <div className={styles.headerBg}>
          <Image src="/prayer_ministry.png" alt="Men's Ministry" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>MINISTRY</div>
            <h1>Men's Ministry</h1>
            <p className={styles.headerSubtext}>Empowering men to lead with faith, character, and purpose.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <Link href="/ministries" className={styles.backBtn}>&larr; Back to Ministries</Link>
          <div className={styles.contentGrid}>
            <ScrollReveal className={styles.textContent}>
              <h2>Growing Together</h2>
              <p>
                Our Men's Ministry is dedicated to building strong, faithful men who lead in their homes, workplaces, and the community. We gather to study the Word, pray together, and encourage one another.
              </p>
              <p>
                Join us for powerful times of fellowship, teaching, and mentorship as we strive to become the men God has called us to be.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
               <Image src="/prayer_gallery_2.png" alt="Men's group" fill style={{ objectFit: 'cover' }} />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
