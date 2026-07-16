'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import dynamic from 'next/dynamic';
const PhotoCarousel = dynamic(() => import('@/components/ui/PhotoCarousel'), { ssr: false });
import { useLang } from '@/components/LangContext';

const mensImages = [
  '/mens-ministry/growing-1.webp',
  '/mens-ministry/growing-2.jpg',
  '/mens-ministry/growing-3.webp',
];

const localTranslations = {
  en: {
    secLabel: 'MINISTRY',
    title: 'Men\'s Ministry',
    subtext: 'Empowering men to lead with faith, character, and purpose.',
    back: '← Back to Ministries',
    gtTitle: 'Growing Together',
    gtDesc1: 'Our Men\'s Ministry at Trinity Prayer House is a strong brotherhood of faith where men are encouraged to grow spiritually, build meaningful relationships, and become the leaders God has called them to be. Through prayer gatherings, Bible studies, fellowship, and discipleship, we create a supportive environment where men can be strengthened, challenged, and encouraged in their walk with Christ.',
    gtDesc2: 'We believe that when men are grounded in God\'s Word, they become pillars of strength in their families, church, and community. Our Men\'s Ministry is committed to equipping men to lead with integrity, serve with humility, and boldly live out their faith in every area of life.'
  },
  ta: {
    secLabel: 'ஊழியம்',
    title: 'ஆண்கள் ஊழியம்',
    subtext: 'ஆண்களை விசுவாசம், நற்பண்பு மற்றும் நோக்கத்துடன் வழிநடத்த உதவுதல்.',
    back: '← ஊழியங்கள் பக்கத்திற்குச் செல்லவும்',
    gtTitle: 'ஒன்றாக வளருவோம்',
    gtDesc1: 'டிரினிட்டி ஜெப இல்லத்தில் உள்ள ஆண்களுக்கான ஊழியம் என்பது ஒரு வலுவான சகோதரத்துவக் கூட்டமைப்பாகும், அங்கு ஆண்கள் ஆன்மீக ரீதியில் வளரவும், அர்த்தமுள்ள உறவுகளைக் கட்டியெழுப்பவும், தேவன் அழைத்த தலைவர்களாக மாறவும் ஊக்குவிக்கப்படுகிறார்கள். ஜெபக் கூட்டங்கள், விவிலியப் படிப்புகள், ஐக்கியம் மற்றும் சீஷத்துவம் ஆகியவற்றின் மூலம், ஆண்கள் கிறிஸ்துவுடன் தங்கள் பயணத்தில் பலப்படவும், சவால்களை எதிர்கொள்ளவும், ஊக்கமடையவும் ஒரு ஆதரவான சூழலை உருவாக்குகிறோம்.',
    gtDesc2: 'ஆண்கள் தேவனுடைய வார்த்தையில் நிலைத்திருக்கும்போது, அவர்கள் தங்கள் குடும்பங்கள், சபை மற்றும் சமூகத்தில் வலிமையின் தூண்களாக மாறுகிறார்கள் என்று நாங்கள் நம்புகிறோம். எங்களது ஆண்கள் ஊழியம், ஆண்கள் நேர்மையுடன் வழிநடத்தவும், தாழ்மையுடன் சேவிக்கவும், வாழ்க்கையின் ஒவ்வொரு பகுதியிலும் தங்கள் விசுவாசத்தைத் தைரியமாக வெளிப்படுத்தவும் அவர்களை ஆயத்தப்படுத்துவதில் அர்ப்பணிப்புடன் உள்ளது.'
  },
  hi: {
    secLabel: 'मंत्रालय',
    title: 'पुरुष मंत्रालय',
    subtext: 'पुरुषों को विश्वास, चरित्र और उद्देश्य के साथ नेतृत्व करने के लिए सशक्त बनाना।',
    back: '← मंत्रालयों पर वापस जाएं',
    gtTitle: 'एक साथ बढ़ना',
    gtDesc1: 'ट्रिनिटी प्रेयर हाउस में हमारा पुरुष मंत्रालय विश्वास का एक मजबूत भाईचारा है जहाँ पुरुषों को आध्यात्मिक रूप से बढ़ने, सार्थक संबंध बनाने और उन नेताओं बनने के लिए प्रोत्साहित किया जाता है जिन्हें परमेश्वर ने उन्हें बुलाया है। प्रार्थना सभाओं, बाइबल अध्ययनों, संगति और शिष्यत्व के माध्यम से, हम एक सहायक वातावरण बनाते हैं जहाँ पुरुषों को मसीह के साथ उनके चलने में मजबूत, चुनौती और प्रोत्साहित किया जा सकता है।',
    gtDesc2: 'हम मानते हैं कि जब पुरुष परमेश्वर के वचन में स्थापित होते हैं, तो वे अपने परिवारों, चर्च और समुदाय में शक्ति के स्तंभ बन जाते हैं। हमारा पुरुष मंत्रालय पुरुषों को सत्यनिष्ठा के साथ नेतृत्व करने, नम्रता के साथ सेवा करने और जीवन के हर क्षेत्र में अपने विश्वास को साहसपूर्वक जीने के लिए सुसज्जित करने के लिए प्रतिबद्ध है।'
  }
};

export default function MensMinistryPage() {
  const { lang } = useLang();
  const content = localTranslations[lang] || localTranslations.en;

  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/mens-ministry/growing-2.jpg" alt="Men's Ministry gathering" fill style={{ objectFit: 'cover',objectPosition:'90%' }} />
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
          <div className={styles.contentGrid}>
            <ScrollReveal className={styles.textContent}>
              <h2>{content.gtTitle}</h2>
              <p>
                {content.gtDesc1}
              </p>
              <p>
                {content.gtDesc2}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <PhotoCarousel images={mensImages} />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
