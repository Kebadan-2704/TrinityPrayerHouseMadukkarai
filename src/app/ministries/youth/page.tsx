'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function YouthMinistryPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/youth_ministry.png" alt="Youth Ministry" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>MINISTRY</div>
            <h1>Youth Ministry</h1>
            <p className={styles.headerSubtext}>Empowering young people to discover their identity in Christ through worship, fellowship, and discipleship.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <Link href="/ministries" className={styles.backBtn}>&larr; Back to Ministries</Link>
          <div className={styles.contentGrid}>
            <ScrollReveal className={styles.textContent}>
              <h2>A Generation on Fire</h2>
              <p>
                Our Youth Ministry is a dynamic community of teenagers and young adults who are passionate about Jesus. We tackle real-world issues through the lens of Scripture and encourage young people to live boldly for their faith.
              </p>
              <p>
                From powerful youth revival nights to intimate small groups and fun retreats, we provide spaces where lifelong friendships are formed and deep spiritual growth happens.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
               <Image src="/youth_gallery_2.png" alt="Youth group" fill style={{ objectFit: 'cover' }} />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
