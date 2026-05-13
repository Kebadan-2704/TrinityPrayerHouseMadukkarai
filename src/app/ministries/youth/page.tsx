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
                Our youth fellowship is a dynamic community of teenagers and young adults who are passionate about Jesus. We tackle real-world issues through the lens of Scripture and encourage young people to live boldly for their faith.
              </p>
              <p>
                From powerful youth revival nights to intimate small groups and fun retreats, we provide spaces where lifelong friendships are formed and deep spiritual growth happens.
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
                We believe in equipping the next generation to be the hands and feet of Jesus. Our youth outreach programs are designed to reach our community through impactful service projects, evangelism, and local missions.
              </p>
              <p>
                We are dedicated to making a difference, stepping out of our comfort zones, and spreading the gospel wherever we go to bring hope to those who need it most.
              </p>
            </ScrollReveal>
          </div>

          <div className={styles.contentGrid}>
            <ScrollReveal className={styles.textContent}>
              <h2>Youth Trinity Media</h2>
              <p>
                Youth Trinity Media is the creative hub for our young people to express their faith through digital arts, photography, video production, and social media.
              </p>
              <p>
                Our team creates inspiring content, manages our online presence, and utilizes modern technology to share the message of Christ with a much broader digital audience.
              </p>
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
