'use client';

import { useState, useEffect } from 'react';
import styles from './online-meet.module.css';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Video, Clock, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function OnlineMeet() {
  const [isMeetActive, setIsMeetActive] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const istString = now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
      const istTime = new Date(istString);
      
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();

      // Between 8:50 PM and 10:00 PM (20:50 - 21:59)
      if ((hours === 20 && minutes >= 50) || hours === 21) {
        setIsMeetActive(true);
      } else {
        setIsMeetActive(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image
             src="/prayer.png"
             alt="Online Meet"
             fill
             sizes="100vw"
             style={{
               objectFit: 'cover',
               objectPosition: 'center 40%'
             }}
           />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            {isMeetActive ? (
              <div className={styles.liveBadge} style={{ margin: '0 auto 1.5rem', display: 'inline-flex' }}>
                <span className={styles.liveBadgeDot}></span> LIVE NOW
              </div>
            ) : (
              <div className={styles.secLabel}>Online Ministry</div>
            )}
            <h1>Daily <i>Online Meet</i></h1>
            <p className={styles.headerP}>
              Join us every day at 9:00 PM for our virtual gathering and prayer session.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <ScrollReveal delay={200} className={styles.meetCard}>
            {isMeetActive && (
              <div className={styles.liveBadge}>
                <span className={styles.liveBadgeDot}></span> MEETING IN PROGRESS
              </div>
            )}
            
            <div className={styles.cardIcon}>
              <Video size={48} strokeWidth={1.5} color={isMeetActive ? "#e74c3c" : "#c7a760"} />
            </div>
            <h2>Join Our Everyday Meet</h2>
            <p className={styles.cardDesc}>
              We invite you to be part of our daily spiritual fellowship from the comfort of your home. Let&apos;s come together to pray, share the word, and grow in faith.
            </p>
            
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <Calendar size={24} color="#c7a760" />
                <div>
                  <strong>Every Day</strong>
                  <span>Monday to Sunday</span>
                </div>
              </div>
              <div className={styles.infoItem}>
                <Clock size={24} color="#c7a760" />
                <div>
                  <strong>9:00 PM</strong>
                  <span>Indian Standard Time</span>
                </div>
              </div>
            </div>

            <Link
              href="https://meet.google.com/gct-xkdh-cni"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-primary ${styles.joinBtn} ${isMeetActive ? styles.pulseLive : ''}`}
            >
              <Video size={20} />
              Join Google Meet Now
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
