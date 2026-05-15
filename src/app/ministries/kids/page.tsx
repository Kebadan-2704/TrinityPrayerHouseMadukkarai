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
  '/kids-ministry/kids-8.jpg',
  '/kids-ministry/kids-10.jpg',
  '/kids-ministry/kids-9.jpg'
];

export default function KidsMinistryPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/kids-ministry/kids-1.jpg" alt="Kids Ministry activities" fill style={{ objectFit: 'cover', objectPosition: 'center 60%' }} />
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
                Sunday School is a warm and engaging space where children are introduced to the love of God through age-appropriate lessons, Bible stories, and creative activities. Our dedicated teachers and volunteers create a nurturing environment where young hearts build a foundation of faith, grow in God&apos;s Word, and are reminded every week that they are seen, loved, and celebrated.
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
                Vacation Bible School is the highlight of the year for our kids! Held annually, VBS is a celebration of faith and fun where children explore God&apos;s Word through exciting themes, energetic worship, games, and crafts — making lasting memories, building new friendships, and leaving with a heart full of the knowledge of how deeply God loves them.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
