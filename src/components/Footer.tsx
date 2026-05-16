'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, Users } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { useLang } from './LangContext';
import styles from './Footer.module.css';
import MagneticEffect from '@/components/ui/MagneticEffect';

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
            <MagneticEffect strength={0.4}><a href="https://www.facebook.com/share/1HXvvKSbNE/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF size={16} /></a></MagneticEffect>
            <MagneticEffect strength={0.4}><a href="https://www.instagram.com/trinityprayerhouse_church?igsh=MXEwcXpiaXh6a21jaQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={16} /></a></MagneticEffect>
            <MagneticEffect strength={0.4}><a href="https://www.youtube.com/@Pas.Vasanth" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube size={16} /></a></MagneticEffect>
            <MagneticEffect strength={0.4}><a href="https://wa.me/919786888999" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp size={16} /></a></MagneticEffect>
          </div>
        </motion.div>
        <motion.div className={styles.navCol} variants={footerColVariants}>
          <h4 className={styles.heading}>{t.navigate}</h4>
          <ul className={styles.linkList}>
            <li><Link href="/">{t.home}</Link></li>
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
          <ul className={styles.serviceList}>
            <li className={styles.serviceItem}>
              <span className={styles.serviceName}>{t.promiseService}</span>
              <span className={styles.serviceTime}>1st of Every Month, 6:30 AM</span>
            </li>
            <li className={styles.serviceItem}>
              <span className={styles.serviceName}>{t.sunWorship}</span>
              <span className={styles.serviceTime}>Sundays, 9:30 AM</span>
            </li>
            <li className={styles.serviceItem}>
              <span className={styles.serviceName}>{t.hindiService}</span>
              <span className={styles.serviceTime}>Sundays, 6:30 PM</span>
            </li>
            <li className={styles.serviceItem}>
              <span className={styles.serviceName}>{t.bibleStudy}</span>
              <span className={styles.serviceTime}>Thursdays, 6:30 PM</span>
            </li>
            <li className={styles.serviceItem}>
              <Link href="/online-meet" className={styles.serviceName} style={{ color: '#c7a760' }}>Daily Online Meet</Link>
              <span className={styles.serviceTime}>Everyday, 9:00 PM</span>
            </li>
          </ul>
        </motion.div>
        <motion.div className={styles.contactCol} variants={footerColVariants}>
          <h4 className={styles.heading}>{t.contactUs}</h4>
          <ul>
            <li><Phone size={16} /><div><span>{t.phone}</span><p>+91 9786888999</p></div></li>
            <li><Mail size={16} /><div><span>{t.email}</span><p>trinityprayerhouse.mdk@gmail.com</p></div></li>
            <li><MapPin size={16} /><div><span>{t.address}</span><p>16/300, Gandhi Nagar, Madukkarai, Coimbatore - 641105</p></div></li>
          </ul>
        </motion.div>
      </motion.div>
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomBarContainer}`}>
          <p>&copy; {new Date().getFullYear()} Trinity Prayer House. {t.rights}</p>
          
          <div className={styles.globalReach}>
            <div className={styles.flagGroup}>
              <span className={styles.flagItem} title="India">
                <Image src="https://flagcdn.com/w20/in.png" alt="India" width={16} height={11} unoptimized />
                <span>3.2k</span>
                <Users size={12} className={styles.animatedPeople} />
              </span>
              <span className={styles.flagItem} title="United Arab Emirates">
                <Image src="https://flagcdn.com/w20/ae.png" alt="UAE" width={16} height={11} unoptimized />
                <span>150</span>
                <Users size={12} className={styles.animatedPeople} />
              </span>
              <span className={styles.flagItem} title="United States">
                <Image src="https://flagcdn.com/w20/us.png" alt="USA" width={16} height={11} unoptimized />
                <span>85</span>
                <Users size={12} className={styles.animatedPeople} />
              </span>
              <span className={styles.flagItem} title="United Kingdom">
                <Image src="https://flagcdn.com/w20/gb.png" alt="UK" width={16} height={11} unoptimized />
                <span>40</span>
                <Users size={12} className={styles.animatedPeople} />
              </span>
            </div>
          </div>

          <p>{t.footerGlory}</p>
        </div>
      </div>
    </motion.footer>
  );
}
