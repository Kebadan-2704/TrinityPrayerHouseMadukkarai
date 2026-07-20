'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './special-meeting.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggeredText from '@/components/ui/StaggeredText';
import Image from 'next/image';
import { useLang } from '@/components/LangContext';

import { type MeetingPhoto, localizedMeetingsData, localTranslations } from './meetingsData';

import dynamic from 'next/dynamic';

const Curved3DCarousel = dynamic(() => import('@/components/ui/Curved3DCarousel'), { ssr: false });
const YouTubeEmbed = dynamic(() => import('@/components/ui/YouTubeEmbed'), { ssr: false });



function getPhotoSource(photo: MeetingPhoto) {
  return typeof photo === 'string' ? photo : photo.src;
}

function getPhotoSources(photos: MeetingPhoto[]) {
  return photos.map(photo => ({
    src: getPhotoSource(photo),
    position: getPhotoObjectPosition(photo)
  }));
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
                <ScrollReveal delay={100} variant="blurIn" margin="200px" className={styles.meetingRow}>
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
                    <div className={styles.photoCarouselWrapper} style={{ marginTop: '3rem', width: '100%' }}>
                      <Curved3DCarousel images={getPhotoSources(meeting.photos)} />
                    </div>
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

