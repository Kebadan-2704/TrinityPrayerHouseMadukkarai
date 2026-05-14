'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function WomensMinistryPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/womens_ministry.png" alt="Women's Ministry" fill style={{ objectFit: 'cover' }} priority />
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
          <div className={styles.contentGrid}>
            <ScrollReveal className={styles.textContent}>
              <h2>Daughters of the King</h2>
              <p>
                Our Women’s Ministry at Trinity Prayer House is a place of faith, encouragement, and genuine fellowship where women of all ages and backgrounds come together to grow in the presence of God. Through prayer meetings, Bible studies, worship, and heartfelt fellowship, we foster a loving community where every woman is welcomed, valued, and strengthened in her walk with Christ.
              </p>
              <p>
                Whether in seasons of joy, challenge, or spiritual growth, our Women’s Ministry stands together in faith, offering encouragement, support, and the truth of God’s Word. We are passionate about helping women deepen their relationship with God, discover their purpose, and use their God-given gifts to serve their families, the church, and the Kingdom with confidence and grace.
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
