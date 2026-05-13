'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLang } from './LangContext';
import { Globe } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t, setShowPicker } = useLang();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 992px)');
    const onChange = () => {
      if (mq.matches) setIsOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const desktopNavItems = [
    { href: '/', label: t.home },
    { href: '/about', label: t.about },
    { href: '/sermons', label: t.sermons },
    { href: '/ministries', label: t.ministries },
    { href: '/special-meeting', label: t.events },
    { href: '/prayer', label: t.prayerPage },
    { href: '/give', label: t.giving },
    { href: '/contact', label: t.contact },
  ];

  const mobileNavItems = [
    { href: '/', label: t.home },
    { href: '/about', label: t.about },
    { href: '/sermons', label: t.sermons },
    { href: '/ministries', label: t.ministries },
    { href: '/special-meeting', label: t.events },
    { href: '/online-meet', label: 'Online Meet' },
    { href: '/prayer', label: t.prayerPage },
    { href: '/give', label: t.giving },
    { href: '/contact', label: t.contact },
  ];

  const linkStagger = reduceMotion ? 0 : 0.05;

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        aria-label="Primary"
        initial={reduceMotion ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <div className={styles.logoImgWrap}>
              <Image src="/logo.png" alt="Logo" width={38} height={38} priority />
            </div>
            <span className={styles.logoMark}>TPH</span>
            <span className={styles.logoWord}>Trinity</span>
          </Link>

          <div className={styles.desktopNav}>
            {desktopNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
              >
                <span>{item.label}</span>
                {pathname === item.href ? <span className={styles.navUnderline} aria-hidden /> : null}
              </Link>
            ))}
          </div>

          <div className={styles.navActions}>
            <button
              type="button"
              className={styles.langToggle}
              onClick={() => setShowPicker(true)}
              aria-label="Change language"
            >
              <Globe size={17} strokeWidth={1.75} />
            </button>
            <Link
              href="https://www.google.com/maps/dir/?api=1&destination=Trinity+Prayer+House+Madukkarai+Coimbatore"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-primary ${styles.ctaBtn}`}
            >
              {t.planVisit}
            </Link>
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
              {mobileNavItems.map((item, i) => (
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
                  >
                    <span className={styles.mobileLinkNum}>{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
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
