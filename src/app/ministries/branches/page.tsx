'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function BranchChurchesPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={styles.headerSection}>
        <div className={styles.headerBg}>
          <Image src="/prayer_ministry.png" alt="Branch Churches" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>MINISTRY</div>
            <h1>Branch Churches</h1>
            <p className={styles.headerSubtext}>Expanding the Kingdom of God through our network of local branch churches.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <Link href="/ministries" className={styles.backBtn}>&larr; Back to Ministries</Link>
          <div className={styles.contentGrid}>
            <ScrollReveal className={styles.textContent}>
              <h2>Reaching Every Corner</h2>
              <p>
                Trinity Prayer House was founded with a vision to reach the unreached. Our Branch Churches are an extension of that vision, taking the Gospel to neighboring villages and communities where there is a need for a Bible-believing fellowship.
              </p>
              <p>
                Each branch operates with the same core values of prayer, worship, and the Word. We continually pray for God to open new doors so we can establish more centers of worship across the region.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
               <Image src="/prayer_gallery_2.png" alt="Branch Churches" fill style={{ objectFit: 'cover' }} />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
