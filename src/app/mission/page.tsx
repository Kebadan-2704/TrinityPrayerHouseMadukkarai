'use client';
import Image from 'next/image';
import styles from './mission.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useLang } from '@/components/LangContext';

export default function Mission() {
  const { t } = useLang();
  return (
    <div className="pageWrap">
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/old.jpg" alt="Mission history photo" fill style={{ objectFit: 'cover' }} />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100} variant="blurIn">
            <div className={styles.secLabel}>{t.missionUs}</div>
            <h1>{t.missionH1a} <i>{t.missionH1b}</i> {t.missionH1c}</h1>
            <p className={styles.headerSubtext}>{t.missionSub}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section-padding ${styles.contentSection} pres-band-soft pres-rail`}>
        <div className={`container ${styles.missionGrid}`}>
          <div className={styles.mainText}>
            <ScrollReveal delay={100}>
              <h2>A Blessed Legacy</h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className={styles.leadText}>
                One of the most significant ministers who emerged during the early days of the Pentecostal movement in Coimbatore district was <span className={styles.highlight}>Pastor Davy Sathyanathan</span>. His wife was <span className={styles.highlight}>Mrs. Chandra Sathyanathan</span>. <span className={styles.highlight}>Pastor Vasanth Sathyanathan</span> was born as the second son to this blessed couple.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p>
                After completing his schooling, questions about his future began to arise. While he was praying about this, one morning there was a knock at the door of their house. When they opened it, <span className={styles.highlight}>Evangelist Mohan C. Lazarus</span> was standing there. Pastor Davy Sathyanathan and Mohan C. Lazarus had a close relationship through ministry, and therefore Mohan C. often visited the Madukkarai church.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <p>
                On that particular visit, he looked at the young Vasanth Sathyanathan and prophetically declared that the Lord was calling him into ministry. He also said that he himself would take him to Chennai and bear all the expenses for his studies. Immediately, Pastor Davy Sathyanathan and Mohan C. Lazarus together took Vasanth Sathyanathan to Chennai and enrolled him in <span className={styles.highlight}>Hindustan Bible College</span>.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={500}>
              <p>
                After graduating from Bible college, he began serving in ministry under his father from a very young age.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={600}>
              <p>
                However, the Lord’s plan unfolded differently. Within only a few years after entering ministry, he lost his beloved father. Yet the Lord faithfully continued to lead and sustain him in the ministry.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={700}>
              <p>
                According to God’s will, he accepted <span className={styles.highlight}>Danalatha</span> as his life partner. This blessed couple has been gifted with a daughter and a son.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={800}>
              <p>
                As the years passed, the Lord began to use him more and more powerfully both within India and abroad. He has ministered extensively in countries such as the United States of America, Abu Dhabi, Kuwait, and the United Arab Emirates.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={900}>
              <p>
                At present, he is faithfully serving as the <span className={styles.highlight}>Senior Pastor of Trinity Prayer House</span> according to the will of God.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={1000}>
              <p>
                We lovingly invite you to join our live services to hear life-transforming messages that heal broken hearts, restore wounded souls, and bring prophetic words from the Lord. For further details and prayer support, please feel free to contact us.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={320} variant="fadeLeft" className={styles.sideContent}>
            <div className={styles.pastorCard}>
              <div className={styles.pastorImageWrap}><Image src="/vmain.jpeg" alt="Pastor Vasanth Sathyanathan" fill style={{ objectFit: 'cover', objectPosition: '50% 3%' }} /></div>
              <div className={styles.pastorInfo}>
                <div className={styles.secLabel}>{t.seniorPastor}</div>
                <h3>Pastor Vasanth Sathyanathan</h3>
                <p>{t.pastorDesc}</p>
              </div>
            </div>
            <div className={styles.quoteBlock}>
              <h3>&ldquo;{t.aboutQuote || 'We are not just building a church; we are building people.'}&rdquo;</h3>
            </div>
          </ScrollReveal>
        </div>
      </section>


    </div>
  );
}
