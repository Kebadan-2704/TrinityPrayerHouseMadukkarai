'use client';

import { useState, useEffect } from 'react';
import styles from './online-meet.module.css';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Video, Clock, Calendar } from 'lucide-react';
import Image from 'next/image';
import { useLang } from '@/components/LangContext';

// ── LOCAL TRANSLATIONS ────────────────────────────────────────────────────────
const localTranslations = {
  en: {
    liveNow: "LIVE NOW",
    onlineMinistry: "Online Ministry",
    dailyOnlineMeet: "Daily Online Meet",
    subtitle: "Join us every day at 9:00 PM for our virtual gathering and prayer session.",
    inProgress: "MEETING IN PROGRESS",
    joinEveryday: "Join Our Everyday Meet",
    cardDesc: "We invite you to be part of our daily spiritual fellowship from the comfort of your home. Let's come together to pray, share the word, and grow in faith.",
    everyDay: "Every Day",
    monSun: "Monday to Sunday",
    pmTime: "9:00 PM",
    istZone: "Indian Standard Time",
    joinBtnText: "Join Google Meet Now"
  },
  ta: {
    liveNow: "இப்போது நேரலையில்",
    onlineMinistry: "ஆன்லைன் ஊழியம்",
    dailyOnlineMeet: "தினசரி ஆன்லைன் கூட்டம்",
    subtitle: "ஒவ்வொரு நாளும் இரவு 9:00 மணிக்கு எங்கள் மெய்நிகர் கூட்டம் மற்றும் ஜெப அமர்வில் எங்களுடன் சேருங்கள்.",
    inProgress: "கூட்டம் நடந்து கொண்டிருக்கிறது",
    joinEveryday: "எங்கள் தினசரி கூட்டத்தில் இணையுங்கள்",
    cardDesc: "உங்கள் வீட்டின் வசதியிலிருந்து எங்கள் தினசரி ஆன்மீகக் கூட்டத்தில் பங்கேற்க உங்களை அன்போடு அழைக்கிறோம். நாம் ஒன்றிணைந்து ஜெபிக்கவும், வார்த்தையைப் பகிர்ந்து கொள்ளவும், விசுவாசத்தில் வளரவும் கடந்து வருவோம்.",
    everyDay: "ஒவ்வொரு நாளும்",
    monSun: "திங்கள் முதல் ஞாயிறு வரை",
    pmTime: "இரவு 9:00 மணி",
    istZone: "இந்திய நேரப்படி",
    joinBtnText: "இப்போது கூகுள் மீட்டில் இணையுங்கள்"
  },
  hi: {
    liveNow: "अभी लाइव",
    onlineMinistry: "ऑनलाइन मंत्रालय",
    dailyOnlineMeet: "दैनिक ऑनलाइन बैठक",
    subtitle: "हमारे आभासी जमावड़े और प्रार्थना सत्र के लिए हर दिन रात 9:00 बजे हमारे साथ जुड़ें।",
    inProgress: "बैठक चल रही है",
    joinEveryday: "हमारी दैनिक बैठक में शामिल हों",
    cardDesc: "हम आपको अपने घर के आराम से हमारी दैनिक आध्यात्मिक संगति का हिस्सा बनने के लिए आमंत्रित करते हैं। आइए प्रार्थना करने, वचन साझा करने और विश्वास में बढ़ने के लिए एक साथ आएं।",
    everyDay: "हर दिन",
    monSun: "सोमवार से रविवार",
    pmTime: "रात 9:00 बजे",
    istZone: "भारतीय मानक समय",
    joinBtnText: "अभी गूगल मीट में शामिल हों"
  }
};

export default function OnlineMeet() {
  const { lang } = useLang();
  const [isMeetActive, setIsMeetActive] = useState(false);

  const content = localTranslations[lang] || localTranslations.en;

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const istString = now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
      const istTime = new Date(istString);
      
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();

      // Between 8:50 PM and 10:00 PM (20:50 - 21:59)
      if ((hours === 20 && minutes >= 50) || hours === 21) {
        setIsMeetActive(true);
      } else {
        setIsMeetActive(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image
             src="/prayer.png"
             alt="Online Meet"
             fill
             sizes="100vw"
             style={{
               objectFit: 'cover',
               objectPosition: 'center 40%'
             }}
           />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            {isMeetActive ? (
              <div className={styles.liveBadge} style={{ margin: '0 auto 1.5rem', display: 'inline-flex' }}>
                <span className={styles.liveBadgeDot}></span> {content.liveNow}
              </div>
            ) : (
              <div className={styles.secLabel}>{content.onlineMinistry}</div>
            )}
            <h1>{content.dailyOnlineMeet}</h1>
            <p className={styles.headerP}>
              {content.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <ScrollReveal delay={200} className={styles.meetCard}>
            {isMeetActive && (
              <div className={styles.liveBadge}>
                <span className={styles.liveBadgeDot}></span> {content.inProgress}
              </div>
            )}
            
            <div className={styles.cardIcon}>
              <Video size={48} strokeWidth={1.5} color={isMeetActive ? "#e74c3c" : "#c7a760"} />
            </div>
            <h2>{content.joinEveryday}</h2>
            <p className={styles.cardDesc}>
              {content.cardDesc}
            </p>
            
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <Calendar size={24} color="#c7a760" />
                <div>
                  <strong>{content.everyDay}</strong>
                  <span>{content.monSun}</span>
                </div>
              </div>
              <div className={styles.infoItem}>
                <Clock size={24} color="#c7a760" />
                <div>
                  <strong>{content.pmTime}</strong>
                  <span>{content.istZone}</span>
                </div>
              </div>
            </div>

            <Link
              href="https://meet.google.com/gct-xkdh-cni"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-primary ${styles.joinBtn} ${isMeetActive ? styles.pulseLive : ''}`}
            >
              <Video size={20} />
              {content.joinBtnText}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
