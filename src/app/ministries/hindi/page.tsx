'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PhotoCarousel from '@/components/ui/PhotoCarousel';

const worshipImages = [
  '/hindi-ministry/worship-1.jpg',
  '/hindi-ministry/worship-2.jpg',
  '/hindi-ministry/worship-3.jpg',
  '/hindi-ministry/worship-4.jpg',
  '/hindi-ministry/worship-5.jpg',
  '/hindi-ministry/worship-6.jpg',
  '/hindi-ministry/worship-7.jpg',
  '/hindi-ministry/worship-8.jpg',
];

const serviceMapUrl = 'https://maps.app.goo.gl/9k8FbskNZ5gP7mfL7';
const serviceMapEmbedUrl = 'https://www.google.com/maps?q=Rotaract%20Club%20of%20Coimbatore%20Texcity%20Texcity%20Hall%2C%20behind%20Sungam%20Bypass%20Road%2C%20Shanmuga%20Nagar%2C%20Ramanathapuram%2C%20Coimbatore%2C%20Tamil%20Nadu%20641018&output=embed';

export default function HindiMinistryPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/prayer_ministry.png" alt="Hindi Ministry gathering" fill style={{ objectFit: 'cover' }} />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>MINISTRY</div>
            <h1>Hindi Ministry</h1>
            <p className={styles.headerSubtext}>Reaching out to the Hindi-speaking community with worship and the Word.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <Link href="/ministries" className={styles.backBtn}>&larr; Back to Ministries</Link>
          <div className={styles.contentGrid}>
            <ScrollReveal className={styles.textContent}>
              <h2>Worship in Our Heart Language</h2>
              <p>
                Our Hindi Ministry at Trinity Prayer House is dedicated to creating a welcoming spiritual home for Hindi-speaking believers to worship, pray, and grow in faith in their heart language. We believe that God’s Word becomes even more personal and impactful when experienced in a language that speaks directly to the heart, which is why this ministry provides a meaningful space for worship, fellowship, and spiritual encouragement in Hindi.
              </p>
              <p>
                Whether you are new to the city or have been part of the community for years, our Hindi Ministry is a place of belonging, connection, and spiritual growth. Through worship services, prayer, fellowship, and the teaching of God’s Word, we seek to strengthen faith, build lasting relationships, and help every individual experience the love and presence of Christ in a familiar and comforting way.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <PhotoCarousel images={worshipImages} />
            </ScrollReveal>
          </div>

          <div className={styles.serviceDetailsGrid}>
            <ScrollReveal className={styles.serviceDetails}>
              <h2>Service Details</h2>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Location</span>
                <p>Rotaract Club of Coimbatore Texcity (Texcity Hall), behind Sungam Bypass Road, Shanmuga Nagar, Ramanathapuram, Coimbatore, Tamil Nadu - 641018</p>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Time</span>
                <p>Every Sunday at 7:00 PM</p>
              </div>
              <a className={styles.mapLink} href={serviceMapUrl} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </a>
            </ScrollReveal>

            <ScrollReveal delay={200} className={styles.mapWrap}>
              <iframe
                src={serviceMapEmbedUrl}
                title="Hindi Ministry service location map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
