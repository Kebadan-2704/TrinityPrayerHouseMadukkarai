'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLang } from './LangContext';
import { Globe } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t, setShowPicker } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { href: '/', label: t.home },
    { href: '/about', label: t.about },
    { href: '/sermons', label: t.sermons },
    { href: '/ministries', label: t.ministries },
    { href: '/special-meeting', label: 'Special Meeting' },
    { href: '/prayer', label: t.prayerPage },
    { href: '/give', label: t.giving },
    { href: '/contact', label: t.contact },
  ];

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <div className={styles.logoImgWrap}>
              <Image src="/logo.png" alt="Logo" width={36} height={36} priority />
            </div>
            <span className={styles.logoName}>TPH</span>
          </Link>

          {/* Desktop */}
          <div className={styles.desktopNav}>
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className={styles.navActions}>
            <button className={styles.langToggle} onClick={() => setShowPicker(true)} aria-label="Change language">
              <Globe size={16} />
            </button>
            <Link
              href="https://www.google.com/maps/dir/?api=1&destination=Trinity+Prayer+House+Madukkarai+Coimbatore"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-primary ${styles.ctaBtn}`}
            >
              {t.planVisit}
            </Link>
            <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
              <div className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}>
                <span></span><span></span><span></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.menuOpen : ''}`}>
        <div className={styles.mobileMenuInner}>
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileLink} ${pathname === item.href ? styles.active : ''}`}
              onClick={closeMenu}
              style={{ animationDelay: isOpen ? `${i * 0.06}s` : '0s' }}
            >
              <span className={styles.mobileLinkNum}>0{i + 1}</span>
              {item.label}
            </Link>
          ))}
          <div className={styles.mobileActions}>
            <button className={styles.mobileLangBtn} onClick={() => { setShowPicker(true); closeMenu(); }}>
              <Globe size={18} /> Change Language
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
          </div>
        </div>
      </div>
    </>
  );
}
