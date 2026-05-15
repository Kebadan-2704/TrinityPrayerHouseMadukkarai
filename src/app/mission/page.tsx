'use client';
import Image from 'next/image';
import styles from './mission.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useLang } from '@/components/LangContext';

export default function Mission() {
  const { t } = useLang();
  return (
    <div className="pageWrap">
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/old.jpg" alt="Mission history photo" fill style={{ objectFit: 'cover' }} />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100} variant="blurIn">
            <div className={styles.secLabel}>{t.missionUs}</div>
            <h1>{t.missionH1a} <i>{t.missionH1b}</i> {t.missionH1c}</h1>
            <p className={styles.headerSubtext}>{t.missionSub}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section-padding ${styles.contentSection} pres-band-soft pres-rail`}>
        <div className={`container ${styles.missionGrid}`}>
          <ScrollReveal delay={200} variant="fadeRight" className={styles.mainText}>
            <h2>{t.missionLegacyTitle}</h2>
            <p className={styles.leadText}>{t.missionP1}</p>
            <p>{t.missionP2}</p>
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
              <h3>&ldquo;{t.aboutQuote || 'We are not just building a church; we are building people.'}&rdquo;</h3>
            </div>
          </ScrollReveal>
        </div>
      </section>


    </div>
  );
}
