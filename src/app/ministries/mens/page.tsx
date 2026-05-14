'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function MensMinistryPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/prayer_ministry.png" alt="Men's Ministry" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>MINISTRY</div>
            <h1>Men&apos;s Ministry</h1>
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
                Our Men’s Ministry at Trinity Prayer House is a strong brotherhood of faith where men are encouraged to grow spiritually, build meaningful relationships, and become the leaders God has called them to be. Through prayer gatherings, Bible studies, fellowship, and discipleship, we create a supportive environment where men can be strengthened, challenged, and encouraged in their walk with Christ. Here, men stand together in faith, uplifting one another through every season of life.
              </p>
              <p>
                We believe that when men are grounded in God’s Word, they become pillars of strength in their families, church, and community. Our Men’s Ministry is committed to equipping men to lead with integrity, serve with humility, and boldly live out their faith in every area of life — becoming godly examples both within the church and beyond.
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
