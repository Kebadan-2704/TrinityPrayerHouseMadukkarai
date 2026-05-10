'use client';

import { useState } from 'react';
import styles from './page.module.css';

const SERMONS = [
  { id: 1, title: 'Walking By Faith, Not By Sight', series: 'Faith', category: 'Faith', youtubeId: 'Hlp-YGkRDGQ', date: 'May 4, 2025' },
  { id: 2, title: 'The Power of Persistent Prayer', series: 'Prayer', category: 'Prayer', youtubeId: 'dQw4w9WgXcQ', date: 'Apr 27, 2025' },
  { id: 3, title: 'Grace Greater Than All Our Sin', series: 'Grace', category: 'Grace', youtubeId: 'aJOTlE1K90k', date: 'Apr 20, 2025' },
  { id: 4, title: 'Led by the Spirit', series: 'Holy Spirit', category: 'Holy Spirit', youtubeId: 'dyYEjmd8XSA', date: 'Apr 13, 2025' },
  { id: 5, title: 'Building Strong Families', series: 'Family', category: 'Family', youtubeId: 'jfKfPfyJRdk', date: 'Apr 6, 2025' },
  { id: 6, title: 'Faith That Moves Mountains', series: 'Faith', category: 'Faith', youtubeId: 'YQHsXMglC9A', date: 'Mar 30, 2025' },
];

const CATEGORIES = ['All Sermons', 'Faith', 'Prayer', 'Grace', 'Holy Spirit', 'Family'];

export default function Sermons() {
  const [activeFilter, setActiveFilter] = useState('All Sermons');

  const filteredSermons = activeFilter === 'All Sermons' 
    ? SERMONS 
    : SERMONS.filter(s => s.category === activeFilter);

  return (
    <div className={styles.pageWrap}>
      <section className={styles.headerSection}>
        <div className="container">
          <div className={styles.secLabel}>THE WORD</div>
          <h1>Sermons & <i>Messages</i></h1>
          <p>Be strengthened, equipped, and encouraged by the living Word of God from our Sunday services and special programmes.</p>
        </div>
      </section>

      <section className={`section-padding ${styles.sermonsSection}`}>
        <div className="container">
          <div className={styles.filterWrap}>
            <div className={styles.secLabel}>MESSAGES</div>
            <h2>Recent <i>Sermons</i></h2>
            
            <div className={styles.filterBtns}>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  className={`${styles.filterBtn} ${activeFilter === cat ? styles.active : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sermonGrid}>
            {filteredSermons.map(sermon => (
              <div key={sermon.id} className={styles.sermonCard}>
                <div className={styles.scVideo}>
                  <iframe 
                    src={`https://www.youtube.com/embed/${sermon.youtubeId}?rel=0&modestbranding=1`}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                  />
                </div>
                <div className={styles.scBody}>
                  <div className={styles.scSeries}>Series: {sermon.series}</div>
                  <h3 className={styles.scTitle}>{sermon.title}</h3>
                  <div className={styles.scDate}>{sermon.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
