'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './PhotoCarousel.module.css';

interface CarouselImageObj {
  src: string;
  position?: string;
}

type CarouselImage = string | CarouselImageObj;

interface PhotoCarouselProps {
  images: CarouselImage[];
}

function getSrc(img: CarouselImage) {
  return typeof img === 'string' ? img : img.src;
}
function getPosition(img: CarouselImage) {
  return typeof img === 'string' ? 'center' : (img.position || 'center');
}

export default function PhotoCarousel({ images }: PhotoCarouselProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const nextImg = () => setCurrentIdx((prev) => (prev + 1) % images.length);
  const prevImg = () => setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);

  const openLightbox = () => {
    setLightboxIdx(currentIdx);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  const lbNext = useCallback(() => setLightboxIdx((p) => (p + 1) % images.length), [images.length]);
  const lbPrev = useCallback(() => setLightboxIdx((p) => (p - 1 + images.length) % images.length), [images.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') lbNext();
      if (e.key === 'ArrowLeft') lbPrev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, lbNext, lbPrev]);

  if (!images || images.length === 0) return null;

  const currentImg = images[currentIdx];
  const src = getSrc(currentImg);
  const position = getPosition(currentImg);

  return (
    <>
      {/* ── Carousel ─────────────────────────────────────────────── */}
      <div
        className={styles.carouselWrap}
        onClick={openLightbox}
        role="button"
        tabIndex={0}
        aria-label="Open image fullscreen"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(); } }}
      >
        {images.map((img, i) => (
          <Image
            key={i}
            src={getSrc(img)}
            alt={`Gallery photo ${i + 1}`}
            fill
            sizes="(max-width: 991px) 100vw, 50vw"
            style={{ 
              objectFit: 'cover', 
              objectPosition: getPosition(img),
              opacity: i === currentIdx ? 1 : 0,
              pointerEvents: i === currentIdx ? 'auto' : 'none'
            }}
            priority={i === 0}
          />
        ))}

        {/* Expand hint */}
        <div className={styles.expandHint} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImg(); }}
              className={styles.arrowBtn}
              style={{ left: '10px' }}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} color="#fff" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImg(); }}
              className={styles.arrowBtn}
              style={{ right: '10px' }}
              aria-label="Next image"
            >
              <ChevronRight size={20} color="#fff" />
            </button>
            <div className={styles.dots}>
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`${styles.dot} ${i === currentIdx ? styles.dotActive : ''}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className={styles.lightboxOverlay}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Image */}
          <div
            className={styles.lightboxImgWrap}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getSrc(images[lightboxIdx])}
              alt={`Gallery photo ${lightboxIdx + 1}`}
              fill
              sizes="100vw"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>

          {/* Counter */}
          <div className={styles.lightboxCounter}>
            {lightboxIdx + 1} / {images.length}
          </div>

          {/* Close */}
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxNavLeft}`}
                onClick={(e) => { e.stopPropagation(); lbPrev(); }}
                aria-label="Previous photo"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxNavRight}`}
                onClick={(e) => { e.stopPropagation(); lbNext(); }}
                aria-label="Next photo"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
