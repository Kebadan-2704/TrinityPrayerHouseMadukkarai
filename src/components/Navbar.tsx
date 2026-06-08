'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLang } from './LangContext';
import { Globe } from 'lucide-react';
import styles from './Navbar.module.css';
import MagneticEffect from '@/components/ui/MagneticEffect';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMeetActive, setIsMeetActive] = useState(false);
  const pathname = usePathname();
  const { t, showPicker, setShowPicker } = useLang();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const istString = now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
      const istTime = new Date(istString);
      
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();

      // Between 8:50 PM and 10:00 PM (20:50 - 21:59)
      if ((hours === 20 && minutes >= 50) || hours === 21) {
        setIsMeetActive(true);
      } else {
        setIsMeetActive(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1200px)');
    const onChange = () => {
      if (mq.matches) setIsOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { href: '/vision', label: t.about },
    { href: '/mission', label: t.mission },
    { href: '/sermons', label: t.sermons },
    { href: '/ministries', label: t.ministries },
    { href: '/special-meeting', label: t.events },
    { href: '/online-meet', label: t.googleMeet },
    { href: '/give', label: t.giving },
    { href: '/contact', label: t.contact },
  ];

  const linkStagger = reduceMotion ? 0 : 0.08;

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        aria-label="Primary"
        initial={reduceMotion ? { x: "-50%", y: 0, opacity: 1 } : { x: "-50%", y: -16, opacity: 0 }}
        animate={{ x: "-50%", y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.navInner}>
          <MagneticEffect strength={0.1}>
            <Link href="/" className={styles.logo} onClick={closeMenu}>
               <div className={styles.logoImgWrap}>
                 <Image src="/tph-logo.png" alt="Trinity Prayer House" width={38} height={38} style={{ borderRadius: '8px' }} />
               </div>
              <span className={styles.logoMark}>TPH</span>
            </Link>
          </MagneticEffect>

          <div className={styles.desktopNav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
                style={{ position: 'relative' }}
              >
                <span>{item.label}</span>
                {item.href === '/online-meet' && isMeetActive && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-12px',
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 800,
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                    border: '2px solid rgba(14, 14, 28, 0.95)'
                  }}>
                    1
                  </span>
                )}
                {pathname === item.href ? <span className={styles.navUnderline} aria-hidden /> : null}
              </Link>
            ))}
          </div>

          <div className={styles.navActions}>
            <MagneticEffect strength={0.3}>
              <button
                type="button"
                className={styles.langToggle}
                onClick={() => setShowPicker(true)}
                aria-haspopup="dialog"
                aria-expanded={showPicker}
                aria-controls="lang-picker-modal"
                aria-label="Change language"
              >
                <Globe size={17} strokeWidth={1.75} />
              </button>
            </MagneticEffect>
            <MagneticEffect strength={0.15}>
              <Link
                href="https://www.google.com/maps/dir/?api=1&destination=Trinity+Prayer+House+Madukkarai+Coimbatore"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-primary ${styles.ctaBtn}`}
              >
                {t.planVisit}
              </Link>
            </MagneticEffect>
            <button
              type="button"
              className={styles.mobileToggle}
              onClick={() => setIsOpen((o) => !o)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <div className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}>
                <span />
                <span />
                <span />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-navigation"
            className={styles.mobileMenu}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.mobileMenuInner}>
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * linkStagger, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    className={`${styles.mobileLink} ${pathname === item.href ? styles.active : ''}`}
                    onClick={closeMenu}
                    style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
                  >
                    <span className={styles.mobileLinkNum}>{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                    {item.href === '/online-meet' && isMeetActive && (
                      <span style={{
                        marginLeft: '8px',
                        backgroundColor: '#e74c3c',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 800,
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                      }}>
                        1
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className={styles.mobileActions}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.45 }}
              >
                <button
                  type="button"
                  className={styles.mobileLangBtn}
                  onClick={() => {
                    setShowPicker(true);
                    closeMenu();
                  }}
                >
                  <Globe size={18} strokeWidth={1.75} /> Change language
                </button>
                <Link
                  href="https://www.google.com/maps/dir/?api=1&destination=Trinity+Prayer+House+Madukkarai+Coimbatore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-primary ${styles.mobileCta}`}
                  onClick={closeMenu}
                >
                  {t.planVisit}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
