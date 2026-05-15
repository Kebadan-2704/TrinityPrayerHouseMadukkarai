'use client';
import { useState } from 'react';
import styles from './page.module.css';
import { MapPin, Phone, Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { useLang } from '@/components/LangContext';

export default function Contact() {
  const { t } = useLang();
const [formData, setFormData] = useState({
     firstName: '',
     lastName: '',
     email: '',
     phone: '',
     reason: 'General Enquiry',
     message: '',
     website: '', // honeypot field for spam bots
   });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

const validate = () => {
     const newErrors: Record<string, string> = {};
     if (!formData.firstName.trim()) newErrors.firstName = 'Required';
     if (!formData.email.trim()) newErrors.email = 'Required';
     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
     if (!formData.message.trim()) newErrors.message = 'Required';
     // Simple bot check: hidden field should remain empty
     if (formData.reason !== 'General Enquiry') {
       setErrors({}); // silently ignore
       return false;
     }
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', reason: 'General Enquiry', message: '', website: '' });
        setErrors({});
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrors({ form: data.error || 'Something went wrong. Please try again.' });
      }
    } catch {
      setErrors({ form: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.secLabel}>{t.connectWithUs}</div>
          <h1>{t.contactH1a} <i>{t.contactH1b}</i></h1>
          <p>{t.contactSub}</p>
        </div>
      </section>

      <section className={`section-padding ${styles.contactSection}`}>
        <div className={`container ${styles.contactGrid}`}>
          {/* Info column */}
          <div className={styles.infoCol}>
            <h2>{t.hereToServe}</h2>
            <p className={styles.leadText}>{t.hereToServeDesc}</p>
            <div className={styles.infoList}>
              {[
                { icon: <MapPin size={20} />, title: t.address, text: 'Trinity Prayer House\u000A16/300, Gandhi Nagar,\u000AMadukkarai, Coimbatore - 641105' },
                { icon: <Phone size={20} />, title: t.phone, text: <><a href="tel:+919786888999">+91 9786888999</a><br /><a href="tel:+919345902228">+91 9345902228</a></> },
                { icon: <Mail size={20} />, title: t.email, text: 'trinityprayerhouse.mdk@gmail.com' },
              ].map((item, i) => (
                <div className={styles.infoItem} key={i}>
                  <div className={styles.iconWrap}>{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.socialIconsRow}>
              <a href="https://www.instagram.com/trinityprayerhouse_church" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.iconInsta}`} aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/share/1HXvvKSbNE/" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.iconFb}`} aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://wa.me/919786888999" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.iconWa}`} aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Form column */}
          <div className={`${styles.formCol} hover-lift shine-frame`}>
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.successMsg}>
                  <CheckCircle size={48} strokeWidth={1.5} />
                  <h4>{t.successTitle}</h4>
                  <p>{t.successDesc}</p>
                  <button className={`btn-outline ${styles.resetBtn}`} onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3>{t.sendMessage}</h3>
                  {errors.form && <div className={styles.formError}>{errors.form}</div>}
                  <div className={styles.formRow}>
                    <div className={`${styles.inputGroup} ${focused.firstName || formData.firstName ? styles.hasValue : ''} ${errors.firstName ? styles.errorInput : ''}`}>
                      <label htmlFor="contactFirstName">{t.firstName}</label>
                      <input
                        id="contactFirstName"
                        type="text"
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        onFocus={() => setFocused({ ...focused, firstName: true })}
                        onBlur={() => setFocused({ ...focused, firstName: false })}
                        aria-invalid={!!errors.firstName}
                      />
                    </div>
                    <div className={`${styles.inputGroup} ${focused.lastName || formData.lastName ? styles.hasValue : ''}`}>
                      <label htmlFor="contactLastName">{t.lastName}</label>
                      <input
                        id="contactLastName"
                        type="text"
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        onFocus={() => setFocused({ ...focused, lastName: true })}
                        onBlur={() => setFocused({ ...focused, lastName: false })}
                      />
                    </div>
                  </div>
                  <div className={`${styles.inputGroup} ${focused.email || formData.email ? styles.hasValue : ''} ${errors.email ? styles.errorInput : ''}`}>
                    <label htmlFor="contactEmail">{t.emailLabel}</label>
                    <input
                      id="contactEmail"
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocused({ ...focused, email: true })}
                      onBlur={() => setFocused({ ...focused, email: false })}
                      aria-invalid={!!errors.email}
                    />
                  </div>
                  <div className={`${styles.inputGroup} ${focused.phone || formData.phone ? styles.hasValue : ''}`}>
                    <label htmlFor="contactPhone">Phone (Optional)</label>
                    <input
                      id="contactPhone"
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      onFocus={() => setFocused({ ...focused, phone: true })}
                      onBlur={() => setFocused({ ...focused, phone: false })}
                    />
                  </div>
                  <div style={{ display: 'none' }}>
                     <label htmlFor="contactWebsite">Leave this field empty if you are human</label>
                     <input
                       id="contactWebsite"
                       type="text"
                       value={formData.website}
                       onChange={e => setFormData({ ...formData, website: e.target.value })}
                       autoComplete="off"
                       tabIndex={-1}
                       aria-hidden="true"
                     />
                   </div>
                   <div className={`${styles.inputGroup} ${focused.message || formData.message ? styles.hasValue : ''} ${errors.message ? styles.errorInput : ''}`}>
                    <label htmlFor="contactMessage">{t.message}</label>
                    <textarea
                      id="contactMessage"
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocused({ ...focused, message: true })}
                      onBlur={() => setFocused({ ...focused, message: false })}
                      aria-invalid={!!errors.message}
                    />
                  </div>
                  <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><Loader2 size={18} className={styles.spinner} /> Sending…</>
                    ) : (
                      <>{t.sendBtn} <ArrowRight size={18} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className="container">
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
        </div>
      </section>
    </div>
  );
}
