'use client';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import styles from './vision.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggeredText from '@/components/ui/StaggeredText';
import { useLang } from '@/components/LangContext';

// ── LOCAL TRANSLATIONS ────────────────────────────────────────────────────────
const localTranslations = {
  en: {
    leadText: "The foundation of this Trinity Prayer House Ministries was laid by Rev. Dowy Sathyanathan Adhisayaraj, who built it through fasting, prayer, and with the sacrifice of his blood, sweat, and tears. Standing firmly beside him in this vision was his wife, Mrs. Chandra Sathyanathan. Rev. Dowy Sathyanathan Adhisayaraj was born as the third child among seven children to Aaron and Grace, who belonged to the Tamil Nadu Native Lutheran Church.",
    p2: "In Coimbatore, a city known for its many industries that generate wealth and livelihood, he shut down his lathe workshop — which had been the source of income for his family — in obedience to the voice of the Lord, and dedicated himself fully to God's ministry. On January 1, 1975, during an annual family prayer gathering held in Madukkarai, while singing the hymn 'The Holy One is in Our Midst,' he heard a voice asking: 'Is there holiness in your life as you sing this song?' Everyone in the room was deeply convicted, confessed their sins, wept, and prayed. Even without fully understanding these experiences, they received anointing and spiritual joy.",
    p3: "In July 1975, after being baptized in Vellore, North Arcot district, he decided to spend five days in prayer before returning. On the fifth day, he was spiritually led by the hand of the Lord to a hill in Madukkarai, where he was told: 'Do ministry in this place.'",
    ministryTitle: "Trinity Prayer House Ministry",
    p4: "In 1976, he rented a house in the exact location shown to him in the vision at Madukkarai and began the ministry. In 1980, by God's grace, he purchased the same land he had seen in the vision — 40 cents of land — and within 40 days, a church building was constructed and completed through faith.",
    p5: "From 1975 to 1995, for twenty years, Rev. Dowy Sathyanathan Adhisayaraj served as Church Pastor, Convention Speaker, Speakers' Conference Preacher, Coimbatore Pentecostal Unity Secretary, and Vice President. Because of his deep knowledge of Scripture, many called him a 'Walking Bible University.' As evidence of his holy life and sincere ministry, he had written in his own Bible that he would serve in ministry for only 20 years, and afterward enter the Kingdom of God. Exactly according to this, on May 27, 1995, he entered God's Kingdom.",
    lateFounder: "Late Founder",
    pastorName: "Pastor Dowy Sathyanathan",
    quote: "He lived not for worldly comfort, but for the purpose God had placed upon his life.",
    charTitle: "His Character",
    charDesc: "Always seen burning with the presence of the Lord and the fire of the Holy Spirit — deeply loving, yet extremely strict in spiritual matters.",
    compTitle: "His Compassion",
    compDesc: "He had extraordinary compassion for the poor and continually helped those in need. During his ministry, he baptized at least 500 relatives, in addition to many church believers.",
    visTitle: "His Vision",
    visDesc: "His enduring vision was to bring comfort, care, and hope to the lives of the orphaned and the destitute through Christ's love.",
    jourTitle: "His Journey",
    jourDesc: "Like the apostles, he travelled extensively in service of the Gospel, carrying God's message wherever he was called."
  },
  ta: {
    leadText: "இந்த டிரினிட்டி பிரேயர் ஹவுஸ் ஊழியங்களின் அஸ்திவாரம் போதகர் டெவி சத்தியநாதன் அதிசயராஜ் அவர்களால் உபவாசம், ஜெபம் மற்றும் அவரது இரத்தம், வியர்வை மற்றும் கண்ணீரின் தியாகத்தால் போடப்பட்டது. இந்த தரிசனத்தில் அவருக்கு உறுதுணையாக நின்றவர் அவரது மனைவி திருமதி சந்திரா சத்தியநாதன் ஆவார். போதகர் டெவி சத்தியநாதன் அதிசயராஜ், தமிழ்நாடு நேட்டிவ் லூத்தரன் திருச்சபையைச் சேர்ந்த ஆரோன் மற்றும் கிரேஸ் தம்பதியருக்கு ஏழு குழந்தைகளில் மூன்றாவது குழந்தையாகப் பிறந்தார்.",
    p2: "செல்வத்தையும் வாழ்வாதாரத்தையும் உருவாக்கும் பல தொழில்களுக்குப் பெயர் பெற்ற கோயம்புத்தூரில், கர்த்தருடைய சத்தத்திற்கு கீழ்ப்படிந்து, தனது குடும்பத்தின் வருமான ஆதாரமாக இருந்த லேத் பட்டறையை மூடிவிட்டு, தன்னை முழுமையாக கடவுளின் ஊழியத்திற்கு அர்ப்பணித்தார். ஜனவரி 1, 1975 அன்று, மடுக்கரையில் நடைபெற்ற வருடாந்திர குடும்ப ஜெபக் கூட்டத்தில், 'பரிசுத்தர் நம் நடுவில் இருக்கிறார்' என்ற பாடலைப் பாடும்போது, 'இப்பாடலைப் பாடும்போது உன் வாழ்க்கையில் பரிசுத்தம் இருக்கிறதா?' என்று ஒரு குரல் கேட்டது. அறையிலிருந்த அனைவரும் ஆழமாக உணர்த்தப்பட்டு, தங்கள் பாவங்களை அறிக்கை செய்து, அழுது ஜெபித்தனர். இந்த அனுபவங்களை முழுமையாகப் புரிந்து கொள்ளாவிட்டாலும், அவர்கள் அபிஷேகத்தையும் ஆவிக்குரிய மகிழ்ச்சியையும் பெற்றனர்.",
    p3: "ஜூலை 1975 இல், வட ஆற்காடு மாவட்டத்திலுள்ள வேலூரில் ஞானஸ்நானம் பெற்ற பிறகு, அவர் திரும்புவதற்கு முன்பு ஐந்து நாட்கள் ஜெபத்தில் கழிக்க முடிவு செய்தார். ஐந்தாவது நாளில், அவர் கர்த்தருடைய கரத்தால் ஆவிக்குரிய முறையில் மடுக்கரையில் உள்ள ஒரு குன்றுக்கு வழிநடத்தப்பட்டார், அங்கே அவருக்கு: 'இந்த இடத்தில் ஊழியம் செய்' என்று கூறப்பட்டது.",
    ministryTitle: "டிரினிட்டி ஜெப இல்ல ஊழியம்",
    p4: "1976 ஆம் ஆண்டில், மடுக்கரையில் உள்ள தரிசனத்தில் தனக்குக் காட்டப்பட்ட அதே இடத்தில் ஒரு வீட்டை வாடகைக்கு எடுத்து ஊழியத்தைத் தொடங்கினார். 1980 இல், கடவுளின் கிருபையால், அவர் தரிசனத்தில் பார்த்த அதே நிலத்தை - 40 சென்ட் நிலத்தை - வாங்கினார், மேலும் 40 நாட்களுக்குள், விசுவாசத்தின் மூலம் ஒரு தேவாலயக் கட்டிடம் கட்டப்பட்டு முடிக்கப்பட்டது.",
    p5: "1975 முதல் 1995 வரை இருபது ஆண்டுகள், போதகர் டெவி சத்தியநாதன் அதிசயராஜ் சபை போதகராகவும், மாநாட்டு பேச்சாளராகவும், கோயம்புத்தூர் பெந்தெகொஸ்தே ஐக்கிய செயலாளராகவும், துணைத் தலைவராகவும் பணியாற்றினார். வேதவசனங்களைப் பற்றிய அவரது ஆழமான அறிவின் காரணமாக, பலர் அவரை 'நடக்கும் பைபிள் பல்கலைக்கழகம்' என்று அழைத்தனர். அவரது பரிசுத்த வாழ்க்கைக்கும் உண்மையான ஊழியத்திற்கும் சான்றாக, அவர் 20 ஆண்டுகள் மட்டுமே ஊழியத்தில் பணியாற்றுவேன் என்றும், அதன் பிறகு தேவனுடைய ராஜ்யத்தில் பிரவேசிப்பேன் என்றும் தனது சொந்த பைபிளில் எழுதியிருந்தார். அதற்கு நேர் மாறாக, மே 27, 1995 அன்று, அவர் தேவனுடைய ராஜ்யத்திற்குள் பிரவேசித்தார்.",
    lateFounder: "மறைந்த நிறுவனர்",
    pastorName: "போதகர் டெவி சத்தியநாதன்",
    quote: "அவர் உலக வசதிக்காக வாழவில்லை, மாறாக கடவுள் அவரது வாழ்க்கையில் வைத்த நோக்கத்திற்காக வாழ்ந்தார்.",
    charTitle: "அவரது குணாதிசயம்",
    charDesc: "எப்போதும் கர்த்தருடைய பிரசன்னத்தினாலும் பரிசுத்த ஆவியின் அக்கினியினாலும் எரிகிறவராகக் காணப்பட்டார் - ஆழமான அன்பு கொண்டவர், அதே நேரத்தில் ஆன்மீக விஷயங்களில் மிகவும் கண்டிப்பானவர்.",
    compTitle: "அவரது இரக்கம்",
    compDesc: "அவர் ஏழைகள் மீது அசாதாரண இரக்கம் கொண்டிருந்தார் மற்றும் தேவைப்படுபவர்களுக்கு தொடர்ந்து உதவினார். அவரது ஊழியத்தின் போது, பல சபை விசுவாசிகளைத் தவிர, குறைந்தபட்சம் 500 உறவினர்களுக்கு ஞானஸ்நானம் கொடுத்தார்.",
    visTitle: "அவரது தரிசனம்",
    visDesc: "அனாதைகள் மற்றும் ஆதரவற்றோரின் வாழ்க்கைக்கு கிறிஸ்துவின் அன்பு மூலம் ஆறுதல், கவனிப்பு மற்றும் நம்பிக்கையைக் கொண்டு வருவதே அவரது நிலைத்த தரிசனமாக இருந்தது.",
    jourTitle: "அவரது பயணம்",
    jourDesc: "அப்போஸ்தலர்களைப் போல, சுவிசேஷப் பணியில் அவர் விரிவாகப் பயணம் செய்தார், அவர் அழைக்கப்பட்ட இடமெல்லாம் தேவனுடைய செய்தியை எடுத்துச் சென்றார்."
  },
  hi: {
    leadText: "इस ट्रिनिटी प्रेयर हाउस मिनिस्ट्रीज की नींव पादरी डेवी सत्यनाथन अतिशयाराज द्वारा उपवास, प्रार्थना और अपने खून, पसीने और आंसुओं के बलिदान के साथ रखी गई थी। इस दर्शन में उनके साथ दृढ़ता से खड़ी उनकी पत्नी श्रीमती चंद्रा सत्यनाथन थीं। पादरी डेवी सत्यनाथन अतिशयाराज का जन्म तमिलनाडु नेटिव लूथरन चर्च से जुड़े हारून और ग्रेस के सात बच्चों में से तीसरे बच्चे के रूप में हुआ था।",
    p2: "कोयंबटूर में, जो धन और आजीविका पैदा करने वाले कई उद्योगों के लिए जाना जाता है, उन्होंने प्रभु की आवाज के आज्ञापालन में अपनी खराद (लेथ) कार्यशाला को बंद कर दिया - जो उनके परिवार की आय का स्रोत था - और खुद को पूरी तरह से परमेश्वर की सेवकाई के लिए समर्पित कर दिया। 1 जनवरी, 1975 को, मदुक्करै में आयोजित एक वार्षिक पारिवारिक प्रार्थना सभा के दौरान, 'पवित्र हमारे बीच में है' भजन गाते समय, उन्होंने एक आवाज सुनी: 'जब तुम यह गीत गाते हो, तो क्या तुम्हारे जीवन में पवित्रता है?' कमरे में मौजूद हर कोई गहराई से दोषी ठहराया गया, अपने पापों को स्वीकार किया, रोया और प्रार्थना की। इन अनुभवों को पूरी तरह से समझे बिना भी, उन्हें अभिषेक और आध्यात्मिक आनंद प्राप्त हुआ।",
    p3: "जुलाई 1975 में, उत्तरी आरकोट जिले के वेल्लोर में बपतिस्मा लेने के बाद, उन्होंने लौटने से पहले पांच दिन प्रार्थना में बिताने का फैसला किया। पांचवें दिन, उन्हें आध्यात्मिक रूप से प्रभु के हाथ से मदुक्करै की एक पहाड़ी पर ले जाया गया, जहाँ उनसे कहा गया: 'इस स्थान पर सेवकाई करो।'",
    ministryTitle: "ट्रिनिटी प्रेयर हाउस मिनिस्ट्री",
    p4: "1976 में, उन्होंने मदुक्करै में दर्शन में दिखाए गए सटीक स्थान पर एक घर किराए पर लिया और सेवकाई शुरू की। 1980 में, ईश्वर की कृपा से, उन्होंने वही भूमि खरीदी जो उन्होंने दर्शन में देखी थी - 40 सेंट भूमि - और विश्वास के माध्यम से 40 दिनों के भीतर एक चर्च भवन का निर्माण और समापन किया गया।",
    p5: "1975 से 1995 तक, बीस वर्षों तक, पादरी डेवी सत्यनाथन अतिशयाराज ने चर्च पादरी, कन्वेंशन वक्ता, वक्ता सम्मेलन प्रचारक, कोयंबटूर पेंटेकोस्टल एकता सचिव और उपाध्यक्ष के रूप में कार्य किया। पवित्रशास्त्र के उनके गहरे ज्ञान के कारण, कई लोगों ने उन्हें 'चलता-फिरता बाइबिल विश्वविद्यालय' कहा। उनके पवित्र जीवन और ईमानदार सेवकाई के प्रमाण के रूप में, उन्होंने अपनी बाइबिल में लिखा था कि वह केवल 20 वर्षों तक सेवकाई करेंगे और उसके बाद परमेश्वर के राज्य में प्रवेश करेंगे। ठीक इसी के अनुसार, 27 मई, 1995 को उन्होंने परमेश्वर के राज्य में प्रवेश किया।",
    lateFounder: "दिवंगत संस्थापक",
    pastorName: "पादरी डेवी सत्यनाथन",
    quote: "वह सांसारिक सुख के लिए नहीं, बल्कि उस उद्देश्य के लिए जीवित रहे जो परमेश्वर ने उनके जीवन पर रखा था।",
    charTitle: "उनका चरित्र",
    charDesc: "हमेशा प्रभु की उपस्थिति और पवित्र आत्मा की आग से जलते हुए देखे गए - गहरे प्यार करने वाले, फिर भी आध्यात्मिक मामलों में बेहद सख्त।",
    compTitle: "उनकी करुणा",
    compDesc: "उन्हें गरीबों के प्रति असाधारण करुणा थी और वे लगातार जरूरतमंदों की मदद करते थे। अपनी सेवकाई के दौरान, उन्होंने कई चर्च विश्वासियों के अलावा, कम से कम 500 रिश्तेदारों को बपतिस्मा दिया।",
    visTitle: "उनका दर्शन",
    visDesc: "उनका स्थायी दर्शन मसीह के प्रेम के माध्यम से अनाथ और बेसहारा लोगों के जीवन में आराम, देखभाल और आशा लाना था।",
    jourTitle: "उनकी यात्रा",
    jourDesc: "प्रेरितों की तरह, उन्होंने सुसमाचार की सेवा में बड़े पैमाने पर यात्रा की, जहाँ भी उन्हें बुलाया गया, परमेश्वर का संदेश ले गए।"
  }
};

// ── PHOTO CONFIG ────────────────────────────────────────────────────────────
const CAROUSEL_PHOTOS = [
  { src: '/sath.webp', objectPosition: '50% 5%', scale: 1.0 }, // original
  { src: '/vision-photos/photo1.jpg', objectPosition: '50% 50%', scale: 1.0 },
  { src: '/vision-photos/photo3.jpg', objectPosition: '50% 10%', scale: 1.0 },
  { src: '/vision-photos/photo4.jpg', objectPosition: '50% 40%', scale: 1.0 },
  { src: '/vision-photos/photo5.jpg', objectPosition: '50% 40%', scale: 1.0 },
  { src: '/vision-photos/photo6.jpg', objectPosition: '50% 50%', scale: 1.0 },
  { src: '/vision-photos/photo7.jpg', objectPosition: '50% 20%', scale: 1.0 },
];

export default function About() {
  const { t, lang } = useLang();
  const [current, setCurrent] = useState(0);

  const content = localTranslations[lang] || localTranslations.en;

  const next = useCallback(() => setCurrent(c => (c + 1) % CAROUSEL_PHOTOS.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + CAROUSEL_PHOTOS.length) % CAROUSEL_PHOTOS.length), []);



  return (
    <div className="pageWrap">
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/old.jpg" alt="Vision history photo" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100} variant="blurIn">
            <div className={styles.secLabel}>{t.aboutUs}</div>
            <h1>
              <StaggeredText text={t.aboutH1a} el="span" /> 
              <i><StaggeredText text={t.aboutH1b} el="span" /></i> 
              <StaggeredText text={t.aboutH1c} el="span" />
            </h1>
            <p className={styles.headerSubtext}>{t.aboutSub}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section-padding ${styles.contentSection} pres-band-soft pres-rail`}>
        <div className={`container ${styles.aboutGrid}`}>
          <ScrollReveal delay={200} variant="fadeRight" className={styles.mainText}>
            <h2><StaggeredText text={t.legacyTitle} el="span" /></h2>

            <div className={styles.leadText}>
              <StaggeredText text={content.leadText} />
            </div>
            <StaggeredText text={content.p2} />
            
            <StaggeredText text={content.p3} />
            
            <h2 style={{ marginTop: '2rem' }}><StaggeredText text={content.ministryTitle} el="span" /></h2>
            <StaggeredText text={content.p4} />
            
            <StaggeredText text={content.p5} />
          </ScrollReveal>

          <ScrollReveal delay={320} variant="fadeLeft" className={styles.sideContent}>
            {/* ── Photo Carousel ── */}
            <div className={styles.pastorCard}>
              <div className={styles.pastorImageWrap} style={{ position: 'relative' }}>
                {CAROUSEL_PHOTOS.map((photo, i) => (
                  <div
                    key={photo.src}
                    style={{
                      position: 'absolute', inset: 0,
                      opacity: i === current ? 1 : 0,
                      transition: 'opacity 0.8s ease',
                      pointerEvents: i === current ? 'auto' : 'none',
                      transform: `scale(${photo.scale})`,
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={`Photo ${i + 1}`}
                      fill
                      style={{ objectFit: 'cover', objectPosition: photo.objectPosition }}
                      priority={i === 0}
                    />
                  </div>
                ))}

                <button
                  onClick={prev}
                  aria-label="Previous photo"
                  style={{
                    position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                    zIndex: 10, background: 'rgba(0,0,0,0.2)',
                    border: 'none', padding: '12px 8px', borderRadius: '4px',
                    cursor: 'pointer', lineHeight: 0,
                  }}
                >
                  <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
                    <polyline points="11,2 3,12 11,22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button
                  onClick={next}
                  aria-label="Next photo"
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    zIndex: 10, background: 'rgba(0,0,0,0.2)',
                    border: 'none', padding: '12px 8px', borderRadius: '4px',
                    cursor: 'pointer', lineHeight: 0,
                  }}
                >
                  <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
                    <polyline points="3,2 11,12 3,22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div style={{
                  position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
                  display: 'flex', gap: 6, zIndex: 10,
                }}>
                  {CAROUSEL_PHOTOS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      aria-label={`Go to photo ${i + 1}`}
                      style={{
                        width: i === current ? 18 : 7, height: 7,
                        borderRadius: 4, border: 'none',
                        background: i === current ? '#fff' : 'rgba(255,255,255,0.45)',
                        cursor: 'pointer', padding: 0,
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.pastorInfo}>
                <div className={styles.secLabel}>{content.lateFounder}</div>
                <h3>{content.pastorName}</h3>
                <p>{t.pastorDesc}</p>
              </div>
            </div>

            <div className={styles.quoteBlock}>
              <h3>&ldquo;<StaggeredText text={content.quote} el="span" />&rdquo;</h3>
            </div>
            <div className={styles.coreValues}>
              <div className={styles.valueItem}>
                <h3>{content.charTitle}</h3>
                <StaggeredText text={content.charDesc} />
              </div>
              <div className={styles.valueItem}>
                <h3>{content.compTitle}</h3>
                <StaggeredText text={content.compDesc} />
              </div>
              <div className={styles.valueItem}>
                <h3>{content.visTitle}</h3>
                <StaggeredText text={content.visDesc} />
              </div>
              <div className={styles.valueItem}>
                <h3>{content.jourTitle}</h3>
                <StaggeredText text={content.jourDesc} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

