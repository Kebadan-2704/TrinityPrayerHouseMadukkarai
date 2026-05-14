'use client';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import styles from './vision.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useLang } from '@/components/LangContext';

// ─── PHOTO CONFIG ────────────────────────────────────────────────────────────
// Edit objectPosition to fine-tune how each photo is cropped inside the frame.
// Format: 'X% Y%'  — X: left(0%) → right(100%), Y: top(0%) → bottom(100%)
// scale: 1.0 = normal fit | 1.3 = 30% zoom | 1.6 = 60% zoom, etc.
const CAROUSEL_PHOTOS = [
  { src: '/sath.png', objectPosition: '50% 5%', scale: 1.0 }, // original
  { src: '/vision-photos/photo1.jpg', objectPosition: '50% 50%', scale: 1.0 },
  { src: '/vision-photos/photo3.jpg', objectPosition: '50% 10%', scale: 1.0 },
  { src: '/vision-photos/photo4.jpg', objectPosition: '50% 40%', scale: 1.0 },
  { src: '/vision-photos/photo5.jpg', objectPosition: '50% 40%', scale: 1.0 },
  { src: '/vision-photos/photo6.jpg', objectPosition: '50% 50%', scale: 1.0 },
  { src: '/vision-photos/photo7.jpg', objectPosition: '50% 20%', scale: 1.0 },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function About() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [hovering, setHovering] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % CAROUSEL_PHOTOS.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + CAROUSEL_PHOTOS.length) % CAROUSEL_PHOTOS.length), []);

  // Auto-advance every 5000ms, pauses while hovering
  useEffect(() => {
    if (hovering) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [hovering, next]);

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

            <p className={styles.leadText}>
              The foundation of this Trinity Prayer House Ministries was laid by Rev. Davy Sathyanathan Adhisayaraj,
              who built it through fasting, prayer, and with the sacrifice of his blood, sweat, and tears.
              Standing firmly beside him in this vision was his wife, Mrs. Chandra Sathyanathan.
              Rev. Davy Sathyanathan Adhisayaraj was born as the third child among seven children to Aaron and Grace,
              who belonged to the Tamil Nadu Native Lutheran Church.
            </p>
            <p>
              In Coimbatore, a city known for its many industries that generate wealth and livelihood, he shut down
              his lathe workshop &mdash; which had been the source of income for his family &mdash; in obedience to the voice
              of the Lord, and dedicated himself fully to God&apos;s ministry.
              On January 1, 1975, during an annual family prayer gathering held in Madukkarai, while singing the
              hymn <em>&ldquo;The Holy One is in Our Midst,&rdquo;</em> he heard a voice asking:
              &ldquo;<em>Is there holiness in your life as you sing this song?</em>&rdquo; Everyone in the room
              was deeply convicted, confessed their sins, wept, and prayed. Even without fully understanding these
              experiences, they received anointing and spiritual joy.
            </p>
            <p>
              In July 1975, after being baptized in Vellore, North Arcot district, he decided to spend five days
              in prayer before returning. On the fifth day, he was spiritually led by the hand of the Lord to a
              hill in Madukkarai, where he was told: &ldquo;<em>Do ministry in this place.</em>&rdquo;
            </p>
            <h2 style={{ marginTop: '2rem' }}>Trinity Prayer House Ministry</h2>
            <p>
              In 1976, he rented a house in the exact location shown to him in the vision at Madukkarai and began
              the ministry. In 1980, by God&apos;s grace, he purchased the same land he had seen in the vision &mdash;
              40 cents of land &mdash; and within 40 days, a church building was constructed and completed through faith.
            </p>
            <p>
              From 1975 to 1995, for twenty years, Rev. Davy Sathyanathan Adhisayaraj served as Church Pastor,
              Convention Speaker, Speakers&apos; Conference Preacher, Coimbatore Pentecostal Unity Secretary,
              and Vice President. Because of his deep knowledge of Scripture, many called him a
              &ldquo;<em><strong>Walking Bible University.</strong></em>&rdquo;
              As evidence of his holy life and sincere ministry, he had written in his own Bible that he would
              serve in ministry for only 20 years, and afterward enter the Kingdom of God. Exactly according to
              this, on <strong>May 27, 1995</strong>, he entered God&apos;s Kingdom.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={320} variant="fadeLeft" className={styles.sideContent}>
            {/* ── Photo Carousel ── */}
            <div className={styles.pastorCard}>
              <div
                className={styles.pastorImageWrap}
                style={{ position: 'relative' }}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                {/* Slides */}
                {CAROUSEL_PHOTOS.map((photo, i) => (
                  <div
                    key={photo.src}
                    style={{
                      position: 'absolute', inset: 0,
                      opacity: i === current ? 1 : 0,
                      transition: 'opacity 0.6s ease',
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

                {/* Prev arrow — visible only on hover */}
                <button
                  onClick={prev}
                  aria-label="Previous photo"
                  style={{
                    position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                    zIndex: 10, background: 'transparent',
                    border: 'none', padding: 8,
                    cursor: 'pointer', lineHeight: 0,
                    filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))',
                    opacity: hovering ? 1 : 0,
                    transition: 'opacity 0.25s ease',
                    pointerEvents: hovering ? 'auto' : 'none',
                  }}
                >
                  <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
                    <polyline points="11,2 3,12 11,22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Next arrow — visible only on hover */}
                <button
                  onClick={next}
                  aria-label="Next photo"
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    zIndex: 10, background: 'transparent',
                    border: 'none', padding: 8,
                    cursor: 'pointer', lineHeight: 0,
                    filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))',
                    opacity: hovering ? 1 : 0,
                    transition: 'opacity 0.25s ease',
                    pointerEvents: hovering ? 'auto' : 'none',
                  }}
                >
                  <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
                    <polyline points="3,2 11,12 3,22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Dot indicators */}
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
                <h3>Pastor Sathyanathan</h3>
                <p>{t.pastorDesc}</p>
              </div>
            </div>

            <div className={styles.quoteBlock}>
              <h3>&ldquo;He lived not for worldly comfort, but for the purpose God had placed upon his life.&rdquo;</h3>
            </div>
            <div className={styles.coreValues}>
              <div className={styles.valueItem}>
                <h3>His Character</h3>
                <p>Always seen burning with the presence of the Lord and the fire of the Holy Spirit &mdash; deeply loving, yet extremely strict in spiritual matters.</p>
              </div>
              <div className={styles.valueItem}>
                <h3>His Compassion</h3>
                <p>He had extraordinary compassion for the poor and continually helped those in need. During his ministry, he baptized at least 500 relatives, in addition to many church believers.</p>
              </div>
              <div className={styles.valueItem}>
                <h3>His Vision</h3>
                <p>His enduring vision was to bring comfort, care, and hope to the lives of the orphaned and the destitute through Christ&apos;s love.</p>
              </div>
              <div className={styles.valueItem}>
                <h3>His Journey</h3>
                <p>Like the apostles, he travelled extensively in service of the Gospel, carrying God&apos;s message wherever he was called.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>


    </div>
  );
}
