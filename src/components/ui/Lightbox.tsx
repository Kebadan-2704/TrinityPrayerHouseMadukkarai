'use client';

import { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Lightbox.module.css';

export type LightboxImage = {
  src: string;
  alt: string;
  category?: string;
};

type LightboxProps = {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // Focus trap
  useEffect(() => {
    overlayRef.current?.focus();
  }, [currentIndex]);

  // Swipe handling
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) onNext();
      else onPrev();
    }
  };

  const current = images[currentIndex];
  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo viewer: ${current.alt}`}
        tabIndex={-1}
      >
        {/* Close */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X size={20} />
        </button>

        {/* Previous */}
        {images.length > 1 && (
          <button
            className={`${styles.navBtn} ${styles.prevBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={currentIndex}
          className={styles.imageWrap}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="90vw"
            priority
          />
        </motion.div>

        {/* Next */}
        {images.length > 1 && (
          <button
            className={`${styles.navBtn} ${styles.nextBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={22} />
          </button>
        )}

        {/* Info bar */}
        <div className={styles.infoBar}>
          {current.category && (
            <>
              <span className={styles.category}>{current.category}</span>
              <span className={styles.divider} />
            </>
          )}
          <span className={styles.counter}>
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
