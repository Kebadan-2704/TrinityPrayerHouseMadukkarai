'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../ministry-detail.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import dynamic from 'next/dynamic';
const PhotoCarousel = dynamic(() => import('@/components/ui/PhotoCarousel'), { ssr: false });
import { useLang } from '@/components/LangContext';

const worshipImages = [
  { src: '/hindi-ministry/worship-1.jpg', position: 'center' },
  { src: '/hindi-ministry/worship-2.jpg', position: 'center' },
  { src: '/hindi-ministry/worship-3.jpg', position: 'center' },
  { src: '/hindi-ministry/worship-4.jpg', position: 'center' },
  { src: '/hindi-ministry/worship-5.webp', position: 'center' },
  { src: '/hindi-ministry/worship-6.webp', position: 'center' },
  { src: '/hindi-ministry/worship-7.webp', position: 'center' },
  { src: '/hindi-ministry/worship-8.webp', position: 'center' },
];

const serviceMapUrl = 'https://www.google.com/maps/place/Divyodaya+Inter-Religious+Centre/@10.9985049,76.9701874,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba859003794a6bd:0xf933122bf2382cb2!8m2!3d10.9985049!4d76.9701874!16s%2Fg%2F11w_n353s2!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D';
const serviceMapEmbedUrl = 'https://www.google.com/maps?q=Divyodaya+Inter-Religious+Centre,+No.+91,+Geetha+Hall+Road,+Gopalapuram,+Near+District+Court+Coimbatore,+Tamil+Nadu+-+641018&output=embed';

const localTranslations = {
  en: {
    secLabel: 'MINISTRY',
    title: 'Hindi Ministry',
    subtext: 'Reaching out to the Hindi-speaking community with worship and the Word.',
    back: '← Back to Ministries',
    wTitle: 'Worship in Our Heart Language',
    wDesc1: 'Our Hindi Ministry at Trinity Prayer House is dedicated to creating a welcoming spiritual home for Hindi-speaking believers to worship, pray, and grow in faith in their heart language. We believe that God’s Word becomes even more personal and impactful when experienced in a language that speaks directly to the heart, which is why this ministry provides a meaningful space for worship, fellowship, and spiritual encouragement in Hindi.',
    wDesc2: 'Whether you are new to the city or have been part of the community for years, our Hindi Ministry is a place of belonging, connection, and spiritual growth. Through worship services, prayer, fellowship, and the teaching of God’s Word, we seek to strengthen faith, build lasting relationships, and help every individual experience the love and presence of Christ in a familiar and comforting way.',
    sTitle: 'Service Details',
    loc: 'Location',
    locText: 'Divyodaya Inter-Religious Centre, No. 91, Geetha Hall Road, Gopalapuram, Near District Court Coimbatore, Tamil Nadu - 641018',
    time: 'Time',
    timeText: 'Every Sunday at 7:00 PM',
    maps: 'Open in Google Maps'
  },
  ta: {
    secLabel: 'ஊழியம்',
    title: 'இந்தி ஊழியம்',
    subtext: 'இந்தி பேசும் சமூகத்தினரை ஆராதனை மற்றும் தேவனுடைய வார்த்தையின் மூலம் சென்றடைதல்.',
    back: '← ஊழியங்கள் பக்கத்திற்குச் செல்லவும்',
    wTitle: 'நமது தாய்மொழியில் ஆராதனை',
    wDesc1: 'டிரினிட்டி ஜெப இல்லத்தில் உள்ள இந்தி ஊழியம் இந்தி பேசும் விசுவாசிகள் தங்கள் சொந்த மொழியில் ஆராதனை செய்யவும், ஜெபிக்கவும், விசுவாசத்தில் வளரவும் ஒரு அன்பான ஆன்மீக இல்லத்தை உருவாக்க அர்ப்பணிக்கப்பட்டுள்ளது. தேவனுடைய வார்த்தை நேரடியாக இதயத்துடன் பேசும் மொழியில் அனுபவிக்கப்படும் போது இன்னும் தனிப்பட்டதாகவும் தாக்கத்தை ஏற்படுத்துவதாகவும் மாறும் என்று நாங்கள் நம்புகிறோம், அதனால்தான் இந்த ஊழியம் இந்தியில் ஆராதனை, ஐக்கியம் மற்றும் ஆன்மீக ஊக்கத்திற்கான ஒரு சிறந்த இடத்தை வழங்குகிறது.',
    wDesc2: 'நீங்கள் இந்த நகரத்திற்கு புதியவராக இருந்தாலும் சரி அல்லது பல ஆண்டுகளாக இந்த சமூகத்தின் ஒரு பகுதியாக இருந்தாலும் சரி, எங்களது இந்தி ஊழியம் உங்களுக்கு ஒரு சொந்த இடமாகவும், தொடர்பு மற்றும் ஆன்மீக வளர்ச்சியின் இடமாகவும் இருக்கும். ஆராதனை, ஜெபம், ஐக்கியம் மற்றும் தேவனுடைய வார்த்தையின் போதனைகள் மூலம், விசுவாசத்தை பலப்படுத்தவும், நீடித்த உறவுகளை உருவாக்கவும், ஒவ்வொருவரும் கிறிஸ்துவின் அன்பையும் பிரசன்னத்தையும் ஒரு பழக்கமான மற்றும் வசதியான வழியில் அனுபவிக்க உதவவும் நாங்கள் முயல்கிறோம்.',
    sTitle: 'ஆராதனை விவரங்கள்',
    loc: 'இடம்',
    locText: 'திவ்யோதயா சர்வ சமய மையம், எண் 91, கீதா ஹால் ரோடு, கோபாலபுரம், மாவட்ட நீதிமன்றம் அருகில், கோயம்புத்தூர், தமிழ்நாடு - 641018',
    time: 'நேரம்',
    timeText: 'ஒவ்வொரு ஞாயிற்றுக்கிழமையும் மாலை 7:00 மணிக்கு',
    maps: 'கூகுள் மேப்ஸில் பார்க்கவும்'
  },
  hi: {
    secLabel: 'मंत्रालय',
    title: 'हिंदी मंत्रालय',
    subtext: 'हिंदी भाषी समुदाय तक आराधना और परमेश्वर के वचन के साथ पहुँचना।',
    back: '← मंत्रालयों पर वापस जाएं',
    wTitle: 'हमारी अपनी भाषा में आराधना',
    wDesc1: 'ट्रिनिटी प्रेयर हाउस में हमारा हिंदी मंत्रालय हिंदी भाषी विश्वासियों के लिए अपनी मातृभाषा में आराधना, प्रार्थना और विश्वास में बढ़ने के लिए एक स्वागत योग्य आध्यात्मिक घर बनाने के लिए समर्पित है। हमारा मानना है कि जब परमेश्वर का वचन उस भाषा में अनुभव किया जाता है जो सीधे दिल से बात करती है, तो वह और भी व्यक्तिगत और प्रभावशाली हो जाता है, यही कारण है कि यह मंत्रालय हिंदी में आराधना, संगति और आध्यात्मिक प्रोत्साहन के लिए एक सार्थक स्थान प्रदान करता है।',
    wDesc2: 'चाहे आप शहर में नए हों या वर्षों से समुदाय का हिस्सा रहे हों, हमारा हिंदी मंत्रालय अपनेपन, जुड़ाव और आध्यात्मिक विकास का स्थान है। आराधना सेवाओं, प्रार्थना, संगति और परमेश्वर के वचन की शिक्षा के माध्यम से, हम विश्वास को मजबूत करने, स्थायी संबंध बनाने और हर व्यक्ति को एक परिचित और आरामदायक तरीके से मसीह के प्रेम और उपस्थिति का अनुभव करने में मदद करने का प्रयास करते हैं।',
    sTitle: 'आराधना सेवा का विवरण',
    loc: 'स्थान',
    locText: 'दिव्योदय अंतर-धार्मिक केंद्र, नं. 91, गीता हॉल रोड, गोपालपुरम, जिला न्यायालय के पास, कोयम्बटूर, तमिलनाडु - 641018',
    time: 'समय',
    timeText: 'हर रविवार शाम 7:00 बजे',
    maps: 'गूगल मैप्स में खोलें'
  }
};

export default function HindiMinistryPage() {
  const { lang } = useLang();
  const content = localTranslations[lang] || localTranslations.en;

  return (
    <div className={styles.pageWrap}>
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/hindi-ministry/worship-1.jpg" alt="Hindi Ministry gathering" fill priority={true} fetchPriority="high" style={{ objectFit: 'cover', objectPosition: 'center' }} />
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
              <h2>{content.wTitle}</h2>
              <p>
                {content.wDesc1}
              </p>
              <p>
                {content.wDesc2}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200} className={styles.galleryImageWrap}>
              <PhotoCarousel images={worshipImages} />
            </ScrollReveal>
          </div>

          <div className={styles.serviceDetailsGrid}>
            <ScrollReveal className={styles.serviceDetails}>
              <h2>{content.sTitle}</h2>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>{content.loc}</span>
                <p>{content.locText}</p>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>{content.time}</span>
                <p>{content.timeText}</p>
              </div>
              <a className={styles.mapLink} href={serviceMapUrl} target="_blank" rel="noopener noreferrer">
                {content.maps}
              </a>
            </ScrollReveal>

            <ScrollReveal delay={200} className={styles.mapWrap}>
              <iframe
                src={serviceMapEmbedUrl}
                title="Hindi Ministry service location map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
