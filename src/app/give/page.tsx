'use client';
import styles from './page.module.css';
import { Heart, Building, Phone } from 'lucide-react';
import { useLang } from '@/components/LangContext';

export default function Give() {
  const { t } = useLang();
  return (
    <div className={styles.pageWrap}>
      <section className={styles.headerSection}>
        <div className={styles.headerBg}><div className={styles.gradientOrb}></div></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.secLabel}>{t.partnerWithUs}</div>
          <h1>{t.giveH1a}<br/><i>{t.giveH1b}</i></h1>
          <p>{t.giveSub}</p>
        </div>
      </section>
      <section className={`section-padding ${styles.giveSection}`}>
        <div className="container">
          <div className={styles.giveGrid}>
            <div className={styles.primaryGiveCard}>
              <div className={styles.cardHeader}><Building size={24} className="text-accent" /><h2>{t.bankTransfer} (NEFT/IMPS)</h2></div>
              <p className={styles.cardDesc}>{t.bankDesc}</p>
              <div className={styles.accountDetails}>
                <div className={styles.detailRow}><span>{t.acctName}</span><strong>Trinity Ministries</strong></div>
                <div className={styles.detailRow}><span>{t.bank}</span><strong>State Bank of India</strong></div>
                <div className={styles.detailRow}><span>{t.acctNo}</span><strong style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>XXXXXXXXXX</strong></div>
                <div className={styles.detailRow}><span>{t.ifsc}</span><strong>SBIN000XXXX</strong></div>
              </div>
            </div>
            <div className={styles.secondaryMethods}>
              <div className={styles.secondaryCard}>
                <div className={styles.cardHeader}><Phone size={24} className="text-accent" /><h3>{t.upiPayment} / GPay</h3></div>
                <p>{t.upiDesc}</p>
                <div className={styles.upiNumber}>+91 9786888999</div>
              </div>
              <div className={styles.secondaryCard}>
                <div className={styles.cardHeader}><Heart size={24} className="text-accent" /><h3>{t.offeringBox}</h3></div>
                <p>{t.offeringDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
