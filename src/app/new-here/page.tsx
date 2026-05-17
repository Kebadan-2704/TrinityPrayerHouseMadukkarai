'use client';

import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Users, MapPin, Clock, Heart } from 'lucide-react';
import { useLang } from '@/components/LangContext';

const localTranslations = {
  en: {
    welcome: 'Welcome!',
    welcomeSub: "We're so glad you're here. Whether this is your first time at Trinity Prayer House or you're looking for a church home, we want you to know — you belong here.",
    whatToExpect: 'What to Expect',
    timesTitle: 'Service Times',
    timesDesc: 'Sunday Worship at 9:30 AM, Hindi Service at 6:30 PM, Bible Study on Thursdays at 6:30 PM. We also have special meetings and prayer gatherings throughout the month.',
    findUsTitle: 'Find Us',
    findUsDesc: 'Trinity Prayer House, 16/300 Gandhi Nagar, Madukkarai, Coimbatore - 641105. Free parking is available nearby.',
    communityTitle: 'Community',
    communityDesc: 'We are a multi-generational, multilingual church family. You will find a warm welcome whether you are young or old, new to faith or have walked with God for years.',
    kidsTitle: 'For Your Kids',
    kidsDesc: 'We have a dedicated Kids Ministry with Sunday School during the morning service and special programs like Vacation Bible School throughout the year.',
    firstVisitTips: 'First Visit Tips',
    tips: [
      'Arrive 10–15 minutes early so we can greet you and help you find a seat.',
      'Dress casually and comfortably — no dress code here.',
      'Grab a cup of tea or coffee from our welcome counter.',
      'Fill out a visitor card at the welcome desk so we can connect with you.',
      'Stay after service for fellowship time with light refreshments.',
      'Feel free to ask any questions — our team and congregation are here to help.',
    ],
    readyToVisit: 'Ready to Visit?',
    visitSub: 'We would love to welcome you in person. Join us this Sunday!',
    joinOnline: 'Join Online Meet',
    getInTouch: 'Get in Touch',
  },
  ta: {
    welcome: 'வரவேற்கிறோம்!',
    welcomeSub: "நீங்கள் இங்கு வந்ததில் எங்களுக்கு மிக்க மகிழ்ச்சி. நீங்கள் டிரினிட்டி ஜெப இல்லத்திற்கு வருவது இதுவே முதல் முறை என்றாலும் அல்லது ஒரு சபையைத் தேடிக்கொண்டிருந்தாலும், நீங்கள் இங்கு வரவேற்கப்படுகிறீர்கள்.",
    whatToExpect: 'எதிர்பார்க்க வேண்டியவை',
    timesTitle: 'ஆராதனை நேரங்கள்',
    timesDesc: 'ஞாயிறு ஆராதனை காலை 9:30 மணிக்கும், இந்தி ஆராதனை மாலை 6:30 மணிக்கும், வியாழக்கிழமைகளில் விவிலியப் படிப்பு மாலை 6:30 மணிக்கும் நடைபெறும். மாதம் முழுவதும் சிறப்பு கூட்டங்களும் ஜெபக் கூட்டங்களும் உள்ளன.',
    findUsTitle: 'எங்களை கண்டறியுங்கள்',
    findUsDesc: 'டிரினிட்டி ஜெப இல்லம், 16/300 காந்தி நகர், மடுக்கரை, கோயம்புத்தூர் - 641105. அருகில் இலவச பார்க்கிங் வசதி உள்ளது.',
    communityTitle: 'சமூகம்',
    communityDesc: 'நாங்கள் ஒரு பன்முறை மற்றும் பலமொழி பேசும் சபை குடும்பம். நீங்கள் இளைஞராக இருந்தாலும் சரி, முதியவராக இருந்தாலும் சரி, விசுவாசத்திற்கு புதியவராக இருந்தாலும் சரி அல்லது பல ஆண்டுகளாக கடவுளுடன் நடந்தவராக இருந்தாலும் சரி, உங்களை அன்போடு வரவேற்கிறோம்.',
    kidsTitle: 'உங்கள் குழந்தைகளுக்காக',
    kidsDesc: 'காலை ஆராதனையின் போது ஞாயிறு பள்ளி மற்றும் ஆண்டு முழுவதும் விடுமுறை விவிலிய பள்ளி போன்ற சிறப்பு நிகழ்ச்சிகளுடன் பிரத்யேக குழந்தைகள் ஊழியம் எங்களிடம் உள்ளது.',
    firstVisitTips: 'முதல் முறை வருபவர்களுக்கான உதவிக்குறிப்புகள்',
    tips: [
      'நாங்கள் உங்களை வரவேற்று நீங்கள் அமர உதவ 10-15 நிமிடங்களுக்கு முன்பே வாருங்கள்.',
      'சாதாரண மற்றும் வசதியான ஆடைகளை அணியுங்கள் - இங்கு கடுமையான ஆடை கட்டுப்பாடு எதுவும் இல்லை.',
      'எங்கள் வரவேற்பு கவுண்டரிலிருந்து ஒரு கப் தேநீர் அல்லது காபி அருந்துங்கள்.',
      'நாங்கள் உங்களுடன் தொடர்பு கொள்ள வசதியாக வரவேற்பு மேசையில் உள்ள பார்வையாளர் அட்டையை நிரப்பவும்.',
      'ஆராதனைக்குப் பிறகு எளிய சிற்றுண்டியுடன் கூடிய ஐக்கிய நேரத்தில் கலந்துகொள்ளுங்கள்.',
      'எந்தவொரு கேள்வியையும் கேட்க தயங்க வேண்டாம் - எங்கள் குழுவும் சபையினரும் உங்களுக்கு உதவ காத்திருக்கிறார்கள்.',
    ],
    readyToVisit: 'வரத் தயாரா?',
    visitSub: 'உங்களை நேரில் வரவேற்க நாங்கள் விரும்புகிறோம். இந்த ஞாயிறு எங்களுடன் இணையுங்கள்!',
    joinOnline: 'ஆன்லைன் சந்திப்பில் இணையுங்கள்',
    getInTouch: 'தொடர்பு கொள்ளுங்கள்',
  },
  hi: {
    welcome: 'स्वागत है!',
    welcomeSub: "हमें बहुत खुशी है कि आप यहाँ हैं। चाहे आप पहली बार ट्रिनिटी प्रेयर हाउस आ रहे हों या एक चर्च की तलाश में हों, हम चाहते हैं कि आप जानें — आप यहाँ स्वागत योग्य हैं।",
    whatToExpect: 'क्या उम्मीद करें',
    timesTitle: 'आराधना का समय',
    timesDesc: 'रविवार आराधना सुबह 9:30 बजे, हिंदी आराधना शाम 6:30 बजे, गुरुवार को बाइबल अध्ययन शाम 6:30 बजे। हमारे पास पूरे महीने विशेष बैठकें और प्रार्थना सभाएं भी होती हैं।',
    findUsTitle: 'हमें खोजें',
    findUsDesc: 'ट्रिनिटी प्रेयर हाउस, 16/300 गांधी नगर, मदुक्करै, कोयम्बटूर - 641105। पास में मुफ्त पार्किंग उपलब्ध है।',
    communityTitle: 'समुदाय',
    communityDesc: 'हम एक बहु-पीढ़ी, बहुभाषी चर्च परिवार हैं। चाहे आप युवा हों या वृद्ध, विश्वास में नए हों या वर्षों से परमेश्वर के साथ चले हों, आपको यहाँ हार्दिक स्वागत मिलेगा।',
    kidsTitle: 'आपके बच्चों के लिए',
    kidsDesc: 'हमारे पास सुबह की सेवा के दौरान संडे स्कूल और पूरे वर्ष वोकेशनल बाइबल स्कूल जैसे विशेष कार्यक्रमों के साथ एक समर्पित बच्चों की सेवकाई है।',
    firstVisitTips: 'पहली यात्रा के लिए सुझाव',
    tips: [
      '10-15 मिनट पहले पहुंचें ताकि हम आपका स्वागत कर सकें और आपको सीट खोजने में मदद कर सकें।',
      'कैज़ुअल और आरामदायक कपड़े पहनें — यहाँ कोई ड्रेस कोड नहीं है।',
      'हमारे स्वागत काउंटर से चाय या कॉफी का आनंद लें।',
      'स्वागत डेस्क पर एक विज़िटर कार्ड भरें ताकि हम आपसे जुड़ सकें।',
      'हल्के जलपान के साथ संगति के समय के लिए आराधना के बाद रुकें।',
      'कोई भी प्रश्न पूछने में संकोच न करें — हमारी टीम और कलीसिया मदद के लिए यहाँ हैं।',
    ],
    readyToVisit: 'यात्रा के लिए तैयार हैं?',
    visitSub: 'हम व्यक्तिगत रूप से आपका स्वागत करना पसंद करेंगे। इस रविवार हमारे साथ जुड़ें!',
    joinOnline: 'ऑनलाइन मीट में शामिल हों',
    getInTouch: 'संपर्क करें',
  }
};

export default function NewHere() {
  const { lang } = useLang();
  const content = localTranslations[lang] || localTranslations.en;

  const expectItems = [
    {
      icon: <Clock size={28} />,
      title: content.timesTitle,
      text: content.timesDesc,
    },
    {
      icon: <MapPin size={28} />,
      title: content.findUsTitle,
      text: content.findUsDesc,
    },
    {
      icon: <Users size={28} />,
      title: content.communityTitle,
      text: content.communityDesc,
    },
    {
      icon: <Heart size={28} />,
      title: content.kidsTitle,
      text: content.kidsDesc,
    },
  ];

  return (
    <div className={styles.pageWrap}>
      {/* Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
          <Image
            src="/worship.jpg"
            alt="Welcome to Trinity Prayer House"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.heroContent}>
            <h1>{content.welcome}</h1>
            <p className={styles.heroSub}>
              {content.welcomeSub}
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className={`section-padding ${styles.expectSection}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{content.whatToExpect}</h2>
          <div className={styles.expectGrid}>
            {expectItems.map((item, i) => (
              <div key={i} className={styles.expectCard} role="article" aria-label={item.title}>
                <div className={styles.expectIcon} aria-hidden="true">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* First Visit Tips */}
      <section className={styles.tipsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{content.firstVisitTips}</h2>
          <div className={styles.tipsGrid}>
            {content.tips.map((tip, i) => (
              <div key={i} className={styles.tipItem}>
                <span className={styles.tipNumber}>{String(i + 1).padStart(2, '0')}</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>{content.readyToVisit}</h2>
          <p>{content.visitSub}</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/online-meet" className={styles.ctaBtn}>
              {content.joinOnline}
            </Link>
            <Link href="/contact" className={styles.ctaBtnOutline}>
              {content.getInTouch}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}