import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <div className={styles.logoMark}>T</div>
            <div className={styles.logoText}>
              <span className={styles.churchName}>Trinity Prayer House</span>
              <span className={styles.location}>MADUKKARAI, COIMBATORE</span>
            </div>
          </div>
          <p className={styles.mission}>
            Equipping people to know God and grow in faith. A house of prayer for all nations since 1976.
          </p>
          <div className={styles.socials}>
            <a href="https://www.facebook.com/trinityprayerhouse" target="_blank" rel="noopener noreferrer"><FaFacebookF size={18} /></a>
            <a href="https://www.instagram.com/vasanthsathyanathan.official" target="_blank" rel="noopener noreferrer"><FaInstagram size={18} /></a>
            <a href="https://www.youtube.com/@trinityprayerhousemadukkarai" target="_blank" rel="noopener noreferrer"><FaYoutube size={18} /></a>
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.navCol}>
          <h4 className={styles.heading}>NAVIGATE</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/sermons">Sermons</Link></li>
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className={styles.navCol}>
          <h4 className={styles.heading}>SERVICES</h4>
          <ul>
            <li>Promise Service: 1st, 6:30 AM</li>
            <li>Sunday Service: 9:30 AM</li>
            <li>Hindi Service: Sun, 6:30 PM</li>
            <li>Bible Study: Thu, 7:30 PM</li>
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.contactCol}>
          <h4 className={styles.heading}>CONTACT</h4>
          <ul>
            <li>
              <Phone size={16} />
              <div>
                <span>Phone / WhatsApp</span>
                <p>+91 9786888999</p>
              </div>
            </li>
            <li>
              <Mail size={16} />
              <div>
                <span>Email</span>
                <p>trinityprayerhouse.mdk@gmail.com</p>
              </div>
            </li>
            <li>
              <MapPin size={16} />
              <div>
                <span>Address</span>
                <p>Ukkadam Bypass Road, Madukkarai, Coimbatore - 641105</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p>&copy; {new Date().getFullYear()} Trinity Prayer House Madukkarai. All rights reserved.</p>
          <p>Built with purpose.</p>
        </div>
      </div>
    </footer>
  );
}
