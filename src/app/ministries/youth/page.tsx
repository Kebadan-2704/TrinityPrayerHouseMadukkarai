'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PhotoCarousel from '@/components/ui/PhotoCarousel';

const fellowshipImages = [
  '/youth-ministry/fellowship-1.jpg',
  '/youth-ministry/fellowship-2.jpg',
  '/youth-ministry/fellowship-3.jpg',
];

const outreachImages = [
  '/youth-ministry/outreach-1.jpg',
  '/youth-ministry/outreach-2.jpg',
  '/youth-ministry/outreach-3.jpg',
  '/youth-ministry/outreach-4.jpg',
  '/youth-ministry/outreach-5.jpg',
  '/youth-ministry/outreach-6.jpg',
];

// ── MEDIA PHOTOS ────────────────────────────────────────────────────────────────
// Adjust each photo independently:
//   position → which part of the image to focus on (CSS object-position)
//              e.g. 'center center' | 'top' | 'bottom' | 'center 30%' | '20% 50%'
//   scale    → zoom level: 100 = no zoom | 120 = zoom in 20% | 85 = zoom out
//              (percentage value — do NOT use decimals here)
// ────────────────────────────────────────────────────────────────────────────────
const mediaImages = [
  { src: '/youth-ministry/media-1.jpg', position: 'center center', scale: 100 },
  { src: '/youth-ministry/media-2.jpg', position: 'center center', scale: 100 },
  { src: '/youth-ministry/media-3.jpg', position: 'center center', scale: 100 },
  { src: '/youth-ministry/media-4.jpg', position: 'center center', scale: 100 },
  { src: '/youth-ministry/media-5.jpg', position: 'center center', scale: 100 },
  { src: '/youth-ministry/media-6.jpg', position: 'center center', scale: 100 },
  { src: '/youth-ministry/media-7.jpg', position: 'center center', scale: 100 },
];

/** Carousel that supports per-image position & scale adjustments */
function MediaCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (mediaImages.length <= 1) return;
    const timer = setInterval(() => setIdx((p) => (p + 1) % mediaImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setIdx((p) => (p - 1 + mediaImages.length) % mediaImages.length);
  const next = () => setIdx((p) => (p + 1) % mediaImages.length);

  const { src, position } = mediaImages[idx];

  return (
    <>
      <img
        src={src}
        alt={`Youth Trinity Media photo ${idx + 1}`}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: position,
        }}
      />

      {mediaImages.length > 1 && (
        <>
          <button
            onClick={prev}
            style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} color="#fff" />
          </button>

          <button
            onClick={next}
            style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
            aria-label="Next image"
          >
            <ChevronRight size={20} color="#fff" />
          </button>

          <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 10 }}>
            {mediaImages.map((_, i) => (
              <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === idx ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'background 0.3s' }} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default function YouthMinistryPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/youth_ministry_new.jpg" alt="Youth Ministry" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>MINISTRY</div>
            <h1>Youth Ministry</h1>
            <p className={styles.headerSubtext}>Empowering young people to discover their identity in Christ through worship, fellowship, and discipleship.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <Link href="/ministries" className={styles.backBtn}>&larr; Back to Ministries</Link>

          {/* Youth Fellowship */}
          <div className={styles.contentGrid} style={{ marginBottom: '6rem' }}>
            <ScrollReveal className={styles.textContent}>
              <h2>Youth Fellowship</h2>
              <p>
                Our Youth Fellowship at Trinity Prayer House is a vibrant and Christ-centered community where young people grow in faith, build meaningful friendships, and discover their God-given purpose.
              </p>
              <p>
                Through fellowship gatherings, Bible studies, worship sessions, prayer meetings, and discipleship, our youth are encouraged to deepen their relationship with God in an atmosphere of love, encouragement, and spiritual growth — a place where every young person belongs and grows together in Christ.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <PhotoCarousel images={fellowshipImages} />
            </ScrollReveal>
          </div>

          {/* Youth Outreach */}
          <div className={styles.contentGrid} style={{ marginBottom: '6rem' }}>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <PhotoCarousel images={outreachImages} />
            </ScrollReveal>
            <ScrollReveal className={styles.textContent}>
              <h2>Youth Outreach Programs</h2>
              <p>
                We believe in equipping the next generation to be the hands and feet of Jesus. Our youth outreach programs are designed to reach our community through impactful service projects, evangelism, and local missions.
              </p>
              <p>
                We are dedicated to making a difference, stepping out of our comfort zones, and spreading the gospel wherever we go to bring hope to those who need it most.
              </p>
            </ScrollReveal>
          </div>

          {/* Youth Media */}
          <div className={styles.contentGrid}>
            <ScrollReveal className={styles.textContent}>
              <h2>Youth Trinity Media</h2>
              <p>
                Trinity Youth Media is a ministry where creativity meets calling, empowering young people to use media as a tool for God&apos;s Kingdom. From photography, videography, graphic design, live production, and digital ministry, this team not only serves within the church but also reaches beyond by supporting ministries, training others, and equipping churches with media knowledge and creative excellence. Through this ministry, young creatives are inspired to use their gifts to glorify God and expand His work far beyond our walls.
              </p>
              <p>Our Trinity Youth Media team is actively involved in ministry beyond our own church, partnering with other churches, ministries, and outreach programs to serve through media excellence and creative support. Whether covering special events, assisting with live production, creating visual storytelling, or supporting Gospel outreach initiatives, this ministry uses creativity as a powerful tool to strengthen ministries and reach lives with the message of Christ.</p>
            </ScrollReveal>
            {/* Portrait override: media photos are portrait-oriented, so use a taller container */}
            <ScrollReveal delay={200}>
              <div className={styles.galleryImageWrap} style={{ paddingBottom: '125%' }}>
                <MediaCarousel />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
