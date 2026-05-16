'use client';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import styles from './vision.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggeredText from '@/components/ui/StaggeredText';
import { useLang } from '@/components/LangContext';

// ─── PHOTO CONFIG ────────────────────────────────────────────────────────────
const CAROUSEL_PHOTOS = [
  { src: '/sath.png', objectPosition: '50% 5%', scale: 1.0 }, // original
  { src: '/vision-photos/photo1.jpg', objectPosition: '50% 50%', scale: 1.0 },
  { src: '/vision-photos/photo3.jpg', objectPosition: '50% 10%', scale: 1.0 },
  { src: '/vision-photos/photo4.jpg', objectPosition: '50% 40%', scale: 1.0 },
  { src: '/vision-photos/photo5.jpg', objectPosition: '50% 40%', scale: 1.0 },
  { src: '/vision-photos/photo6.jpg', objectPosition: '50% 50%', scale: 1.0 },
  { src: '/vision-photos/photo7.jpg', objectPosition: '50% 20%', scale: 1.0 },
];

export default function About() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent(c => (c + 1) % CAROUSEL_PHOTOS.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + CAROUSEL_PHOTOS.length) % CAROUSEL_PHOTOS.length), []);

  // Auto-advance every 5000ms - Always scrolling to satisfy user request
  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="pageWrap">
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/old.jpg" alt="Vision history photo" fill style={{ objectFit: 'cover' }} />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100} variant="blurIn">
            <div className={styles.secLabel}>{t.aboutUs}</div>
            <h1>
              <StaggeredText text={t.aboutH1a} el="span" /> 
              <i><StaggeredText text={t.aboutH1b} el="span" /></i> 
              <StaggeredText text={t.aboutH1c} el="span" />
            </h1>
            <p className={styles.headerSubtext}>{t.aboutSub}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section-padding ${styles.contentSection} pres-band-soft pres-rail`}>
        <div className={`container ${styles.aboutGrid}`}>
          <ScrollReveal delay={200} variant="fadeRight" className={styles.mainText}>
            <h2><StaggeredText text={t.legacyTitle} el="span" /></h2>

            <div className={styles.leadText}>
              <StaggeredText text="The foundation of this Trinity Prayer House Ministries was laid by Rev. Davy Sathyanathan Adhisayaraj, who built it through fasting, prayer, and with the sacrifice of his blood, sweat, and tears. Standing firmly beside him in this vision was his wife, Mrs. Chandra Sathyanathan. Rev. Davy Sathyanathan Adhisayaraj was born as the third child among seven children to Aaron and Grace, who belonged to the Tamil Nadu Native Lutheran Church." />
            </div>
            <StaggeredText text="In Coimbatore, a city known for its many industries that generate wealth and livelihood, he shut down his lathe workshop — which had been the source of income for his family — in obedience to the voice of the Lord, and dedicated himself fully to God's ministry. On January 1, 1975, during an annual family prayer gathering held in Madukkarai, while singing the hymn 'The Holy One is in Our Midst,' he heard a voice asking: 'Is there holiness in your life as you sing this song?' Everyone in the room was deeply convicted, confessed their sins, wept, and prayed. Even without fully understanding these experiences, they received anointing and spiritual joy." />
            
            <StaggeredText text="In July 1975, after being baptized in Vellore, North Arcot district, he decided to spend five days in prayer before returning. On the fifth day, he was spiritually led by the hand of the Lord to a hill in Madukkarai, where he was told: 'Do ministry in this place.'" />
            
            <h2 style={{ marginTop: '2rem' }}><StaggeredText text="Trinity Prayer House Ministry" el="span" /></h2>
            <StaggeredText text="In 1976, he rented a house in the exact location shown to him in the vision at Madukkarai and began the ministry. In 1980, by God's grace, he purchased the same land he had seen in the vision — 40 cents of land — and within 40 days, a church building was constructed and completed through faith." />
            
            <StaggeredText text="From 1975 to 1995, for twenty years, Rev. Davy Sathyanathan Adhisayaraj served as Church Pastor, Convention Speaker, Speakers' Conference Preacher, Coimbatore Pentecostal Unity Secretary, and Vice President. Because of his deep knowledge of Scripture, many called him a 'Walking Bible University.' As evidence of his holy life and sincere ministry, he had written in his own Bible that he would serve in ministry for only 20 years, and afterward enter the Kingdom of God. Exactly according to this, on May 27, 1995, he entered God's Kingdom." />
          </ScrollReveal>

          <ScrollReveal delay={320} variant="fadeLeft" className={styles.sideContent}>
            {/* ── Photo Carousel ── */}
            <div className={styles.pastorCard}>
              <div className={styles.pastorImageWrap} style={{ position: 'relative' }}>
                {CAROUSEL_PHOTOS.map((photo, i) => (
                  <div
                    key={photo.src}
                    style={{
                      position: 'absolute', inset: 0,
                      opacity: i === current ? 1 : 0,
                      transition: 'opacity 0.8s ease',
                      pointerEvents: i === current ? 'auto' : 'none',
                      transform: `scale(${photo.scale})`,
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={`Photo ${i + 1}`}
                      fill
                      style={{ objectFit: 'cover', objectPosition: photo.objectPosition }}
                      priority={i === 0}
                    />
                  </div>
                ))}

                <button
                  onClick={prev}
                  aria-label="Previous photo"
                  style={{
                    position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                    zIndex: 10, background: 'rgba(0,0,0,0.2)',
                    border: 'none', padding: '12px 8px', borderRadius: '4px',
                    cursor: 'pointer', lineHeight: 0,
                  }}
                >
                  <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
                    <polyline points="11,2 3,12 11,22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button
                  onClick={next}
                  aria-label="Next photo"
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    zIndex: 10, background: 'rgba(0,0,0,0.2)',
                    border: 'none', padding: '12px 8px', borderRadius: '4px',
                    cursor: 'pointer', lineHeight: 0,
                  }}
                >
                  <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
                    <polyline points="3,2 11,12 3,22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div style={{
                  position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
                  display: 'flex', gap: 6, zIndex: 10,
                }}>
                  {CAROUSEL_PHOTOS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      aria-label={`Go to photo ${i + 1}`}
                      style={{
                        width: i === current ? 18 : 7, height: 7,
                        borderRadius: 4, border: 'none',
                        background: i === current ? '#fff' : 'rgba(255,255,255,0.45)',
                        cursor: 'pointer', padding: 0,
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.pastorInfo}>
                <div className={styles.secLabel}>Late Founder</div>
                <h3>Pastor Davy Sathyanathan</h3>
                <p>{t.pastorDesc}</p>
              </div>
            </div>

            <div className={styles.quoteBlock}>
              <h3>&ldquo;<StaggeredText text="He lived not for worldly comfort, but for the purpose God had placed upon his life." el="span" />&rdquo;</h3>
            </div>
            <div className={styles.coreValues}>
              <div className={styles.valueItem}>
                <h3>His Character</h3>
                <StaggeredText text="Always seen burning with the presence of the Lord and the fire of the Holy Spirit — deeply loving, yet extremely strict in spiritual matters." />
              </div>
              <div className={styles.valueItem}>
                <h3>His Compassion</h3>
                <StaggeredText text="He had extraordinary compassion for the poor and continually helped those in need. During his ministry, he baptized at least 500 relatives, in addition to many church believers." />
              </div>
              <div className={styles.valueItem}>
                <h3>His Vision</h3>
                <StaggeredText text="His enduring vision was to bring comfort, care, and hope to the lives of the orphaned and the destitute through Christ's love." />
              </div>
              <div className={styles.valueItem}>
                <h3>His Journey</h3>
                <StaggeredText text="Like the apostles, he travelled extensively in service of the Gospel, carrying God's message wherever he was called." />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
