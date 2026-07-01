'use client';

import { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggeredText from '@/components/ui/StaggeredText';
import Lightbox from '@/components/ui/Lightbox';
import type { LightboxImage } from '@/components/ui/Lightbox';
import { Camera } from 'lucide-react';
import { useLang } from '@/components/LangContext';

// ── Category keys ──────────────────────────────────────────────
type CategoryKey =
  | 'all'
  | 'worship'
  | 'youth'
  | 'kids'
  | 'womens'
  | 'mens'
  | 'oldage'
  | 'community'
  | 'special'
  | 'story';

// ── Photo type ─────────────────────────────────────────────────
type GalleryPhoto = {
  src: string;
  alt: string;
  category: CategoryKey;
  categoryLabel: string;
};

// ── Translations ───────────────────────────────────────────────
const localTranslations = {
  en: {
    secLabel: 'PHOTO GALLERY',
    title: 'Our',
    titleI: 'Gallery',
    subtitle: 'Glimpses of worship, fellowship, and God\'s work through our church family.',
    all: 'All',
    worship: 'Worship',
    youth: 'Youth',
    kids: 'Kids',
    womens: 'Womens',
    mens: 'Mens',
    oldage: 'Old Age',
    community: 'Community',
    special: 'Special Meetings',
    story: 'Our Story',
    photos: 'photos',
  },
  ta: {
    secLabel: 'புகைப்பட தொகுப்பு',
    title: 'எங்கள்',
    titleI: 'கேலரி',
    subtitle: 'எங்கள் சபை குடும்பத்தின் ஆராதனை, ஐக்கியம் மற்றும் தேவனின் கிரியைகளின் காட்சிகள்.',
    all: 'அனைத்தும்',
    worship: 'ஆராதனை',
    youth: 'இளைஞர்',
    kids: 'குழந்தைகள்',
    womens: 'பெண்கள்',
    mens: 'ஆண்கள்',
    oldage: 'முதியோர்',
    community: 'சமூகம்',
    special: 'சிறப்பு கூட்டங்கள்',
    story: 'எங்கள் கதை',
    photos: 'புகைப்படங்கள்',
  },
  hi: {
    secLabel: 'फोटो गैलरी',
    title: 'हमारी',
    titleI: 'गैलरी',
    subtitle: 'हमारे चर्च परिवार के माध्यम से आराधना, संगति और परमेश्वर के कार्य की झलकियां।',
    all: 'सभी',
    worship: 'आराधना',
    youth: 'युवा',
    kids: 'बच्चे',
    womens: 'महिलाएं',
    mens: 'पुरुष',
    oldage: 'वृद्ध',
    community: 'समुदाय',
    special: 'विशेष बैठकें',
    story: 'हमारी कहानी',
    photos: 'तस्वीरें',
  },
};

// ── All photos from /public/ ───────────────────────────────────
const ALL_PHOTOS: GalleryPhoto[] = [
  // ── Worship & Church ──
  { src: '/hero-bg.jpg', alt: 'Church worship', category: 'worship', categoryLabel: 'Worship' },
  { src: '/slide-2.jpg', alt: 'Church service', category: 'worship', categoryLabel: 'Worship' },
  { src: '/slide-3.jpg', alt: 'Prayer meeting', category: 'worship', categoryLabel: 'Worship' },
  { src: '/slide-4.jpg', alt: 'Praise and worship', category: 'worship', categoryLabel: 'Worship' },
  { src: '/slide-5.jpg', alt: 'Church gathering', category: 'worship', categoryLabel: 'Worship' },
  { src: '/hindi-ministry/worship-1.jpg', alt: 'Hindi worship service', category: 'worship', categoryLabel: 'Worship' },
  { src: '/hindi-ministry/worship-2.jpg', alt: 'Hindi worship gathering', category: 'worship', categoryLabel: 'Worship' },
  { src: '/hindi-ministry/worship-3.jpg', alt: 'Hindi ministry worship', category: 'worship', categoryLabel: 'Worship' },
  { src: '/hindi-ministry/worship-4.jpg', alt: 'Hindi ministry praise', category: 'worship', categoryLabel: 'Worship' },
  { src: '/hindi-ministry/worship-5.jpg', alt: 'Hindi service praise', category: 'worship', categoryLabel: 'Worship' },
  { src: '/hindi-ministry/worship-6.jpg', alt: 'Hindi service worship', category: 'worship', categoryLabel: 'Worship' },
  { src: '/hindi-ministry/worship-7.jpg', alt: 'Hindi ministry gathering', category: 'worship', categoryLabel: 'Worship' },
  { src: '/hindi-ministry/worship-8.jpg', alt: 'Hindi ministry service', category: 'worship', categoryLabel: 'Worship' },
  { src: '/prayer.png', alt: 'Church prayer ministry', category: 'worship', categoryLabel: 'Worship' },

  // ── Kids Ministry ──
  { src: '/kids-ministry/kids-1.jpg', alt: 'Kids ministry activity', category: 'kids', categoryLabel: 'Kids' },
  { src: '/kids-ministry/kids-2.jpg', alt: 'Kids ministry class', category: 'kids', categoryLabel: 'Kids' },
  { src: '/kids-ministry/kids-3.jpg', alt: 'Kids ministry fun', category: 'kids', categoryLabel: 'Kids' },
  { src: '/kids-ministry/kids-4.jpg', alt: 'Kids ministry group', category: 'kids', categoryLabel: 'Kids' },
  { src: '/kids-ministry/kids-5.jpg', alt: 'Kids ministry learning', category: 'kids', categoryLabel: 'Kids' },
  { src: '/kids-ministry/kids-6.jpg', alt: 'Kids ministry play', category: 'kids', categoryLabel: 'Kids' },
  { src: '/kids-ministry/kids-7.jpg', alt: 'Kids ministry worship', category: 'kids', categoryLabel: 'Kids' },
  { src: '/kids-ministry/kids-8.jpg', alt: 'Kids ministry celebration', category: 'kids', categoryLabel: 'Kids' },
  { src: '/kids-ministry/kids-9.jpg', alt: 'Kids ministry event', category: 'kids', categoryLabel: 'Kids' },
  { src: '/kids-ministry/kids-10.jpg', alt: 'Kids ministry gathering', category: 'kids', categoryLabel: 'Kids' },

  // ── Youth Ministry ──
  { src: '/youth-ministry/fellowship-1.jpg', alt: 'Youth fellowship', category: 'youth', categoryLabel: 'Youth' },
  { src: '/youth-ministry/fellowship-2.jpg', alt: 'Youth fellowship gathering', category: 'youth', categoryLabel: 'Youth' },
  { src: '/youth-ministry/fellowship-3.jpg', alt: 'Youth fellowship fun', category: 'youth', categoryLabel: 'Youth' },
  { src: '/youth-ministry/media-1.jpg', alt: 'Youth media ministry', category: 'youth', categoryLabel: 'Youth' },
  { src: '/youth-ministry/media-2.jpg', alt: 'Youth media work', category: 'youth', categoryLabel: 'Youth' },
  { src: '/youth-ministry/media-3.jpg', alt: 'Youth media project', category: 'youth', categoryLabel: 'Youth' },
  { src: '/youth-ministry/media-4.jpg', alt: 'Youth media event', category: 'youth', categoryLabel: 'Youth' },
  { src: '/youth-ministry/media-5.jpg', alt: 'Youth media session', category: 'youth', categoryLabel: 'Youth' },
  { src: '/youth-ministry/media-6.jpg', alt: 'Youth media gathering', category: 'youth', categoryLabel: 'Youth' },
  { src: '/youth-ministry/media-7.jpg', alt: 'Youth media activity', category: 'youth', categoryLabel: 'Youth' },
  { src: '/youth-ministry/outreach-1.jpg', alt: 'Youth outreach', category: 'youth', categoryLabel: 'Youth' },
  { src: '/youth-ministry/outreach-2.jpg', alt: 'Youth outreach event', category: 'youth', categoryLabel: 'Youth' },
  { src: '/youth-ministry/outreach-3.jpg', alt: 'Youth outreach ministry', category: 'youth', categoryLabel: 'Youth' },
  { src: '/youth-ministry/outreach-4.jpg', alt: 'Youth outreach service', category: 'youth', categoryLabel: 'Youth' },
  { src: '/youth-ministry/outreach-5.jpg', alt: 'Youth outreach activity', category: 'youth', categoryLabel: 'Youth' },
  { src: '/youth-ministry/outreach-6.jpg', alt: 'Youth outreach gathering', category: 'youth', categoryLabel: 'Youth' },

  // ── Womens Ministry ──
  { src: '/womens-ministry/daughters-1.jpg', alt: 'Womens ministry gathering', category: 'womens', categoryLabel: 'Womens' },
  { src: '/womens-ministry/daughters-2.jpg', alt: 'Womens ministry fellowship', category: 'womens', categoryLabel: 'Womens' },
  { src: '/womens-ministry/daughters-3.jpg', alt: 'Womens ministry event', category: 'womens', categoryLabel: 'Womens' },
  { src: '/womens-ministry/outreach-1.jpg', alt: 'Womens outreach ministry', category: 'womens', categoryLabel: 'Womens' },
  { src: '/womens-ministry/outreach-2.jpg', alt: 'Womens outreach event', category: 'womens', categoryLabel: 'Womens' },
  { src: '/womens-ministry/outreach-3.jpg', alt: 'Womens outreach gathering', category: 'womens', categoryLabel: 'Womens' },

  // ── Mens Ministry ──
  { src: '/mens-ministry/growing-1.jpg', alt: 'Mens ministry fellowship', category: 'mens', categoryLabel: 'Mens' },
  { src: '/mens-ministry/growing-2.jpg', alt: 'Mens ministry gathering', category: 'mens', categoryLabel: 'Mens' },
  { src: '/mens-ministry/growing-3.jpg', alt: 'Mens ministry activity', category: 'mens', categoryLabel: 'Mens' },

  // ── Old Age Ministry ──
  { src: '/oldage-new-1.jpg', alt: 'Old age home visit', category: 'oldage', categoryLabel: 'Old Age' },
  { src: '/oldage-new-2.jpg', alt: 'Old age home ministry', category: 'oldage', categoryLabel: 'Old Age' },

  // ── Community ──
  { src: '/community-new-1.jpg', alt: 'Church community', category: 'community', categoryLabel: 'Community' },
  { src: '/community-new-2.jpg', alt: 'Church community gathering', category: 'community', categoryLabel: 'Community' },
  { src: '/community-new-3.jpg', alt: 'Church community fellowship', category: 'community', categoryLabel: 'Community' },

  // ── Special Meetings ──
  { src: '/special-meetings/meeting1/photo1.jpg', alt: 'Special meeting worship', category: 'special', categoryLabel: 'Special Meetings' },
  { src: '/special-meetings/meeting1/photo2.jpg', alt: 'Special meeting gathering', category: 'special', categoryLabel: 'Special Meetings' },
  { src: '/special-meetings/meeting1/photo3.jpg', alt: 'Special meeting prayer', category: 'special', categoryLabel: 'Special Meetings' },
  { src: '/special-meetings/meeting1/photo4.jpg', alt: 'Special meeting service', category: 'special', categoryLabel: 'Special Meetings' },
  { src: '/special-meetings/meeting1/photo5.jpg', alt: 'Special meeting praise', category: 'special', categoryLabel: 'Special Meetings' },
  { src: '/special-meetings/meeting1/photo6.jpg', alt: 'Special meeting event', category: 'special', categoryLabel: 'Special Meetings' },
  { src: '/special-meetings/meeting1/photo7.jpg', alt: 'Special meeting congregation', category: 'special', categoryLabel: 'Special Meetings' },
  { src: '/special-meetings/meeting2/photo1.jpg', alt: 'Maraven worship night', category: 'special', categoryLabel: 'Special Meetings' },
  { src: '/special-meetings/meeting2/photo2.jpg', alt: 'Maraven worship event', category: 'special', categoryLabel: 'Special Meetings' },
  { src: '/special-meetings/meeting2/photo3.jpg', alt: 'Maraven worship praise', category: 'special', categoryLabel: 'Special Meetings' },
  { src: '/special-meetings/meeting2/photo4.jpg', alt: 'Maraven worship gathering', category: 'special', categoryLabel: 'Special Meetings' },
  { src: '/special-meetings/meeting2/photo5.jpg', alt: 'Maraven worship service', category: 'special', categoryLabel: 'Special Meetings' },
  { src: '/special-meetings/meeting2/photo6.jpg', alt: 'Maraven worship celebration', category: 'special', categoryLabel: 'Special Meetings' },
  { src: '/special-meetings/meeting2/photo7.jpg', alt: 'Maraven worship community', category: 'special', categoryLabel: 'Special Meetings' },
  { src: '/special-meetings/meeting2/photo8.jpg', alt: 'Maraven worship fellowship', category: 'special', categoryLabel: 'Special Meetings' },
  { src: '/special-meetings/meeting2/photo9.jpg', alt: 'Maraven worship night close', category: 'special', categoryLabel: 'Special Meetings' },

  // ── Our Story (Founders, Vision, Family) ──
  { src: '/sathya-founders.png', alt: 'Our founders', category: 'story', categoryLabel: 'Our Story' },
  { src: '/sath.png', alt: 'Pastor Dowy Sathyanathan', category: 'story', categoryLabel: 'Our Story' },
  { src: '/bm.jpg', alt: 'Church history', category: 'story', categoryLabel: 'Our Story' },
  { src: '/vmain.jpeg', alt: 'Pastor Vasanth Sathyanathan', category: 'story', categoryLabel: 'Our Story' },
  { src: '/Family Pic.jpeg', alt: 'Our church family', category: 'story', categoryLabel: 'Our Story' },
  { src: '/img_9061.jpg', alt: 'Church moments', category: 'story', categoryLabel: 'Our Story' },
  { src: '/vision-photos/photo1.jpg', alt: 'Church history photo', category: 'story', categoryLabel: 'Our Story' },
  { src: '/vision-photos/photo2.jpg', alt: 'Church legacy photo', category: 'story', categoryLabel: 'Our Story' },
  { src: '/vision-photos/photo3.jpg', alt: 'Church heritage photo', category: 'story', categoryLabel: 'Our Story' },
  { src: '/vision-photos/photo4.jpg', alt: 'Church founding photo', category: 'story', categoryLabel: 'Our Story' },
  { src: '/vision-photos/photo5.jpg', alt: 'Church vision photo', category: 'story', categoryLabel: 'Our Story' },
  { src: '/vision-photos/photo6.jpg', alt: 'Church milestone photo', category: 'story', categoryLabel: 'Our Story' },
  { src: '/vision-photos/photo7.jpg', alt: 'Church journey photo', category: 'story', categoryLabel: 'Our Story' },
];

const CATEGORIES: CategoryKey[] = [
  'all',
  'worship',
  'youth',
  'kids',
  'womens',
  'mens',
  'oldage',
  'community',
  'special',
  'story',
];

export default function GalleryPage() {
  const { lang } = useLang();
  const content = localTranslations[lang] || localTranslations.en;

  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return ALL_PHOTOS;
    return ALL_PHOTOS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const lightboxImages: LightboxImage[] = useMemo(
    () =>
      filteredPhotos.map((p) => ({
        src: p.src,
        alt: p.alt,
        category: p.categoryLabel,
      })),
    [filteredPhotos]
  );

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredPhotos.length : null
    );
  }, [filteredPhotos.length]);

  const prevPhoto = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        : null
    );
  }, [filteredPhotos.length]);

  return (
    <div>
      {/* ── Header ──────────────────────────────────────────────── */}
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image
            src="/community-new-2.jpg"
            alt="Gallery"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.headerContent}>
            <ScrollReveal variant="blurIn">
              <div className={styles.secLabel}>{content.secLabel}</div>
              <h1>
                <StaggeredText text={content.title} el="span" />{' '}
                <i>
                  <StaggeredText text={content.titleI} el="span" />
                </i>
              </h1>
              <p>{content.subtitle}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Filter Bar ──────────────────────────────────────────── */}
      <div className={styles.filterSection}>
        <div className="container">
          <div className={styles.filterScroll}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterPill} ${
                  activeCategory === cat ? styles.filterPillActive : ''
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {content[cat]}
              </button>
            ))}
            <div className={styles.photoCount}>
              <Camera size={14} />
              {filteredPhotos.length} {content.photos}
            </div>
          </div>
        </div>
      </div>

      {/* ── Photo Grid ──────────────────────────────────────────── */}
      <section className={`${styles.gallerySection} pres-band-soft pres-rail`}>
        <div className="container">
          <div className={styles.galleryGrid}>
            {filteredPhotos.map((photo, index) => (
              <ScrollReveal
                key={photo.src}
                delay={60 * Math.min(index, 8)}
                amount={0.15}
              >
                <div
                  className={styles.photoCard}
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${photo.alt}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(index);
                    }
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    loading={index < 9 ? 'eager' : 'lazy'}
                  />
                  <div className={styles.cardOverlay}>
                    <span className={styles.cardLabel}>
                      {content[photo.category] || photo.categoryLabel}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            {filteredPhotos.length === 0 && (
              <div className={styles.emptyState}>No photos in this category.</div>
            )}
          </div>
        </div>
      </section>

      {/* ── Lightbox ────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextPhoto}
          onPrev={prevPhoto}
        />
      )}
    </div>
  );
}
