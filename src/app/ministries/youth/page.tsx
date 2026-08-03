'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import dynamic from 'next/dynamic';
const PhotoCarousel = dynamic(() => import('@/components/ui/PhotoCarousel'), { ssr: false });
import { useLang } from '@/components/LangContext';

const fellowshipImages = [
  '/youth-ministry/fellowship-1.jpg',
  '/youth-ministry/fellowship-2.jpg',
  '/youth-ministry/fellowship-3.jpg',
];

const outreachImages = [
  '/youth-ministry/outreach-1.webp',
  '/youth-ministry/outreach-2.webp',
  '/youth-ministry/outreach-3.webp',
  '/youth-ministry/outreach-4.jpg',
  '/youth-ministry/outreach-5.jpg',
  '/youth-ministry/outreach-6.jpg',
];

const mediaImages = [
  { src: '/youth-ministry/media-1.jpg', position: 'center center', scale: 100 },
  { src: '/youth-ministry/media-2.jpg', position: 'center center', scale: 100 },
  { src: '/youth-ministry/media-3.jpg', position: 'center center', scale: 100 },
  { src: '/youth-ministry/media-4.jpg', position: 'center center', scale: 100 },
  { src: '/youth-ministry/media-5.jpg', position: 'center center', scale: 100 },
  { src: '/youth-ministry/media-6.jpg', position: 'center center', scale: 100 },
  { src: '/youth-ministry/media-7.jpg', position: 'center center', scale: 100 },
];

const localTranslations = {
  en: {
    secLabel: 'MINISTRY',
    title: 'Youth Ministry',
    subtext: 'Empowering young people to discover their identity in Christ through worship, fellowship, and discipleship.',
    back: '← Back to Ministries',
    yfTitle: 'Youth Fellowship',
    yfDesc1: 'Our Youth Fellowship at Trinity Prayer House is a vibrant and Christ-centered community where young people grow in faith, build meaningful friendships, and discover their God-given purpose.',
    yfDesc2: 'Through fellowship gatherings, Bible studies, worship sessions, prayer meetings, and discipleship, our youth are encouraged to deepen their relationship with God in an atmosphere of love, encouragement, and spiritual growth — a place where every young person belongs and grows together in Christ.',
    yoTitle: 'Youth Outreach Programs',
    yoDesc1: 'We believe in equipping the next generation to be the hands and feet of Jesus. Our youth outreach programs are designed to reach our community through impactful service projects, evangelism, and local missions.',
    yoDesc2: 'We are dedicated to making a difference, stepping out of our comfort zones, and spreading the gospel wherever we go to bring hope to those who need it most.',
    ymTitle: 'Youth Trinity Media',
    ymDesc1: 'Trinity Youth Media is a ministry where creativity meets calling, empowering young people to use media as a tool for God\'s Kingdom. From photography, videography, graphic design, live production, and digital ministry, this team not only serves within the church but also reaches beyond by supporting ministries, training others, and equipping churches with media knowledge and creative excellence.',
    ymDesc2: 'Our Trinity Youth Media team is actively involved in ministry beyond our own church, partnering with other churches, ministries, and outreach programs to serve through media excellence and creative support.'
  },
  ta: {
    secLabel: 'ஊழியம்',
    title: 'இளையோர் ஊழியம்',
    subtext: 'இளைஞர்கள் ஆராதனை, ஐக்கியம் மற்றும் சீஷத்துவம் மூலம் கிறிஸ்துவுக்குள் தங்களது அடையாளத்தைக் கண்டறிய உதவுதல்.',
    back: '← ஊழியங்கள் பக்கத்திற்குச் செல்லவும்',
    yfTitle: 'இளையோர் ஐக்கியம்',
    yfDesc1: 'டிரினிட்டி ஜெப இல்லத்தின் இளைஞர் ஐக்கியம் என்பது ஒரு துடிப்பான மற்றும் கிறிஸ்துவை மையமாகக் கொண்ட சமூகமாகும், அங்கு இளைஞர்கள் விசுவாசத்தில் வளரவும், அர்த்தமுள்ள நட்பை உருவாக்கவும், தங்களுக்குள் இருக்கும் தேவனுடைய நோக்கத்தைக் கண்டறியவும் உதவுகிறது.',
    yfDesc2: 'கூட்டங்கள், விவிலியப் படிப்புகள், ஆராதனை மற்றும் ஜெபக் கூட்டங்கள் மூலம், இளைஞர்கள் அன்பு, ஊக்கம் மற்றும் ஆன்மீக வளர்ச்சியின் மூலம் கடவுளுடனான தங்கள் உறவை ஆழப்படுத்த ஊக்குவிக்கப்படுகிறார்கள் — இது ஒவ்வொரு இளைஞரும் கிறிஸ்துவுக்குள் இணைந்து வளரும் ஒரு இடமாகும்.',
    yoTitle: 'இளையோர் நற்செய்தி அறிவிப்பு திட்டங்கள்',
    yoDesc1: 'அடுத்த தலைமுறையை இயேசுவின் கைகளாகவும் கால்களாகவும் மாற்ற வேண்டும் என்று நாங்கள் நம்புகிறோம். எங்களது நற்செய்தி அறிவிப்பு திட்டங்கள் சமூக சேவை திட்டங்கள், நற்செய்தி பகிர்வு மற்றும் உள்ளூர் மிஷன்கள் மூலம் நமது சமூகத்தை சென்றடையும் வகையில் வடிவமைக்கப்பட்டுள்ளன.',
    yoDesc2: 'நாங்கள் ஒரு நேர்மறையான மாற்றத்தை உருவாக்கவும், வசதியான எல்லைகளைத் தாண்டிச் செல்லவும், தேவைப்படுபவர்களுக்கு நம்பிக்கையைக் கொண்டுவர நற்செய்தியைப் பரப்பவும் அர்ப்பணிப்புடன் உள்ளோம்.',
    ymTitle: 'இளையோர் டிரினிட்டி ஊடகம் (Media)',
    ymDesc1: 'டிரினிட்டி இளைஞர் ஊடகம் என்பது படைப்பாற்றல் தேவனுடைய அழைப்போடு இணையும் ஒரு ஊழியமாகும், இது இளைஞர்களை தேவனுடைய ராஜ்யத்திற்கான ஒரு கருவியாகப் பயன்படுத்த உதவுகிறது. புகைப்படம் எடுத்தல், வீடியோகிராபி, கிராஃபிக் வடிவமைப்பு, நேரடி ஒளிபரப்பு மற்றும் டிஜிட்டல் ஊழியம் ஆகியவற்றில் ஈடுபடும் இக்குழு, சபைக்குள் சேவிப்பது மட்டுமின்றி, பிற ஊழியங்களுக்கு ஆதரவளிப்பது, பயிற்சியளிப்பது மற்றும் பிற சபைகளுக்கு ஊடக அறிவை வழங்குவது போன்றவற்றின் மூலம் பரந்த அளவில் செயல்படுகிறது.',
    ymDesc2: 'எங்கள் டிரினிட்டி இளைஞர் ஊடகக் குழு, பிற சபைகள், ஊழியங்கள் மற்றும் நற்செய்தி திட்டங்களுடன் இணைந்து சிறந்த ஊடக சேவை மற்றும் படைப்பாற்றல் ஆதரவை வழங்க தீவிரமாக செயல்பட்டு வருகிறது.'
  },
  hi: {
    secLabel: 'मंत्रालय',
    title: 'युवा मंत्रालय',
    subtext: 'युवाओं को आराधना, संगति और शिष्यत्व के माध्यम से मसीह में अपनी पहचान खोजने के लिए सशक्त बनाना।',
    back: '← मंत्रालयों पर वापस जाएं',
    yfTitle: 'युवा संगति (Youth Fellowship)',
    yfDesc1: 'ट्रिनिटी प्रेयर हाउस में हमारी युवा संगति एक जीवंत और मसीह-केंद्रित समुदाय है जहाँ युवा विश्वास में बढ़ते हैं, सार्थक मित्रता बनाते हैं, और अपने ईश्वर प्रदत्त उद्देश्य की खोज करते हैं।',
    yfDesc2: 'संगति बैठकों, बाइबल अध्ययनों, आराधना सत्रों, प्रार्थना सभाओं और शिष्यत्व के माध्यम से, हमारे युवाओं को प्रेम, प्रोत्साहन और आध्यात्मिक विकास के माहौल में परमेश्वर के साथ अपने संबंध को गहरा करने के लिए प्रोत्साहित किया जाता है — एक ऐसा स्थान जहाँ हर युवा मसीह में एक साथ जुड़ता है और बढ़ता है।',
    yoTitle: 'युवा आउटरीच कार्यक्रम',
    yoDesc1: 'हम अगली पीढ़ी को यीशु के हाथ और पैर बनने के लिए सुसज्जित करने में विश्वास करते हैं। हमारे युवा आउटरीच कार्यक्रमों को प्रभावशाली सेवा परियोजनाओं, सुसमाचार प्रचार और स्थानीय मिशनों के माध्यम से हमारे समुदाय तक पहुँचने के लिए डिज़ाइन किया गया है।',
    yoDesc2: 'हम बदलाव लाने, अपने आराम के दायरे से बाहर कदम रखने और जहाँ भी हम जाते हैं सुसमाचार फैलाने के लिए समर्पित हैं ताकि उन लोगों को आशा मिल सके जिन्हें इसकी सबसे अधिक आवश्यकता है।',
    ymTitle: 'युवा ट्रिनिटी मीडिया',
    ymDesc1: 'ट्रिनिटी यूथ मीडिया एक ऐसा मंत्रालय है जहाँ रचनात्मकता बुलाहट से मिलती है, जो युवाओं को परमेश्वर के राज्य के लिए एक उपकरण के रूप में मीडिया का उपयोग करने के लिए सशक्त बनाती है। फोटोग्राफी, वीडियोग्राफी, ग्राफिक डिजाइन, लाइव प्रोडक्शन और डिजिटल मंत्रालय से, यह टीम न केवल चर्च के भीतर सेवा करती है बल्कि अन्य मंत्रालयों का समर्थन करके, दूसरों को प्रशिक्षित करके और चर्चों को मीडिया ज्ञान और रचनात्मक उत्कृष्टता से सुसज्जित करके आगे बढ़ती है।',
    ymDesc2: 'हमारी ट्रिनिटी यूथ मीडिया टीम हमारे अपने चर्च से परे सक्रिय रूप से शामिल है, मीडिया उत्कृष्टता और रचनात्मक सहायता के माध्यम से सेवा करने के लिए अन्य चर्चों, मंत्रालयों और आउटरीच कार्यक्रमों के साथ साझेदारी करती है।'
  }
};

function MediaCarousel() {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((p) => (p - 1 + mediaImages.length) % mediaImages.length);
  const next = () => setIdx((p) => (p + 1) % mediaImages.length);

  return (
    <>
      {mediaImages.map((img, i) => (
        <Image
          key={i}
          src={img.src}
          alt={`Youth Ministry media ${i + 1}`}
          fill
          sizes="(max-width: 991px) 100vw, 50vw"
          style={{
            objectFit: 'cover',
            objectPosition: img.position,
            opacity: i === idx ? 1 : 0,
            pointerEvents: i === idx ? 'auto' : 'none'
          }}
          priority={i === 0}
        />
      ))}
      {mediaImages.length > 1 && (
        <>
          <button
            onClick={prev}
            style={{ position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Previous image"
          ><ChevronLeft size={20} color="#fff" /></button>
          <button
            onClick={next}
            style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Next image"
          ><ChevronRight size={20} color="#fff" /></button>
          <div style={{ position: 'absolute', bottom: 15, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 10 }}>
            {mediaImages.map((_, i) => (
              <div key={i} style={{ width: i === idx ? 18 : 7, height: 7, borderRadius: 4, background: i === idx ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'all 0.3s' }} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default function YouthMinistryPage() {
  const { lang } = useLang();
  const content = localTranslations[lang] || localTranslations.en;

  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/youth_ministry_new.jpg" alt="Youth Ministry" fill priority={true} fetchPriority="high" style={{ objectFit: 'cover' }} />
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

          {/* Youth Fellowship */}
          <div className={styles.contentGrid} style={{ marginBottom: '6rem' }}>
            <ScrollReveal className={styles.textContent}>
              <h2>{content.yfTitle}</h2>
              <p>
                {content.yfDesc1}
              </p>
              <p>
                {content.yfDesc2}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <PhotoCarousel images={fellowshipImages} />
            </ScrollReveal>
          </div>

          {/* Youth Outreach */}
          <div className={styles.contentGrid} style={{ marginBottom: '6rem' }}>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <PhotoCarousel images={outreachImages} />
            </ScrollReveal>
            <ScrollReveal className={styles.textContent}>
              <h2>{content.yoTitle}</h2>
              <p>
                {content.yoDesc1}
              </p>
              <p>
                {content.yoDesc2}
              </p>
            </ScrollReveal>
          </div>

          {/* Youth Media */}
          <div className={styles.contentGrid}>
            <ScrollReveal className={styles.textContent}>
              <h2>{content.ymTitle}</h2>
              <p>
                {content.ymDesc1}
              </p>
              <p>{content.ymDesc2}</p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={`${styles.galleryImageWrap} ${styles.mediaGalleryImageWrap}`}>
              <MediaCarousel />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
