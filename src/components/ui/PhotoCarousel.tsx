'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImageObj {
  src: string;
  position?: string;
}

type CarouselImage = string | CarouselImageObj;

interface PhotoCarouselProps {
  images: CarouselImage[];
}

export default function PhotoCarousel({ images }: PhotoCarouselProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextImg = () => setCurrentIdx((prev) => (prev + 1) % images.length);
  const prevImg = () => setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);

  if (!images || images.length === 0) return null;

  const currentImg = images[currentIdx];
  const src = typeof currentImg === 'string' ? currentImg : currentImg.src;
  const position = typeof currentImg === 'string' ? 'center' : (currentImg.position || 'center');

  return (
    <>
       <Image
         src={src}
         alt="Gallery activity"
         fill
         sizes="100vw"
         style={{ objectFit: 'cover', objectPosition: position }}
       />

      {images.length > 1 && (
        <>
          <button
            onClick={prevImg}
            style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.6)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.3)')}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} color="#fff" />
          </button>

          <button
            onClick={nextImg}
            style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.6)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.3)')}
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
