'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import dynamic from 'next/dynamic';
import CinematicHeroBackdrop from '@/components/ui/CinematicHeroBackdrop';
import FloatingParticles from '@/components/ui/FloatingParticles';
import MagneticEffect from '@/components/ui/MagneticEffect';
import StaggeredText from '@/components/ui/StaggeredText';
import { Sun, Heart, BookOpen, Sparkles, Video } from 'lucide-react';
import { useLang } from '@/components/LangContext';

// Below-fold heavy interactive components — dynamically import them to reduce initial JS
const ScrollReveal = dynamic(() => import('@/components/ui/ScrollReveal'), { ssr: true });
const Counter = dynamic(() => import('@/components/ui/Counter'), { ssr: false });
const Parallax = dynamic(() => import('@/components/ui/Parallax'), { ssr: true });

const YouTubeEmbed = dynamic(() => import('@/components/ui/YouTubeEmbed'), { ssr: false });

const heroImages = [
  '/hero-bg.jpg',
  '/slide-2.webp',
  '/slide-3.webp',
  '/slide-4.jpg',
  '/slide-5.webp'
];

const localTranslations = {
  en: {
    ourLegacy: 'Our Legacy',
    legacyTitle: 'Continuing a Legacy of',
    legacyTitleI: 'Faith & Service',
    legacyP1: "Following in the footsteps of Pastor Dowy Sathyanathan, Pastor Vasanth Sathyanathan continues the divine calling of serving the Lord with faith, humility, and compassion.",
    legacyP2: "Through prayer, ministry, and the preaching of God's Word, he remains committed to leading souls to Christ and carrying forward a legacy of spiritual guidance and service.",
    discoverOurMission: 'Discover Our Mission',
    dailyMeet: 'Daily Online Meet',
    dailyMeetDesc: 'Join Everyday via Google Meet',
    fastingPrayer: 'Fasting Prayer',
    fastingPrayerDesc: '1st Saturday of Every Month',
    nightPrayer: 'Night Prayer',
    nightPrayerDesc: '4th Friday of Every Month',
    exploreAllMin: 'Explore All Ministries',
    exploreAllMinDesc: 'Discover our Kids, Youth, Womens, Mens & Old Age ministries.',
    viewMore: 'View More',
    discover: 'Discover',
    ourCommunity: 'Our',
    ourCommunityI: 'Community',
    specialMeetings: 'Special Meetings',
    ourFamily: 'Our Family',
    familyTitle: 'United in',
    familyTitleI: 'Faith & Purpose',
    familyP1: "Our family is dedicated to serving the Lord and our community with unwavering devotion and love.",
    familyP2: "Together, we strive to reflect Christ's teachings in everything we do, welcoming all to join our spiritual journey.",
  },
  ta: {
    ourLegacy: 'எங்கள் பாரம்பரியம்',
    legacyTitle: 'தொடரும் பாரம்பரியம்',
    legacyTitleI: 'விசுவாசம் & சேவை',
    legacyP1: "போதகர் டேவி சத்தியநாதன் அவர்களின் அடியொற்றி, போதகர் வசந்த் சத்தியநாதன் அவர்கள் விசுவாசம், தாழ்மை மற்றும் இரக்கத்துடன் கர்த்தருக்கு சேவை செய்யும் தெய்வீக அழைப்பைத் தொடர்கிறார்.",
    legacyP2: "ஜெபங்கள், ஊழியங்கள் மற்றும் தேவனுடைய வார்த்தையைப் பிரசங்கிப்பதன் மூலம், அவர் ஆத்துமாக்களை கிறிஸ்துவிடம் வழிநடத்தவும், ஆவிக்குரிய வழிகாட்டுதல் மற்றும் சேவையின் பாரம்பரியத்தை முன்னோக்கி கொண்டு செல்லவும் அர்ப்பணிப்புடன் இருக்கிறார்.",
    discoverOurMission: 'எங்கள் பணியைக் கண்டறியுங்கள்',
    dailyMeet: 'தினசரி ஆன்லைன் கூட்டம்',
    dailyMeetDesc: 'ஒவ்வொரு நாளும் கூகுள் மீட் வழியாக இணையுங்கள்',
    fastingPrayer: 'உபவாச ஜெபம்',
    fastingPrayerDesc: 'ஒவ்வொரு மாதமும் முதல் சனிக்கிழமை',
    nightPrayer: 'இரவு ஜெபம்',
    nightPrayerDesc: 'ஒவ்வொரு மாதமும் 4-வது வெள்ளிக்கிழமை',
    exploreAllMin: 'எல்லா ஊழியங்களையும் ஆராயுங்கள்',
    exploreAllMinDesc: 'எங்கள் குழந்தைகள், இளைஞர்கள், பெண்கள், ஆண்கள் மற்றும் முதியோர் இல்ல ஊழியங்களைக் கண்டறியுங்கள்.',
    viewMore: 'மேலும் பார்க்க',
    discover: 'கண்டறியுங்கள்',
    ourCommunity: 'எங்கள்',
    ourCommunityI: 'சமூகம்',
    specialMeetings: 'சிறப்பு கூட்டங்கள்',
    ourFamily: 'எங்கள் குடும்பம்',
    familyTitle: 'ஒன்றிணைந்து',
    familyTitleI: 'விசுவாசம் & நோக்கம்',
    familyP1: "எங்கள் குடும்பம் கர்த்தருக்கும் எங்கள் சமூகத்திற்கும் அசைக்க முடியாத பக்தியுடனும் அன்புடனும் சேவை செய்ய அர்ப்பணித்துள்ளது.",
    familyP2: "ஒன்றாக, நாங்கள் செய்யும் அனைத்திலும் கிறிஸ்துவின் போதனைகளைப் பிரதிபலிக்க முயல்கிறோம், எங்கள் ஆன்மீக பயணத்தில் சேர அனைவரையும் வரவேற்கிறோம்.",
  },
  hi: {
    ourLegacy: 'हमारी विरासत',
    legacyTitle: 'एक विरासत को जारी रखना',
    legacyTitleI: 'विश्वास और सेवा',
    legacyP1: "पादरी डेवी सत्यनाथन के पदचिह्नों पर चलते हुए, पादरी वसंत सत्यनाथन विश्वास, नम्रता और करुणा के साथ प्रभु की सेवा करने की दिव्य बुलाहट को जारी रखे हुए हैं।",
    legacyP2: "प्रार्थना, सेवकाई और परमेश्वर के वचन के प्रचार के माध्यम से, वे आत्माओं को मसीह के पास ले जाने और आध्यात्मिक मार्गदर्शन और सेवा की विरासत को आगे बढ़ाने के लिए प्रतिबद्ध हैं।",
    discoverOurMission: 'हमारे मिशन की खोज करें',
    dailyMeet: 'दैनिक ऑनलाइन मीट',
    dailyMeetDesc: 'Google Meet के माध्यम से प्रतिदिन जुड़ें',
    fastingPrayer: 'उपवास प्रार्थना',
    fastingPrayerDesc: 'हर महीने का पहला शनिवार',
    nightPrayer: 'रात्रि प्रार्थना',
    nightPrayerDesc: 'हर महीने का चौथा शुक्रवार',
    exploreAllMin: 'सभी सेवकाइयों का अन्वेषण करें',
    exploreAllMinDesc: 'हमारे बच्चों, युवाओं, महिलाओं, पुरुषों और वृद्धाश्रम सेवकाइयों की खोज करें।',
    viewMore: 'अधिक देखें',
    discover: 'खोजें',
    ourCommunity: 'हमारा',
    ourCommunityI: 'समुदाय',
    specialMeetings: 'विशेष बैठकें',
    ourFamily: 'हमारा परिवार',
    familyTitle: 'एकजुट',
    familyTitleI: 'विश्वास और उद्देश्य में',
    familyP1: "हमारा परिवार अटूट भक्ति और प्रेम के साथ प्रभु और हमारे समुदाय की सेवा करने के लिए समर्पित है।",
    familyP2: "हम सब मिलकर, जो कुछ भी करते हैं उसमें मसीह की शिक्षाओं को प्रतिबिंबित करने का प्रयास करते हैं, और सभी को हमारी आध्यात्मिक यात्रा में शामिल होने के लिए स्वागत करते हैं।",
  }
};

export default function HomeClient({ initialLatestSermon }: { initialLatestSermon?: any }) {
  const { t, lang } = useLang();
  const content = localTranslations[lang as keyof typeof localTranslations] || localTranslations.en;
  
  // Use SSR data directly, eliminating the client-side data waterfall
  const [latestSermon] = useState(initialLatestSermon || null);

  const [foundersHovered, setFoundersHovered] = useState(false);
  const [missionHovered, setMissionHovered] = useState(false);
  const [familyHovered, setFamilyHovered] = useState(false);

  return (
    <>
      {/* ===== HERO with Particles ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <CinematicHeroBackdrop
            images={heroImages}
          />

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
              {(() => {
                const objectPositionX = '50%';
                const objectPositionY = '20%';
                const imageScale = 1.0;
                const hoverScale = 1.06;
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
            <div className={styles.secLabel}>{content.ourLegacy}</div>
            <h2><StaggeredText text={content.legacyTitle} el="span" /><br /><i><StaggeredText text={content.legacyTitleI} el="span" /></i></h2>
            <StaggeredText 
              text={content.legacyP1} 
              el="p" 
              className={styles.leadText} 
            />
            <StaggeredText 
              text={content.legacyP2} 
              el="p" 
            />
            <Link href="/mission" className={styles.editorialLink}>
              {content.discoverOurMission}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={300} className={styles.welcomeImageWrap}>
            <Parallax speed={0.15}>
              {(() => {
                const objectPositionX = '50%';
                const objectPositionY = '20%';
                const imageScale = 1.0;
                const hoverScale = 1.06;
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

      {/* ===== FAMILY Section ===== */}
      <section className={`section-padding ${styles.welcomeSection}`} style={{ paddingTop: 0 }}>
        <div className={`container ${styles.welcomeGrid}`}>
          <ScrollReveal delay={100} className={styles.welcomeImageWrap}>
            <Parallax speed={0.15}>
              {(() => {
                const objectPositionX = '50%';
                const objectPositionY = '20%';
                const imageScale = 1.0;
                const hoverScale = 1.06;
                return (
                  <div
                    onMouseEnter={() => setFamilyHovered(true)}
                    onMouseLeave={() => setFamilyHovered(false)}
                    style={{
                      position: 'relative',
                      paddingBottom: '80%',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.4s ease, transform 0.4s ease',
                      boxShadow: familyHovered
                        ? '0 24px 60px rgba(16, 0, 59, 1)'
                        : 'var(--shadow-lg)',
                      transform: familyHovered ? 'translateY(-4px)' : 'translateY(0)',
                    }}
                  >
                    <Image
                      src="/Family Pic.jpeg"
                      alt="Our Family"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{
                        objectFit: 'cover',
                        objectPosition: `${objectPositionX} ${objectPositionY}`,
                        transform: `scale(${familyHovered ? hoverScale : imageScale})`,
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
            <div className={styles.secLabel}>{content.ourFamily}</div>
            <h2><StaggeredText text={content.familyTitle} el="span" /><br /><i><StaggeredText text={content.familyTitleI} el="span" /></i></h2>
            <StaggeredText 
              text={content.familyP1} 
              el="p" 
              className={styles.leadText} 
            />
            <StaggeredText 
              text={content.familyP2} 
              el="p" 
            />
            <Link href="/mission" className={styles.editorialLink}>
              {content.discoverOurMission}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PRAYER BAND with Parallax ===== */}
      <section className={styles.prayerBand}>
        <div className={styles.prayerBgWrap}>
          <Image src="/prayer.webp" alt="" fill style={{ objectFit: 'cover' }} sizes="100vw" loading="lazy" />
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
              { h: content.dailyMeet, time: '9:00', ampm: 'PM', desc: <Link href="/online-meet" style={{ color: '#c7a760' }}>{content.dailyMeetDesc}</Link>, icon: <Video size={22} strokeWidth={1.5} /> },
              { h: content.fastingPrayer, time: '10:30', ampm: 'AM', desc: content.fastingPrayerDesc, icon: <Sun size={22} strokeWidth={1.5} /> },
              { h: content.nightPrayer, time: '10:00', ampm: 'PM', desc: content.nightPrayerDesc, icon: <Heart size={22} strokeWidth={1.5} /> },
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

            <ScrollReveal delay={120 * 8} className={`${styles.serviceItem} ${styles.viewMoreWrapper}`}>
              <Link href="/ministries" className={`${styles.serviceCard} ${styles.viewMoreCard}`}>
                <div className={styles.viewMoreText}>
                  <h3>{content.exploreAllMin}</h3>
                  <p>{content.exploreAllMinDesc}</p>
                </div>
                <div className={styles.viewMoreBtn}>
                  {content.viewMore}
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

      {/* ===== COMMUNITY GALLERY ===== */}
      <section className={styles.communityBand}>
        <div className="container">
          <ScrollReveal delay={100}>
            <div className={`${styles.secLabel} text-center`}>{content.discover}</div>
            <h2 className={`text-center ${styles.sectionHeading}`}>{content.ourCommunity} <i>{content.ourCommunityI}</i></h2>
          </ScrollReveal>
        </div>
        <div className={`container ${styles.communityGrid}`}>
          {[
            { href: '/vision', src: '/community-new-1.jpg', alt: 'Church Community', label: t.about },
            { href: '/special-meeting', src: '/community-new-2.jpg', alt: 'Special Meetings', label: content.specialMeetings },
            { href: '/ministries', src: '/community-new-3.jpg', alt: 'Youth Ministry', label: t.ministries },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={100 * (i + 1)}>
              <Link href={item.href} className={styles.communityImgWrap}>
                <Image src={item.src} alt={item.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
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

      {/* ===== YOUTUBE CTA ===== */}
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
