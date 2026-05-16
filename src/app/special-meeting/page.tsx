'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './special-meeting.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggeredText from '@/components/ui/StaggeredText';
import Image from 'next/image';

const driveImage = (id: string) => `https://drive.google.com/uc?export=view&id=${id}`;

// ── Meeting data — add more photos as arrays, one entry per meeting ──
type MeetingSession = {
  label: string;
  ytId: string;
  description: string;
};

type Meeting = {
  id: number;
  title: string;
  ytId?: string;
  description?: string;
  photos: string[];
  sessions?: MeetingSession[];
  photoDisplay?: 'stack' | 'single-card';
};

const meetings: Meeting[] = [
  {
    id: 1,
    title: '50th Year of Vision Day Thanksgiving Service',
    ytId: 'sHjLhuEItM0',
    description: 'A landmark celebration marking 50 years since the Lord first gave Rev. Davy Sathyanathan Adhisayaraj the vision for this ministry. The congregation gathered in heartfelt thanksgiving, remembering God\'s faithfulness across five decades of ministry at the foothill of Madukkarai.',
    photos: [
      '/special-meetings/meeting1/photo1.jpg',
      '/special-meetings/meeting1/photo2.jpg',
      '/special-meetings/meeting1/photo3.jpg',
      '/special-meetings/meeting1/photo5.jpg',
      '/special-meetings/meeting1/photo6.jpg',
      '/special-meetings/meeting1/photo7.jpg',
    ],
  },
  {
    id: 2,
    title: 'Maraven Live Praise & Worship',
    ytId: 'bwTC3XHRVxo',
    description: 'An electrifying evening of live praise and worship that drew the presence of God in a powerful way. Hearts were lifted in adoration as the congregation experienced the joy and freedom found only in sincere worship.',
    photos: [
      '/special-meetings/meeting2/photo1.jpg',
      '/special-meetings/meeting2/photo2.jpg',
      '/special-meetings/meeting2/photo3.jpg',
      '/special-meetings/meeting2/photo4.jpg',
      '/special-meetings/meeting2/photo5.jpg',
      '/special-meetings/meeting2/photo6.jpg',
      '/special-meetings/meeting2/photo7.jpg',
      '/special-meetings/meeting2/photo8.jpg',
      '/special-meetings/meeting2/photo9.jpg',
    ],
  },
  {
    id: 3,
    title: 'Revival Word And Worship Night',
    ytId: 'auok0w_qM-E',
    description: 'A night set apart for revival — a blend of anointed preaching and Spirit-led worship that stirred the hearts of all who gathered. Testimonies of renewal and rededication marked this special evening.',
    photos: [
      driveImage('1IU5Gc8pKdeNG2peC9KW1oUSKiPnDvPHR'),
      driveImage('1hTMO4BD9qt2jvLW9noDxi1X081S2Rfqg'),
      driveImage('15ZD_jsKYbdKD3w9PtaDxtfmihGysEWGk'),
      driveImage('1THq89Om9580INzlx6_GUFixw_XzPQ9tU'),
      driveImage('14yoaM7OctvMyJ98iWQyov57WPE328LeI'),
      driveImage('1NBOp_bQMk3k7Isa89Ohvl7pRqJz7ryzR'),
      driveImage('1Q0TBRZgWP13A4EtnNMu0kjoy7XHffZk6'),
    ],
  },
  {
    id: 4,
    title: 'Pentecostal Festival and Special Sunday Service with Pas.Davidsam Joyson',
    photos: [
      '/community-new-2.jpg',
      '/community-new-2.jpg',
      '/community-new-2.jpg',
      '/community-new-2.jpg',
    ],
    sessions: [
      {
        label: 'Pentecostal Festival',
        ytId: 'I9W7UTpLKXw',
        description: 'A Spirit-filled Pentecostal Festival service celebrating the power and presence of the Holy Spirit. The congregation gathered with expectation, worshipping with joy and receiving a timely word that called hearts toward renewal, unity, and bold faith.',
      },
      {
        label: 'Special Sunday Service',
        ytId: 'pUUAzPA6Q8c',
        description: 'Pastor Davidsam Joyson ministered in a special Sunday service marked by heartfelt worship and practical encouragement from God\'s Word. The message strengthened believers to walk with fresh devotion and trust the Lord for His work in every season.',
      },
    ],
  },
  {
    id: 5,
    title: 'Revival Word & Worship By Pas. Joel Thomasraj',
    ytId: '7nuz6nZYsQI',
    description: 'Pastor Joel Thomasraj ministered with clarity and conviction, bringing a timely word of revival. The service was marked by deep conviction, prayer, and a renewed passion for God\'s presence among the congregation.',
    photos: [
      driveImage('1zpqbRrMaauIgVzLhrTumsN46PlojySQ3'),
      driveImage('1CboiacQJuS4FmQ-dFZbzMO0Kq5bTMg5M'),
    ],
  },
  {
    id: 6,
    title: 'Special Prophetic Revival and Palm Sunday with Prophet Aaron Vinoth.',
    photos: [
      driveImage('1oCKlPdAgzT69gqS9iTt5njHqHB7QA_jA'),
      driveImage('148of4-gR9X4TMQuy7BbptG1sd6WuJQO1'),
    ],
    sessions: [
      {
        label: 'Prophetic Revival',
        ytId: 'OGG6IRLEPpk',
        description: 'A prophetic gathering where the voice of the Lord was heard through His servants. The meeting brought direction, encouragement, and fresh fire to the believers, with many experiencing personal breakthrough.',
      },
      {
        label: 'Palm Sunday',
        ytId: 'VfxL550hYNg',
        description: 'Commemorating the triumphal entry of Jesus into Jerusalem, this Palm Sunday service was a joyful celebration of the King of kings. The congregation worshipped together in anticipation of the resurrection victory.',
      },
    ],
  },
  {
    id: 7,
    title: 'BreakThrough Worship Night',
    ytId: 'K9wxb_oXWsw',
    description: 'An intense night of worship and intercession where chains were broken and burdens lifted. Believers pressed in together in prayer, believing God for personal and corporate breakthroughs in every area of life.',
    photos: [
      driveImage('1jR_BORM_3gCLHoB8Zt97Y7hMjIioCW3b'),
      driveImage('1iE0lVpDWhBN9xQijL1q1lQycMSEAShFz'),
      driveImage('1SVuByL7jUYYiYIT5zvyFsCpDovou73cH'),
    ],
  },
  {
    id: 8,
    title: 'Family Blessing Retreat 2024',
    photos: [
      '/community-new-2.jpg',
      '/community-new-2.jpg',
      '/community-new-2.jpg',
      '/community-new-2.jpg',
    ],
    sessions: [
      {
        label: 'Morning Session',
        ytId: '3OqCpiM75s0',
        description: 'The morning session of Family Blessing Retreat 2024 opened with worship, prayer, and a focused word for homes and families. It invited every family to seek God together, receive His guidance, and build their lives on faith, love, and obedience.',
      },
      {
        label: 'Evening Session',
        ytId: 'PT93qTlPPjo',
        description: 'The evening session carried the retreat into a deeper time of reflection, commitment, and blessing. Families were encouraged to surrender their needs to the Lord, strengthen their relationships, and trust Him for peace, healing, and lasting fruit.',
      },
    ],
  },
  {
    id: 9,
    title: 'Prayer Month Special Meeting Day-1&2 with EVG K.A Abraham',
    photos: [
      driveImage('1YtmVIK0iInG_xLz8OTIDeEMKJkEj68-0'),
      driveImage('1t1DP7JR2Rmqp0uq8rO38hMBpRLGG2KBz'),
      driveImage('190R0n5Td41sxLqlOpnek36_BuUPujJdh'),
      driveImage('1KwlgZZSqn3Rbz-YW_0hmWgUPpPQEyY2T'),
      driveImage('13SkaGroRwTVdl14WOX9CloNGVFNHt9gx'),
    ],
    sessions: [
      {
        label: 'Day 1',
        ytId: 'DNnbwlOfDC0',
        description: 'The first day of the Prayer Month series with Evangelist K.A. Abraham set a strong foundation of intercession and faith. The evening was filled with powerful prayers, declarations, and a stirring of the Holy Spirit across the congregation.',
      },
      {
        label: 'Day 2',
        ytId: 'oNbbb_cyMvE',
        description: 'Continuing the Prayer Month series, Day 2 with Evangelist K.A. Abraham saw an even deeper move of the Spirit. The prayers intensified and many reported experiencing healing, deliverance, and a fresh filling of the Holy Spirit.',
      },
    ],
  },
];



import PhotoCarousel from '@/components/ui/PhotoCarousel';

const DEFAULT_GALLERY_WIDTH = 960;

function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(DEFAULT_GALLERY_WIDTH);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const updateWidth = () => {
      setWidth(node.getBoundingClientRect().width || DEFAULT_GALLERY_WIDTH);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return [ref, width] as const;
}

function getGalleryMetrics(width: number, photoCount: number) {
  const safeWidth = Math.max(width || DEFAULT_GALLERY_WIDTH, 280);
  const isCompact = safeWidth < 700;
  const columns = isCompact ? 1 : 3;
  const gap = isCompact ? 14 : 16;
  const gridCardWidth = (safeWidth - gap * (columns - 1)) / columns;
  const rows = Math.ceil(photoCount / columns);
  const expandedHeight = rows * (gridCardWidth * 0.75) + Math.max(rows - 1, 0) * gap;
  const fanCardWidth = isCompact
    ? Math.min(Math.max(safeWidth * 0.42, 146), 165)
    : Math.min(Math.max(safeWidth * 0.24, 230), 300);
  const collapsedHeight = fanCardWidth * 1.4 + (isCompact ? 64 : 82);

  return {
    gap,
    fanCardWidth,
    height: {
      collapsed: collapsedHeight,
      expanded: expandedHeight,
    },
  };
}

function getFanPose(index: number, count: number, width: number) {
  const safeWidth = Math.max(width || DEFAULT_GALLERY_WIDTH, 280);
  const isCompact = safeWidth < 700;
  const center = (count - 1) / 2;
  const offset = index - center;
  const fanCardWidth = isCompact
    ? Math.min(Math.max(safeWidth * 0.42, 146), 165)
    : Math.min(Math.max(safeWidth * 0.24, 230), 300);
  const baseSpread = isCompact
    ? Math.min(Math.max(safeWidth * 0.075, 24), 30)
    : Math.min(Math.max(safeWidth * 0.075, 58), 86);
  const spreadLimit = (safeWidth - fanCardWidth * (isCompact ? 1.18 : 0.92)) / Math.max(count - 1, 1);
  const spread = Math.max(16, Math.min(baseSpread, spreadLimit));
  const lift = Math.abs(offset) * (isCompact ? 7 : 11);

  return {
    x: offset * spread,
    y: lift + (offset > 0 ? 4 : 0),
    rotate: offset * (isCompact ? 5.4 : 6.2),
    scale: 1 - Math.abs(offset) * 0.018,
  };
}

function PhotoStackGallery({ photos, title }: { photos: string[]; title: string }) {
  const [expanded, setExpanded] = useState(false);
  const [galleryRef, width] = useElementWidth<HTMLDivElement>();
  const reduceMotion = useReducedMotion();
  const metrics = useMemo(() => getGalleryMetrics(width, photos.length), [photos.length, width]);

  const galleryStyle = {
    '--stack-card-width': `${metrics.fanCardWidth}px`,
    '--stack-gap': `${metrics.gap}px`,
  } as CSSProperties;

  const transition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 92, damping: 18, mass: 0.95 };

  const toggleGallery = () => setExpanded(value => !value);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggleGallery();
  };

  return (
    <motion.div
      ref={galleryRef}
      className={styles.photoGalleryShell}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={expanded ? `Collapse ${title} photo gallery` : `Expand ${title} photo gallery`}
      onClick={toggleGallery}
      onKeyDown={handleKeyDown}
      animate={{ height: expanded ? metrics.height.expanded : metrics.height.collapsed }}
      transition={transition}
      style={galleryStyle}
    >
      <motion.div
        layout
        className={`${styles.photoGalleryInner} ${
          expanded ? styles.photoGalleryExpanded : styles.photoGalleryCollapsed
        }`}
        transition={transition}
      >
        {photos.map((photo, i) => {
          const fanPose = getFanPose(i, photos.length, width);
          const cardHover = reduceMotion
            ? undefined
            : {
                y: expanded ? -7 : fanPose.y - 12,
                scale: expanded ? 1.025 : fanPose.scale + 0.035,
                rotate: expanded ? 0 : fanPose.rotate * 0.94,
              };

          return (
            <motion.div
              layout
              key={`${photo}-${i}`}
              className={styles.photoCardItem}
              style={{ position: 'relative', zIndex: i + 1 }}
              animate={
                expanded
                  ? { x: 0, y: 0, rotate: 0, scale: 1 }
                  : fanPose
              }
              whileHover={cardHover}
              transition={transition}
            >
              <Image
                src={photo}
                alt={`${title} photo ${i + 1}`}
                fill
                sizes={expanded ? '(max-width: 768px) 100vw, 33vw' : '(max-width: 768px) 58vw, 300px'}
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default function SpecialMeeting() {
  return (
    <div className={styles.pageWrap}>
      {/* ── Hero Banner ── */}
      <section className={`${styles.headerSection} mesh-editorial-header`}>
           <div className={styles.headerBg}>
<Image
              src="/special-meetings/meeting1/photo1.jpg"
              alt="Special meetings at Trinity Prayer House"
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center 70%' /* ← Adjust to reposition: 'center top', 'center bottom', 'center 60%', etc. */
              }}
            />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>Special Meetings</div>
            <h1>Special <i>Meetings</i></h1>
            <p className={styles.headerP}>
              Join us for our special gatherings and divine encounters.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Meetings List — one per row ── */}
      <section className={styles.meetingsList}>
        <div className="container">
          {meetings.map((meeting, index) => {
            const hasSessions = Boolean(meeting.sessions?.length);

            return (
              <ScrollReveal key={meeting.id} delay={100} className={styles.meetingRow}>
                {/* Heading */}
                <div className={styles.meetingHeading}>
                  <span className={styles.meetingNumber}>
                    {String(meeting.id).padStart(2, '0')}
                  </span>
                  <h2>{meeting.title}</h2>
                </div>

                <div className={styles.meetingContentLayout}>
                  {hasSessions ? (
                    <div className={styles.sessionGrid}>
                      {meeting.sessions?.map((session) => (
                        <div key={session.label} className={styles.sessionCol}>
                          <div className={styles.sessionLabel}>{session.label}</div>
                          <div className={styles.videoWrap}>
                            <iframe
                              src={`https://www.youtube.com/embed/${session.ytId}?rel=0&modestbranding=1`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={`${meeting.title} ${session.label}`}
                            />
                          </div>
                          <div className={styles.meetingDescription}>
                            <StaggeredText text={session.description} el="p" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.topRow}>
                      <div className={styles.videoCol}>
                        {/* Video */}
                        <div className={styles.videoWrap}>
                          <iframe
                            src={`https://www.youtube.com/embed/${meeting.ytId}?rel=0&modestbranding=1`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={meeting.title}
                          />
                        </div>
                      </div>

                      <div className={styles.textCol}>
                        {/* Description paragraph */}
                        <div className={styles.meetingDescription}>
                          <StaggeredText text={meeting.description ?? ''} el="p" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Photos */}
                  {meeting.photoDisplay === 'single-card' ? (
                    <div className={styles.photoSingle}>
                      <div className={styles.photoCard}>
                        <PhotoCarousel images={meeting.photos} />
                      </div>
                    </div>
                  ) : (
                    <PhotoStackGallery photos={meeting.photos} title={meeting.title} />
                  )}
                </div>

                {index < meetings.length - 1 && <div className={styles.divider} />}
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
