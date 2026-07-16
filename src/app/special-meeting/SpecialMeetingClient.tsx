'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './special-meeting.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggeredText from '@/components/ui/StaggeredText';
import Image from 'next/image';
import { useLang } from '@/components/LangContext';

import { type MeetingPhoto, type Meeting, localizedMeetingsData, localTranslations } from './meetingsData';

import dynamic from 'next/dynamic';

const PhotoCarousel = dynamic(() => import('@/components/ui/PhotoCarousel'), { ssr: false });
const YouTubeEmbed = dynamic(() => import('@/components/ui/YouTubeEmbed'), { ssr: false });

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

function getPhotoSource(photo: MeetingPhoto) {
  return typeof photo === 'string' ? photo : photo.src;
}

function getPhotoSources(photos: MeetingPhoto[]) {
  return photos.map(getPhotoSource);
}

function getPhotoObjectPosition(photo: MeetingPhoto) {
  return typeof photo === 'string' ? 'center' : photo.objectPosition ?? 'center';
}

// ── Lazy-mount wrapper: defers heavy meeting content until near viewport ──
function LazyMeeting({ children, eager = false }: { children: React.ReactNode; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    if (eager || visible) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: '300px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, visible]);

  if (eager || visible) return <>{children}</>;
  return <div ref={ref} style={{ minHeight: 400 }} />;
}

function PhotoStackGallery({ photos, title }: { photos: MeetingPhoto[]; title: string }) {
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
          const photoSrc = getPhotoSource(photo);
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
              key={`${photoSrc}-${i}`}
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
                src={photoSrc}
                alt={`${title} photo ${i + 1}`}
                fill
                sizes={expanded ? '(max-width: 768px) 100vw, 33vw' : '(max-width: 768px) 58vw, 300px'}
                style={{ objectFit: 'cover', objectPosition: getPhotoObjectPosition(photo) }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default function SpecialMeeting() {
  const { lang } = useLang();
  
  const content = localTranslations[lang] || localTranslations.en;
  const meetings = localizedMeetingsData[lang] || localizedMeetingsData.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: content.heroTitle,
    description: content.subtitle,
    itemListElement: meetings.map((meeting, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: meeting.title,
        description: meeting.description || `Special meeting at Trinity Prayer House: ${meeting.title}`,
        location: {
          '@type': 'Place',
          name: 'Trinity Prayer House Madukkarai',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '16/300, Gandhi Nagar',
            addressLocality: 'Madukkarai',
            addressRegion: 'Coimbatore',
            postalCode: '641105',
            addressCountry: 'IN'
          }
        },
        image: meeting.photos.length > 0 ? (typeof meeting.photos[0] === 'string' ? meeting.photos[0] : meeting.photos[0].src) : undefined
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={styles.pageWrap}>
      {/* ── Hero Banner ── */}
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image
            src="/special-meetings/meeting1/photo1.jpg"
            alt="Special meetings at Trinity Prayer House"
            fill
            priority={true}
            fetchPriority="high"
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 70%'
            }}
          />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>{content.secLabel}</div>
            <h1>{content.heroTitle}</h1>
            <p className={styles.headerP}>
              {content.subtitle}
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
              <LazyMeeting key={meeting.id} eager={index < 2}>
                <ScrollReveal delay={100} className={styles.meetingRow}>
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
                              <YouTubeEmbed videoId={session.ytId} title={`${meeting.title} ${session.label}`} />
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
                            {meeting.ytId && <YouTubeEmbed videoId={meeting.ytId} title={meeting.title} />}
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
                          <PhotoCarousel images={getPhotoSources(meeting.photos)} />
                        </div>
                      </div>
                    ) : (
                      <PhotoStackGallery photos={meeting.photos} title={meeting.title} />
                    )}
                  </div>

                  {index < meetings.length - 1 && <div className={styles.divider} />}
                </ScrollReveal>
              </LazyMeeting>
            );
          })}
        </div>
      </section>
    </div>
    </>
  );
}

