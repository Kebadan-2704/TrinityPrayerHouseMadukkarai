import styles from './online-meet.module.css';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Video, Clock, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function OnlineMeet() {
  return (
    <div className={styles.pageWrap}>
      <section className={styles.headerSection}>
        <div className={styles.headerBg}>
          <Image
            src="/prayer.png"
            alt="Online Meet"
            fill
            priority
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
            <div className={styles.secLabel}>Online Ministry</div>
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
            <div className={styles.cardIcon}>
              <Video size={48} strokeWidth={1.5} color="#c7a760" />
            </div>
            <h2>Join Our Everyday Meet</h2>
            <p className={styles.cardDesc}>
              We invite you to be part of our daily spiritual fellowship from the comfort of your home. Let's come together to pray, share the word, and grow in faith.
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
              className={`btn-primary ${styles.joinBtn}`}
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
