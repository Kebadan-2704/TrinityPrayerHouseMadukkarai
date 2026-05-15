'use client';

import { useState } from 'react';
import styles from './special-meeting.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggeredText from '@/components/ui/StaggeredText';
import Image from 'next/image';

// ── Meeting data — add more photos as arrays, one entry per meeting ──
const meetings = [
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
    photos: ['/community-new-2.jpg'],
  },
  {
    id: 3,
    title: 'Revival Word And Worship Night',
    ytId: 'auok0w_qM-E',
    description: 'A night set apart for revival — a blend of anointed preaching and Spirit-led worship that stirred the hearts of all who gathered. Testimonies of renewal and rededication marked this special evening.',
    photos: ['/community-new-2.jpg'],
  },
  {
    id: 4,
    title: 'Revival Word & Worship By Pas. Joel Thomasraj',
    ytId: '7nuz6nZYsQI',
    description: 'Pastor Joel Thomasraj ministered with clarity and conviction, bringing a timely word of revival. The service was marked by deep conviction, prayer, and a renewed passion for God\'s presence among the congregation.',
    photos: ['/community-new-2.jpg'],
  },
  {
    id: 5,
    title: 'Prophetic Revival Meeting',
    ytId: 'OGG6IRLEPpk',
    description: 'A prophetic gathering where the voice of the Lord was heard through His servants. The meeting brought direction, encouragement, and fresh fire to the believers, with many experiencing personal breakthrough.',
    photos: ['/community-new-2.jpg'],
  },
  {
    id: 6,
    title: 'Special Palm Sunday Service',
    ytId: 'VfxL550hYNg',
    description: 'Commemorating the triumphal entry of Jesus into Jerusalem, this Palm Sunday service was a joyful celebration of the King of kings. The congregation worshipped together in anticipation of the resurrection victory.',
    photos: ['/community-new-2.jpg'],
  },
  {
    id: 7,
    title: 'BreakThrough Worship Night',
    ytId: 'K9wxb_oXWsw',
    description: 'An intense night of worship and intercession where chains were broken and burdens lifted. Believers pressed in together in prayer, believing God for personal and corporate breakthroughs in every area of life.',
    photos: ['/community-new-2.jpg'],
  },
  {
    id: 8,
    title: 'Special Sunday Service with Pas. Ranjith Jeba',
    ytId: 'zFcqm31QImE',
    description: 'Pastor Ranjith Jeba brought a powerful message that challenged and encouraged the congregation to walk deeper in their faith. The service was accompanied by heartfelt worship and an atmosphere of God\'s tangible presence.',
    photos: ['/community-new-2.jpg'],
  },
  {
    id: 9,
    title: 'Special Sunday Service with Rev. Johnson Memana',
    ytId: '353-Tk-FxF8',
    description: 'Rev. Johnson Memana ministered with great anointing, delivering a message that brought healing and hope. The congregation responded with open hearts as the Word of God went forth with power and clarity.',
    photos: ['/community-new-2.jpg'],
  },
  {
    id: 10,
    title: 'Prayer Month Special Meeting Day-1 with EVG K.A Abraham',
    ytId: 'DNnbwlOfDC0',
    description: 'The first day of the Prayer Month series with Evangelist K.A. Abraham set a strong foundation of intercession and faith. The evening was filled with powerful prayers, declarations, and a stirring of the Holy Spirit across the congregation.',
    photos: ['/community-new-2.jpg'],
  },
  {
    id: 11,
    title: 'Prayer Month Special Meeting Day-2 with EVG K.A Abraham',
    ytId: 'oNbbb_cyMvE',
    description: 'Continuing the Prayer Month series, Day 2 with Evangelist K.A. Abraham saw an even deeper move of the Spirit. The prayers intensified and many reported experiencing healing, deliverance, and a fresh filling of the Holy Spirit.',
    photos: ['/community-new-2.jpg'],
  },
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
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
<Image
             src="/special-meetings/meeting1/photo1.jpg"
             alt="Special meetings at Trinity Prayer House"
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
                        <StaggeredText text={meeting.description} el="p" />
                      </div>
                    </div>
                  </div>

                  {/* Photos */}
                  <div className={
                    meeting.photos.length === 1
                      ? styles.photoSingle
                      : styles.photoGrid
                  }>
                    {meeting.photos.map((photo, i) => (
                      <div key={i} className={styles.photoCard}>
                        <Image 
                          src={photo} 
                          alt={`${meeting.title} photo ${i + 1}`} 
                          fill 
                          sizes={meeting.photos.length === 1 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
                          style={{ objectFit: 'cover' }} 
                        />
                      </div>
                    ))}
                  </div>
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
