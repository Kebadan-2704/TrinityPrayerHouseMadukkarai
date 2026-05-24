'use client';
import Image from 'next/image';
import styles from './mission.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggeredText from '@/components/ui/StaggeredText';
import { useLang } from '@/components/LangContext';

// ── LOCAL TRANSLATIONS ────────────────────────────────────────────────────────
const localTranslations = {
  en: {
    legacyTitle: "A Blessed Legacy",
    leadText: "One of the most significant ministers who emerged during the early days of the Pentecostal movement in Coimbatore district was Pastor Dowy Sathyanathan. His wife was Mrs. Chandra Sathyanathan. Pastor Vasanth Sathyanathan was born as the second son to this blessed couple.",
    p2: "After completing his schooling, questions about his future began to arise. While he was praying about this, one morning there was a knock at the door of their house. When they opened it, Evangelist Mohan C. Lazarus was standing there. Pastor Dowy Sathyanathan and Mohan C. Lazarus had a close relationship through ministry, and therefore Mohan C. often visited the Madukkarai church.",
    p3: "On that particular visit, he looked at the young Vasanth Sathyanathan and prophetically declared that the Lord was calling him into ministry. He also said that he himself would take him to Chennai and bear all the expenses for his studies. Immediately, Pastor Dowy Sathyanathan and Mohan C. Lazarus together took Vasanth Sathyanathan to Chennai and enrolled him in Hindustan Bible College.",
    p4: "After graduating from Bible college, he began serving in ministry under his father from a very young age.",
    p5: "However, the Lord’s plan unfolded differently. Within only a few years after entering ministry, he lost his beloved father. Yet the Lord faithfully continued to lead and sustain him in the ministry.",
    p6: "According to God’s will, he accepted Danalatha as his life partner. This blessed couple has been gifted with a daughter and a son.",
    p7: "As the years passed, the Lord began to use him more and more powerfully both within India and abroad. He has ministered extensively in countries such as the United States of America, Abu Dhabi, Kuwait, and the United Arab Emirates.",
    p8: "At present, he is faithfully serving as the Senior Pastor of Trinity Prayer House according to the will of God.",
    p9: "We lovingly invite you to join our live services to hear life-transforming messages that heal broken hearts, restore wounded souls, and bring prophetic words from the Lord. For further details and prayer support, please feel free to contact us.",
    pastorName: "Pastor Vasanth Sathyanathan",
    familyLabel: "Our Family",
    familyDesc: "United in Faith & Purpose"
  },
  ta: {
    legacyTitle: "ஒரு ஆசீர்வதிக்கப்பட்ட பாரம்பரியம்",
    leadText: "கோயம்புத்தூர் மாவட்டத்தில் பெந்தெகொஸ்தே இயக்கத்தின் ஆரம்ப நாட்களில் உருவான மிக முக்கியமான ஊழியர்களில் ஒருவர் போதகர் டெவி சத்தியநாதன் ஆவார். இவருடைய மனைவி திருமதி சந்திரா சத்தியநாதன் ஆவார். இந்த ஆசீர்வதிக்கப்பட்ட தம்பதியருக்கு இரண்டாவது மகனாக போதகர் வசந்த் சத்தியநாதன் பிறந்தார்.",
    p2: "பள்ளிப் படிப்பை முடித்த பிறகு, அவரது எதிர்காலத்தைப் பற்றிய கேள்விகள் எழத் தொடங்கின. இதைப் பற்றி அவர் ஜெபித்துக் கொண்டிருந்தபோது, ஒரு நாள் காலையில் அவர்கள் வீட்டு கதவு தட்டப்பட்டது. கதவைத் திறந்தபோது, சுவிசேஷகர் மோகன் சி. லாசரஸ் அங்கே நின்றுகொண்டிருந்தார். போதகர் டெவி சத்தியநாதனுக்கும் மோகன் சி. லாசரஸுக்கும் ஊழியத்தின் மூலம் நெருங்கிய தொடர்பு இருந்தது, எனவே மோகன் சி. அடிக்கடி மடுக்கரை சபைக்கு வருவதுண்டு.",
    p3: "அந்த குறிப்பிட்ட வருகையின் போது, அவர் வாலிபனாக இருந்த வசந்த் சத்தியநாதனைப் பார்த்து, கர்த்தர் அவரை ஊழியத்திற்கு அழைக்கிறார் என்று தீர்க்கதரிசனமாக அறிவித்தார். மேலும் தானே அவரை சென்னைக்கு அழைத்துச் சென்று அவரது படிப்புக்கான அனைத்து செலவுகளையும் ஏற்பதாகக் கூறினார். உடனே, போதகர் டெவி சத்தியநாதனும் மோகன் சி. லாசரஸும் சேர்ந்து வசந்த் சத்தியநாதனை சென்னைக்கு அழைத்துச் சென்று இந்துஸ்தான் பைபிள் கல்லூரியில் சேர்த்தனர்.",
    p4: "பைபிள் கல்லூரியில் பட்டம் பெற்ற பிறகு, மிக இளம் வயதிலிருந்தே தன் தந்தையின் கீழ் ஊழியத்தில் சேவை செய்யத் தொடங்கினார்.",
    p5: "இருப்பினும், கர்த்தருடைய திட்டம் வித்தியாசமாக வெளிப்பட்டது. ஊழியத்தில் பிரவேசித்த சில வருடங்களிலேயே தன் அன்புத் தந்தையை இழந்தார். ஆனாலும் கர்த்தர் அவரை ஊழியத்தில் உண்மையுடன் தொடர்ந்து வழிநடத்தி ஆதரித்தார்.",
    p6: "தேவனுடைய சித்தத்தின்படி, அவர் தனலதாவை தன் வாழ்க்கை துணையாக ஏற்றுக்கொண்டார். இந்த ஆசீர்வதிக்கப்பட்ட தம்பதியருக்கு ஒரு மகளும் ஒரு மகனும் பரிசாக வழங்கப்பட்டுள்ளனர்.",
    p7: "ஆண்டுகள் கடந்து செல்ல செல்ல, கர்த்தர் அவரை இந்தியாவிலும் வெளிநாட்டிலும் மேலும் மேலும் வல்லமையாகப் பயன்படுத்தத் தொடங்கினார். அமெரிக்கா, அபுதாபி, குவைத் மற்றும் ஐக்கிய அரபு அமீரகம் போன்ற நாடுகளில் அவர் விரிவாக ஊழியப் பணியாற்றியுள்ளார்.",
    p8: "தற்போது, தேவனுடைய சித்தத்தின்படி டிரினிட்டி ஜெப இல்லத்தின் மூத்த போதகராக உண்மையுடன் பணியாற்றி வருகிறார்.",
    p9: "உடைந்த இதயங்களை குணப்படுத்தும், காயப்பட்ட ஆத்துமாக்களை மீட்டெடுக்கும் மற்றும் கர்த்தரிடமிருந்து தீர்க்கதரிசன வார்த்தைகளைக் கொண்டுவரும் வாழ்க்கை மாற்றும் செய்திகளைக் கேட்க எங்களது நேரடி ஆராதனைகளில் இணைய உங்களை அன்புடன் அழைக்கிறோம். கூடுதல் விவரங்கள் மற்றும் ஜெப ஆதரவுக்கு, எங்களைத் தொடர்பு கொள்ள தயங்க வேண்டாம்.",
    pastorName: "போதகர் வசந்த் சத்தியநாதன்",
    familyLabel: "எங்கள் குடும்பம்",
    familyDesc: "விசுவாசம் & நோக்கத்தில் ஒன்றிணைந்து"
  },
  hi: {
    legacyTitle: "एक धन्य विरासत",
    leadText: "कोयंबटूर जिले में पेंटेकोस्टल आंदोलन के शुरुआती दिनों में उभरने वाले सबसे महत्वपूर्ण मंत्रियों में से एक पादरी डेवी सत्यनाथन थे। उनकी पत्नी श्रीमती चंद्रा सत्यनाथन थीं। पादरी वसंत सत्यनाथन का जन्म इस धन्य जोड़े के दूसरे बेटे के रूप में हुआ था।",
    p2: "अपनी स्कूली शिक्षा पूरी करने के बाद, उनके भविष्य के बारे में सवाल उठने लगे। जब वे इस बारे में प्रार्थना कर रहे थे, तो एक सुबह उनके घर के दरवाजे पर दस्तक हुई। जब उन्होंने दरवाजा खोला, तो सुसमाचार प्रचारक मोहन सी. लाजर वहां खड़े थे। पादरी डेवी सत्यनाथन और मोहन सी. लाजर के बीच सेवकाई के माध्यम से करीबी संबंध थे, और इसलिए मोहन सी. अक्सर मदुक्करै चर्च आते थे।",
    p3: "उस विशेष यात्रा पर, उन्होंने युवा वसंत सत्यनाथन की ओर देखा और भविष्यद्वाणी की कि प्रभु उन्हें सेवकाई में बुला रहे हैं। उन्होंने यह भी कहा कि वह खुद उन्हें चेन्नई ले जाएंगे और उनकी पढ़ाई का सारा खर्च उठाएंगे। तुरंत, पादरी डेवी सत्यनाथन और मोहन सी. लाजर मिलकर वसंत सत्यनाथन को चेन्नई ले गए और उन्हें हिंदुस्तान बाइबिल कॉलेज में दाखिला दिलाया।",
    p4: "बाइबिल कॉलेज से स्नातक होने के बाद, उन्होंने बहुत कम उम्र से ही अपने पिता के अधीन सेवकाई में सेवा करना शुरू कर दिया था।",
    p5: "हालाँकि, प्रभु की योजना अलग तरह से सामने आई। सेवकाई में प्रवेश करने के कुछ ही वर्षों के भीतर, उन्होंने अपने प्यारे पिता को खो दिया। फिर भी प्रभु ने सेवकाई में उनका मार्गदर्शन करना और उन्हें बनाए रखना वफादारी से जारी रखा।",
    p6: "परमेश्वर की इच्छा के अनुसार, उन्होंने धनलता को अपनी जीवन संगिनी के रूप में स्वीकार किया। इस धन्य जोड़े को एक बेटी और एक बेटे का आशीर्वाद मिला है।",
    p7: "जैसे-जैसे वर्ष बीतते गए, प्रभु ने भारत और विदेशों दोनों में उनका अधिक से अधिक शक्तिशाली रूप से उपयोग करना शुरू कर दिया। उन्होंने संयुक्त राज्य अमेरिका, अबू धाबी, कुवैत और संयुक्त अरब इराद (UAE) जैसे देशों में बड़े पैमाने पर सेवकाई की है।",
    p8: "वर्तमान में, वह परमेश्वर की इच्छा के अनुसार ट्रिनिटी प्रेयर हाउस के वरिष्ठ पादरी के रूप में वफादारी से सेवा कर रहे हैं।",
    p9: "हम आपको जीवन बदलने वाले संदेशों को सुनने के लिए हमारी लाइव सेवाओं में शामिल होने के लिए प्यार से आमंत्रित करते हैं जो टूटे हुए दिलों को चंगा करते हैं, घायल आत्माओं को बहाल करते हैं, और प्रभु से भविष्यद्वाणी के शब्द लाते हैं। अधिक जानकारी और प्रार्थना सहायता के लिए, कृपया हमसे बेझिझक संपर्क करें।",
    pastorName: "पादरी वसंत सत्यनाथन",
    familyLabel: "हमारा परिवार",
    familyDesc: "विश्वास और उद्देश्य में एकजुट"
  }
};

export default function Mission() {
  const { t, lang } = useLang();
  const content = localTranslations[lang] || localTranslations.en;

  return (
    <div className="pageWrap">
      <section className={`${styles.headerSection} mesh-editorial-header`}>
        <div className={styles.headerBg}>
          <Image src="/bm.jpg" alt="Mission history photo" fill style={{ objectFit: 'cover', objectPosition: 'center 68%'}} priority />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal delay={100} variant="blurIn">
            <div className={styles.secLabel}>{t.missionUs}</div>
            <h1>
              <StaggeredText text={t.missionH1a} el="span" /> 
              <i><StaggeredText text={t.missionH1b} el="span" /></i> 
              <StaggeredText text={t.missionH1c} el="span" />
            </h1>
            <p className={styles.headerSubtext}>{t.missionSub}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section-padding ${styles.contentSection} pres-band-soft pres-rail`}>
        <div className={`container ${styles.missionGrid}`}>
          <div className={styles.mainText}>
            <ScrollReveal delay={100}>
              <h2><StaggeredText text={content.legacyTitle} el="span" /></h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className={styles.leadText}>
                <StaggeredText text={content.leadText} />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <StaggeredText text={content.p2} />
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <StaggeredText text={content.p3} />
            </ScrollReveal>
            <ScrollReveal delay={500}>
              <StaggeredText text={content.p4} />
            </ScrollReveal>
            <ScrollReveal delay={600}>
              <StaggeredText text={content.p5} />
            </ScrollReveal>
            <ScrollReveal delay={700}>
              <StaggeredText text={content.p6} />
            </ScrollReveal>
            <ScrollReveal delay={800}>
              <StaggeredText text={content.p7} />
            </ScrollReveal>
            <ScrollReveal delay={900}>
              <StaggeredText text={content.p8} />
            </ScrollReveal>
            <ScrollReveal delay={1000}>
              <StaggeredText text={content.p9} />
            </ScrollReveal>
          </div>
          <ScrollReveal delay={320} variant="fadeLeft" className={styles.sideContent}>
            <div className={styles.pastorCard}>
              <div className={styles.pastorImageWrap}><Image src="/vmain.jpeg" alt="Pastor Vasanth Sathyanathan" fill style={{ objectFit: 'cover', objectPosition: '55% 17%' }} /></div>
              <div className={styles.pastorInfo}>
                <div className={styles.secLabel}>{t.seniorPastor}</div>
                <h3>{content.pastorName}</h3>
                <p>{t.pastorDesc}</p>
              </div>
            </div>
            <div className={styles.quoteBlock}>
              <h3>&ldquo;<StaggeredText text={t.aboutQuote || 'We are not just building a church; we are building people.'} el="span" />&rdquo;</h3>
            </div>
            <div className={styles.pastorCard} style={{ marginTop: '2rem' }}>
              <div className={styles.pastorImageWrap} style={{ paddingBottom: '70%' }}>
                <Image src="/Family Pic.jpeg" alt={content.familyLabel} fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
              </div>
              <div className={styles.pastorInfo}>
                <div className={styles.secLabel}>{content.familyLabel}</div>
                <p>{content.familyDesc}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

