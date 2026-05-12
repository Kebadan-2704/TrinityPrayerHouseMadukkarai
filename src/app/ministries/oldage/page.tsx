'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function OldAgeHomeMinistryPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={styles.headerSection}>
        <div className={styles.headerBg}>
          <Image src="/prayer_ministry.png" alt="Old Age Home" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>MINISTRY</div>
            <h1>Old Age Home</h1>
            <p className={styles.headerSubtext}>Providing care, love, and spiritual support for the elderly.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <Link href="/ministries" className={styles.backBtn}>&larr; Back to Ministries</Link>
          <div className={styles.contentGrid}>
            <ScrollReveal className={styles.textContent}>
              <h2>Honoring Our Elders</h2>
              <p>
                Our Old Age Home ministry is a testament to our commitment to love and care for the elderly. We believe that every individual deserves to spend their later years with dignity, surrounded by love and compassion.
              </p>
              <p>
                We provide physical care, medical support, and most importantly, spiritual nourishment. Through regular prayers, fellowships, and dedicated care, we strive to be a family for those who need one.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
               <Image src="/prayer_gallery_2.png" alt="Old Age Home" fill style={{ objectFit: 'cover' }} />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
