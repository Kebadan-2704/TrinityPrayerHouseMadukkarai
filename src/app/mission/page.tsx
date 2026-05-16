'use client';
import Image from 'next/image';
import styles from './mission.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggeredText from '@/components/ui/StaggeredText';
import { useLang } from '@/components/LangContext';

export default function Mission() {
  const { t } = useLang();
  return (
    <div className="pageWrap">
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/bm.jpg" alt="Mission history photo" fill style={{ objectFit: 'cover', objectPosition: 'center 68%'}} />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100} variant="blurIn">
            <div className={styles.secLabel}>{t.missionUs}</div>
            <h1>
              <StaggeredText text={t.missionH1a} el="span" /> 
              <i><StaggeredText text={t.missionH1b} el="span" /></i> 
              <StaggeredText text={t.missionH1c} el="span" />
            </h1>
            <p className={styles.headerSubtext}>{t.missionSub}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section-padding ${styles.contentSection} pres-band-soft pres-rail`}>
        <div className={`container ${styles.missionGrid}`}>
          <div className={styles.mainText}>
            <ScrollReveal delay={100}>
              <h2><StaggeredText text="A Blessed Legacy" el="span" /></h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className={styles.leadText}>
                <StaggeredText text="One of the most significant ministers who emerged during the early days of the Pentecostal movement in Coimbatore district was Pastor Davy Sathyanathan. His wife was Mrs. Chandra Sathyanathan. Pastor Vasanth Sathyanathan was born as the second son to this blessed couple." />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <StaggeredText text="After completing his schooling, questions about his future began to arise. While he was praying about this, one morning there was a knock at the door of their house. When they opened it, Evangelist Mohan C. Lazarus was standing there. Pastor Davy Sathyanathan and Mohan C. Lazarus had a close relationship through ministry, and therefore Mohan C. often visited the Madukkarai church." />
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <StaggeredText text="On that particular visit, he looked at the young Vasanth Sathyanathan and prophetically declared that the Lord was calling him into ministry. He also said that he himself would take him to Chennai and bear all the expenses for his studies. Immediately, Pastor Davy Sathyanathan and Mohan C. Lazarus together took Vasanth Sathyanathan to Chennai and enrolled him in Hindustan Bible College." />
            </ScrollReveal>
            <ScrollReveal delay={500}>
              <StaggeredText text="After graduating from Bible college, he began serving in ministry under his father from a very young age." />
            </ScrollReveal>
            <ScrollReveal delay={600}>
              <StaggeredText text="However, the Lord’s plan unfolded differently. Within only a few years after entering ministry, he lost his beloved father. Yet the Lord faithfully continued to lead and sustain him in the ministry." />
            </ScrollReveal>
            <ScrollReveal delay={700}>
              <StaggeredText text="According to God’s will, he accepted Danalatha as his life partner. This blessed couple has been gifted with a daughter and a son." />
            </ScrollReveal>
            <ScrollReveal delay={800}>
              <StaggeredText text="As the years passed, the Lord began to use him more and more powerfully both within India and abroad. He has ministered extensively in countries such as the United States of America, Abu Dhabi, Kuwait, and the United Arab Emirates." />
            </ScrollReveal>
            <ScrollReveal delay={900}>
              <StaggeredText text="At present, he is faithfully serving as the Senior Pastor of Trinity Prayer House according to the will of God." />
            </ScrollReveal>
            <ScrollReveal delay={1000}>
              <StaggeredText text="We lovingly invite you to join our live services to hear life-transforming messages that heal broken hearts, restore wounded souls, and bring prophetic words from the Lord. For further details and prayer support, please feel free to contact us." />
            </ScrollReveal>
          </div>
          <ScrollReveal delay={320} variant="fadeLeft" className={styles.sideContent}>
            <div className={styles.pastorCard}>
              <div className={styles.pastorImageWrap}><Image src="/vmain.jpeg" alt="Pastor Vasanth Sathyanathan" fill style={{ objectFit: 'cover', objectPosition: '55% 17%' }} /></div>
              <div className={styles.pastorInfo}>
                <div className={styles.secLabel}>{t.seniorPastor}</div>
                <h3>Pastor Vasanth Sathyanathan</h3>
                <p>{t.pastorDesc}</p>
              </div>
            </div>
            <div className={styles.quoteBlock}>
              <h3>&ldquo;<StaggeredText text={t.aboutQuote || 'We are not just building a church; we are building people.'} el="span" />&rdquo;</h3>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
