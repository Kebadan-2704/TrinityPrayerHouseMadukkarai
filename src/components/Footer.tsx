'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { useLang } from './LangContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <div className={styles.logoImgWrap}><Image src="/logo.png" alt="Logo" width={44} height={44} /></div>
            <div className={styles.logoText}>
              <span className={styles.churchName}>Trinity Prayer House</span>
              <span className={styles.location}>MADUKKARAI, COIMBATORE</span>
            </div>
          </div>
          <p className={styles.mission}>{t.footerMission}</p>
          <div className={styles.socials}>
            <a href="https://www.facebook.com/trinityprayerhouse" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF size={16} /></a>
            <a href="https://www.instagram.com/vasanthsathyanathan.official" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={16} /></a>
            <a href="https://www.youtube.com/@Pas.Vasanth" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube size={16} /></a>
            <a href="https://wa.me/919786888999" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp size={16} /></a>
          </div>
        </div>
        <div className={styles.navCol}>
          <h4 className={styles.heading}>{t.navigate}</h4>
          <ul>
            <li><Link href="/">{t.home}</Link></li>
            <li><Link href="/new-here">{t.newHere}</Link></li>
            <li><Link href="/about">{t.about}</Link></li>
            <li><Link href="/sermons">{t.sermons}</Link></li>
            <li><Link href="/events">{t.events}</Link></li>
            <li><Link href="/prayer">{t.prayerPage}</Link></li>
            <li><Link href="/give">{t.giving}</Link></li>
            <li><Link href="/contact">{t.contact}</Link></li>
          </ul>
        </div>
        <div className={styles.navCol}>
          <h4 className={styles.heading}>{t.services}</h4>
          <ul>
            <li>{t.promiseService}: 1st, 6:30 AM</li>
            <li>{t.sunWorship}: 9:30 AM</li>
            <li>{t.hindiService}: Sun, 6:30 PM</li>
            <li>{t.bibleStudy}: Thu, 7:30 PM</li>
          </ul>
        </div>
        <div className={styles.contactCol}>
          <h4 className={styles.heading}>{t.contactUs}</h4>
          <ul>
            <li><Phone size={13} /><div><span>{t.phone}</span><p>+91 9786888999</p></div></li>
            <li><Mail size={13} /><div><span>{t.email}</span><p>trinityprayerhouse.mdk@gmail.com</p></div></li>
            <li><MapPin size={13} /><div><span>{t.address}</span><p>16/300, Gandhi Nagar, Madukkarai, Coimbatore - 641105</p></div></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p>&copy; {new Date().getFullYear()} Trinity Prayer House. {t.rights}</p>
          <p>{t.footerGlory}</p>
        </div>
      </div>
    </footer>
  );
}
