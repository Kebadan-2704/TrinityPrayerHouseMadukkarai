'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Curved3DCarousel.module.css';

interface CarouselImageObj {
  src: string;
  position?: string;
}

type CarouselImage = string | CarouselImageObj;

interface Curved3DCarouselProps {
  images: CarouselImage[];
}

function getSrc(img: CarouselImage) {
  return typeof img === 'string' ? img : img.src;
}
function getPosition(img: CarouselImage) {
  return typeof img === 'string' ? 'center' : (img.position || 'center');
}

export default function Curved3DCarousel({ images }: Curved3DCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const N = images.length;

  // Touch and Drag State
  const dragStartX = useRef<number | null>(null);
  const dragCurrentX = useRef<number | null>(null);
  const isDragging = useRef(false);

  // Wheel debounce
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

  // Intersection Observer to pause rendering/interactions if offscreen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % N);
  }, [N]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + N) % N);
  }, [N]);

  // Keyboard navigation
  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, next, prev]);

  // Mouse wheel horizontal scrolling
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20) {
        e.preventDefault();
        if (wheelTimeout.current) return;
        if (e.deltaX > 0) next();
        else prev();
        
        wheelTimeout.current = setTimeout(() => {
          wheelTimeout.current = null;
        }, 400); // debounce
      }
    };
    track.addEventListener('wheel', handleWheel, { passive: false });
    return () => track.removeEventListener('wheel', handleWheel);
  }, [next, prev]);

  // Drag and Swipe logic
  const handleDragStart = (x: number) => {
    isDragging.current = true;
    dragStartX.current = x;
    dragCurrentX.current = x;
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
      // Disable transitions on cards during drag to prevent jitter
      const cards = trackRef.current.children;
      for (let i = 0; i < cards.length; i++) {
        (cards[i] as HTMLElement).style.transition = 'none';
      }
    }
  };

  const handleDragMove = (x: number) => {
    if (!isDragging.current || dragStartX.current === null) return;
    dragCurrentX.current = x;
    const deltaX = x - dragStartX.current;
    
    // Apply slight translation to the whole track for feedback
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${deltaX * 0.3}px, 0, 0)`;
    }
  };

  const handleDragEnd = () => {
    if (!isDragging.current || dragStartX.current === null || dragCurrentX.current === null) return;
    isDragging.current = false;
    
    const deltaX = dragCurrentX.current - dragStartX.current;
    
    if (trackRef.current) {
      // Restore transitions
      trackRef.current.style.transition = 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)';
      trackRef.current.style.transform = 'translate3d(0, 0, 0)';
      
      const cards = trackRef.current.children;
      for (let i = 0; i < cards.length; i++) {
        (cards[i] as HTMLElement).style.transition = '';
      }
    }

    if (deltaX > 50) prev();
    else if (deltaX < -50) next();
    
    dragStartX.current = null;
    dragCurrentX.current = null;
  };

  // Helper to calculate offset for infinite looping
  const getOffset = (index: number) => {
    let offset = (index - activeIndex) % N;
    if (offset > Math.floor(N / 2)) offset -= N;
    else if (offset < -Math.floor(N / 2)) offset += N;
    return offset;
  };

  if (!images || N === 0) return null;

  return (
    <div 
      className={styles.carouselContainer} 
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Special Meetings Photo Carousel"
    >
      <div 
        className={styles.carouselTrack}
        ref={trackRef}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        {images.map((img, index) => {
          const offset = getOffset(index);
          const absOffset = Math.abs(offset);
          const direction = offset > 0 ? 1 : -1;
          
          let transform = '';
          let opacity = 1;
          let zIndex = 10;
          let activeClass = '';

          if (offset === 0) {
            transform = 'translate3d(0, 0, 0) scale(1) rotateY(0deg)';
            opacity = 1;
            zIndex = 10;
            activeClass = styles.cardActive;
          } else if (absOffset === 1) {
            transform = `translate3d(${110 * direction}%, 0, -100px) scale(0.9) rotateY(${-20 * direction}deg)`;
            opacity = 0.6;
            zIndex = 5;
          } else if (absOffset === 2) {
            transform = `translate3d(${190 * direction}%, 0, -200px) scale(0.8) rotateY(${-30 * direction}deg)`;
            opacity = 0.3;
            zIndex = 4;
          } else {
            transform = `translate3d(${220 * direction}%, 0, -300px) scale(0.7) rotateY(${-45 * direction}deg)`;
            opacity = 0;
            zIndex = 1;
          }

          // If there are exactly 2 images, it behaves like a toggle. Fix visual overlap:
          if (N === 2 && absOffset !== 0) {
             transform = `translate3d(110%, 0, -100px) scale(0.9) rotateY(-20deg)`;
             zIndex = 5;
          }

          return (
            <div 
              key={index} 
              className={`${styles.card} ${activeClass}`}
              style={{ transform, opacity, zIndex }}
              onClick={() => {
                if (offset > 0) next();
                else if (offset < 0) prev();
              }}
              role="group"
              aria-roledescription="slide"
              aria-hidden={absOffset > 1}
            >
              <Image
                src={getSrc(img)}
                alt={`Meeting photo ${index + 1}`}
                fill
                sizes="(max-width: 768px) 80vw, 600px"
                className={styles.cardImage}
                style={{ objectPosition: getPosition(img) }}
                loading={absOffset <= 1 ? "eager" : "lazy"}
              />
            </div>
          );
        })}
      </div>

      {N > 1 && (
        <>
          <button 
            className={`${styles.navButton} ${styles.navButtonPrev}`} 
            onClick={prev}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className={`${styles.navButton} ${styles.navButtonNext}`} 
            onClick={next}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
}
