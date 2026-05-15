'use client';

import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Users, MapPin, Clock, Heart } from 'lucide-react';

export default function NewHere() {
  return (
    <div className={styles.pageWrap}>
      {/* Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
           <Image
             src="/worship.jpg"
             alt="Welcome to Trinity Prayer House"
             fill
             style={{ objectFit: 'cover' }}
           />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.heroContent}>
            <h1>Welcome!</h1>
            <p className={styles.heroSub}>
              We&apos;re so glad you&apos;re here. Whether this is your first time at Trinity Prayer House
              or you&apos;re looking for a church home, we want you to know — you belong here.
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className={`section-padding ${styles.expectSection}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>What to Expect</h2>
          <div className={styles.expectGrid}>
            {[
              {
                icon: <Clock size={28} />,
                title: 'Service Times',
                text: 'Sunday Worship at 9:30 AM, Hindi Service at 6:30 PM, Bible Study on Thursdays at 6:30 PM. We also have special meetings and prayer gatherings throughout the month.',
              },
              {
                icon: <MapPin size={28} />,
                title: 'Find Us',
                text: 'Trinity Prayer House, 16/300 Gandhi Nagar, Madukkarai, Coimbatore - 641105. Free parking is available nearby.',
              },
              {
                icon: <Users size={28} />,
                title: 'Community',
                text: 'We are a multi-generational, multilingual church family. You will find a warm welcome whether you are young or old, new to faith or have walked with God for years.',
              },
              {
                icon: <Heart size={28} />,
                title: 'For Your Kids',
                text: 'We have a dedicated Kids Ministry with Sunday School during the morning service and special programs like Vacation Bible School throughout the year.',
              },
            ].map((item, i) => (
              <div key={i} className={styles.expectCard} role="article" aria-label={item.title}>
                <div className={styles.expectIcon} aria-hidden="true">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* First Visit Tips */}
      <section className={styles.tipsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>First Visit Tips</h2>
          <div className={styles.tipsGrid}>
            {[
              'Arrive 10–15 minutes early so we can greet you and help you find a seat.',
              'Dress casually and comfortably — no dress code here.',
              'Grab a cup of tea or coffee from our welcome counter.',
              'Fill out a visitor card at the welcome desk so we can connect with you.',
              'Stay after service for fellowship time with light refreshments.',
              'Feel free to ask any questions — our team and congregation are here to help.',
            ].map((tip, i) => (
              <div key={i} className={styles.tipItem}>
                <span className={styles.tipNumber}>{String(i + 1).padStart(2, '0')}</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Ready to Visit?</h2>
          <p>We would love to welcome you in person. Join us this Sunday!</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/online-meet" className={styles.ctaBtn}>
              Join Online Meet
            </Link>
            <Link href="/contact" className={styles.ctaBtnOutline}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}