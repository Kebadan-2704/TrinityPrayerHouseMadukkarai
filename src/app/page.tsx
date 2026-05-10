import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      {/* Luxury CSS Gradient Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
          <div className={styles.gridOverlay}></div>
        </div>
        <div className={styles.heroContent}>
          <div className="container">
            <div className={`animate-fade-in ${styles.heroTextWrap}`}>
              <h2 className={styles.heroEyebrow}>TRINITY PRAYER HOUSE · MADUKKARAI</h2>
              <h1 className={styles.heroHeadline}>
                A Place of <br/>
                <i>Encounter</i> & <i>Peace</i>
              </h1>
              <p className={styles.heroSubtext}>
                We are a Spirit-filled church family building authentic community and pursuing deeper relationships with God.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/contact" className={`btn-primary ${styles.heroBtn}`}>Plan a Visit</Link>
                <Link href="/sermons" className={`btn-outline ${styles.heroBtn}`}>Watch Latest Message</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Welcome Section */}
      <section className={`section-padding ${styles.welcomeSection}`}>
        <div className={`container ${styles.welcomeGrid}`}>
          <div className={styles.welcomeText}>
            <div className={styles.secLabel}>OUR STORY</div>
            <h2>Rooted in Prayer.<br/>Built on Love.</h2>
            <p className={styles.leadText}>
              Since 1976, Trinity Prayer House has stood as a beacon of hope in Coimbatore. We believe in the transforming power of the Holy Spirit and the authority of God's Word.
            </p>
            <p>
              Whether you are taking your first steps toward faith or looking for a church family to call home, you are welcome here. We are a multi-generational community passionate about worship, intercession, and seeing lives changed.
            </p>
            <Link href="/about" className={styles.editorialLink}>
              Discover Our History
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>
          
          <div className={styles.welcomeImageWrap}>
            <div className={styles.imagePlaceholder}>
              {/* Premium native HTML5 Video looping silently, or an aesthetic placeholder if no video */}
              <div className={styles.imageOverlay}></div>
              <span>Worship & Community Focus</span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Times Strip - Refined */}
      <section className={styles.serviceStrip}>
        <div className="container">
          <div className={styles.serviceGrid}>
            <div className={styles.serviceItem}>
              <div className={styles.serviceLine}></div>
              <h3>Sunday Worship</h3>
              <p className={styles.time}>9:30 <span>AM</span></p>
              <p className={styles.desc}>Tamil Service & Kids Ministry</p>
            </div>
            <div className={styles.serviceItem}>
              <div className={styles.serviceLine}></div>
              <h3>Hindi Service</h3>
              <p className={styles.time}>6:30 <span>PM</span></p>
              <p className={styles.desc}>Sunday Evening Service</p>
            </div>
            <div className={styles.serviceItem}>
              <div className={styles.serviceLine}></div>
              <h3>Bible Study</h3>
              <p className={styles.time}>7:30 <span>PM</span></p>
              <p className={styles.desc}>Thursday Evening</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
