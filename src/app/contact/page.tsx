'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reason: 'General Enquiry',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<Record<string, boolean>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', reason: 'General Enquiry', message: '' });
      }, 5000);
    }
  };

  const handleFocus = (field: string) => setFocused({ ...focused, [field]: true });
  const handleBlur = (field: string) => setFocused({ ...focused, [field]: false });

  return (
    <div className={styles.pageWrap}>
      <section className={styles.headerSection}>
        <div className={styles.headerBg}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.secLabel}>CONNECT WITH US</div>
          <h1>Let's Get In <i>Touch</i></h1>
          <p>We're here to pray with you, answer your questions, and welcome you into our community.</p>
        </div>
      </section>

      <section className={`section-padding ${styles.contactSection}`}>
        <div className={`container ${styles.contactGrid}`}>
          
          <div className={styles.infoCol}>
            <h2>Here to Serve</h2>
            <p className={styles.leadText}>Reach out to our pastoral team for prayer, guidance, or information about our ministries.</p>
            
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.iconWrap}><MapPin size={20} /></div>
                <div>
                  <h4>Visit Us</h4>
                  <p>Trinity Prayer House<br/>Ukkadam Bypass Road,<br/>Madukkarai, Coimbatore - 641105</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.iconWrap}><Phone size={20} /></div>
                <div>
                  <h4>Call Us</h4>
                  <p>+91 9786888999<br/>+91 9345902228</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.iconWrap}><Mail size={20} /></div>
                <div>
                  <h4>Email Us</h4>
                  <p>trinityprayerhouse.mdk@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formCol}>
            <div className={styles.formCard}>
              <h3>Send a Message</h3>
              {submitted ? (
                <div className={styles.successMsg}>
                  <div className={styles.successIcon}>✓</div>
                  <h4>Message Received</h4>
                  <p>Thank you for reaching out. Our team will get back to you shortly. God bless you!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={`${styles.inputGroup} ${focused.firstName || formData.firstName ? styles.hasValue : ''}`}>
                      <label>First Name</label>
                      <input 
                        type="text" 
                        value={formData.firstName}
                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                        onFocus={() => handleFocus('firstName')}
                        onBlur={() => handleBlur('firstName')}
                        className={errors.firstName ? styles.errorInput : ''}
                      />
                    </div>
                    <div className={`${styles.inputGroup} ${focused.lastName || formData.lastName ? styles.hasValue : ''}`}>
                      <label>Last Name</label>
                      <input 
                        type="text" 
                        value={formData.lastName}
                        onChange={e => setFormData({...formData, lastName: e.target.value})}
                        onFocus={() => handleFocus('lastName')}
                        onBlur={() => handleBlur('lastName')}
                      />
                    </div>
                  </div>
                  
                  <div className={`${styles.inputGroup} ${focused.email || formData.email ? styles.hasValue : ''}`}>
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      onFocus={() => handleFocus('email')}
                      onBlur={() => handleBlur('email')}
                      className={errors.email ? styles.errorInput : ''}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={`${styles.inputGroup} ${focused.phone || formData.phone ? styles.hasValue : ''}`}>
                      <label>Phone Number</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        onFocus={() => handleFocus('phone')}
                        onBlur={() => handleBlur('phone')}
                      />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.hasValue}`}>
                      <label>Reason</label>
                      <select 
                        value={formData.reason}
                        onChange={e => setFormData({...formData, reason: e.target.value})}
                      >
                        <option>General Enquiry</option>
                        <option>Prayer Request</option>
                        <option>Testimony</option>
                        <option>Plan a Visit</option>
                      </select>
                    </div>
                  </div>

                  <div className={`${styles.inputGroup} ${focused.message || formData.message ? styles.hasValue : ''}`}>
                    <label>Your Message</label>
                    <textarea 
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      onFocus={() => handleFocus('message')}
                      onBlur={() => handleBlur('message')}
                      className={errors.message ? styles.errorInput : ''}
                    ></textarea>
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    Send Message <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
