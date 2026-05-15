'use client';
import { useState } from 'react';
import styles from './page.module.css';
import { useLang } from '@/components/LangContext';
import { HeartHandshake, Loader2, CheckCircle } from 'lucide-react';

export default function PrayerPage() {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [prayerNeed, setPrayerNeed] = useState('');
  const [website, setWebsite] = useState(''); // honeypot for spam
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!name.trim() || !prayerNeed.trim()) {
       setErrorMsg('Please provide your name and prayer need.');
       return;
     }
     // Honeypot check
     if (website.trim()) {
       setErrorMsg('');
       setStatus('success');
       return;
     }
     setErrorMsg('');
     setStatus('submitting');
     try {
       const res = await fetch('/api/prayer', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ name: name.trim(), phone: phone.trim(), prayerNeed: prayerNeed.trim() }),
       });
       if (res.ok) {
         setStatus('success');
         setName('');
         setPhone('');
         setPrayerNeed('');
         setWebsite('');
       } else {
         const data = await res.json().catch(() => (null));
         setErrorMsg(data?.error || 'Something went wrong. Please try again.');
         setStatus('error');
       }
     } catch {
       setErrorMsg('Network error. Please try again.');
       setStatus('error');
     }
   };

  const handleReset = () => {
    setStatus('idle');
    setErrorMsg('');
  };

  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.secLabel}>{t.prayerRequest}</div>
          <h1>{t.prayerRequest}</h1>
          <p>{t.prayerNeed}</p>
        </div>
      </section>

      <section className={`section-padding ${styles.formSection}`}>
        <div className="container">
          {status === 'success' ? (
            <div className={`${styles.formContainer} ${styles.successContainer}`}>
              <div className={styles.successMsg}>
                <CheckCircle size={56} strokeWidth={1.5} />
                <h4>{t.prayerSuccess}</h4>
                <p>{t.prayerSuccessDesc}</p>
                <button className={`btn-outline ${styles.resetBtn}`} onClick={handleReset}>
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.formContainer}>
              <form onSubmit={handleSubmit} className={styles.formCard}>
                <div className={styles.formIcon}>
                  <HeartHandshake size={32} strokeWidth={1.5} />
                </div>

                {errorMsg && <div className={styles.formError}>{errorMsg}</div>}

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <input
                      type="text"
                      id="prayerName"
                      required
                      placeholder=" "
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                    <label htmlFor="prayerName">{t.firstName}</label>
                  </div>
                  <div className={styles.inputGroup}>
                    <input
                      type="tel"
                      id="prayerPhone"
                      placeholder=" "
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                    <label htmlFor="prayerPhone">Phone (Optional)</label>
                  </div>
                </div>

                 {/* Honeypot field — hidden from real users */}
                 <div style={{ display: 'none' }}>
                   <label htmlFor="prayerWebsite">Leave this empty if you are human</label>
                   <input
                     type="text"
                     id="prayerWebsite"
                     value={website}
                     onChange={e => setWebsite(e.target.value)}
                     autoComplete="off"
                     tabIndex={-1}
                     aria-hidden="true"
                   />
                 </div>

                 <div className={styles.inputGroup}>
                  <textarea
                    id="prayerDetails"
                    required
                    placeholder=" "
                    rows={6}
                    value={prayerNeed}
                    onChange={e => setPrayerNeed(e.target.value)}
                  />
                  <label htmlFor="prayerDetails">{t.prayerNeed}</label>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <><Loader2 size={18} className={styles.spinner} /> Submitting…</>
                  ) : (
                    t.submitPrayer
                  )}
                </button>
                <p className={styles.privacyNote}>Your request will remain confidential with our prayer team.</p>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
