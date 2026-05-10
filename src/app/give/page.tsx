import styles from './page.module.css';
import { Heart, Building, Phone } from 'lucide-react';

export default function Give() {
  return (
    <div className={styles.pageWrap}>
      {/* Editorial Header */}
      <section className={styles.headerSection}>
        <div className={styles.headerBg}>
          <div className={styles.gradientOrb}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.secLabel}>PARTNER WITH US</div>
          <h1>Worship Through <br/><i>Giving</i></h1>
          <p>Your generosity helps us continue our ministry in Madukkarai, impacting our community and reaching the unreached. Thank you for your faithful support.</p>
        </div>
      </section>

      {/* Giving Methods */}
      <section className={`section-padding ${styles.giveSection}`}>
        <div className="container">
          
          <div className={styles.giveGrid}>
            
            {/* Primary Method: Bank Transfer */}
            <div className={styles.primaryGiveCard}>
              <div className={styles.cardHeader}>
                <Building size={24} className="text-gold" />
                <h2>Bank Transfer (NEFT/IMPS)</h2>
              </div>
              <p className={styles.cardDesc}>Directly transfer your tithes and offerings to our official ministry account.</p>
              
              <div className={styles.accountDetails}>
                <div className={styles.detailRow}>
                  <span>Account Name</span>
                  <strong>Trinity Ministries</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Bank Name</span>
                  <strong>State Bank of India</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Account Number</span>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--sacred-navy)' }}>XXXXXXXXXX</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>IFSC Code</span>
                  <strong>SBIN000XXXX</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Branch</span>
                  <strong>Madukkarai Branch</strong>
                </div>
              </div>
            </div>

            {/* Secondary Methods */}
            <div className={styles.secondaryMethods}>
              
              <div className={styles.secondaryCard}>
                <div className={styles.cardHeader}>
                  <Phone size={24} className="text-gold" />
                  <h3>UPI / GPay</h3>
                </div>
                <p>For quick mobile transfers using Google Pay, PhonePe, or Paytm.</p>
                <div className={styles.upiNumber}>+91 9786888999</div>
                <p className={styles.subNote}>*Please add "Tithes" or "Offering" in remarks.</p>
              </div>

              <div className={styles.secondaryCard}>
                <div className={styles.cardHeader}>
                  <Heart size={24} className="text-gold" />
                  <h3>In-Person</h3>
                </div>
                <p>You can also give during any of our Sunday or Thursday worship services using the offering envelopes provided at the entrance.</p>
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
