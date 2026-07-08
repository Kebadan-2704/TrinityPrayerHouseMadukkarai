'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { Heart, Phone } from 'lucide-react';
import { useLang } from '@/components/LangContext';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Give() {
  const { t } = useLang();
  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}><div className={styles.gradientOrb}></div></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal variant="blurIn">
            <div className={styles.secLabel}>{t.partnerWithUs}</div>
            <h1>{t.giveH1a}<br/><i>{t.giveH1b}</i></h1>
            <p>{t.giveSub}</p>
          </ScrollReveal>
        </div>
      </section>
      <section className={`section-padding ${styles.giveSection} pres-band-soft pres-rail`}>
        <div className="container">
          <div className={styles.giveGrid}>
              <div className={`${styles.secondaryCard} pres-card-static hover-lift`}>
                <div className={styles.cardHeader}><Phone size={24} className="text-accent" /><h3>{t.upiPayment} / GPay</h3></div>
                <p>{t.upiDesc}</p>
                <div className={styles.qrWrap}>
                  <Image src="/upi-qr.png" alt="Scan to pay via GPay" width={200} height={200} className={styles.qrImage} unoptimized />
                </div>
                <div className={styles.upiId}>pastorvasanth-1@okhdfcbank</div>
                <div className={styles.upiNumber}>+91 9786888999</div>
              </div>
              <div className={`${styles.secondaryCard} pres-card-static hover-lift`}>
                <div className={styles.cardHeader}><Heart size={24} className="text-accent" /><h3>{t.offeringBox}</h3></div>
                <p>{t.offeringDesc}</p>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}
