'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PhotoCarousel from '@/components/ui/PhotoCarousel';
import { useLang } from '@/components/LangContext';

const daughtersImages = [
  '/womens-ministry/daughters-1.jpg',
  '/womens-ministry/daughters-2.jpg',
  '/womens-ministry/daughters-3.jpg',
];

const outreachImages = [
  '/womens-ministry/outreach-1.jpg',
  '/womens-ministry/outreach-2.jpg',
  '/womens-ministry/outreach-3.jpg',
];

const localTranslations = {
  en: {
    secLabel: 'MINISTRY',
    title: 'Women\'s Ministry',
    subtext: 'Equipping and encouraging women to grow in faith, leadership, and community.',
    back: '← Back to Ministries',
    dkTitle: 'Daughters of the King',
    dkDesc1: 'Our Women\'s Ministry at Trinity Prayer House is a place of faith, encouragement, and genuine fellowship where women of all ages and backgrounds come together to grow in the presence of God.',
    dkDesc2: 'Whether in seasons of joy, challenge, or spiritual growth, our Women\'s Ministry stands together in faith, offering encouragement, support, and the truth of God\'s Word.',
    woTitle: 'Women\'s Outreach Program',
    woDesc1: 'Our Women\'s Outreach Ministry to old age homes is a beautiful expression of Christ\'s love through compassion, care, and fellowship. Through regular visits, the women of our church bring joy and encouragement to elderly residents.',
    woDesc2: 'This ministry also extends practical help through the distribution of meals, essential supplies, clothing, and personal care items, ensuring the elderly feel loved, remembered, and valued.'
  },
  ta: {
    secLabel: 'ஊழியம்',
    title: 'பெண்கள் ஊழியம்',
    subtext: 'பெண்கள் விசுவாசம், தலைமைத்துவம் மற்றும் சமூகத்தில் வளர அவர்களை ஆயத்தப்படுத்துதல் மற்றும் ஊக்குவித்தல்.',
    back: '← ஊழியங்கள் பக்கத்திற்குச் செல்லவும்',
    dkTitle: 'ராஜாவின் மகள்கள்',
    dkDesc1: 'டிரினிட்டி ஜெப இல்லத்தின் பெண்கள் ஊழியம் என்பது விசுவாசம், ஊக்கம் மற்றும் உண்மையான ஐக்கியத்தின் இடமாகும், இங்கு அனைத்து வயது மற்றும் பின்னணியைக் கொண்ட பெண்கள் தேவனுடைய சமூகத்தில் வளர ஒன்றுகூடுகிறார்கள்.',
    dkDesc2: 'மகிழ்ச்சி, சவால் அல்லது ஆன்மீக வளர்ச்சியின் காலங்களாக இருந்தாலும், நமது பெண்கள் ஊழியம் விசுவாசத்தில் ஒன்றிணைந்து நின்று, ஊக்கம், ஆதரவு மற்றும் தேவனுடைய வார்த்தையின் சத்தியத்தை வழங்குகிறது.',
    woTitle: 'பெண்கள் நற்செய்தி மற்றும் சமூக சேவை திட்டம்',
    woDesc1: 'முதியோர் இல்லங்களுக்கான எங்களது பெண்கள் நற்செய்தி சேவை ஊழியம் என்பது இரக்கம், கведений மற்றும் ஐக்கியத்தின் மூலம் கிறிஸ்துவின் அன்பை வெளிப்படுத்தும் ஒரு அழகான செயலாகும். வழக்கமான வருகைகள் மூலம், எங்களது சபையைச் சேர்ந்த பெண்கள் முதியோர் இல்லங்களில் உள்ள முதியவர்களுக்கு மகிழ்ச்சியையும் ஊக்கத்தையும் தருகிறார்கள்.',
    woDesc2: 'இந்த ஊழியம் உணவு, அத்தியாவசிய பொருட்கள், ஆடைகள் மற்றும் தனிப்பட்ட பராமரிப்பு பொருட்களை வழங்குவதன் மூலம் நடைமுறை உதவிகளையும் வழங்குகிறது, இதனால் முதியவர்கள் அன்பு செய்யப்படுகிறார்கள், நினைக்கப்படுகிறார்கள் மற்றும் மதிக்கப்படுகிறார்கள் என்பதை உணர்கிறார்கள்.'
  },
  hi: {
    secLabel: 'मंत्रालय',
    title: 'महिला मंत्रालय',
    subtext: 'महिलाओं को विश्वास, नेतृत्व और समुदाय में बढ़ने के लिए सुसज्जित और प्रोत्साहित करना।',
    back: '← मंत्रालयों पर वापस जाएं',
    dkTitle: 'राजा की बेटियाँ',
    dkDesc1: 'ट्रिनिटी प्रेयर हाउस में हमारा महिला मंत्रालय विश्वास, प्रोत्साहन और वास्तविक संगति का स्थान है जहाँ सभी उम्र और पृष्ठभूमि की महिलाएँ परमेश्वर की उपस्थिति में बढ़ने के लिए एक साथ आती हैं।',
    dkDesc2: 'चाहे खुशी, चुनौती या आध्यात्मिक विकास का मौसम हो, हमारा महिला मंत्रालय विश्वास में एक साथ खड़ा है, प्रोत्साहन, समर्थन और परमेश्वर के वचन की सच्चाई की पेशकश करता है।',
    woTitle: 'महिला आउटरीच कार्यक्रम',
    woDesc1: 'वृद्धाश्रमों में हमारा महिला आउटरीच मंत्रालय करुणा, देखभाल और संगति के माध्यम से मसीह के प्रेम की एक सुंदर अभिव्यक्ति है। नियमित यात्राओं के माध्यम से, हमारे चर्च की महिलाएँ बुजुर्ग निवासियों के लिए खुशी और प्रोत्साहन लाती हैं।',
    woDesc2: 'यह मंत्रालय भोजन, आवश्यक आपूर्ति, कपड़े और व्यक्तिगत देखभाल वस्तुओं के वितरण के माध्यम से व्यावहारिक सहायता भी प्रदान करता है, जिससे यह सुनिश्चित होता है कि बुजुर्ग खुद को प्यार, याद और मूल्यवान महसूस करें।'
  }
};

export default function WomensMinistryPage() {
  const { lang } = useLang();
  const content = localTranslations[lang] || localTranslations.en;

  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/IMG_9061.jpg" alt="Women's Ministry gathering" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
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
              <h2>{content.dkTitle}</h2>
              <p>
                {content.dkDesc1}
              </p>
              <p>
                {content.dkDesc2}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <PhotoCarousel images={daughtersImages} />
            </ScrollReveal>
          </div>

          <div className={styles.contentGrid}>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <PhotoCarousel images={outreachImages} />
            </ScrollReveal>
            <ScrollReveal className={styles.textContent}>
              <h2>{content.woTitle}</h2>
              <p>
                {content.woDesc1}
              </p>
              <p>
                {content.woDesc2}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
