'use client';
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
  const { t } = useLang();

  return (
    <>
      {/* ── Featured latest sermon ────────────────────────────────────────── */}
      <section className={`${styles.featuredSection} pres-band-muted`}>
        <div className={`container ${styles.featuredGrid}`}>
          <ScrollReveal delay={100} variant="fadeLeft" className={styles.featuredVideo}>
            <div className={`${styles.embedWrap} pres-card-static hover-lift`}>
              <iframe
                src={`https://www.youtube.com/embed/${latest.videoId}?rel=0&modestbranding=1&playsinline=1`}
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
                  <a 
                    href={`https://www.youtube.com/watch?v=${sermon.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.sermonCard} hover-lift shine-frame`}
                    aria-label={`Play ${title}`}
                  >
                    <div className={`${styles.scVideoThumb} ${styles.scVideoThumbFill}`}>
                      <Image
                        src={`https://img.youtube.com/vi/${sermon.videoId}/mqdefault.jpg`}
                        alt={title}
                        priority={false}
                        fill
                        unoptimized
                        className={styles.thumbImg}
                      />
                      <div className={styles.thumbOverlay} />
                      <div className={styles.playBtn}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></div>
                    </div>
                    <div className={styles.scBody}>
                      <div className={styles.scSeries}>{t.sundayService}</div>
                      <h3 className={styles.scTitle}>{title}</h3>
                      <div className={styles.scFooter}>
                        <div className={styles.scDate}>{sermon.date}</div>
                      </div>
                    </div>
                  </a>
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
    </>
  );
}
