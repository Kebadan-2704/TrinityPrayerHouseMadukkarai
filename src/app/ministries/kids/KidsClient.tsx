'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PhotoCarousel from '@/components/ui/PhotoCarousel';
import { useLang } from '@/components/LangContext';

const sundaySchoolImages = [
  '/kids-ministry/kids-3.jpg',
  '/kids-ministry/kids-4.jpg',
  '/kids-ministry/kids-7.jpg'
];

const vbsImages = [
  '/kids-ministry/kids-1.jpg',
  '/kids-ministry/kids-2.jpg',
  '/kids-ministry/kids-8.jpg',
  '/kids-ministry/kids-10.jpg',
  '/kids-ministry/kids-9.jpg'
];

const localTranslations = {
  en: {
    secLabel: 'MINISTRY',
    title: 'Kids Ministry',
    subtext: 'Building a strong foundation of faith for the next generation.',
    back: '← Back to Ministries',
    ssTitle: 'Sunday School - Every Sunday at 9:30am',
    ssDesc: 'Sunday School is a warm and engaging space where children are introduced to the love of God through age-appropriate lessons, Bible stories, and creative activities. Our dedicated teachers and volunteers create a nurturing environment where young hearts build a foundation of faith, grow in God\'s Word, and are reminded every week that they are seen, loved, and celebrated.',
    vbsTitle: 'Vacation Bible Study (VBS)',
    vbsDesc: 'Vacation Bible School is the highlight of the year for our kids! Held annually, VBS is a celebration of faith and fun where children explore God\'s Word through exciting themes, energetic worship, games, and crafts — making lasting memories, building new friendships, and leaving with a heart full of the knowledge of how deeply God loves them.'
  },
  ta: {
    secLabel: 'ஊழியம்',
    title: 'குழந்தைகள் ஊழியம்',
    subtext: 'அடுத்த தலைமுறைக்கு விசுவாசத்தின் வலுவான அடித்தளத்தை உருவாக்குதல்.',
    back: '← ஊழியங்கள் பக்கத்திற்குச் செல்லவும்',
    ssTitle: 'ஞாயிறு பள்ளி - ஒவ்வொரு ஞாயிறு காலை 9:30 மணிக்கு',
    ssDesc: 'ஞாயிறு பள்ளி என்பது ஒரு அன்பான மற்றும் ஈர்க்கக்கூடிய இடமாகும், அங்கு குழந்தைகள் வயதுக்கு ஏற்ற பாடங்கள், பைபிள் கதைகள் மற்றும் படைப்பு நடவடிக்கைகள் மூலம் தேவனுடைய அன்பை அறிமுகப்படுத்துகிறார்கள். எங்கள் அர்ப்பணிப்புள்ள ஆசிரியர்களும் தன்னார்வலர்களும் ஒரு வளர்ப்பு சூழலை உருவாக்குகிறார்கள், அங்கு இளம் இதயங்கள் விசுவாசத்தின் அடித்தளத்தை உருவாக்குகின்றன, தேவனுடைய வார்த்தையில் வளர்கின்றன, மேலும் அவர்கள் பார்க்கப்படுகிறார்கள், அன்பு செய்யப்படுகிறார்கள் மற்றும் கொண்டாடப்படுகிறார்கள் என்று ஒவ்வொரு வாரமும் நினைவூட்டப்படுகிறார்கள்.',
    vbsTitle: 'விடுமுறை விவிலியப் பள்ளி (VBS)',
    vbsDesc: 'விடுமுறை விவிலியப் பள்ளி என்பது எங்கள் குழந்தைகளுக்கு ஆண்டின் மிகச் சிறந்த நிகழ்வாகும்! ஆண்டுதோறும் நடத்தப்படும் VBS என்பது விசுவாசம் மற்றும் வேடிக்கையின் கொண்டாட்டமாகும், அங்கு குழந்தைகள் அற்புதமான கருப்பொருள்கள், துடிப்பான ஆராதனை, விளையாட்டுகள் மற்றும் கைவினைப்பொருட்கள் மூலம் தேவனுடைய வார்த்தையை ஆராய்கிறார்கள் — நீடித்த நினைவுகளை உருவாக்குகிறார்கள், புதிய நட்பை உருவாக்குகிறார்கள், மேலும் தேவன் அவர்களை எவ்வளவு ஆழமாக நேசிக்கிறார் என்ற அறிவோடு விடைபெறுகிறார்கள்.'
  },
  hi: {
    secLabel: 'मंत्रालय',
    title: 'बच्चों की सेवकाई',
    subtext: 'अगली पीढ़ी के लिए विश्वास की एक मजबूत नींव का निर्माण।',
    back: '← मंत्रालयों पर वापस जाएं',
    ssTitle: 'संडे स्कूल - हर रविवार सुबह 9:30 बजे',
    ssDesc: 'संडे स्कूल एक गर्मजोशी से भरा और आकर्षक स्थान है जहाँ बच्चों को उम्र के अनुकूल पाठों, बाइबल की कहानियों और रचनात्मक गतिविधियों के माध्यम से परमेश्वर के प्रेम से परिचित कराया जाता है। हमारे समर्पित शिक्षक और स्वयंसेवक एक पोषणकारी वातावरण बनाते हैं जहाँ युवा दिल विश्वास की नींव बनाते हैं, परमेश्वर के वचन में बढ़ते हैं, और हर हफ्ते उन्हें याद दिलाया जाता है कि वे देखे गए हैं, प्यार किए गए हैं और मनाए गए हैं।',
    vbsTitle: 'वेकेशन बाइबिल स्टडी (VBS)',
    vbsDesc: 'वेकेशन बाइबिल स्कूल हमारे बच्चों के लिए साल का सबसे खास समय होता है! सालाना आयोजित होने वाला VBS विश्वास और मस्ती का उत्सव है जहाँ बच्चे रोमांचक विषयों, ऊर्जावान आराधना, खेल और शिल्प के माध्यम से परमेश्वर के वचन का पता लगाते हैं — स्थायी यादें बनाते हैं, नए दोस्त बनाते हैं, और इस ज्ञान से भरे दिल के साथ जाते हैं कि परमेश्वर उनसे कितना गहरा प्यार करता है।'
  }
};

export default function KidsMinistryPage() {
  const { lang } = useLang();
  const content = localTranslations[lang] || localTranslations.en;

  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/kids-ministry/kids-1.jpg" alt="Kids Ministry activities" fill style={{ objectFit: 'cover', objectPosition: 'center 60%' }} />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100}>
            <div className={styles.secLabel}>{content.secLabel}</div>
            <h1>{content.title}</h1>
            <p className={styles.headerSubtext}>{content.subtext}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <Link href="/ministries" className={styles.backBtn}>{content.back}</Link>
          <div className={styles.contentGrid} style={{ marginBottom: '6rem' }}>
            <ScrollReveal className={styles.textContent}>
              <h2>{content.ssTitle}</h2>
              <p>
                {content.ssDesc}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <PhotoCarousel images={sundaySchoolImages} />
            </ScrollReveal>
          </div>

          <div className={styles.contentGrid}>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <PhotoCarousel images={vbsImages} />
            </ScrollReveal>
            <ScrollReveal className={styles.textContent}>
              <h2>{content.vbsTitle}</h2>
              <p>
                {content.vbsDesc}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
