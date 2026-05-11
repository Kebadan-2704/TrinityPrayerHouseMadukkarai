'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Counter from '@/components/ui/Counter';
import Parallax from '@/components/ui/Parallax';
import FloatingParticles from '@/components/ui/FloatingParticles';
import YouTubeEmbed from '@/components/ui/YouTubeEmbed';
import { Sun, Heart, BookOpen, Sparkles } from 'lucide-react';
import { useLang } from '@/components/LangContext';

export default function Home() {
  const { t } = useLang();

  return (
    <>
      {/* ===== HERO with Particles ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src="/church-interior.png" alt="Trinity Prayer House" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.heroOverlay}></div>
        </div>
        <FloatingParticles />
        <div className={styles.heroContent}>
          <div className="container">
            <div className={styles.heroTextWrap}>
              <h2 className={`${styles.heroEyebrow} ${styles.animSlideRight}`}>{t.eyebrow}</h2>
              <h1 className={`${styles.heroHeadline} ${styles.animFadeUp}`}>
                {t.heroTitle1}<br/><i>{t.heroTitle2}</i> {t.heroTitle3} <i>{t.heroTitle4}</i>
              </h1>
              <p className={`${styles.heroSubtext} ${styles.animFadeUpDelay}`}>{t.heroSub}</p>
              <div className={`${styles.heroCtas} ${styles.animFadeUpDelay2}`}>
                <Link
                  href="https://www.google.com/maps/dir/?api=1&destination=Trinity+Prayer+House+Madukkarai+Coimbatore"
                  target="_blank" rel="noopener noreferrer"
                  className={`btn-primary ${styles.heroBtn}`}
                >
                  <span className={styles.btnPulse}></span>
                  {t.planVisit}
                </Link>
                <Link href="/sermons" className={`btn-outline ${styles.heroBtn}`}>{t.watchLatest}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className={styles.statsBar}>
        <div className={`container ${styles.statsGrid}`}>
          <Counter end={50} suffix="+" label={t.statsYears} />
          <Counter end={5000} suffix="+" label={t.statsLives} />
          <Counter end={200} suffix="+" label={t.statsSermons} />
          <Counter end={4} label={t.statsServices} />
        </div>
      </section>

      {/* ===== WELCOME with Parallax Images ===== */}
      <section className={`section-padding ${styles.welcomeSection}`}>
        <div className={`container ${styles.welcomeGrid}`}>
          <ScrollReveal delay={100} className={styles.welcomeText}>
            <div className={styles.secLabel}>{t.ourStory}</div>
            <h2>{t.welcomeH2a}<br/>{t.welcomeH2b}</h2>
            <p className={styles.leadText}>{t.welcomeP1}</p>
            <p>{t.welcomeP2}</p>
            <Link href="/about" className={styles.editorialLink}>
              {t.discoverHistory}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={300} className={styles.welcomeImageWrap}>
            <Parallax speed={0.15}>
              <div className={styles.imgMosaic}>
                <div className={styles.mosaicLarge}>
                  <Image src="/worship.png" alt="Worship" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className={styles.mosaicSmall}>
                  <Image src="/prayer.png" alt="Prayer" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <div className={styles.mosaicSmall}>
                  <Image src="/community.png" alt="Community" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
              </div>
            </Parallax>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PRAYER BAND with Parallax ===== */}
      <section className={styles.prayerBand}>
        <div className={styles.prayerBgWrap}>
          <Image src="/prayer.png" alt="" fill style={{ objectFit: 'cover' }} sizes="100vw" />
        </div>
        <div className={styles.prayerOverlay}></div>
        <div className={styles.prayerContent}>
          <ScrollReveal delay={100}>
            <div className={styles.crossSymbol}>✝</div>
            <h2 className={styles.prayerQuote}>{t.imgCaption}</h2>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className={styles.serviceStrip}>
        <div className="container">
          <ScrollReveal delay={100}>
            <div className={`${styles.secLabel} text-center`}>{t.joinUs}</div>
            <h2 className={`text-center ${styles.sectionHeading}`}>{t.serviceTimes} <i>{t.serviceTimesI}</i></h2>
          </ScrollReveal>
          <div className={styles.serviceGrid}>
            {[
              { h: t.sunWorship, time: '9:30', ampm: 'AM', desc: t.sunDesc, icon: <Sun size={22} strokeWidth={1.5} /> },
              { h: t.hindiService, time: '6:30', ampm: 'PM', desc: t.hindiDesc, icon: <Heart size={22} strokeWidth={1.5} /> },
              { h: t.bibleStudy, time: '7:30', ampm: 'PM', desc: t.bibleDesc, icon: <BookOpen size={22} strokeWidth={1.5} /> },
              { h: t.promiseService, time: '6:30', ampm: 'AM', desc: t.promiseDesc, icon: <Sparkles size={22} strokeWidth={1.5} /> },
            ].map((s, i) => (
              <ScrollReveal key={i} delay={120 * (i + 1)} className={styles.serviceItem}>
                <div className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>{s.icon}</div>
                  <h3>{s.h}</h3>
                  <p className={styles.time}>{s.time} <span>{s.ampm}</span></p>
                  <p className={styles.desc}>{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LATEST SERMON ===== */}
      <section className={styles.latestSermonSection}>
        <div className={`container ${styles.latestSermonGrid}`}>
          <ScrollReveal delay={100} className={styles.latestSermonText}>
            <div className={styles.secLabel}>{t.latestMessage}</div>
            <h2>{t.latestTitle} <i>{t.latestTitleI}</i></h2>
            <p>{t.latestDesc}</p>
            <Link href="/sermons" className={`${styles.editorialLink} ${styles.editorialLinkLight}`}>
              {t.seeAllSermons}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={300} className={styles.latestSermonVideo}>
            <YouTubeEmbed videoId="HdCWiWpGx_A" title="Latest Sermon" />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== COMMUNITY GALLERY with hover effects ===== */}
      <section className={styles.communityBand}>
        <div className={`container ${styles.communityGrid}`}>
          {[
            { src: '/community.png', alt: 'Church Community', label: t.about },
            { src: '/bible.png', alt: 'Bible Study', label: t.bibleStudy },
            { src: '/youth.png', alt: 'Youth Ministry', label: t.ministries },
          ].map((img, i) => (
            <ScrollReveal key={i} delay={100 * (i + 1)} className={styles.communityImgWrap}>
              <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
              <div className={styles.communityLabel}><span>{img.label}</span></div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== YOUTUBE CTA with particles ===== */}
      <section className={styles.ytSection}>
        <div className={styles.ytContent}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>{t.watchOnline}</div>
            <h2 className={styles.sectionHeading}>{t.neverMiss} <i>{t.messageI}</i></h2>
            <p className={styles.ytDesc}>{t.ytSubDesc}</p>
            <a href="https://www.youtube.com/@Pas.Vasanth?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className={`btn-primary ${styles.ytBtn}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"/></svg>
              {t.subscribeYT}
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
