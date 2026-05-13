'use client';
import Image from 'next/image';
import styles from './about.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useLang } from '@/components/LangContext';

export default function About() {
  const { t } = useLang();
  return (
    <div className="pageWrap">
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/old.jpg" alt="" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100} variant="blurIn">
            <div className={styles.secLabel}>{t.aboutUs}</div>
            <h1>{t.aboutH1a} <i>{t.aboutH1b}</i> {t.aboutH1c}</h1>
            <p className={styles.headerSubtext}>{t.aboutSub}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section-padding ${styles.contentSection} pres-band-soft pres-rail`}>
        <div className={`container ${styles.aboutGrid}`}>
          <ScrollReveal delay={200} variant="fadeRight" className={styles.mainText}>
            <h2>{t.legacyTitle}</h2>
            <p className={styles.leadText}>{t.aboutP1}</p>
            <p>{t.aboutP2}</p>
            <div className={styles.coreValues}>
              <div className={styles.valueItem}><h3>{t.val1h}</h3><p>{t.val1p}</p></div>
              <div className={styles.valueItem}><h3>{t.val2h}</h3><p>{t.val2p}</p></div>
              <div className={styles.valueItem}><h3>{t.val3h}</h3><p>{t.val3p}</p></div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={320} variant="fadeLeft" className={styles.sideContent}>
            <div className={styles.pastorCard}>
              <div className={styles.pastorImageWrap}><Image src="/sath.png" alt="Pastor Vasanth Sathyanathan" fill style={{ objectFit: 'cover', objectPosition: '50% 3%' }} /></div>
              <div className={styles.pastorInfo}>
                <div className={styles.secLabel}>{t.seniorPastor}</div>
                <h3>Pastor Sathyanathan</h3>
                <p>{t.pastorDesc}</p>
              </div>
            </div>
            <div className={styles.quoteBlock}>
              <h3>&ldquo;{t.aboutQuote}&rdquo;</h3>
            </div>
          </ScrollReveal>
        </div>
      </section>


    </div>
  );
}
