'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PhotoCarousel from '@/components/ui/PhotoCarousel';

const daughtersImages = [
  '/womens-ministry/daughters-1.jpg',
  '/womens-ministry/daughters-2.jpg',
  '/womens-ministry/daughters-3.jpg',
];

const outreachImages = [
  '/womens-ministry/outreach-1.jpg',
  '/womens-ministry/outreach-2.jpg',
  '/womens-ministry/outreach-3.jpg',
];

export default function WomensMinistryPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/womens_ministry.png" alt="Women's Ministry gathering" fill style={{ objectFit: 'cover' }} />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>MINISTRY</div>
            <h1>Women&apos;s Ministry</h1>
            <p className={styles.headerSubtext}>Equipping and encouraging women to grow in faith, leadership, and community.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <Link href="/ministries" className={styles.backBtn}>&larr; Back to Ministries</Link>
          <div className={styles.contentGrid} style={{ marginBottom: '6rem' }}>
            <ScrollReveal className={styles.textContent}>
              <h2>Daughters of the King</h2>
              <p>
                Our Women&apos;s Ministry at Trinity Prayer House is a place of faith, encouragement, and genuine fellowship where women of all ages and backgrounds come together to grow in the presence of God.
              </p>
              <p>
                Whether in seasons of joy, challenge, or spiritual growth, our Women&apos;s Ministry stands together in faith, offering encouragement, support, and the truth of God&apos;s Word.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <PhotoCarousel images={daughtersImages} />
            </ScrollReveal>
          </div>

          <div className={styles.contentGrid}>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <PhotoCarousel images={outreachImages} />
            </ScrollReveal>
            <ScrollReveal className={styles.textContent}>
              <h2>Women&apos;s Outreach Program</h2>
              <p>
                Our Women&apos;s Outreach Ministry to old age homes is a beautiful expression of Christ&apos;s love through compassion, care, and fellowship. Through regular visits, the women of our church bring joy and encouragement to elderly residents.
              </p>
              <p>
                This ministry also extends practical help through the distribution of meals, essential supplies, clothing, and personal care items, ensuring the elderly feel loved, remembered, and valued.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
