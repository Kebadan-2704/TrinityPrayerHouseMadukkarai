'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { useLang } from '@/components/LangContext';
import { HeartHandshake } from 'lucide-react';

export default function PrayerPage() {
  const { t } = useLang();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.secLabel}>{t.prayerRequest}</div>
          <h1>{t.prayerRequest}</h1>
          <p>{t.prayerNeed}</p>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className="container">
          <div className={styles.formContainer}>
            {status === 'success' ? (
              <div className={styles.successMsg}>
                <div className={styles.successIcon}>✓</div>
                <h4>{t.prayerSuccess}</h4>
                <p>{t.prayerSuccessDesc}</p>
                <button 
                  className={`btn-outline ${styles.resetBtn}`}
                  onClick={() => setStatus('idle')}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.formCard}>
                <div className={styles.formIcon}>
                  <HeartHandshake size={32} strokeWidth={1.5} />
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <input type="text" id="prayerName" required placeholder=" " />
                    <label htmlFor="prayerName">{t.firstName}</label>
                  </div>
                  <div className={styles.inputGroup}>
                    <input type="tel" id="prayerPhone" placeholder=" " />
                    <label htmlFor="prayerPhone">Phone (Optional)</label>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <textarea id="prayerDetails" required placeholder=" " rows={6}></textarea>
                  <label htmlFor="prayerDetails">{t.prayerNeed}</label>
                </div>

                <button 
                  type="submit" 
                  className={styles.submitBtn} 
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Submitting...' : t.submitPrayer}
                </button>
                <p className={styles.privacyNote}>Your request will remain confidential with our prayer team.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
