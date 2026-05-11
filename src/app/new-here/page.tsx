'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { useLang } from '@/components/LangContext';
import { Clock, MapPin, Coffee, Heart, Music, Users } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function NewHerePage() {
  const { t } = useLang();

  return (
    <div className={styles.pageWrap}>
      {/* Header */}
      <section className={styles.headerSection}>
        <div className={styles.headerBg}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal>
            <div className={styles.secLabel}>WELCOME HOME</div>
            <h1>New Here?</h1>
            <p>We know visiting a new church can be intimidating. Here is everything you need to know to make your first visit a great experience.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* What to Expect */}
      <section className={styles.expectSection}>
        <div className="container">
          <div className={styles.grid2}>
            <ScrollReveal delay={100} className={styles.expectImgWrap}>
              {/* Use worship image as placeholder until real images are provided */}
              <Image src="/worship.png" alt="Worship service" fill style={{ objectFit: 'cover' }} />
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.expectContent}>
              <div className={styles.secLabel}>WHAT TO EXPECT</div>
              <h2>Come as you are.</h2>
              <p className={styles.leadText}>
                At Trinity Prayer House, you'll be welcomed into a friendly, casual environment by people who are excited to see you. We want you to have an idea of what to expect when you arrive.
              </p>
              
              <ul className={styles.featureList}>
                <li>
                  <div className={styles.featureIcon}><Clock size={20} /></div>
                  <div>
                    <h4>90-Minute Services</h4>
                    <p>Our services are typically an hour and a half long, filled with engaging worship and a practical, Bible-based message.</p>
                  </div>
                </li>
                <li>
                  <div className={styles.featureIcon}><Music size={20} /></div>
                  <div>
                    <h4>Passionate Worship</h4>
                    <p>We start with high-energy, spirit-filled worship. Feel free to participate in whatever way is comfortable for you.</p>
                  </div>
                </li>
                <li>
                  <div className={styles.featureIcon}><Heart size={20} /></div>
                  <div>
                    <h4>Friendly Community</h4>
                    <p>No perfect people allowed. We are a community of broken people finding hope and healing in Jesus.</p>
                  </div>
                </li>
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ Grid */}
      <section className={styles.faqSection}>
        <div className="container">
          <ScrollReveal className={styles.textCenter}>
            <h2>Frequently Asked Questions</h2>
            <p className={styles.faqSub}>Common questions from our first-time guests.</p>
          </ScrollReveal>

          <div className={styles.faqGrid}>
            <ScrollReveal delay={100} className={styles.faqCard}>
              <div className={styles.faqIcon}><MapPin size={24} /></div>
              <h3>Where do I park?</h3>
              <p>We have dedicated parking spaces right in front of the church building. Our parking team will guide you to a spot when you arrive.</p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.faqCard}>
              <div className={styles.faqIcon}><Coffee size={24} /></div>
              <h3>What should I wear?</h3>
              <p>Most of our congregation dresses casually. Whether you prefer jeans and a t-shirt or your Sunday best, you are welcome here!</p>
            </ScrollReveal>
            <ScrollReveal delay={300} className={styles.faqCard}>
              <div className={styles.faqIcon}><Users size={24} /></div>
              <h3>What about my kids?</h3>
              <p>We have an excellent Kids Ministry that runs concurrently with our Sunday services. Your children will learn about Jesus in a safe, fun environment.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2>Ready to visit?</h2>
            <p className={styles.ctaSub}>Join us this Sunday at 9:30 AM.</p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className="btn-primary">Get Directions</Link>
              <Link href="/sermons" className="btn-outline">Watch Online First</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
