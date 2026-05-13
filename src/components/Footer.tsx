'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { useLang } from './LangContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  const footerGridVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.085,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  const footerColVariants: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.45 }}
    >
      <motion.div
        className={`container ${styles.footerGrid}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={footerGridVariants}
      >
        <motion.div className={styles.brandCol} variants={footerColVariants}>
          <div className={styles.logo}>
            <div className={styles.logoImgWrap}>
              <Image src="/tph-logo.png" alt="Trinity Prayer House" width={44} height={44} style={{ borderRadius: '10px' }} />
            </div>
            <div className={styles.logoText}>
              <span className={styles.churchName}>Trinity Prayer House</span>
              <span className={styles.location}>MADUKKARAI, COIMBATORE</span>
            </div>
          </div>
          <p className={styles.mission}>{t.footerMission}</p>
          <div className={styles.socials}>
            <a href="https://www.facebook.com/share/1HXvvKSbNE/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF size={16} /></a>
            <a href="https://www.instagram.com/trinityprayerhouse_church?igsh=MXEwcXpiaXh6a21jaQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={16} /></a>
            <a href="https://www.youtube.com/@Pas.Vasanth" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube size={16} /></a>
            <a href="https://wa.me/919786888999" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp size={16} /></a>
          </div>
        </motion.div>
        <motion.div className={styles.navCol} variants={footerColVariants}>
          <h4 className={styles.heading}>{t.navigate}</h4>
          <ul>
            <li><Link href="/">{t.home}</Link></li>
            <li><Link href="/new-here">{t.newHere}</Link></li>
            <li><Link href="/vision">{t.about}</Link></li>
            <li><Link href="/mission">{t.mission}</Link></li>
            <li><Link href="/sermons">{t.sermons}</Link></li>
            <li><Link href="/special-meeting">{t.events}</Link></li>
            <li><Link href="/online-meet">{t.googleMeet}</Link></li>
            <li><Link href="/prayer">{t.prayerPage}</Link></li>
            <li><Link href="/give">{t.giving}</Link></li>
            <li><Link href="/contact">{t.contact}</Link></li>
          </ul>
        </motion.div>
        <motion.div className={styles.navCol} variants={footerColVariants}>
          <h4 className={styles.heading}>{t.services}</h4>
          <ul>
            <li>{t.promiseService}: 1st of Every Month, 6:30 AM</li>
            <li>{t.sunWorship}: 9:30 AM</li>
            <li>{t.hindiService}: Sun, 6:30 PM</li>
            <li>{t.bibleStudy}: Thu, 6:30 PM</li>
            <li><Link href="/online-meet" style={{ color: '#c7a760' }}>Daily Online Meet: Everyday, 9:00 PM</Link></li>
            <li>Fasting Prayer: 1st Sat, 10:30 AM</li>
            <li>Night Prayer: 4th Fri, 10:00 PM</li>
          </ul>
        </motion.div>
        <motion.div className={styles.contactCol} variants={footerColVariants}>
          <h4 className={styles.heading}>{t.contactUs}</h4>
          <ul>
            <li><Phone size={13} /><div><span>{t.phone}</span><p>+91 9786888999</p></div></li>
            <li><Mail size={13} /><div><span>{t.email}</span><p>trinityprayerhouse.mdk@gmail.com</p></div></li>
            <li><MapPin size={13} /><div><span>{t.address}</span><p>16/300, Gandhi Nagar, Madukkarai, Coimbatore - 641105</p></div></li>
          </ul>
        </motion.div>
      </motion.div>
      <div className={styles.bottomBar}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p>&copy; {new Date().getFullYear()} Trinity Prayer House. {t.rights}</p>
          <p>{t.footerGlory}</p>
        </div>
      </div>
    </motion.footer>
  );
}
