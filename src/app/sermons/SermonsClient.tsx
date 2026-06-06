'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import StaggerIn, { StaggerItem } from '@/components/ui/StaggerIn';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggeredText from '@/components/ui/StaggeredText';
import { useLang } from '@/components/LangContext';

type Sermon = {
  videoId: string;
  title: string;
  date: string;
  displayTitle?: string;
};

type Props = {
  latest: Sermon;
  archive: Sermon[];
};

export default function SermonsClient({ latest, archive }: Props) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { t } = useLang();
  const modalRef = useRef<HTMLDivElement>(null);

  // ── Focus trap for video modal ─────────────────────────────────────────────
  useEffect(() => {
    if (!activeVideo || !modalRef.current) return;
    const container = modalRef.current;
    const focusable = container.querySelectorAll<HTMLElement>(
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    const visible = Array.from(focusable).filter(el => !el.hasAttribute('disabled') && el.tabIndex !== -1);
    (visible[0] ?? container).focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const first = visible[0];
      const last  = visible[visible.length - 1];
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus(); } }
      else            { if (document.activeElement === last)  { e.preventDefault(); first?.focus(); } }
    };
    container.addEventListener('keydown', onKey);
    return () => container.removeEventListener('keydown', onKey);
  }, [activeVideo]);

  return (
    <>
      {/* ── Featured latest sermon ────────────────────────────────────────── */}
      <section className={`${styles.featuredSection} pres-band-muted`}>
        <div className={`container ${styles.featuredGrid}`}>
          <ScrollReveal delay={100} variant="fadeLeft" className={styles.featuredVideo}>
            <div className={`${styles.embedWrap} pres-card-static hover-lift`}>
              <iframe
                src={`https://www.youtube.com/embed/${latest.videoId}?rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Latest Sermon"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={220} variant="fadeRight" className={styles.featuredInfo}>
            <div className={styles.secLabel}>{t.latestMessage}</div>
            <h2><StaggeredText text={latest.displayTitle ?? latest.title} el="span" /></h2>
            <p className={styles.featuredDate}>{latest.date}</p>
            <div className={styles.featuredDesc}>
              <StaggeredText text={t.featuredDesc} />
            </div>
            <a href="https://www.youtube.com/@Pas.Vasanth" target="_blank" rel="noopener noreferrer" className={styles.editorialLink}>
              {t.visitYT}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Sermon grid ───────────────────────────────────────────────────── */}
      <section className={`section-padding ${styles.sermonsSection} pres-band-soft pres-rail`}>
        <div className="container">
          <ScrollReveal amount={0.2} variant="scale" className={styles.filterWrap}>
            <div className={styles.secLabel}>{t.messages}</div>
            <h2 className={styles.archiveTitle}>
              <StaggeredText text={t.recentSermons} el="span" />{' '}
              <i><StaggeredText text={t.recentSermonsI} el="span" /></i>
            </h2>
          </ScrollReveal>

          <StaggerIn className={styles.sermonGrid}>
            {archive.map((sermon) => {
              const title = sermon.displayTitle ?? sermon.title;
              return (
                <StaggerItem key={sermon.videoId}>
                  <div className={`${styles.sermonCard} hover-lift shine-frame`}>
                    <div
                      className={`${styles.scVideoThumb} ${styles.scVideoThumbFill}`}
                      onClick={() => setActiveVideo(sermon.videoId)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveVideo(sermon.videoId); } }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Play ${title}`}
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${sermon.videoId}/mqdefault.jpg`}
                        alt={title}
                        priority={false}
                        fill
                        unoptimized
                      />
                      <div className={styles.thumbOverlay} />
                      <div className={styles.playBtn}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></div>
                    </div>
                    <div className={styles.scBody}>
                      <div className={styles.scSeries}>{t.sundayService}</div>
                      <h3 className={styles.scTitle}>{title}</h3>
                      <div className={styles.scFooter}>
                        <div className={styles.scDate}>{sermon.date}</div>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(`${title}\nhttps://www.youtube.com/watch?v=${sermon.videoId}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.waShare}
                          aria-label={`Share "${title}" on WhatsApp`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* WhatsApp icon */}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          Share
                        </a>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerIn>

          <ScrollReveal delay={100} variant="fadeUp">
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
              <a
                href="https://www.youtube.com/@Pas.Vasanth"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.moreSermonBtn}
              >
                More Sermons
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Video modal ───────────────────────────────────────────────────── */}
      {activeVideo ? (
        <div ref={modalRef} className={styles.modalOverlay} onClick={() => setActiveVideo(null)} role="presentation">
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Video player">
            <button type="button" className={styles.closeBtn} onClick={() => setActiveVideo(null)} aria-label="Close video">&times;</button>
            <div className={styles.videoWrapper}>
              <iframe src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Sermon Video" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
