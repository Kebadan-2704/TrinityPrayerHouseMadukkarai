'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function WomensMinistryPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={styles.headerSection}>
        <div className={styles.headerBg}>
          <Image src="/womens_ministry.png" alt="Women's Ministry" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>MINISTRY</div>
            <h1>Women's Ministry</h1>
            <p className={styles.headerSubtext}>Equipping and encouraging women to grow in faith, leadership, and community.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <Link href="/ministries" className={styles.backBtn}>&larr; Back to Ministries</Link>
          <div className={styles.contentGrid}>
            <ScrollReveal className={styles.textContent}>
              <h2>Daughters of the King</h2>
              <p>
                Our Women's Ministry is designed to connect women of all ages and backgrounds. Through Bible studies, retreats, and fellowship events, we create spaces for authentic relationship building and mutual encouragement.
              </p>
              <p>
                We believe that every woman has a unique God-given purpose. Our goal is to equip you to rise up as a strong leader in your home, workplace, and community, rooted deeply in the love of Christ.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
               <Image src="/womens_gallery_2.png" alt="Women fellowship" fill style={{ objectFit: 'cover' }} />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
