export type MeetingPhoto = string | {
  src: string;
  objectPosition?: string;
};

// ── Meeting data — add more photos as arrays, one entry per meeting ──
export type MeetingSession = {
  label: string;
  ytId: string;
  description: string;
};

export type Meeting = {
  id: number;
  title: string;
  ytId?: string;
  description?: string;
  photos: MeetingPhoto[];
  sessions?: MeetingSession[];
  photoDisplay?: 'stack' | 'single-card';
};

export const localizedMeetingsData: { en: Meeting[]; ta: Meeting[]; hi: Meeting[] } = {
  en: [
    {
      id: 1,
      title: '50th Year of Vision Day Thanksgiving Service',
      ytId: 'sHjLhuEItM0',
      description: 'A landmark celebration marking 50 years since the Lord first gave Rev. Dowy Sathyanathan Adhisayaraj the vision for this ministry. The congregation gathered in heartfelt thanksgiving, remembering God\'s faithfulness across five decades of ministry at the foothill of Madukkarai.',
      photos: [
        '/special-meetings/meeting1/photo1.jpg',
        '/special-meetings/meeting1/photo2.jpg',
        { src: '/special-meetings/meeting1/photo3.jpg', objectPosition: '50% 45%' },
        '/special-meetings/meeting1/photo4.jpg',
        '/special-meetings/meeting1/photo5.jpg',
        '/special-meetings/meeting1/photo6.jpg',
        '/special-meetings/meeting1/photo7.jpg',
        '/special-meetings/meeting1/photo8.jpg',
        '/special-meetings/meeting1/photo9.jpg',
        '/special-meetings/meeting1/photo10.jpg',
      ],
    },
    {
      id: 2,
      title: 'Maraven Live Praise & Worship',
      ytId: 'bwTC3XHRVxo',
      description: 'An electrifying evening of live praise and worship that drew the presence of God in a powerful way. Hearts were lifted in adoration as the congregation experienced the joy and freedom found only in sincere worship.',
      photos: [
        { src: '/special-meetings/meeting2/photo1.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo2.jpg', objectPosition: 'center 30%' },
        { src: '/special-meetings/meeting2/photo3.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo4.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo5.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo6.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo7.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo8.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo9.jpg', objectPosition: 'center center' },
      ],
    },
    {
      id: 3,
      title: 'Revival Word And Worship Night',
      ytId: 'auok0w_qM-E',
      description: 'A night set apart for revival — a blend of anointed preaching and Spirit-led worship that stirred the hearts of all who gathered. Testimonies of renewal and rededication marked this special evening.',
      photos: [
        '/special-meetings/meeting3/photo1.jpg',
        '/special-meetings/meeting3/photo2.jpg',
        '/special-meetings/meeting3/photo3.jpg',
        '/special-meetings/meeting3/photo4.jpg',
        '/special-meetings/meeting3/photo5.jpg',
        '/special-meetings/meeting3/photo6.jpg',
        '/special-meetings/meeting3/photo7.jpg',
      ],
    },
    {
      id: 4,
      title: 'Pentecostal Festival and Special Sunday Service with Pas.Davidsam Joyson',
      photos: [
        '/special-meetings/meeting4/photo1.jpg',
        '/special-meetings/meeting4/photo2.jpg',
        '/special-meetings/meeting4/photo3.jpg',
      ],
      sessions: [
        {
          label: 'Pentecostal Festival',
          ytId: 'I9W7UTpLKXw',
          description: 'A Spirit-filled Pentecostal Festival service celebrating the power and presence of the Holy Spirit. The congregation gathered with expectation, worshipping with joy and receiving a timely word that called hearts toward renewal, unity, and bold faith.',
        },
        {
          label: 'Special Sunday Service',
          ytId: 'pUUAzPA6Q8c',
          description: 'Pastor Davidsam Joyson ministered in a special Sunday service marked by heartfelt worship and practical encouragement from God\'s Word. The message strengthened believers to walk with fresh devotion and trust the Lord for His work in every season.',
        },
      ],
    },
    {
      id: 5,
      title: 'Revival Word & Worship By Pas. Joel Thomasraj',
      ytId: '7nuz6nZYsQI',
      description: 'Pastor Joel Thomasraj ministered with clarity and conviction, bringing a timely word of revival. The service was marked by deep conviction, prayer, and a renewed passion for God\'s presence among the congregation.',
      photos: [
        '/special-meetings/meeting5/photo1.jpg',
        '/special-meetings/meeting5/photo2.jpg',
        '/special-meetings/meeting5/photo3.jpg',
        '/special-meetings/meeting5/photo4.jpg',
        '/special-meetings/meeting5/photo5.jpg',
      ],
    },
    {
      id: 6,
      title: 'Special Prophetic Revival and Palm Sunday with Prophet Aaron Vinoth',
      photos: [
        '/special-meetings/meeting6/photo1.jpg',
        '/special-meetings/meeting6/photo2.jpg',
        '/special-meetings/meeting6/photo3.jpg',
        '/special-meetings/meeting6/photo4.jpg',
        '/special-meetings/meeting6/photo5.jpg',
      ],
      sessions: [
        {
          label: 'Prophetic Revival',
          ytId: 'OGG6IRLEPpk',
          description: 'A prophetic gathering where the voice of the Lord was heard through His servants. The meeting brought direction, encouragement, and fresh fire to the believers, with many experiencing personal breakthrough.',
        },
        {
          label: 'Palm Sunday',
          ytId: 'VfxL550hYNg',
          description: 'Commemorating the triumphal entry of Jesus into Jerusalem, this Palm Sunday service was a joyful celebration of the King of kings. The congregation worshipped together in anticipation of the resurrection victory.',
        },
      ],
    },
    {
      id: 7,
      title: 'BreakThrough Worship Night with Benny John Joseph',
      ytId: 'K9wxb_oXWsw',
      description: 'An intense night of worship and intercession where chains were broken and burdens lifted. Believers pressed in together in prayer, believing God for personal and corporate breakthroughs in every area of life.',
      photos: [
        '/special-meetings/meeting7/photo1.jpg',
        '/special-meetings/meeting7/photo2.jpg',
        '/special-meetings/meeting7/photo3.jpg',
        '/special-meetings/meeting7/photo4.jpg',
        '/special-meetings/meeting7/photo5.jpg',
        '/special-meetings/meeting7/photo6.jpg',
      ],
    },
    {
      id: 8,
      title: 'Family Blessing Retreat 2024',
      photos: [
        '/special-meetings/meeting8/photo1.jpg',
        '/special-meetings/meeting8/photo2.jpg',
        '/special-meetings/meeting8/photo3.jpg',
        '/special-meetings/meeting8/photo4.jpg',
        '/special-meetings/meeting8/photo5.jpg',
        '/special-meetings/meeting8/photo6.jpg',
        '/special-meetings/meeting8/photo7.jpg',
        '/special-meetings/meeting8/photo8.jpg',
        '/special-meetings/meeting8/photo9.jpg',
        '/special-meetings/meeting8/photo10.jpg',
      ],
      sessions: [
        {
          label: 'Morning Session',
          ytId: '3OqCpiM75s0',
          description: 'The morning session of Family Blessing Retreat 2024 opened with worship, prayer, and a focused word for homes and families. It invited every family to seek God together, receive His guidance, and build their lives on faith, love, and obedience.',
        },
        {
          label: 'Evening Session',
          ytId: 'PT93qTlPPjo',
          description: 'The evening session carried the retreat into a deeper time of reflection, commitment, and blessing. Families were encouraged to surrender their needs to the Lord, strengthen their relationships, and trust Him for peace, healing, and lasting fruit.',
        },
      ],
    },
    {
      id: 9,
      title: 'Prayer Month Special Meeting Day-1&2 with EVG K.A Abraham',
      photos: [
        '/special-meetings/meeting9/photo1.jpg',
        '/special-meetings/meeting9/photo2.jpg',
        '/special-meetings/meeting9/photo3.jpg',
        '/special-meetings/meeting9/photo4.jpg',
        '/special-meetings/meeting9/photo5.jpg',
      ],
      sessions: [
        {
          label: 'Day 1',
          ytId: 'DNnbwlOfDC0',
          description: 'The first day of the Prayer Month series with Evangelist K.A. Abraham set a strong foundation of intercession and faith. The evening was filled with powerful prayers, declarations, and a stirring of the Holy Spirit across the congregation.',
        },
        {
          label: 'Day 2',
          ytId: 'oNbbb_cyMvE',
          description: 'Continuing the Prayer Month series, Day 2 with Evangelist K.A. Abraham saw an even deeper move of the Spirit. The prayers intensified and many reported experiencing healing, deliverance, and a fresh filling of the Holy Spirit.',
        },
      ],
    },
  ],
  ta: [
    {
      id: 1,
      title: '50வது வருட தரிசன நாள் நன்றி செலுத்தும் கூடுகை',
      ytId: 'sHjLhuEItM0',
      description: 'கர்த்தர் முதலாவது போதகர் டேவி சத்தியநாதன் அதிசயராஜ் அவர்களுக்கு இந்த ஊழியத்தின் தரிசனத்தை வழங்கியதன் 50வது வருடத்தை குறிக்கும் ஒரு மைல்கல் கொண்டாட்டம். மடுக்கரையின் மலையடிவாரத்தில் ஐந்து தசாப்தங்களாக தேவனுடைய விசுவாசத்தை நினைவுகூர்ந்து, சபை மக்கள் மனமார்ந்த நன்றியுடன் கூடினர்.',
      photos: [
        '/special-meetings/meeting1/photo1.jpg',
        '/special-meetings/meeting1/photo2.jpg',
        { src: '/special-meetings/meeting1/photo3.jpg', objectPosition: 'center top' },
        '/special-meetings/meeting1/photo4.jpg',
        '/special-meetings/meeting1/photo5.jpg',
        '/special-meetings/meeting1/photo6.jpg',
        '/special-meetings/meeting1/photo7.jpg',
        '/special-meetings/meeting1/photo8.jpg',
        '/special-meetings/meeting1/photo9.jpg',
        '/special-meetings/meeting1/photo10.jpg',
      ],
    },
    {
      id: 2,
      title: 'மறவேன் நேரடி துதி & ஆராதனை',
      ytId: 'bwTC3XHRVxo',
      description: 'நேரடி துதி மற்றும் ஆராதனையின் மூலம் தேவ பிரசன்னம் வல்லமையாக இறங்கிய ஒரு மகிமையான மாலை. சபை மக்கள் உண்மையான ஆராதனையில் மட்டுமே காணப்படும் மகிழ்ச்சியையும் விடுதலையையும் அனுபவித்தபோது, இதயங்கள் ஆராதனையில் உயர்த்தப்பட்டன.',
      photos: [
        { src: '/special-meetings/meeting2/photo1.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo2.jpg', objectPosition: 'center 30%' },
        { src: '/special-meetings/meeting2/photo3.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo4.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo5.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo6.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo7.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo8.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo9.jpg', objectPosition: 'center center' },
      ],
    },
    {
      id: 3,
      title: 'எழுப்புதல் வார்த்தை & ஆராதனை இரவு',
      ytId: 'auok0w_qM-E',
      description: 'எழுப்புதலுக்காக அர்ப்பணிக்கப்பட்ட ஒரு இரவு — அபிஷேகிக்கப்பட்ட பிரசங்கமும் ஆவிக்குரிய ஆராதனையும் கூடிவந்த அனைவரின் இருதயங்களையும் அசைத்தது. புதுப்பித்தல் மற்றும் மறு அர்ப்பணிப்பு சாட்சிகள் இந்த சிறப்பு மாலையை அடையாளப்படுத்தின.',
      photos: [
        '/special-meetings/meeting3/photo1.jpg',
        '/special-meetings/meeting3/photo2.jpg',
        '/special-meetings/meeting3/photo3.jpg',
        '/special-meetings/meeting3/photo4.jpg',
        '/special-meetings/meeting3/photo5.jpg',
        '/special-meetings/meeting3/photo6.jpg',
        '/special-meetings/meeting3/photo7.jpg',
      ],
    },
    {
      id: 4,
      title: 'போதகர் டேவிட்சாம் ஜாய்சன் அவர்களுடன் பெந்தெகொஸ்தே திருவிழா மற்றும் சிறப்பு ஞாயிறு ஆராதனை',
      photos: [
        '/special-meetings/meeting4/photo1.jpg',
        '/special-meetings/meeting4/photo2.jpg',
        '/special-meetings/meeting4/photo3.jpg',
      ],
      sessions: [
        {
          label: 'பெந்தெகொஸ்தே திருவிழா',
          ytId: 'I9W7UTpLKXw',
          description: 'பரிசுத்த ஆவியானவரின் வல்லமையையும் பிரசன்னத்தையும் கொண்டாடும் ஆவிக்குரிய பெந்தெகொஸ்தே திருவிழா ஆராதனை. சபை மக்கள் எதிர்பார்ப்போடு கூடிவந்து, மகிழ்ச்சியோடு ஆராதித்து, புதுப்பித்தல், ஒற்றுமை மற்றும் தைரியமான விசுவாசத்தை நோக்கி இதயங்களை அழைக்கும் வார்த்தையைப் பெற்றுக் கொண்டனர்.',
        },
        {
          label: 'சிறப்பு ஞாயிறு ஆராதனை',
          ytId: 'pUUAzPA6Q8c',
          description: 'போதகர் டேவிட்சாம் ஜாய்சன் அவர்கள் ஞாயிறு சிறப்பு ஆராதனையில் தேவ வார்த்தையிலிருந்து நடைமுறை ஊக்கத்தையும் இதயப்பூர்வமான ஆராதனையையும் வழங்கினார். இந்த செய்தி விசுவாசிகளை புதிய அர்ப்பணிப்புடன் நடக்கவும், ஒவ்வொரு காலத்திலும் கர்த்தருடைய கிரியைகளுக்காக அவரை நம்பவும் பலப்படுத்தியது.',
        },
      ],
    },
    {
      id: 5,
      title: 'போதகர் ஜோயல் தாமஸ்ராஜ் அவர்களுடன் எழுப்புதல் வார்த்தை & ஆராதனை',
      ytId: '7nuz6nZYsQI',
      description: 'போதகர் ஜோயல் தாமஸ்ராஜ் அவர்கள் தெளிவோடும் உறுதியோடும் ஊழியஞ்செய்து, எழுப்புதலின் பொருத்தமான வார்த்தையைக் கொண்டு வந்தார். ஆராதனை ஆழமான விசுவாசம், ஜெபம் மற்றும் சபை மக்களிடையே தேவ பிரசன்னத்திற்கான புதிய தாகத்தால் நிறைந்தது.',
      photos: [
        '/special-meetings/meeting5/photo1.jpg',
        '/special-meetings/meeting5/photo2.jpg',
        '/special-meetings/meeting5/photo3.jpg',
        '/special-meetings/meeting5/photo4.jpg',
        '/special-meetings/meeting5/photo5.jpg',
      ],
    },
    {
      id: 6,
      title: 'தீர்க்கதரிசி ஆரோன் வினோத் அவர்களுடன் சிறப்பு தீர்க்கதரிசன எழுப்புதல் & குருத்தோலை ஞாயிறு',
      photos: [
        '/special-meetings/meeting6/photo1.jpg',
        '/special-meetings/meeting6/photo2.jpg',
        '/special-meetings/meeting6/photo3.jpg',
        '/special-meetings/meeting6/photo4.jpg',
        '/special-meetings/meeting6/photo5.jpg',
      ],
      sessions: [
        {
          label: 'தீர்க்கதரிசன எழுப்புதல்',
          ytId: 'OGG6IRLEPpk',
          description: 'தேவனுடைய ஊழியர்கள் மூலமாக கர்த்தருடைய சத்தம் கேட்கப்பட்ட ஒரு தீர்க்கதரிசன கூடுகை. இந்த கூட்டம் விசுவாசிகளுக்கு வழிநடத்துதலையும், ஊக்கத்தையும், புதிய அக்கினியையும் கொண்டு வந்தது, பலர் தனிப்பட்ட விடுதலையை அனுபவித்தனர்.',
        },
        {
          label: 'குருத்தோலை ஞாயிறு',
          ytId: 'VfxL550hYNg',
          description: 'இயேசு எருசலேமுக்குள் வெற்றிகரமாக நுழைந்ததை நினைவுகூரும் இந்த குருத்தோலை ஞாயிறு ஆராதனை, ராஜாதி ராஜாவின் மகிழ்ச்சியான கொண்டாட்டமாக இருந்தது. சபை மக்கள் உயிர்த்தெழுதலின் வெற்றியை எதிர்பார்த்து ஒன்றாக ஆராதித்தனர்.',
        },
      ],
    },
    {
      id: 7,
      title: 'பென்னி ஜான் ஜோசப் அவர்களுடன் பிரேக்த்ரூ ஆராதனை இரவு',
      ytId: 'K9wxb_oXWsw',
      description: 'கட்டுகள் உடைக்கப்பட்டு பாரங்கள் நீக்கப்பட்ட ஒரு ஆழமான ஆராதனை மற்றும் பரிந்துரை ஜெப இரவு. விசுவாசிகள் வாழ்க்கையின் ஒவ்வொரு பகுதியிலும் தனிப்பட்ட மற்றும் சபை ரீதியான விடுதலையை நம்பி, ஜெபத்தில் ஒருமித்து நின்றனர்.',
      photos: [
        '/special-meetings/meeting7/photo1.jpg',
        '/special-meetings/meeting7/photo2.jpg',
        '/special-meetings/meeting7/photo3.jpg',
        '/special-meetings/meeting7/photo4.jpg',
        '/special-meetings/meeting7/photo5.jpg',
        '/special-meetings/meeting7/photo6.jpg',
      ],
    },
    {
      id: 8,
      title: 'குடும்ப ஆசீர்வாத கூடுகை 2024',
      photos: [
        '/special-meetings/meeting8/photo1.jpg',
        '/special-meetings/meeting8/photo2.jpg',
        '/special-meetings/meeting8/photo3.jpg',
        '/special-meetings/meeting8/photo4.jpg',
        '/special-meetings/meeting8/photo5.jpg',
        '/special-meetings/meeting8/photo6.jpg',
        '/special-meetings/meeting8/photo7.jpg',
        '/special-meetings/meeting8/photo8.jpg',
        '/special-meetings/meeting8/photo9.jpg',
        '/special-meetings/meeting8/photo10.jpg',
      ],
      sessions: [
        {
          label: 'காலை அமர்வு',
          ytId: '3OqCpiM75s0',
          description: 'குடும்ப ஆசீர்வாத கூடுகை 2024 இன் காலை அமர்வு ஆராதனை, ஜெபம் மற்றும் குடும்பங்களுக்கான பிரத்யேக வார்த்தையுடன் தொடங்கியது. இது ஒவ்வொரு குடும்பத்தையும் ஒன்றாக கடவுளைத் தேடவும், அவரது வழிகாட்டுதலைப் பெறவும், விசுவாசம், அன்பு மற்றும் கீழ்ப்படிதலின் மேல் தங்கள் வாழ்க்கையை உருவாக்கவும் அழைத்தது.',
        },
        {
          label: 'மாலை அமர்வு',
          ytId: 'PT93qTlPPjo',
          description: 'மாலை அமர்வு இந்த கூடுகையை இன்னும் ஆழமான அர்ப்பணிப்பு, ஜெபம் மற்றும் ஆசீர்வாதத்திற்குள் வழிநடத்தியது. குடும்பங்கள் தங்கள் தேவைகளை கர்த்தரிடம் ஒப்புவிக்கவும், உறவுகளை பலப்படுத்தவும், அமைதி, சுகம் மற்றும் நிலையான ஆசீர்வாதங்களுக்காக அவரை நம்பவும் ஊக்குவிக்கப்பட்டன.',
        },
      ],
    },
    {
      id: 9,
      title: 'எழுத்தாளர் K.A ஆபிரகாம் அவர்களுடன் ஜெப மாத சிறப்பு கூட்டம் நாள்-1 & 2',
      photos: [
        '/special-meetings/meeting9/photo1.jpg',
        '/special-meetings/meeting9/photo2.jpg',
        '/special-meetings/meeting9/photo3.jpg',
        '/special-meetings/meeting9/photo4.jpg',
        '/special-meetings/meeting9/photo5.jpg',
      ],
      sessions: [
        {
          label: 'நாள் 1',
          ytId: 'DNnbwlOfDC0',
          description: 'சுவிசேஷகர் K.A. ஆபிரகாம் அவர்களுடனான ஜெப மாதத் தொடரின் முதல் நாள் பரிந்துரை மற்றும் விசுவாசத்தின் வலுவான அடித்தளத்தை அமைத்தது. மாலை முழுவதும் சக்திவாய்ந்த ஜெபங்கள், விசுவாச அறிக்கை மற்றும் சபை மக்களிடையே பரிசுத்த ஆவியானவரின் அசைவாடுதல் நிறைந்திருந்தது.',
        },
        {
          label: 'நாள் 2',
          ytId: 'oNbbb_cyMvE',
          description: 'ஜெப மாதத் தொடரைத் தொடர்ந்து, K.A. ஆபிரகாம் அவர்களுடனான 2ஆம் நாள் ஆவியானவரின் இன்னும் ஆழமான அசைவாடுதலைக் கண்டது. ஜெபங்கள் தீவிரமடைந்தன மற்றும் பலர் சுகமடைதல், விடுதலை மற்றும் பரிசுத்த ஆவியானவரின் புதிய அபிஷேகத்தை பெற்றதாக சாட்சி கூறினர்.',
        },
      ],
    },
  ],
  hi: [
    {
      id: 1,
      title: '50वें वर्ष का दर्शन दिवस धन्यवाद सेवा',
      ytId: 'sHjLhuEItM0',
      description: 'भगवान द्वारा पहली बार रेव. डेवी सत्यनाथन अतिशयाराज को इस सेवकाई का दर्शन दिए जाने के 50 वर्ष पूरे होने के उपलक्ष्य में एक ऐतिहासिक उत्सव। मडुक्करै की तलहटी में पांच दशकों की सेवकाई के दौरान ईश्वर की वफादारी को याद करते हुए मंडली हार्दिक धन्यवाद के साथ एकत्रित हुई।',
      photos: [
        '/special-meetings/meeting1/photo1.jpg',
        '/special-meetings/meeting1/photo2.jpg',
        { src: '/special-meetings/meeting1/photo3.jpg', objectPosition: 'center top' },
        '/special-meetings/meeting1/photo4.jpg',
        '/special-meetings/meeting1/photo5.jpg',
        '/special-meetings/meeting1/photo6.jpg',
        '/special-meetings/meeting1/photo7.jpg',
        '/special-meetings/meeting1/photo8.jpg',
        '/special-meetings/meeting1/photo9.jpg',
        '/special-meetings/meeting1/photo10.jpg',
      ],
    },
    {
      id: 2,
      title: 'मरावेन लाइव स्तुति और आराधना',
      ytId: 'bwTC3XHRVxo',
      description: 'जीवंत स्तुति और आराधना की एक विद्युतमयी शाम जिसने परमेश्वर की उपस्थिति को शक्तिशाली तरीके से आकर्षित किया। जब मंडली ने केवल सच्ची आराधना में मिलने वाले आनंद और स्वतंत्रता का अनुभव किया, तो उनके दिल आराधना में ऊपर उठ गए।',
      photos: [
        { src: '/special-meetings/meeting2/photo1.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo2.jpg', objectPosition: 'center 30%' },
        { src: '/special-meetings/meeting2/photo3.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo4.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo5.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo6.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo7.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo8.jpg', objectPosition: 'center center' },
        { src: '/special-meetings/meeting2/photo9.jpg', objectPosition: 'center center' },
      ],
    },
    {
      id: 3,
      title: 'पुनरुत्थान वचन और आराधना रात्रि',
      ytId: 'auok0w_qM-E',
      description: 'पुनरुत्थान के लिए अलग रखी गई एक रात — अभिषेकपूर्ण उपदेश और आत्मा के नेतृत्व वाली आराधना का एक अनूठा संगम जिसने एकत्रित हुए सभी लोगों के दिलों को झकझोर दिया। इस विशेष शाम को नवीनीकरण और पुनर्समर्पण की गवाहियों ने चिह्नित किया।',
      photos: [
        '/special-meetings/meeting3/photo1.jpg',
        '/special-meetings/meeting3/photo2.jpg',
        '/special-meetings/meeting3/photo3.jpg',
        '/special-meetings/meeting3/photo4.jpg',
        '/special-meetings/meeting3/photo5.jpg',
        '/special-meetings/meeting3/photo6.jpg',
        '/special-meetings/meeting3/photo7.jpg',
      ],
    },
    {
      id: 4,
      title: 'पादरी डेविडसैम जॉयसन के साथ पेंटेकोस्टल महोत्सव और विशेष रविवार सेवा',
      photos: [
        '/special-meetings/meeting4/photo1.jpg',
        '/special-meetings/meeting4/photo2.jpg',
        '/special-meetings/meeting4/photo3.jpg',
      ],
      sessions: [
        {
          label: 'पेंटेकोस्टल महोत्सव',
          ytId: 'I9W7UTpLKXw',
          description: 'पवित्र आत्मा की शक्ति और उपस्थिति का जश्न मनाने वाली एक आत्मा से भरी पेंटेकोस्टल महोत्सव सेवा। मंडली प्रत्याशा के साथ एकत्रित हुई, आनंद के साथ आराधना की और एक सामयिक वचन प्राप्त किया जिसने दिलों को नवीनीकरण, एकता और साहसी विश्वास की ओर बुलाया।',
        },
        {
          label: 'विशेष रविवार सेवा',
          ytId: 'pUUAzPA6Q8c',
          description: 'पादरी डेविडसैम जॉयसन ने एक विशेष रविवार सेवा में सेवकाई की, जो हार्दिक आराधना और परमेश्वर के वचन से व्यावहारिक प्रोत्साहन द्वारा चिह्नित थी। इस संदेश ने विश्वासियों को नए समर्पण के साथ चलने और हर मौसम में प्रभु के कार्यों के लिए उन पर भरोसा करने के लिए मजबूत किया।',
        },
      ],
    },
    {
      id: 5,
      title: 'पादरी जोएल थॉमसराज द्वारा पुनरुत्थान वचन और आराधना',
      ytId: '7nuz6nZYsQI',
      description: 'पादरी जोएल थॉमसराज ने स्पष्टता और दृढ़ विश्वास के साथ सेवकाई की, और पुनरुत्थान का एक सामयिक वचन लेकर आए। यह सेवा गहरी आस्था, प्रार्थना और मंडली के बीच परमेश्वर की उपस्थिति के लिए एक नए जुनून द्वारा चिह्नित थी।',
      photos: [
        '/special-meetings/meeting5/photo1.jpg',
        '/special-meetings/meeting5/photo2.jpg',
        '/special-meetings/meeting5/photo3.jpg',
        '/special-meetings/meeting5/photo4.jpg',
        '/special-meetings/meeting5/photo5.jpg',
      ],
    },
    {
      id: 6,
      title: 'भविष्यवक्ता हारून विनोद के साथ विशेष भविष्यसूचक पुनरुत्थान और खजूर रविवार',
      photos: [
        '/special-meetings/meeting6/photo1.jpg',
        '/special-meetings/meeting6/photo2.jpg',
        '/special-meetings/meeting6/photo3.jpg',
        '/special-meetings/meeting6/photo4.jpg',
        '/special-meetings/meeting6/photo5.jpg',
      ],
      sessions: [
        {
          label: 'भविष्यसूचक पुनरुत्थान',
          ytId: 'OGG6IRLEPpk',
          description: 'एक भविष्यसूचक सभा जहाँ परमेश्वर के सेवकों के माध्यम से उनकी आवाज़ सुनी गई। इस बैठक ने विश्वासियों को दिशा, प्रोत्साहन और नई आग प्रदान की, जिससे कई लोगों ने व्यक्तिगत सफलता का अनुभव किया।',
        },
        {
          label: 'खजूर रविवार',
          ytId: 'VfxL550hYNg',
          description: 'यरूशलेम में यीशु के विजयी प्रवेश की याद में, यह खजूर रविवार सेवा राजाओं के राजा का एक आनंदमय उत्सव थी। पुनरुत्थान की विजय की प्रत्याशा में मंडली ने एक साथ मिलकर आराधना की।',
        },
      ],
    },
    {
      id: 7,
      title: 'बेनी जॉन जोसेफ के साथ ब्रेकथ्रू आराधना रात्रि',
      ytId: 'K9wxb_oXWsw',
      description: 'आराधना और मध्यस्थता की एक गहन रात जहाँ जंजीरें टूट गईं और बोझ हट गए। विश्वासियों ने जीवन के हर क्षेत्र में व्यक्तिगत और सामूहिक सफलताओं के लिए परमेश्वर पर भरोसा करते हुए एक साथ प्रार्थना की।',
      photos: [
        '/special-meetings/meeting7/photo1.jpg',
        '/special-meetings/meeting7/photo2.jpg',
        '/special-meetings/meeting7/photo3.jpg',
        '/special-meetings/meeting7/photo4.jpg',
        '/special-meetings/meeting7/photo5.jpg',
        '/special-meetings/meeting7/photo6.jpg',
      ],
    },
    {
      id: 8,
      title: 'पारिवारिक आशीर्वाद शिविर 2024',
      photos: [
        '/special-meetings/meeting8/photo1.jpg',
        '/special-meetings/meeting8/photo2.jpg',
        '/special-meetings/meeting8/photo3.jpg',
        '/special-meetings/meeting8/photo4.jpg',
        '/special-meetings/meeting8/photo5.jpg',
        '/special-meetings/meeting8/photo6.jpg',
        '/special-meetings/meeting8/photo7.jpg',
        '/special-meetings/meeting8/photo8.jpg',
        '/special-meetings/meeting8/photo9.jpg',
        '/special-meetings/meeting8/photo10.jpg',
      ],
      sessions: [
        {
          label: 'सुबह का सत्र',
          ytId: '3OqCpiM75s0',
          description: 'पारिवारिक आशीर्वाद शिविर 2024 का सुबह का सत्र आराधना, प्रार्थना और घरों और परिवारों के लिए एक केंद्रित वचन के साथ शुरू हुआ। इसने हर परिवार को एक साथ परमेश्वर की खोज करने, उनका मार्गदर्शन प्राप्त करने और विश्वास, प्रेम और आज्ञाकारिता पर अपना जीवन बनाने के लिए आमंत्रित किया।',
        },
        {
          label: 'शाम का सत्र',
          ytId: 'PT93qTlPPjo',
          description: 'शाम का सत्र शिविर को चिंतन, प्रतिबद्धता और आशीर्वाद के गहरे समय में ले गया। परिवारों को अपनी आवश्यकताओं को प्रभु को सौंपने, अपने संबंधों को मजबूत करने और शांति, चंगाई और स्थायी फल के लिए उन पर भरोसा करने के लिए प्रोत्साहित किया गया।',
        },
      ],
    },
    {
      id: 9,
      title: 'सुसमाचार प्रचारक के.ए. इब्राहीम के साथ प्रार्थना माह विशेष बैठक दिन 1 और 2',
      photos: [
        '/special-meetings/meeting9/photo1.jpg',
        '/special-meetings/meeting9/photo2.jpg',
        '/special-meetings/meeting9/photo3.jpg',
        '/special-meetings/meeting9/photo4.jpg',
        '/special-meetings/meeting9/photo5.jpg',
      ],
      sessions: [
        {
          label: 'दिन 1',
          ytId: 'DNnbwlOfDC0',
          description: 'सुसमाचार प्रचारक के.ए. इब्राहीम के साथ प्रार्थना माह श्रृंखला के पहले दिन ने मध्यस्थता और विश्वास की एक मजबूत नींव रखी। शाम शक्तिशाली प्रार्थनाओं, घोषणाओं और पूरी मंडली में पवित्र आत्मा की हलचल से भरी थी।',
        },
        {
          label: 'दिन 2',
          ytId: 'oNbbb_cyMvE',
          description: 'प्रार्थना माह श्रृंखला को जारी रखते हुए, सुसमाचार प्रचारक के.ए. इब्राहीम के साथ दूसरे दिन आत्मा का और भी गहरा प्रभाव देखा गया। प्रार्थनाएं तेज हो गईं और कई लोगों ने चंगाई, उद्धार और पवित्र आत्मा के नए स्पर्श का अनुभव करने की गवाही दी।',
        },
      ],
    },
  ]
};

export const localTranslations = {
  en: {
    secLabel: "Special Meetings",
    heroTitle: "Special Meetings",
    subtitle: "Join us for our special gatherings and divine encounters."
  },
  ta: {
    secLabel: "சிறப்பு கூட்டங்கள்",
    heroTitle: "சிறப்பு கூட்டங்கள்",
    subtitle: "எங்கள் சிறப்பு கூட்டங்கள் மற்றும் தெய்வீக சந்திப்புகளில் எங்களுடன் இணையுங்கள்."
  },
  hi: {
    secLabel: "विशेष बैठकें",
    heroTitle: "विशेष बैठकें",
    subtitle: "हमारी विशेष सभाओं और दिव्य मुलाकातों में हमारे साथ शामिल हों."
  }
};
