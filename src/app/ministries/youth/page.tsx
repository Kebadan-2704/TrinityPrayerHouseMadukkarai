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
          <Image src="/youth_ministry_new.jpg" alt="Youth Ministry" fill style={{ objectFit: 'cover' }} priority />
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
          <div className={styles.contentGrid} style={{ marginBottom: '6rem' }}>
            <ScrollReveal className={styles.textContent}>
              <h2>Youth Fellowship</h2>
              <p>
                Our Youth Fellowship at Trinity Prayer House is a vibrant and Christ-centered community where young people grow in faith, build meaningful friendships, and discover their God-given purpose.
              </p>
              <p>
                Through fellowship gatherings, Bible studies, worship sessions, prayer meetings, and discipleship, our youth are encouraged to deepen their relationship with God in an atmosphere of love, encouragement, and spiritual growth — a place where every young person belongs and grows together in Christ.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <Image src="/youth_gallery_2.png" alt="Youth Fellowship" fill style={{ objectFit: 'cover' }} />
            </ScrollReveal>
          </div>

          <div className={styles.contentGrid} style={{ marginBottom: '6rem' }}>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <Image src="/youth.jpg" alt="Youth Outreach Programs" fill style={{ objectFit: 'cover' }} />
            </ScrollReveal>
            <ScrollReveal className={styles.textContent}>
              <h2>Youth Outreach Programs</h2>
              <p>
                Our Youth Outreach Programs are dynamic expressions of faith in action, where young people use their talents to share the Gospel beyond the church walls. Through dance performances, skits, evangelistic programs, special outreach events, and community-centered initiatives, our youth actively minister to people in creative and impactful ways, bringing the message of Christ’s love, hope, and salvation to the world around them.
              </p>
            </ScrollReveal>
          </div>

          <div className={styles.contentGrid}>
            <ScrollReveal className={styles.textContent}>
              <h2>Youth Trinity Media</h2>
              <p>
               Trinity Youth Media is a ministry where creativity meets calling, empowering young people to use media as a tool for God’s Kingdom. From photography, videography, graphic design, live production, and digital ministry, this team not only serves within the church but also reaches beyond by supporting ministries, training others, and equipping churches with media knowledge and creative excellence. Through this ministry, young creatives are inspired to use their gifts to glorify God and expand His work far beyond our walls.</p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <Image src="/youth_ministry.png" alt="Youth Trinity Media" fill style={{ objectFit: 'cover' }} />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
