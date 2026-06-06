import styles from './page.module.css';

function SkeletonCard() {
  return (
    <div className={`${styles.sermonCard} ${styles.skeletonCard}`}>
      {/* Thumbnail placeholder */}
      <div
        className={styles.skeletonThumb}
        style={{ paddingBottom: '56.25%', position: 'relative' }}
      />
      {/* Body placeholder */}
      <div className={styles.scBody}>
        <div className={styles.skeletonLine} style={{ height: '10px', width: '40%', marginBottom: '0.6rem' }} />
        <div className={styles.skeletonLine} style={{ height: '14px', width: '90%', marginBottom: '0.4rem' }} />
        <div className={styles.skeletonLine} style={{ height: '14px', width: '70%', marginBottom: '0.8rem' }} />
        <div className={styles.skeletonLine} style={{ height: '10px', width: '30%' }} />
      </div>
    </div>
  );
}

export default function SermonsLoading() {
  return (
    <div className={styles.pageWrap}>
      {/* Hero placeholder */}
      <section
        className={`${styles.headerSection} mesh-editorial-header`}
        style={{ background: 'var(--primary)' }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.skeletonLine} style={{ height: '12px', width: '80px', margin: '0 auto 1rem' }} />
          <div className={styles.skeletonLine} style={{ height: '48px', width: '340px', maxWidth: '90%', margin: '0 auto 1rem' }} />
          <div className={styles.skeletonLine} style={{ height: '16px', width: '500px', maxWidth: '90%', margin: '0 auto' }} />
        </div>
      </section>

      {/* Featured sermon placeholder */}
      <section className={`${styles.featuredSection} pres-band-muted`}>
        <div className={`container ${styles.featuredGrid}`}>
          <div className={styles.skeletonThumb} style={{ paddingBottom: '56.25%', position: 'relative', borderRadius: 'var(--radius-md)' }} />
          <div>
            <div className={styles.skeletonLine} style={{ height: '12px', width: '100px', marginBottom: '1rem' }} />
            <div className={styles.skeletonLine} style={{ height: '32px', width: '85%', marginBottom: '0.6rem' }} />
            <div className={styles.skeletonLine} style={{ height: '32px', width: '60%', marginBottom: '1rem' }} />
            <div className={styles.skeletonLine} style={{ height: '10px', width: '120px', marginBottom: '1.5rem' }} />
            <div className={styles.skeletonLine} style={{ height: '14px', width: '90%', marginBottom: '0.4rem' }} />
            <div className={styles.skeletonLine} style={{ height: '14px', width: '75%' }} />
          </div>
        </div>
      </section>

      {/* Sermon grid skeleton */}
      <section className={`section-padding ${styles.sermonsSection} pres-band-soft`}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <div className={styles.skeletonLine} style={{ height: '12px', width: '80px', marginBottom: '1rem' }} />
            <div className={styles.skeletonLine} style={{ height: '36px', width: '260px' }} />
          </div>
          <div className={styles.sermonGrid}>
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
