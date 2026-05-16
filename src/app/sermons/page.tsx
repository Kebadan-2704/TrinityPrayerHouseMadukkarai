'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggerIn, { StaggerItem } from '@/components/ui/StaggerIn';
import StaggeredText from '@/components/ui/StaggeredText';
import { useLang } from '@/components/LangContext';

export default function Sermons() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { t } = useLang();
  const [latestSermon, setLatestSermon] = useState<{ videoId: string; title: string; date: string; displayTitle?: string } | null>(null);
  const [archiveSermons, setArchiveSermons] = useState<Array<Record<string, unknown>>>([]);
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

  useEffect(() => {
    fetch('/api/latest-sermon')
      .then((res) => res.json())
      .then((data) => {
        const latest = data?.latest ?? data;
        if (latest?.videoId) setLatestSermon(latest);
        setArchiveSermons(data.archive ?? []);
      })
      .catch((err) => console.error('Failed to fetch sermons:', err));
  }, []);

  const filteredSermons = archiveSermons;

  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/worship.jpg" alt="Sermons and worship" fill style={{ objectFit: 'cover' }} />
          <div className={styles.headerOverlay} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={80} variant="blurIn">
            <div className={styles.secLabel}>{t.theWord}</div>
            <h1>
              <StaggeredText text={t.sermonsH1a} el="span" /> 
              <i><StaggeredText text={t.sermonsH1b} el="span" /></i>
            </h1>
            <p className={styles.headerP}><StaggeredText text={t.sermonsSub} el="span" /></p>
          </ScrollReveal>
        </div>
      </section>

      <section className={`${styles.featuredSection} pres-band-muted`}>
        <div className={`container ${styles.featuredGrid}`}>
          <ScrollReveal delay={100} variant="fadeLeft" className={styles.featuredVideo}>
            <div className={`${styles.embedWrap} pres-card-static hover-lift`}>
              <iframe
                src={`https://www.youtube.com/embed/${latestSermon?.videoId || 'dngkoXyTIFU'}?rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Latest Sermon"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={220} variant="fadeRight" className={styles.featuredInfo}>
            <div className={styles.secLabel}>{t.latestMessage}</div>
            <h2><StaggeredText text={latestSermon?.displayTitle ?? latestSermon?.title ?? t.featuredTitle} el="span" /></h2>
            <p className={styles.featuredDate}>{latestSermon?.date || t.featuredDate}</p>
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

      <section className={`section-padding ${styles.sermonsSection} pres-band-soft pres-rail`}>
        <div className="container">
          <ScrollReveal amount={0.2} variant="scale" className={styles.filterWrap}>
            <div className={styles.secLabel}>{t.messages}</div>
            <h2 className={styles.archiveTitle}>
              <StaggeredText text={t.recentSermons} el="span" /> 
              <i><StaggeredText text={t.recentSermonsI} el="span" /></i>
            </h2>
          </ScrollReveal>
          <StaggerIn className={styles.sermonGrid}>
            {filteredSermons.map((sermon) => {
              const videoId = String(sermon.videoId);
              const title = String(sermon.displayTitle ?? sermon.title);
              const date = String(sermon.date ?? '');
              return (
                <StaggerItem key={videoId}>
                  <div className={`${styles.sermonCard} hover-lift shine-frame`}>
                    <div
                      className={`${styles.scVideoThumb} ${styles.scVideoThumbFill}`}
                      onClick={() => setActiveVideo(videoId)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveVideo(videoId); } }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Play ${title}`}
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                        alt={title}
                        priority={false}
                        fill
                        unoptimized
                      />
                      <div className={styles.thumbOverlay} />
                      <div className={styles.playBtn}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></div>
                    </div>
                    <div className={styles.scBody}>
                      <div className={styles.scSeries}>Sunday Service</div>
                      <h3 className={styles.scTitle}>{title}</h3>
                      <div className={styles.scDate}>{date}</div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerIn>
        </div>
      </section>

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
    </div>
  );
}
