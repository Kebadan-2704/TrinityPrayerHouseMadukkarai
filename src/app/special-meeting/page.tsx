'use client';

import { useState } from 'react';
import styles from './special-meeting.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Image from 'next/image';

// ── Meeting data — add more photos as arrays, one entry per meeting ──
const meetings = [
  {
    id: 1,
    title: '50th Year of Vision Day Thanksgiving Service',
    ytId: 'sHjLhuEItM0',
    photos: [
      '/special-meetings/meeting1/photo1.jpg',
      '/special-meetings/meeting1/photo2.jpg',
      '/special-meetings/meeting1/photo3.jpg',
      '/special-meetings/meeting1/photo5.jpg',
      '/special-meetings/meeting1/photo6.jpg',
      '/special-meetings/meeting1/photo7.jpg',
    ],
  },
  { id: 2, title: 'Maraven Live Praise & Worship', ytId: 'bwTC3XHRVxo', photos: ['/community-new-2.jpg'] },
  { id: 3, title: 'Revival Word And Worship Night', ytId: 'auok0w_qM-E', photos: ['/community-new-2.jpg'] },
  { id: 4, title: 'Revival Word & Worship By Pas. Joel Thomasraj', ytId: '7nuz6nZYsQI', photos: ['/community-new-2.jpg'] },
  { id: 5, title: 'Prophetic Revival Meeting', ytId: 'OGG6IRLEPpk', photos: ['/community-new-2.jpg'] },
  { id: 6, title: 'Special Palm Sunday Service', ytId: 'VfxL550hYNg', photos: ['/community-new-2.jpg'] },
  { id: 7, title: 'BreakThrough Worship Night', ytId: 'K9wxb_oXWsw', photos: ['/community-new-2.jpg'] },
  { id: 8, title: 'Special Sunday Service with Pas. Ranjith Jeba', ytId: 'zFcqm31QImE', photos: ['/community-new-2.jpg'] },
  { id: 9, title: 'Special Sunday Service with Rev. Johnson Memana', ytId: '353-Tk-FxF8', photos: ['/community-new-2.jpg'] },
  { id: 10, title: 'Prayer Month Special Meeting Day-1 with EVG K.A Abraham', ytId: 'DNnbwlOfDC0', photos: ['/community-new-2.jpg'] },
  { id: 11, title: 'Prayer Month Special Meeting Day-2 with EVG K.A Abraham', ytId: 'oNbbb_cyMvE', photos: ['/community-new-2.jpg'] },
];

// ── Per-meeting photo carousel component ──
function PhotoCarousel({ photos, title }: { photos: string[]; title: string }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const hasPrev = photoIndex > 0;
  const hasNext = photoIndex < photos.length - 1;

  return (
    <div className={styles.photoCarousel}>
      <Image
        key={photos[photoIndex]}
        src={photos[photoIndex]}
        alt={`${title} — photo ${photoIndex + 1}`}
        fill
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Arrows */}
      {photos.length > 1 && (
        <div className={styles.photoArrows}>
          <button
            className={styles.photoArrow}
            onClick={() => setPhotoIndex(i => i - 1)}
            disabled={!hasPrev}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <span className={styles.photoDots}>
            {photoIndex + 1} / {photos.length}
          </span>
          <button
            className={styles.photoArrow}
            onClick={() => setPhotoIndex(i => i + 1)}
            disabled={!hasNext}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default function SpecialMeeting() {
  return (
    <div className={styles.pageWrap}>
      {/* ── Hero Banner ── */}
      <section className={styles.headerSection}>
        <div className={styles.headerBg}>
          <Image
            src="/special-meetings/meeting1/photo1.jpg"
            alt="Special Meeting"
            fill
            priority
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
            <div className={styles.secLabel}>Events</div>
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
          {meetings.map((meeting, index) => (
            <ScrollReveal key={meeting.id} delay={100} className={styles.meetingRow}>
              {/* Heading */}
              <div className={styles.meetingHeading}>
                <span className={styles.meetingNumber}>
                  {String(meeting.id).padStart(2, '0')}
                </span>
                <h2>{meeting.title}</h2>
              </div>

              {/* Video + Photo grid */}
              <div className={styles.meetingContent}>
                <div className={styles.videoWrap}>
                  <iframe
                    src={`https://www.youtube.com/embed/${meeting.ytId}?rel=0&modestbranding=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={meeting.title}
                  />
                </div>
                <PhotoCarousel photos={meeting.photos} title={meeting.title} />
              </div>

              {index < meetings.length - 1 && <div className={styles.divider} />}
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
