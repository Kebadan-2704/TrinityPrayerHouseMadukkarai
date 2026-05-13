'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PhotoCarousel from '@/components/ui/PhotoCarousel';

const sundaySchoolImages = [
  '/kids-ministry/kids-3.jpg',
  '/kids-ministry/kids-4.jpg',
  '/kids-ministry/kids-7.jpg'
];

const vbsImages = [
  '/kids-ministry/kids-1.jpg',
  '/kids-ministry/kids-2.jpg',
  '/kids-ministry/kids-6.jpg'
];

export default function KidsMinistryPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          {/* You can manually adjust the image position below by changing the objectPosition value (e.g., 'center 20%', 'top', 'bottom', etc.) */}
          <Image src="/kids-ministry/kids-1.jpg" alt="Kids Ministry" fill style={{ objectFit: 'cover', objectPosition: 'center 60%' }} priority />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>MINISTRY</div>
            <h1>Kids Ministry</h1>
            <p className={styles.headerSubtext}>Building a strong foundation of faith for the next generation.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <Link href="/ministries" className={styles.backBtn}>&larr; Back to Ministries</Link>
          <div className={styles.contentGrid} style={{ marginBottom: '6rem' }}>
            <ScrollReveal className={styles.textContent}>
              <h2>Sunday School - Every Sunday at 9:30am</h2>
              <p>
                Our Kids Ministry is dedicated to providing a safe, fun, and engaging environment where children can learn about God&apos;s love. We believe that spiritual growth starts early, and we are committed to partnering with parents to build a strong biblical foundation.
              </p>
              <p>
                Through interactive lessons, worship, and age-appropriate activities, children discover their identity in Christ and learn to apply biblical truths to their everyday lives.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <PhotoCarousel images={sundaySchoolImages} />
            </ScrollReveal>
          </div>

          <div className={styles.contentGrid}>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <PhotoCarousel images={vbsImages} />
            </ScrollReveal>
            <ScrollReveal className={styles.textContent}>
              <h2>Vacation Bible Study (VBS)</h2>
              <p>
                Every summer, our Vacation Bible Study (VBS) brings children together for an action-packed week of learning, singing, and growing in their faith. It is one of our most anticipated events of the year!
              </p>
              <p>
                Children participate in creative crafts, energetic games, and meaningful Bible lessons designed to help them understand God&apos;s word in a way that is memorable and exciting.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
