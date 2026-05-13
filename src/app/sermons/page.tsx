'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggerIn, { StaggerItem } from '@/components/ui/StaggerIn';
import { useLang } from '@/components/LangContext';

export default function Sermons() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { t } = useLang();
  const [latestSermon, setLatestSermon] = useState<{ videoId: string; title: string; date: string } | null>(null);
  const [archiveSermons, setArchiveSermons] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    fetch('/api/latest-sermon')
      .then((res) => res.json())
      .then((data) => {
        setLatestSermon(data.latest);
        setArchiveSermons(data.archive ?? []);
      })
      .catch((err) => console.error('Failed to fetch sermons:', err));
  }, []);

  const filteredSermons = archiveSermons;

  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/worship.jpg" alt="" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.headerOverlay} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={80} variant="blurIn">
            <div className={styles.secLabel}>{t.theWord}</div>
            <h1>{t.sermonsH1a} <i>{t.sermonsH1b}</i></h1>
            <p className={styles.headerP}>{t.sermonsSub}</p>
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
            <h2>{latestSermon?.title || t.featuredTitle}</h2>
            <p className={styles.featuredDate}>{latestSermon?.date || t.featuredDate}</p>
            <p className={styles.featuredDesc}>{t.featuredDesc}</p>
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
            <h2 className={styles.archiveTitle}>{t.recentSermons} <i>{t.recentSermonsI}</i></h2>
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
                      className={styles.scVideoThumb}
                      onClick={() => setActiveVideo(videoId)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveVideo(videoId); } }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Play ${title}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} alt={title} className={styles.thumbImg} loading="lazy" />
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
        <div className={styles.modalOverlay} onClick={() => setActiveVideo(null)} role="presentation">
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
