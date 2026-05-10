'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <div className={styles.logoMark}>T</div>
          <div className={styles.logoText}>
            <span className={styles.churchName}>Trinity Prayer House</span>
            <span className={styles.location}>MADUKKARAI, COIMBATORE</span>
          </div>
        </Link>

        <div className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
          <Link href="/" onClick={closeMenu}>HOME</Link>
          <Link href="/about" onClick={closeMenu}>ABOUT</Link>
          <Link href="/sermons" onClick={closeMenu}>SERMONS</Link>
          <Link href="/ministries" onClick={closeMenu}>MINISTRIES</Link>
          <Link href="/events" onClick={closeMenu}>EVENTS</Link>
          <Link href="/give" onClick={closeMenu}>GIVING</Link>
          <Link href="/contact" onClick={closeMenu}>CONTACT</Link>
          
          <Link href="/contact" className="btn-primary" onClick={closeMenu} style={{ marginLeft: '1rem' }}>
            PLAN A VISIT
          </Link>
        </div>

        <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
}
