'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function HindiMinistryPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
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
                Our Hindi Ministry at Trinity Prayer House is dedicated to creating a welcoming spiritual home for Hindi-speaking believers to worship, pray, and grow in faith in their heart language. We believe that God’s Word becomes even more personal and impactful when experienced in a language that speaks directly to the heart, which is why this ministry provides a meaningful space for worship, fellowship, and spiritual encouragement in Hindi.
              </p>
              <p>
                Whether you are new to the city or have been part of the community for years, our Hindi Ministry is a place of belonging, connection, and spiritual growth. Through worship services, prayer, fellowship, and the teaching of God’s Word, we seek to strengthen faith, build lasting relationships, and help every individual experience the love and presence of Christ in a familiar and comforting way.
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
