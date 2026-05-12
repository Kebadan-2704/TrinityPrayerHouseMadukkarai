'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ministries.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useLang } from '@/components/LangContext';

export default function Ministries() {
  const { t } = useLang();
  const ministries = [
    { id: 'kids', title: t.kidsMin, subtitle: t.ministriesLabel, desc: t.kidsDesc, image: '/kids_ministry_new.jpg' },
    { id: 'youth', title: t.youthMin, subtitle: t.ministriesLabel, desc: t.youthDesc, image: '/youth_ministry_new.jpg' },
    { id: 'mens', title: t.mensMin, subtitle: t.ministriesLabel, desc: t.mensDesc, image: '/mens_ministry_new.jpg' },
    { id: 'womens', title: t.womenMin, subtitle: t.ministriesLabel, desc: t.womenDesc, image: '/womens_ministry_new.jpg' },
    { id: 'hindi', title: t.hindiMin, subtitle: t.ministriesLabel, desc: t.hindiDesc, image: '/hindi_ministry_new.jpg' },
    { id: 'oldage', title: t.oldAgeMin, subtitle: t.ministriesLabel, desc: t.oldAgeDesc, image: '/oldage_ministry_new.jpg' },
    { id: 'branches', title: t.branchMin, subtitle: t.ministriesLabel, desc: t.branchDesc, image: '/prayer_ministry.png' },
  ];
  return (
    <div className="pageWrap">
      <section className={styles.headerSection}>
        <div className={styles.headerBg}>
          <Image
            src="/youth.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 80%' /* Adjust '80%' to 'center', 'bottom', or a percentage to manually shift the image up/down */
            }}
          />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>{t.ministriesLabel}</div>
            <h1>{t.ministriesH1a} <i>{t.ministriesH1b}</i></h1>
            <p className={styles.headerSubtext}>{t.ministriesSub}</p>
          </ScrollReveal>
        </div>
      </section>
      <section className={`section-padding ${styles.ministrySection}`}>
        <div className={`container ${styles.ministryGrid}`}>
          {ministries.map((min, index) => (
            <Link href={`/ministries/${min.id}`} key={min.id} style={{ textDecoration: 'none' }}>
              <ScrollReveal delay={100 * (index + 1)} className={styles.ministryCard}>
                <div className={styles.cardImageWrap}>
                  <Image src={min.image} alt={min.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
                  <div className={styles.cardImageOverlay}></div>
                </div>
                <div className={styles.cardContent}>
                  <h2>{min.title}</h2>
                  <p>{min.desc}</p>
                  <span className={styles.exploreLink}>Explore Ministry &rarr;</span>
                </div>
              </ScrollReveal>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
