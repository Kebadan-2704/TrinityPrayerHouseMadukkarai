'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function OldAgeHomeMinistryPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
         <div className={styles.headerBg}>
           <Image src="/prayer_ministry.png" alt="Old Age Home" fill style={{ objectFit: 'cover' }} />
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
                Our Old Age Home Ministry at Trinity Prayer House is a ministry of love, compassion, and dignified care, dedicated to serving and honoring the elderly who reside with us. We are committed to creating a warm and nurturing environment where every individual is not only cared for physically but also encouraged spiritually and emotionally. Through daily prayer, worship, fellowship, and personal care, we ensure that our elders experience comfort, belonging, and the constant presence of God&apos;s love.
              </p>
              <p>
                We believe every stage of life is precious and worthy of honor. Our Old Age Home Ministry exists to provide a peaceful and faith-filled home where the elderly are respected, valued, and surrounded by a caring family in Christ. With kindness, compassion, and unwavering support, we walk alongside them, ensuring they live each day with dignity, joy, and the assurance that they are deeply loved by both God and His people.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
               <Image src="/prayer_gallery_2.png" alt="Old age home ministry activities" fill style={{ objectFit: 'cover' }} />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
