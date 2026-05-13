'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoCarouselProps {
  images: string[];
  interval?: number;
}

export default function PhotoCarousel({ images, interval = 5000 }: PhotoCarouselProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const nextImg = () => setCurrentIdx((prev) => (prev + 1) % images.length);
  const prevImg = () => setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);

  if (!images || images.length === 0) return null;

  return (
    <>
      <img 
        src={images[currentIdx]} 
        alt="Gallery activity" 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
      />
      
      {images.length > 1 && (
        <>
          <button 
            onClick={prevImg} 
            style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }} 
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'} 
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'} 
            aria-label="Previous image"
          >
            <ChevronLeft size={20} color="#fff" />
          </button>
          
          <button 
            onClick={nextImg} 
            style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }} 
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'} 
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'} 
            aria-label="Next image"
          >
            <ChevronRight size={20} color="#fff" />
          </button>

          <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 10 }}>
            {images.map((_, i) => (
              <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === currentIdx ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'background 0.3s' }} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
