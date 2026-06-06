'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PhotoCarousel from '@/components/ui/PhotoCarousel';
import { useLang } from '@/components/LangContext';

const localTranslations = {
  en: {
    secLabel: 'MINISTRY',
    title: 'Old Age Home',
    subtext: 'Providing care, love, and spiritual support for the elderly.',
    back: '← Back to Ministries',
    heTitle: 'Honoring Our Elders',
    heDesc1: 'Our Old Age Home Ministry at Trinity Prayer House is a ministry of love, compassion, and dignified care, dedicated to serving and honoring the elderly who reside with us. We are committed to creating a warm and nurturing environment where every individual is not only cared for physically but also encouraged spiritually and emotionally. Through daily prayer, worship, fellowship, and personal care, we ensure that our elders experience comfort, belonging, and the constant presence of God\'s love.',
    heDesc2: 'We believe every stage of life is precious and worthy of honor. Our Old Age Home Ministry exists to provide a peaceful and faith-filled home where the elderly are respected, valued, and surrounded by a caring family in Christ. With kindness, compassion, and unwavering support, we walk alongside them, ensuring they live each day with dignity, joy, and the assurance that they are deeply loved by both God and His people.'
  },
  ta: {
    secLabel: 'ஊழியம்',
    title: 'முதியோர் இல்லம்',
    subtext: 'முதியவர்களுக்கு கவனிப்பு, அன்பு மற்றும் ஆன்மீக ஆதரவை வழங்குதல்.',
    back: '← ஊழியங்கள் பக்கத்திற்குச் செல்லவும்',
    heTitle: 'நமது முதியவர்களைக் கௌரவித்தல்',
    heDesc1: 'டிரினிட்டி ஜெப இல்லத்தின் முதியோர் இல்ல ஊழியம் என்பது அன்பு, இரக்கம் மற்றும் கண்ணியமான பராமரிப்பு ஆகியவற்றின் ஊழியமாகும், இது எங்களோடு வசிக்கும் முதியவர்களுக்கு சேவை செய்வதற்கும் அவர்களைக் கௌரவிப்பதற்கும் அர்ப்பணிக்கப்பட்டுள்ளது. ஒவ்வொரு தனிநபரும் உடல் ரீதியாக பராமரிக்கப்படுவது மட்டுமல்லாமல் ஆன்மீக ரீதியாகவும் உணர்ச்சி ரீதியாகவும் ஊக்குவிக்கப்படும் ஒரு அன்பான மற்றும் வளர்ப்பு சூழலை உருவாக்க நாங்கள் அர்ப்பணித்துள்ளோம். தினசரி ஜெபம், ஆராதனை, ஐக்கியம் மற்றும் தனிப்பட்ட கவனிப்பு மூலம், நமது முதியவர்கள் ஆறுதல், சொந்தம் மற்றும் தேவனுடைய அன்பின் நிலையான இருப்பை அனுபவிப்பதை நாங்கள் உறுதி செய்கிறோம்.',
    heDesc2: 'வாழ்க்கையின் ஒவ்வொரு கட்டமும் விலைமதிப்பற்றது மற்றும் கௌரவத்திற்குரியது என்று நாங்கள் நம்புகிறோம். எங்களது முதியோர் இல்ல ஊழியம் முதியவர்கள் மதிக்கப்படும், போற்றப்படும் மற்றும் கிறிஸ்துவுக்குள் அன்பான குடும்பத்தால் சூழப்பட்ட ஒரு அமைதியான மற்றும் விசுவாசம் நிறைந்த வீட்டை வழங்க உள்ளது. தயவு, இரக்கம் மற்றும் அசைக்க முடியாத ஆதரவுடன், நாங்கள் அவர்களுடன் இணைந்து நடக்கிறோம், அவர்கள் ஒவ்வொரு நாளும் கண்ணியத்துடனும், மகிழ்ச்சியுடனும், கடவுளாலும் அவருடைய மக்களாலும் ஆழமாக நேசிக்கப்படுகிறார்கள் என்ற உறுதியுடனும் வாழ்வதை உறுதி செய்கிறோம்.'
  },
  hi: {
    secLabel: 'मंत्रालय',
    title: 'वृद्धाश्रम',
    subtext: 'बुजुर्गों के लिए देखभाल, प्रेम और आध्यात्मिक सहायता प्रदान करना।',
    back: '← मंत्रालयों पर वापस जाएं',
    heTitle: 'हमारे बुजुर्गों का सम्मान करना',
    heDesc1: 'ट्रिनिटी प्रेयर हाउस में हमारा वृद्धाश्रम मंत्रालय प्रेम, करुणा और गरिमापूर्ण देखभाल का मंत्रालय है, जो हमारे साथ रहने वाले बुजुर्गों की सेवा और सम्मान के लिए समर्पित है। हम एक गर्मजोशी से भरा और पोषणकारी वातावरण बनाने के लिए प्रतिबद्ध हैं जहाँ हर व्यक्ति की न केवल शारीरिक रूप से देखभाल की जाती है बल्कि आध्यात्मिक और भावनात्मक रूप से भी प्रोत्साहित किया जाता है। दैनिक प्रार्थना, आराधना, संगति और व्यक्तिगत देखभाल के माध्यम से, हम यह सुनिश्चित करते हैं कि हमारे बुजुर्गों को आराम, अपनापन और परमेश्वर के प्रेम की निरंतर उपस्थिति का अनुभव हो।',
    heDesc2: 'हम मानते हैं कि जीवन का हर चरण अनमोल है और सम्मान के योग्य है। हमारा वृद्धाश्रम मंत्रालय एक शांतिपूर्ण और विश्वास से भरा घर प्रदान करने के लिए मौजूद है जहाँ बुजुर्गों का सम्मान किया जाता है, उन्हें महत्व दिया जाता है, और मसीह में एक देखभाल करने वाले परिवार से घेरा जाता है। दयालुता, करुणा और अटूट समर्थन के साथ, हम उनके साथ चलते हैं, यह सुनिश्चित करते हैं कि वे प्रत्येक दिन गरिमा, आनंद और इस आश्वासन के साथ जिएं कि वे परमेश्वर और उनके लोगों दोनों द्वारा गहराई से प्यार किए जाते हैं।'
  }
};

export default function OldAgeHomeMinistryPage() {
  const { lang } = useLang();
  const content = localTranslations[lang] || localTranslations.en;

  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
         <div className={styles.headerBg}>
           <Image src="/prayer_ministry.png" alt="Old Age Home" fill style={{ objectFit: 'cover' }} />
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
              <h2>{content.heTitle}</h2>
              <p>
                {content.heDesc1}
              </p>
              <p>
                {content.heDesc2}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
               <PhotoCarousel images={[ '/oldage-new-1.jpg', '/oldage-new-2.jpg']} />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
