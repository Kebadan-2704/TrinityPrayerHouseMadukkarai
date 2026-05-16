'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Counter from '@/components/ui/Counter';
import Parallax from '@/components/ui/Parallax';
import FloatingParticles from '@/components/ui/FloatingParticles';
import CinematicHeroBackdrop from '@/components/ui/CinematicHeroBackdrop';
import YouTubeEmbed from '@/components/ui/YouTubeEmbed';
import MagneticEffect from '@/components/ui/MagneticEffect';
import StaggeredText from '@/components/ui/StaggeredText';
import { Sun, Heart, BookOpen, Sparkles, Video } from 'lucide-react';
import { useLang } from '@/components/LangContext';

export default function Home() {
  const { t } = useLang();
  const [latestSermon, setLatestSermon] = useState<{
    videoId: string;
    title: string;
    date: string;
    displayTitle?: string;
  } | null>(null);

  useEffect(() => {
    fetch('/api/latest-sermon')
      .then((res) => res.json())
      .then((data) => {
        const latest = data?.latest ?? data;
        if (latest?.videoId) setLatestSermon(latest);
      })
      .catch((err) => console.error('Failed to fetch latest sermon:', err));
  }, []);

  const heroImages = [
    '/hero-bg.jpg',
    '/slide-2.jpg',
    '/slide-3.jpg',
    '/slide-4.jpg',
    '/slide-5.jpg'
  ];

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [heroBgVideoPlaying, setHeroBgVideoPlaying] = useState(false);
  const [foundersHovered, setFoundersHovered] = useState(false);
  const [missionHovered, setMissionHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <>
      {/* ===== HERO with Particles ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <CinematicHeroBackdrop onVideoActive={setHeroBgVideoPlaying} />
          <div
            className={`${styles.heroSlidesWrap} ${heroBgVideoPlaying ? styles.heroSlidesHidden : ''}`}
          >
            {heroImages.map((src, idx) => (
              <div
                key={src}
                className={`${styles.heroImgSlide} ${idx === currentImgIndex ? styles.active : ''}`}
                style={{ position: 'absolute', inset: 0 }}
              >
                <Image
                  src={src}
                  alt="Trinity Prayer House - Church community"
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
          <div className={styles.heroOverlay} />
          <FloatingParticles />
        </div>
        <div className={styles.heroContent}>
          <div className="container">
            <div className={styles.heroTextWrap}>
              <h2 className={`${styles.heroEyebrow} ${styles.animSlideRight}`}>{t.eyebrow}</h2>
              <h1 className={`${styles.heroHeadline} ${styles.animFadeUp}`}>
                {t.heroTitle1}<br /><i>{t.heroTitle2}</i> {t.heroTitle3} <i>{t.heroTitle4}</i>
              </h1>
              <p className={`${styles.heroSubtext} ${styles.animFadeUpDelay}`}>{t.heroSub}</p>
              <div className={`${styles.heroCtas} ${styles.animFadeUpDelay2}`}>
                <MagneticEffect>
                  <Link
                    href="https://www.google.com/maps/dir/?api=1&destination=Trinity+Prayer+House+Madukkarai+Coimbatore"
                    target="_blank" rel="noopener noreferrer"
                    className={`btn-primary ${styles.heroBtn}`}
                  >
                    <span className={styles.btnPulse}></span>
                    {t.planVisit}
                  </Link>
                </MagneticEffect>
                <MagneticEffect>
                  <Link href="/sermons" className={`btn-outline ${styles.heroBtn}`}>{t.watchLatest}</Link>
                </MagneticEffect>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.heroScroll} aria-hidden="true">
          <span>Scroll</span>
          <div className={styles.scrollChevron} />
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className={styles.statsBar}>
        <div className={`container ${styles.statsGrid}`}>
          <Counter end={50} suffix="+" label={t.statsYears} />
          <Counter end={5000} suffix="+" label={t.statsLives} />
          <Counter end={200} suffix="+" label={t.statsSermons} />
          <Counter end={10} label={t.statsServices} />
        </div>
      </section>

      {/* ===== WELCOME with Single Image ===== */}
      <section className={`section-padding ${styles.welcomeSection}`}>
        <div className={`container ${styles.welcomeGrid}`}>
          <ScrollReveal delay={100} className={styles.welcomeImageWrap}>
            <Parallax speed={0.15}>
              {/* ── FOUNDERS IMAGE POSITION CONTROLS ────────────────────────────
                  objectPositionX : move image left (0%) ↔ right (100%)
                  objectPositionY : move image up   (0%) ↔ down  (100%)
                  imageScale      : zoom in (>1) or out (<1), e.g. 1.2 = 20% zoom
                  hoverScale      : extra zoom applied only on hover
              ─────────────────────────────────────────────────────────────── */}
              {(() => {
                const objectPositionX = '50%'; // ← adjust horizontal crop
                const objectPositionY = '20%'; // ← adjust vertical crop
                const imageScale = 1.0;   // ← base zoom level
                const hoverScale = 1.06;  // ← zoom on hover (1.06 = 6% bigger)
                return (
                  <div
                    onMouseEnter={() => setFoundersHovered(true)}
                    onMouseLeave={() => setFoundersHovered(false)}
                    style={{
                      position: 'relative',
                      paddingBottom: '80%',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.4s ease, transform 0.4s ease',
                      boxShadow: foundersHovered
                        ? '0 24px 60px rgba(16, 0, 59, 1)'
                        : 'var(--shadow-lg)',
                      transform: foundersHovered ? 'translateY(-4px)' : 'translateY(0)',
                    }}
                  >
                    <Image
                      src="/sathya-founders.png"
                      alt="Our Founders"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{
                        objectFit: 'cover',
                        objectPosition: `${objectPositionX} ${objectPositionY}`,
                        transform: `scale(${foundersHovered ? hoverScale : imageScale})`,
                        transformOrigin: `${objectPositionX} ${objectPositionY}`,
                        transition: 'transform 0.5s ease',
                      }}
                    />
                  </div>
                );
              })()}
            </Parallax>
          </ScrollReveal>
          <ScrollReveal delay={300} className={styles.welcomeText}>
            <div className={styles.secLabel}>{t.ourStory}</div>
            <h2><StaggeredText text={t.welcomeH2a} el="span" /><br /><StaggeredText text={t.welcomeH2b} el="span" /></h2>
            <StaggeredText text={t.welcomeP1} el="p" className={styles.leadText} />
            <StaggeredText text={t.welcomeP2} el="p" />
            <Link href="/vision" className={styles.editorialLink}>
              {t.discoverHistory}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== MISSION Section ===== */}
      <section className={`section-padding ${styles.welcomeSection}`} style={{ paddingTop: 0 }}>
        <div className={`container ${styles.welcomeGrid}`}>
          <ScrollReveal delay={100} className={styles.welcomeText}>
            <div className={styles.secLabel}>Our Legacy</div>
            <h2><StaggeredText text="Continuing a Legacy of" el="span" /><br /><i><StaggeredText text="Faith & Service" el="span" /></i></h2>
            <StaggeredText 
              text="Following in the footsteps of Pastor Sathyanathan, Pastor Vasanth Sathyanathan continues the divine calling of serving the Lord with faith, humility, and compassion." 
              el="p" 
              className={styles.leadText} 
            />
            <StaggeredText 
              text="Through prayer, ministry, and the preaching of God's Word, he remains committed to leading souls to Christ and carrying forward a legacy of spiritual guidance and service." 
              el="p" 
            />
            <Link href="/mission" className={styles.editorialLink}>
              Discover Our Mission
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={300} className={styles.welcomeImageWrap}>
            <Parallax speed={0.15}>
              {/* ── MISSION IMAGE POSITION CONTROLS ──────────────────────────────
                  objectPositionX : move image left (0%) ↔ right (100%)
                  objectPositionY : move image up   (0%) ↔ down  (100%)
                  imageScale      : base zoom level (1.0 = no zoom)
                  hoverScale      : extra zoom applied only on hover
              ─────────────────────────────────────────────────────────────── */}
              {(() => {
                const objectPositionX = '50%'; // ← adjust horizontal crop
                const objectPositionY = '20%'; // ← adjust vertical crop
                const imageScale = 1.0;   // ← base zoom level
                const hoverScale = 1.06;  // ← zoom on hover (1.06 = 6% bigger)
                return (
                  <div
                    onMouseEnter={() => setMissionHovered(true)}
                    onMouseLeave={() => setMissionHovered(false)}
                    style={{
                      position: 'relative',
                      paddingBottom: '80%',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.4s ease, transform 0.4s ease',
                      boxShadow: missionHovered
                        ? '0 24px 60px rgba(16, 0, 59, 1)'
                        : 'var(--shadow-lg)',
                      transform: missionHovered ? 'translateY(-4px)' : 'translateY(0)',
                    }}
                  >
                    <Image
                      src="/vmain.jpeg"
                      alt="Our Mission"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{
                        objectFit: 'cover',
                        objectPosition: `${objectPositionX} ${objectPositionY}`,
                        transform: `scale(${missionHovered ? hoverScale : imageScale})`,
                        transformOrigin: `${objectPositionX} ${objectPositionY}`,
                        transition: 'transform 0.5s ease',
                      }}
                    />
                  </div>
                );
              })()}
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
            <h2 className={styles.prayerQuote}>
              <StaggeredText text={t.imgCaption} el="span" />
            </h2>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className={styles.serviceStrip}>
        <div className="container">
          <ScrollReveal delay={100}>
            <div className={`${styles.secLabel} text-center`}>{t.joinUs}</div>
            <h2 className={`text-center ${styles.sectionHeading}`}><StaggeredText text={t.serviceTimes} el="span" /> <i><StaggeredText text={t.serviceTimesI} el="span" /></i></h2>
          </ScrollReveal>
          <div className={styles.serviceGrid}>
            {[
              { h: t.sunWorship, time: '9:30', ampm: 'AM', desc: t.sunDesc, icon: <Sun size={22} strokeWidth={1.5} /> },
              { h: t.hindiService, time: '6:30', ampm: 'PM', desc: t.hindiDesc, icon: <Heart size={22} strokeWidth={1.5} /> },
              { h: t.bibleStudy, time: '6:30', ampm: 'PM', desc: t.bibleDesc, icon: <BookOpen size={22} strokeWidth={1.5} /> },
              { h: t.promiseService, time: '6:30', ampm: 'AM', desc: t.promiseDesc, icon: <Sparkles size={22} strokeWidth={1.5} /> },
              { h: 'Daily Online Meet', time: '9:00', ampm: 'PM', desc: <Link href="/online-meet" style={{ color: '#c7a760' }}>Join Everyday via Google Meet</Link>, icon: <Video size={22} strokeWidth={1.5} /> },
              { h: 'Fasting Prayer', time: '10:30', ampm: 'AM', desc: '1st Saturday of Every Month', icon: <Sun size={22} strokeWidth={1.5} /> },
              { h: 'Night Prayer', time: '10:00', ampm: 'PM', desc: '4th Friday of Every Month', icon: <Heart size={22} strokeWidth={1.5} /> },
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

            {/* View More Ministries Card */}
            <ScrollReveal delay={120 * 8} className={`${styles.serviceItem} ${styles.viewMoreWrapper}`}>
              <Link href="/ministries" className={`${styles.serviceCard} ${styles.viewMoreCard}`}>
                <div className={styles.viewMoreText}>
                  <h3>Explore All Ministries</h3>
                  <p>Discover our Kids, Youth, Womens, Mens & Old Age ministries.</p>
                </div>
                <div className={styles.viewMoreBtn}>
                  View More
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== LATEST SERMON ===== */}
      <section className={styles.latestSermonSection}>
        <div className={`container ${styles.latestSermonGrid}`}>
          <ScrollReveal delay={100} className={styles.latestSermonText}>
            <div className={styles.secLabel}>{t.latestMessage}</div>
            <h2><StaggeredText text={latestSermon?.displayTitle ?? latestSermon?.title ?? t.latestTitle} el="span" /></h2>
            <p>{latestSermon?.date || t.latestDesc}</p>
            <Link href="/sermons" className={`${styles.editorialLink} ${styles.editorialLinkLight}`}>
              {t.seeAllSermons}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={300} className={styles.latestSermonVideo}>
            <YouTubeEmbed
              videoId={latestSermon?.videoId || 'dngkoXyTIFU'}
              title={latestSermon?.displayTitle ?? latestSermon?.title ?? 'Latest sermon'}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== COMMUNITY GALLERY with hover effects ===== */}
      <section className={styles.communityBand}>
        <div className="container">
          <ScrollReveal delay={100}>
            <div className={`${styles.secLabel} text-center`}>Discover</div>
            <h2 className={`text-center ${styles.sectionHeading}`}>Our <i>Community</i></h2>
          </ScrollReveal>
        </div>
        <div className={`container ${styles.communityGrid}`}>
          {[
            { href: '/vision', src: '/community-new-1.jpg', alt: 'Church Community', label: t.about },
            { href: '/special-meeting', src: '/community-new-2.jpg', alt: 'Special Meetings', label: 'Special Meetings' },
            { href: '/ministries', src: '/community-new-3.jpg', alt: 'Youth Ministry', label: t.ministries },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={100 * (i + 1)}>
              <Link href={item.href} className={styles.communityImgWrap}>
                <Image src={item.src} alt={item.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                <div className={styles.communityOverlay}></div>
                <div className={styles.communityLabel}>
                  <span>{item.label}</span>
                  <div className={styles.communityIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </div>
                </div>
              </Link>
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
            <MagneticEffect strength={0.15}>
              <a href="https://www.youtube.com/@Pas.Vasanth?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className={`btn-primary ${styles.ytBtn}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z" /></svg>
                {t.subscribeYT}
              </a>
            </MagneticEffect>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
