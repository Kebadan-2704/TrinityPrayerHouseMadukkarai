'use client';

import styles from '../sermons/page.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Image from 'next/image';
import { useLang } from '@/components/LangContext';

export default function SpecialMeeting() {
  const { t } = useLang();

  return (
    <div className={styles.pageWrap}>
      <section className={styles.headerSection}>
        <div className={styles.headerBg}>
          <Image src="/community-new-2.jpg" alt="Special Meeting" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>Gallery</div>
            <h1>Special <i>Meeting</i></h1>
            <p className={styles.headerP}>Join us for our upcoming special gatherings and divine encounters.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <ScrollReveal delay={100}>
            <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ marginBottom: '2rem' }}>Stay Tuned for Updates</h2>
              <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.8' }}>
                We regularly host special meetings, guest speakers, and revival services. 
                Details about our next special meeting will be posted here soon.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
