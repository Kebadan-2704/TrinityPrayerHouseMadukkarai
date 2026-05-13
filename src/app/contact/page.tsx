'use client';
import { useState } from 'react';
import styles from './page.module.css';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { useLang } from '@/components/LangContext';

export default function Contact() {
  const { t } = useLang();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', reason: 'General Enquiry', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<Record<string, boolean>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = 'Required';
    if (!formData.email) newErrors.email = 'Required';
    if (!formData.message) newErrors.message = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setFormData({ firstName: '', lastName: '', email: '', phone: '', reason: 'General Enquiry', message: '' }); }, 5000);
    }
  };
  const handleFocus = (f: string) => setFocused({ ...focused, [f]: true });
  const handleBlur = (f: string) => setFocused({ ...focused, [f]: false });

  return (
    <div className={styles.pageWrap}>
      <section className={styles.headerSection}>
        <div className={styles.headerBg}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.secLabel}>{t.connectWithUs}</div>
          <h1>{t.contactH1a} <i>{t.contactH1b}</i></h1>
          <p>{t.contactSub}</p>
        </div>
      </section>
      <section className={`section-padding ${styles.contactSection}`}>
        <div className={`container ${styles.contactGrid}`}>
          <div className={styles.infoCol}>
            <h2>{t.hereToServe}</h2>
            <p className={styles.leadText}>{t.hereToServeDesc}</p>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.iconWrap}><MapPin size={20} /></div>
                <div><h4>{t.address}</h4><p style={{ whiteSpace: 'nowrap' }}>Trinity Prayer House<br/>16/300, Gandhi Nagar,<br/>Madukkarai, Coimbatore - 641105</p></div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.iconWrap}><Phone size={20} /></div>
                <div><h4>{t.phone}</h4><p>+91 9786888999<br/>+91 9345902228</p></div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.iconWrap}><Mail size={20} /></div>
                <div><h4>{t.email}</h4><p>trinityprayerhouse.mdk@gmail.com</p></div>
              </div>
              <div className={styles.socialIconsRow}>
                <a href="https://www.instagram.com/trinityprayerhouse_church?igsh=MXEwcXpiaXh6a21jaQ==" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.iconInsta}`} aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://www.facebook.com/share/1HXvvKSbNE/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.iconFb}`} aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="https://wa.me/919786888999" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.iconWa}`} aria-label="WhatsApp">
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              <h3>{t.sendMessage}</h3>
              {submitted ? (
                <div className={styles.successMsg}>
                  <div className={styles.successIcon}>✓</div>
                  <h4>{t.successTitle}</h4>
                  <p>{t.successDesc}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={`${styles.inputGroup} ${focused.firstName || formData.firstName ? styles.hasValue : ''}`}>
                      <label>{t.firstName}</label>
                      <input type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} onFocus={() => handleFocus('firstName')} onBlur={() => handleBlur('firstName')} className={errors.firstName ? styles.errorInput : ''} />
                    </div>
                    <div className={`${styles.inputGroup} ${focused.lastName || formData.lastName ? styles.hasValue : ''}`}>
                      <label>{t.lastName}</label>
                      <input type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} onFocus={() => handleFocus('lastName')} onBlur={() => handleBlur('lastName')} />
                    </div>
                  </div>
                  <div className={`${styles.inputGroup} ${focused.email || formData.email ? styles.hasValue : ''}`}>
                    <label>{t.emailLabel}</label>
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} onFocus={() => handleFocus('email')} onBlur={() => handleBlur('email')} className={errors.email ? styles.errorInput : ''} />
                  </div>
                  <div className={`${styles.inputGroup} ${focused.message || formData.message ? styles.hasValue : ''}`}>
                    <label>{t.message}</label>
                    <textarea rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} onFocus={() => handleFocus('message')} onBlur={() => handleBlur('message')} className={errors.message ? styles.errorInput : ''}></textarea>
                  </div>
                  <button type="submit" className={styles.submitBtn}>{t.sendBtn} <ArrowRight size={18} /></button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAP ===== */}
      <section className={styles.mapSection}>
        <iframe
          src="https://www.google.com/maps?q=Trinity+Prayer+House+Madukkarai+Coimbatore&output=embed"
          width="100%"
          height="400"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Trinity Prayer House Location"
        />
      </section>
    </div>
  );
}
