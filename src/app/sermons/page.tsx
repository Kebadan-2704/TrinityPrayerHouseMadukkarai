'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useLang } from '@/components/LangContext';

const SERMONS = [
  { id: 1, title: 'Sunday Worship Service — Live', series: 'Worship', category: 'Worship', youtubeId: 'HdCWiWpGx_A', date: 'May 10, 2025' },
  { id: 2, title: 'Sunday Morning Service', series: 'Worship', category: 'Worship', youtubeId: 'NxzTbNiGhzw', date: 'May 4, 2025' },
  { id: 3, title: 'Fasting Prayer & Communion', series: 'Prayer', category: 'Prayer', youtubeId: 'CHTNywEu6xk', date: 'Apr 27, 2025' },
  { id: 4, title: 'Evening Worship Service', series: 'Worship', category: 'Worship', youtubeId: 'ggkIWO7wlXU', date: 'Apr 20, 2025' },
  { id: 5, title: 'Midweek Bible Study', series: 'Holy Spirit', category: 'Holy Spirit', youtubeId: '2TqbqJJWG04', date: 'Apr 16, 2025' },
  { id: 6, title: 'Good Friday Special Service', series: 'Special', category: 'Special', youtubeId: 'yiRahs-0Vh4', date: 'Apr 13, 2025' },
  { id: 7, title: 'Easter Sunday Celebration', series: 'Special', category: 'Special', youtubeId: 'K-CKdm4mzFM', date: 'Apr 6, 2025' },
  { id: 8, title: 'Promise Service — Monthly', series: 'Prayer', category: 'Prayer', youtubeId: 'B6qjzKuYLOY', date: 'Apr 1, 2025' },
  { id: 9, title: 'Youth Conference Night', series: 'Youth', category: 'Youth', youtubeId: 'GrIaQM4LOkQ', date: 'Mar 30, 2025' },
];

const CATEGORIES = ['All Messages', 'Worship', 'Prayer', 'Holy Spirit', 'Special', 'Youth'];

export default function Sermons() {
  const [activeFilter, setActiveFilter] = useState('All Messages');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { t } = useLang();

  const filteredSermons = activeFilter === 'All Messages'
    ? SERMONS : SERMONS.filter(s => s.category === activeFilter);

  return (
    <div className={styles.pageWrap}>
      <section className={styles.headerSection}>
        <div className={styles.headerBg}>
          <Image src="/worship.png" alt="" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>{t.theWord}</div>
            <h1>{t.sermonsH1a} <i>{t.sermonsH1b}</i></h1>
            <p className={styles.headerP}>{t.sermonsSub}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.featuredSection}>
        <div className={`container ${styles.featuredGrid}`}>
          <ScrollReveal delay={100} className={styles.featuredVideo}>
            <div className={styles.embedWrap}>
              <iframe src="https://www.youtube.com/embed/HdCWiWpGx_A?rel=0&modestbranding=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Latest Sermon" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={300} className={styles.featuredInfo}>
            <div className={styles.secLabel}>{t.latestMessage}</div>
            <h2>{t.featuredTitle}</h2>
            <p className={styles.featuredDate}>{t.featuredDate}</p>
            <p className={styles.featuredDesc}>{t.featuredDesc}</p>
            <a href="https://www.youtube.com/@Pas.Vasanth" target="_blank" rel="noopener noreferrer" className={styles.editorialLink}>
              {t.visitYT}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section-padding ${styles.sermonsSection}`}>
        <div className="container">
          <div className={styles.filterWrap}>
            <div className={styles.secLabel}>{t.messages}</div>
            <h2 className={styles.archiveTitle}>{t.recentSermons} <i>{t.recentSermonsI}</i></h2>
            <div className={styles.filterBtns}>
              {CATEGORIES.map(cat => (
                <button key={cat} className={`${styles.filterBtn} ${activeFilter === cat ? styles.active : ''}`} onClick={() => setActiveFilter(cat)}>
                  {cat === 'All Messages' ? t.allMessages : cat}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.sermonGrid}>
            {filteredSermons.map((sermon, index) => (
              <ScrollReveal key={sermon.id} delay={80 * (index % 3 + 1)} className={styles.sermonCard}>
                <div className={styles.scVideoThumb} onClick={() => setActiveVideo(sermon.youtubeId)} role="button" tabIndex={0} aria-label={`Play ${sermon.title}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://img.youtube.com/vi/${sermon.youtubeId}/mqdefault.jpg`} alt={sermon.title} className={styles.thumbImg} loading="lazy" />
                  <div className={styles.thumbOverlay}></div>
                  <div className={styles.playBtn}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
                </div>
                <div className={styles.scBody}>
                  <div className={styles.scSeries}>{sermon.series}</div>
                  <h3 className={styles.scTitle}>{sermon.title}</h3>
                  <div className={styles.scDate}>{sermon.date}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {activeVideo && (
        <div className={styles.modalOverlay} onClick={() => setActiveVideo(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setActiveVideo(null)} aria-label="Close video">&times;</button>
            <div className={styles.videoWrapper}>
              <iframe src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Sermon Video" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
