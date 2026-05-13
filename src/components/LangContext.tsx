'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ta' | 'hi';

const translations = {
  en: {
    // Nav
    home: 'Home', about: 'About', sermons: 'Sermons', ministries: 'Ministries',
    events: 'Events', giving: 'Giving', contact: 'Contact', planVisit: 'Plan a Visit', prayerPage: 'Prayer', newHere: 'New Here?',
    // Hero
    eyebrow: 'TRINITY PRAYER HOUSE · MADUKKARAI',
    heroTitle1: 'A Place of', heroTitle2: 'Encounter', heroTitle3: '&', heroTitle4: 'Peace',
    heroSub: 'We are a Spirit-filled church family building authentic community and pursuing deeper relationships with God since 1976.',
    watchLatest: 'Watch Latest Message',
    watchIntroVideo: 'Watch Intro Film',
    // Welcome
    ourStory: 'OUR STORY',
    welcomeH2a: 'Rooted in Prayer.', welcomeH2b: 'Built on Love.',
    welcomeP1: 'Trinity Prayer House Ministries was founded by Pastor D.A. Sathyanathan through the Lord\'s vision — to build a church at the foothill to reach the unreached around the world.',
    welcomeP2: 'Today, under the pastoring of Senior Pastor Vasanth Sathyanathan, we continue this legacy. Whether you are taking your first steps toward faith or looking for a church family, you are welcome here.',
    discoverHistory: 'Discover Our History',
    imgCaption: '"A house of prayer for all nations"',
    // Services
    joinUs: 'JOIN US', serviceTimes: 'Service', serviceTimesI: 'Times',
    sunWorship: 'Sunday Worship', hindiService: 'Hindi Service', bibleStudy: 'Bible Study', promiseService: 'Promise Service',
    sunDesc: 'Tamil Service & Kids Ministry', hindiDesc: 'Sunday Evening Service', bibleDesc: 'Thursday Evening', promiseDesc: '1st of Every Month',
    // Latest Sermon
    latestMessage: 'LATEST MESSAGE',
    latestTitle: 'Sunday Service —', latestTitleI: 'Latest Worship',
    latestDesc: 'Watch the most recent service from Pastor Vasanth Sathyanathan, live from Trinity Prayer House Madukkarai.',
    seeAllSermons: 'See All Sermons',
    // YT CTA
    watchOnline: 'WATCH ONLINE',
    neverMiss: 'Never Miss a', messageI: 'Message',
    ytSubDesc: 'Subscribe to our YouTube channel for live-streamed services, worship sessions, and special programmes.',
    subscribeYT: 'Subscribe on YouTube',
    // Language Modal
    selectLang: 'Select Your Language',
    selectLangSub: 'Choose your preferred language to browse the website',
    // Footer
    footerMission: 'Building a house of prayer for all nations. Reaching the unreached since 1976.',
    navigate: 'NAVIGATE', services: 'SERVICES', contactUs: 'CONTACT',
    phone: 'Phone / WhatsApp', email: 'Email', address: 'Address',
    rights: 'All rights reserved.',
    builtWith: 'Built with ❤️ for the Kingdom.',
    // About
    aboutUs: 'ABOUT US', aboutH1a: 'Our', aboutH1b: 'History', aboutH1c: '& Calling',
    aboutSub: 'Building the church at the foothill to reach the unreached since 1976.',
    legacyTitle: 'A Legacy of Prayer',
    aboutP1: 'Trinity Prayer House Ministries was founded by our father Pastor D.A. Sathyanathan through the Lord\'s vision — to build a church at the foothill to reach the unreached around the world.',
    aboutP2: 'Trinity Prayer House — Madukkarai is our main branch, and the church is under the pastoring of our Senior Pastor Vasanth Sathyanathan. For decades, we have stood on the foundation of God\'s Word.',
    val1h: '01. Worship', val1p: 'A lifestyle of reverence to God.',
    val2h: '02. Word', val2p: 'Anchored in the truth of the Scriptures.',
    val3h: '03. Warfare', val3p: 'Intercessory prayer to shift atmospheres.',
    seniorPastor: 'SENIOR PASTOR', pastorDesc: 'Dedicated to preaching the uncompromised Gospel and equipping the next generation of believers in Coimbatore.',
    aboutQuote: 'We are not just building a church; we are building people.',
    // Sermons
    theWord: 'THE WORD', sermonsH1a: 'Sermons &', sermonsH1b: 'Messages',
    sermonsSub: 'Watch the latest messages from Pastor Vasanth Sathyanathan and the Trinity Prayer House team.',
    featuredTitle: 'Sunday Worship Service', featuredDate: 'May 10, 2025 · Sunday Service',
    featuredDesc: 'A powerful worship service delivered by Pastor Vasanth Sathyanathan from Trinity Prayer House Madukkarai.',
    visitYT: 'Visit YouTube Channel', messages: 'MESSAGES', recentSermons: 'Recent', recentSermonsI: 'Sermons',
    allMessages: 'All Messages',
    // Ministries
    ministriesLabel: 'OUR MINISTRIES', ministriesH1a: 'Our', ministriesH1b: 'Ministries',
    ministriesSub: 'Discover how we serve God and our community across different areas.',
    youthMin: 'Youth Ministry', youthDesc: 'Empowering young people to discover their identity in Christ through worship, fellowship, and discipleship.',
    kidsMin: 'Kids Ministry', kidsDesc: 'A fun and safe environment where children learn about God\'s love through interactive lessons and activities.',
    mensMin: "Men's Ministry", mensDesc: 'Empowering men to lead with faith, character, and purpose in their families and community.',
    womenMin: 'Women\'s Ministry', womenDesc: 'Equipping and encouraging women to grow in faith, leadership, and community.',
    hindiMin: 'Hindi Ministry', hindiMinDesc: 'Reaching out to the Hindi-speaking community with worship and the Word.',
    oldAgeMin: 'Old Age Home', oldAgeMinDesc: 'Providing care, love, and spiritual support for the elderly.',
    branchMin: 'Branch Churches', branchMinDesc: 'Expanding the Kingdom of God through our network of local branch churches.',
    // Events
    calendar: 'CALENDAR', eventsH1a: 'Upcoming', eventsH1b: 'Events',
    eventsSub: 'Gather with us. Find community, grow in your faith, and participate in the life of our church.',
    details: 'Details',
    ev1Title: 'Mid-Week Bible Study', ev1Desc: 'Join us for a deep dive into the Book of Romans. Open to all ages.',
    ev2Title: 'Youth Awakening Night', ev2Desc: 'A powerful evening of worship, prayer, and community specifically designed for young adults.',
    ev3Title: 'Special Healing Service', ev3Desc: 'We are dedicating this Sunday morning service to praying for the sick and believing for miracles.',
    // Give
    partnerWithUs: 'PARTNER WITH US', giveH1a: 'Worship Through', giveH1b: 'Giving',
    giveSub: 'Your generosity helps us continue our ministry in Madukkarai, impacting our community and reaching the unreached. Thank you for your faithful support.',
    bankTransfer: 'Bank Transfer', bankDesc: 'Give directly via bank transfer to our church account.',
    acctName: 'Account Name', acctNo: 'Account Number', ifsc: 'IFSC Code', bank: 'Bank',
    upiPayment: 'UPI Payment', upiDesc: 'Scan or use our UPI ID for instant giving.',
    offeringBox: 'Offering Box', offeringDesc: 'You can also give in person during any of our services at the offering box.',
    // Contact
    connectWithUs: 'CONNECT WITH US', contactH1a: "Let's Get In", contactH1b: 'Touch',
    contactSub: "We're here to pray with you, answer your questions, and welcome you into our community.",
    hereToServe: 'Here to Serve', hereToServeDesc: 'Reach out to our pastoral team for prayer, guidance, or information about our ministries.',
    sendMessage: 'Send a Message', firstName: 'First Name', lastName: 'Last Name',
    emailLabel: 'Email Address', subject: 'Subject', message: 'Your Message', sendBtn: 'Send Message',
    successTitle: 'Message Sent!', successDesc: 'Thank you for reaching out. Our team will get back to you soon.',
    // Counter stats
    statsYears: 'Years of Ministry', statsLives: 'Lives Touched', statsSermons: 'YouTube Sermons', statsServices: 'Weekly Services',
    // Footer
    footerGlory: 'To God be the glory.',
    // Prayer Request
    prayerRequest: 'Prayer Request', prayerNeed: 'Share your prayer need...', submitPrayer: 'Submit Prayer Request',
    prayerSuccess: 'Prayer Received', prayerSuccessDesc: 'Our intercessory team will be praying for you. God bless you.',
  },
  ta: {
    home: 'முகப்பு', about: 'எங்களைப் பற்றி', sermons: 'பிரசங்கங்கள்', ministries: 'ஊழியங்கள்',
    events: 'நிகழ்வுகள்', giving: 'காணிக்கை', contact: 'தொடர்பு', prayerPage: 'ஜெபம்', planVisit: 'வருகை திட்டம்', newHere: 'புதிதாக வந்தவரா?',
    eyebrow: 'டிரினிட்டி ஜெப இல்லம் · மடுக்கரை',
    heroTitle1: 'ஒரு இடம்', heroTitle2: 'சந்திப்பு', heroTitle3: '&', heroTitle4: 'அமைதி',
    heroSub: '1976 ஆம் ஆண்டு முதல் கடவுளுடன் ஆழமான உறவுகளை பின்பற்றும் ஆவிக்குரிய திருச்சபை குடும்பம்.',
    watchLatest: 'சமீபத்திய செய்தி',
    watchIntroVideo: 'அறிமுக வீடியோ',
    ourStory: 'எங்கள் கதை',
    welcomeH2a: 'ஜெபத்தில் வேரூன்றியது.', welcomeH2b: 'அன்பில் கட்டப்பட்டது.',
    welcomeP1: 'டிரினிட்டி ஜெப இல்ல ஊழியங்கள் போதகர் D.A. சத்தியநாதன் அவர்களால் கர்த்தரின் தரிசனத்தின்படி நிறுவப்பட்டது.',
    welcomeP2: 'இன்று, மூத்த போதகர் வசந்த் சத்தியநாதன் அவர்களின் தலைமையில், இந்த பாரம்பரியத்தை தொடர்கிறோம்.',
    discoverHistory: 'எங்கள் வரலாறு',
    imgCaption: '"எல்லா தேசங்களுக்கும் ஜெப இல்லம்"',
    joinUs: 'எங்களுடன் சேருங்கள்', serviceTimes: 'ஆராதனை', serviceTimesI: 'நேரங்கள்',
    sunWorship: 'ஞாயிறு ஆராதனை', hindiService: 'இந்தி ஆராதனை', bibleStudy: 'வேதப்படிப்பு', promiseService: 'வாக்குத்தத்த ஆராதனை',
    sunDesc: 'தமிழ் ஆராதனை & குழந்தை ஊழியம்', hindiDesc: 'ஞாயிறு மாலை ஆராதனை', bibleDesc: 'வியாழன் மாலை', promiseDesc: 'ஒவ்வொரு மாதமும் 1ஆம் தேதி',
    latestMessage: 'சமீபத்திய செய்தி',
    latestTitle: 'ஞாயிறு ஆராதனை —', latestTitleI: 'சமீபத்திய ஆராதனை',
    latestDesc: 'போதகர் வசந்த் சத்தியநாதன் அவர்களின் சமீபத்திய ஆராதனையைப் பாருங்கள்.',
    seeAllSermons: 'அனைத்து பிரசங்கங்கள்',
    watchOnline: 'ஆன்லைனில் பாருங்கள்',
    neverMiss: 'ஒரு', messageI: 'செய்தியை தவறவிடாதீர்கள்',
    ytSubDesc: 'நேரடி ஒளிபரப்பு ஆராதனைகள் மற்றும் சிறப்பு நிகழ்ச்சிகளுக்கு எங்கள் YouTube சேனலில் சந்தா செலுத்துங்கள்.',
    subscribeYT: 'YouTube சந்தா',
    selectLang: 'உங்கள் மொழியைத் தேர்ந்தெடுங்கள்',
    selectLangSub: 'இணையதளத்தை உலாவ உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
    footerMission: 'எல்லா தேசங்களுக்கும் ஜெப இல்லம் கட்டுதல். 1976 முதல் அடையப்படாதவர்களை அடைதல்.',
    navigate: 'வழிசெலுத்தல்', services: 'ஆராதனைகள்', contactUs: 'தொடர்பு',
    phone: 'தொலைபேசி / WhatsApp', email: 'மின்னஞ்சல்', address: 'முகவரி',
    rights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    builtWith: '❤️ உடன் ராஜ்யத்திற்காக கட்டப்பட்டது.',
    aboutUs: 'எங்களைப் பற்றி', aboutH1a: 'எங்கள்', aboutH1b: 'வரலாறு', aboutH1c: '& அழைப்பு',
    aboutSub: '1976 ஆம் ஆண்டிலிருந்து அடையப்படாதவர்களை அடைய மலையடிவாரத்தில் திருச்சபை கட்டுதல்.',
    legacyTitle: 'ஜெபத்தின் பாரம்பரியம்',
    aboutP1: 'டிரினிட்டி ஜெப இல்ல ஊழியங்கள் போதகர் D.A. சத்தியநாதன் அவர்களால் கர்த்தரின் தரிசனத்தின்படி நிறுவப்பட்டது — மலையடிவாரத்தில் திருச்சபை கட்டி, உலகம் முழுவதும் அடையப்படாதவர்களை அடைவதற்காக.',
    aboutP2: 'டிரினிட்டி ஜெப இல்லம் — மடுக்கரை எங்கள் முக்கிய கிளையாகும், மூத்த போதகர் வசந்த் சத்தியநாதன் அவர்களின் மேய்ப்பில் உள்ளது. பல தசாப்தங்களாக, தேவனுடைய வார்த்தையின் அடித்தளத்தில் நிற்கிறோம்.',
    val1h: '01. ஆராதனை', val1p: 'கடவுளுக்கு பயபக்தியான வாழ்க்கை முறை.',
    val2h: '02. வார்த்தை', val2p: 'வேதாகமத்தின் சத்தியத்தில் நிலைநிறுத்தப்பட்டது.',
    val3h: '03. போர்', val3p: 'வளிமண்டலங்களை மாற்ற பரிந்துரை ஜெபம்.',
    seniorPastor: 'மூத்த போதகர்', pastorDesc: 'கோயம்புத்தூரில் அடுத்த தலைமுறை விசுவாசிகளை அசையாத சுவிசேஷத்தை பிரசங்கிக்கவும் தயார்படுத்தவும் அர்ப்பணிக்கப்பட்டவர்.',
    aboutQuote: 'நாங்கள் ஒரு திருச்சபையை கட்டவில்லை; மக்களை கட்டுகிறோம்.',
    theWord: 'வார்த்தை', sermonsH1a: 'பிரசங்கங்கள் &', sermonsH1b: 'செய்திகள்',
    sermonsSub: 'போதகர் வசந்த் சத்தியநாதன் மற்றும் டிரினிட்டி ஜெப இல்ல குழுவின் சமீபத்திய செய்திகளைப் பாருங்கள்.',
    featuredTitle: 'ஞாயிறு ஆராதனை', featuredDate: 'மே 10, 2025 · ஞாயிறு ஆராதனை',
    featuredDesc: 'டிரினிட்டி ஜெப இல்லம் மடுக்கரையிலிருந்து போதகர் வசந்த் சத்தியநாதன் அவர்களால் வழங்கப்பட்ட சக்திவாய்ந்த ஆராதனை.',
    visitYT: 'YouTube சேனலைப் பார்வையிடுங்கள்', messages: 'செய்திகள்', recentSermons: 'சமீபத்திய', recentSermonsI: 'பிரசங்கங்கள்',
    allMessages: 'அனைத்து செய்திகள்',
    ministriesLabel: 'எங்கள் ஊழியங்கள்', ministriesH1a: 'எங்கள்', ministriesH1b: 'ஊழியங்கள்',
    ministriesSub: 'வெவ்வேறு பகுதிகளில் நாங்கள் கடவுளுக்கும் எங்கள் சமூகத்திற்கும் எவ்வாறு சேவை செய்கிறோம் என்பதைக் கண்டறியுங்கள்.',
    youthMin: 'இளைஞர் ஊழியம்', youthDesc: 'ஆராதனை, ஐக்கியம் மற்றும் சீடத்துவம் மூலம் கிறிஸ்துவில் தங்கள் அடையாளத்தைக் கண்டறிய இளைஞர்களை வலுப்படுத்துதல்.',
    kidsMin: 'குழந்தைகள் ஊழியம்', kidsDesc: 'ஊடாடும் பாடங்கள் மற்றும் செயல்பாடுகள் மூலம் குழந்தைகள் கடவுளின் அன்பைப் பற்றி கற்றுக்கொள்ளும் வேடிக்கையான மற்றும் பாதுகாப்பான சூழல்.',
    mensMin: 'ஆண்கள் ஊழியம்', mensDesc: 'தங்கள் குடும்பங்களிலும் சமூகத்திலும் விசுவாசம், நற்பண்பு மற்றும் நோக்கத்துடன் வழிநடத்த ஆண்களை அதிகாரப்படுத்துதல்.',
    womenMin: 'பெண்கள் ஊழியம்', womenDesc: 'விசுவாசம், தலைமைத்துவம் மற்றும் சமூகத்தில் வளர பெண்களை தயார்படுத்துதல் மற்றும் ஊக்கப்படுத்துதல்.',
    hindiMin: 'இந்தி ஊழியம்', hindiMinDesc: 'ஆராதனை மற்றும் வார்த்தையுடன் இந்தி பேசும் சமூகத்தை அடைதல்.',
    oldAgeMin: 'முதியோர் இல்லம்', oldAgeMinDesc: 'முதியோர்களுக்கு கவனிப்பு, அன்பு மற்றும் ஆன்மீக ஆதரவை வழங்குதல்.',
    branchMin: 'கிளை திருச்சபைகள்', branchMinDesc: 'எங்கள் உள்ளூர் கிளை திருச்சபைகள் மூலம் கடவுளின் ராஜ்யத்தை விரிவுபடுத்துதல்.',
    calendar: 'நாட்காட்டி', eventsH1a: 'வரவிருக்கும்', eventsH1b: 'நிகழ்வுகள்',
    eventsSub: 'எங்களுடன் சேருங்கள். சமூகத்தைக் கண்டறியுங்கள், உங்கள் விசுவாசத்தில் வளருங்கள்.',
    details: 'விவரங்கள்',
    ev1Title: 'வாராந்திர வேதப்படிப்பு', ev1Desc: 'ரோமர் புத்தகத்தில் ஆழ்ந்த ஆய்வுக்கு எங்களுடன் சேருங்கள். அனைத்து வயதினருக்கும்.',
    ev2Title: 'இளைஞர் எழுப்புதல் இரவு', ev2Desc: 'இளைஞர்களுக்காக சிறப்பாக வடிவமைக்கப்பட்ட ஆராதனை, ஜெபம் மற்றும் ஐக்கியத்தின் சக்திவாய்ந்த மாலை.',
    ev3Title: 'சிறப்பு சுகமளிக்கும் ஆராதனை', ev3Desc: 'நோயுற்றவர்களுக்காக ஜெபிப்பதற்கும் அற்புதங்களை நம்புவதற்கும் இந்த ஞாயிறு காலை ஆராதனையை அர்ப்பணிக்கிறோம்.',
    partnerWithUs: 'எங்களுடன் பங்காளியாகுங்கள்', giveH1a: 'ஆராதனை மூலம்', giveH1b: 'காணிக்கை',
    giveSub: 'உங்கள் தாராள மனப்பான்மை மடுக்கரையில் எங்கள் ஊழியத்தைத் தொடர உதவுகிறது. உங்கள் உண்மையான ஆதரவுக்கு நன்றி.',
    bankTransfer: 'வங்கி பரிமாற்றம்', bankDesc: 'எங்கள் திருச்சபை கணக்கிற்கு நேரடியாக வங்கி பரிமாற்றம் மூலம் கொடுங்கள்.',
    acctName: 'கணக்கு பெயர்', acctNo: 'கணக்கு எண்', ifsc: 'IFSC குறியீடு', bank: 'வங்கி',
    upiPayment: 'UPI கட்டணம்', upiDesc: 'உடனடி காணிக்கைக்கு எங்கள் UPI ID-ஐ ஸ்கேன் செய்யுங்கள் அல்லது பயன்படுத்துங்கள்.',
    offeringBox: 'காணிக்கை பெட்டி', offeringDesc: 'எங்கள் எந்த ஆராதனையின் போதும் காணிக்கை பெட்டியில் நேரில் கொடுக்கலாம்.',
    connectWithUs: 'எங்களுடன் இணையுங்கள்', contactH1a: 'தொடர்பில்', contactH1b: 'இருங்கள்',
    contactSub: 'உங்களுடன் ஜெபிக்கவும், உங்கள் கேள்விகளுக்கு பதிலளிக்கவும், எங்கள் சமூகத்தில் உங்களை வரவேற்கவும் நாங்கள் இங்கே இருக்கிறோம்.',
    hereToServe: 'சேவை செய்ய இங்கே', hereToServeDesc: 'ஜெபம், வழிகாட்டுதல் அல்லது எங்கள் ஊழியங்கள் பற்றிய தகவலுக்கு எங்கள் போதக குழுவை அணுகுங்கள்.',
    sendMessage: 'செய்தி அனுப்பு', firstName: 'முதல் பெயர்', lastName: 'கடைசி பெயர்',
    emailLabel: 'மின்னஞ்சல்', subject: 'பொருள்', message: 'உங்கள் செய்தி', sendBtn: 'செய்தி அனுப்பு',
    successTitle: 'செய்தி அனுப்பப்பட்டது!', successDesc: 'தொடர்பு கொண்டதற்கு நன்றி. எங்கள் குழு விரைவில் உங்களைத் தொடர்பு கொள்ளும்.',
    statsYears: 'ஊழிய ஆண்டுகள்', statsLives: 'வாழ்க்கைகள் தொடப்பட்டன', statsSermons: 'YouTube பிரசங்கங்கள்', statsServices: 'வாராந்திர ஆராதனைகள்',
    footerGlory: 'கடவுளுக்கே மகிமை.',
    prayerRequest: 'ஜெப வேண்டுகோள்', prayerNeed: 'உங்கள் ஜெப தேவையை பகிருங்கள்...', submitPrayer: 'ஜெப வேண்டுகோள் சமர்ப்பிக்கவும்',
    prayerSuccess: 'ஜெபம் பெறப்பட்டது', prayerSuccessDesc: 'எங்கள் பரிந்துரை குழு உங்களுக்காக ஜெபிக்கும். கடவுள் உங்களை ஆசீர்வதிப்பார்.',
  },
  hi: {
    home: 'होम', about: 'हमारे बारे में', sermons: 'उपदेश', ministries: 'सेवकाई',
    events: 'कार्यक्रम', giving: 'दान', contact: 'संपर्क', prayerPage: 'प्रार्थना', planVisit: 'यात्रा की योजना', newHere: 'क्या आप नए हैं?',
    eyebrow: 'ट्रिनिटी प्रेयर हाउस · मदुक्करै',
    heroTitle1: 'एक स्थान', heroTitle2: 'मुलाकात', heroTitle3: 'और', heroTitle4: 'शांति',
    heroSub: '1976 से परमेश्वर के साथ गहरे संबंधों का अनुसरण करने वाला आत्मा से भरा चर्च परिवार।',
    watchLatest: 'नवीनतम संदेश देखें',
    watchIntroVideo: 'परिचय वीडियो देखें',
    ourStory: 'हमारी कहानी',
    welcomeH2a: 'प्रार्थना में जड़ें।', welcomeH2b: 'प्यार पर बना।',
    welcomeP1: 'ट्रिनिटी प्रेयर हाउस मिनिस्ट्रीज की स्थापना पादरी D.A. सत्यनाथन ने प्रभु की दृष्टि से की थी।',
    welcomeP2: 'आज, वरिष्ठ पादरी वसंत सत्यनाथन की देखरेख में, हम इस विरासत को जारी रखते हैं।',
    discoverHistory: 'हमारा इतिहास जानें',
    imgCaption: '"सभी राष्ट्रों के लिए प्रार्थना का घर"',
    joinUs: 'हमसे जुड़ें', serviceTimes: 'सेवा', serviceTimesI: 'समय',
    sunWorship: 'रविवार आराधना', hindiService: 'हिंदी सेवा', bibleStudy: 'बाइबल अध्ययन', promiseService: 'वादा सेवा',
    sunDesc: 'तमिल सेवा और बच्चों की सेवकाई', hindiDesc: 'रविवार शाम सेवा', bibleDesc: 'गुरुवार शाम', promiseDesc: 'हर महीने की 1 तारीख',
    latestMessage: 'नवीनतम संदेश',
    latestTitle: 'रविवार सेवा —', latestTitleI: 'नवीनतम आराधना',
    latestDesc: 'पादरी वसंत सत्यनाथन की नवीनतम सेवा देखें।',
    seeAllSermons: 'सभी उपदेश देखें',
    watchOnline: 'ऑनलाइन देखें',
    neverMiss: 'कोई', messageI: 'संदेश न चूकें',
    ytSubDesc: 'लाइव-स्ट्रीम सेवाओं और विशेष कार्यक्रमों के लिए हमारे YouTube चैनल को सब्सक्राइब करें।',
    subscribeYT: 'YouTube सब्सक्राइब',
    selectLang: 'अपनी भाषा चुनें',
    selectLangSub: 'वेबसाइट ब्राउज़ करने के लिए अपनी पसंदीदा भाषा चुनें',
    footerMission: 'सभी राष्ट्रों के लिए प्रार्थना का घर बनाना। 1976 से अनपहुँचे लोगों तक पहुँचना।',
    navigate: 'नेविगेट', services: 'सेवाएं', contactUs: 'संपर्क',
    phone: 'फ़ोन / WhatsApp', email: 'ईमेल', address: 'पता',
    rights: 'सर्वाधिकार सुरक्षित।',
    builtWith: '❤️ के साथ राज्य के लिए बनाया गया।',
    aboutUs: 'हमारे बारे में', aboutH1a: 'हमारा', aboutH1b: 'इतिहास', aboutH1c: 'और बुलाहट',
    aboutSub: '1976 से अनपहुँचे लोगों तक पहुँचने के लिए पहाड़ी की तलहटी में चर्च का निर्माण।',
    legacyTitle: 'प्रार्थना की विरासत',
    aboutP1: 'ट्रिनिटी प्रेयर हाउस मिनिस्ट्रीज की स्थापना पादरी D.A. सत्यनाथन ने प्रभु की दृष्टि से की — पहाड़ी की तलहटी में चर्च बनाकर दुनिया भर में अनपहुँचे लोगों तक पहुँचना।',
    aboutP2: 'ट्रिनिटी प्रेयर हाउस — मदुक्करै हमारी मुख्य शाखा है, और चर्च वरिष्ठ पादरी वसंत सत्यनाथन की देखरेख में है। दशकों से, हम परमेश्वर के वचन की नींव पर खड़े हैं।',
    val1h: '01. आराधना', val1p: 'परमेश्वर के प्रति श्रद्धा की जीवनशैली।',
    val2h: '02. वचन', val2p: 'पवित्रशास्त्र की सच्चाई में स्थापित।',
    val3h: '03. युद्ध', val3p: 'वातावरण बदलने के लिए मध्यस्थ प्रार्थना।',
    seniorPastor: 'वरिष्ठ पादरी', pastorDesc: 'कोयम्बटूर में विश्वासियों की अगली पीढ़ी को बेजोड़ सुसमाचार का प्रचार करने और तैयार करने के लिए समर्पित।',
    aboutQuote: 'हम सिर्फ एक चर्च नहीं बना रहे; हम लोगों का निर्माण कर रहे हैं।',
    theWord: 'वचन', sermonsH1a: 'उपदेश और', sermonsH1b: 'संदेश',
    sermonsSub: 'पादरी वसंत सत्यनाथन और ट्रिनिटी प्रेयर हाउस टीम के नवीनतम संदेश देखें।',
    featuredTitle: 'रविवार आराधना सेवा', featuredDate: '10 मई, 2025 · रविवार सेवा',
    featuredDesc: 'ट्रिनिटी प्रेयर हाउस मदुक्करै से पादरी वसंत सत्यनाथन द्वारा प्रस्तुत शक्तिशाली आराधना।',
    visitYT: 'YouTube चैनल देखें', messages: 'संदेश', recentSermons: 'हाल के', recentSermonsI: 'उपदेश',
    allMessages: 'सभी संदेश',
    ministriesLabel: 'हमारी सेवकाई', ministriesH1a: 'हमारी', ministriesH1b: 'सेवकाई',
    ministriesSub: 'जानें कि हम विभिन्न क्षेत्रों में परमेश्वर और हमारे समुदाय की सेवा कैसे करते हैं।',
    youthMin: 'युवा सेवकाई', youthDesc: 'आराधना, संगति और शिष्यत्व के माध्यम से मसीह में अपनी पहचान खोजने के लिए युवाओं को सशक्त बनाना।',
    kidsMin: 'बच्चों की सेवकाई', kidsDesc: 'एक मज़ेदार और सुरक्षित वातावरण जहाँ बच्चे इंटरैक्टिव पाठों के माध्यम से परमेश्वर के प्रेम के बारे में सीखते हैं।',
    mensMin: 'पुरुषों की सेवकाई', mensDesc: 'अपने परिवारों और समुदाय में विश्वास, चरित्र और उद्देश्य के साथ नेतृत्व करने के लिए पुरुषों को सशक्त बनाना।',
    womenMin: 'महिला सेवकाई', womenDesc: 'विश्वास, नेतृत्व और समुदाय में बढ़ने के लिए महिलाओं को तैयार और प्रोत्साहित करना।',
    hindiMin: 'हिंदी सेवकाई', hindiMinDesc: 'आराधना और वचन के साथ हिंदी भाषी समुदाय तक पहुँचना।',
    oldAgeMin: 'वृद्धाश्रम', oldAgeMinDesc: 'बुजुर्गों के लिए देखभाल, प्रेम और आध्यात्मिक सहायता प्रदान करना।',
    branchMin: 'शाखा चर्च', branchMinDesc: 'हमारे स्थानीय शाखा चर्चों के नेटवर्क के माध्यम से परमेश्वर के राज्य का विस्तार करना।',
    calendar: 'कैलेंडर', eventsH1a: 'आगामी', eventsH1b: 'कार्यक्रम',
    eventsSub: 'हमारे साथ जुड़ें। समुदाय खोजें, अपने विश्वास में बढ़ें।',
    details: 'विवरण',
    ev1Title: 'साप्ताहिक बाइबल अध्ययन', ev1Desc: 'रोमियों की पुस्तक में गहन अध्ययन के लिए हमारे साथ जुड़ें। सभी उम्र के लिए।',
    ev2Title: 'युवा जागरण रात', ev2Desc: 'युवा वयस्कों के लिए विशेष रूप से डिज़ाइन की गई आराधना, प्रार्थना और संगति की शक्तिशाली शाम।',
    ev3Title: 'विशेष चंगाई सेवा', ev3Desc: 'हम इस रविवार की सुबह की सेवा को बीमारों के लिए प्रार्थना और चमत्कारों में विश्वास करने के लिए समर्पित कर रहे हैं।',
    partnerWithUs: 'हमारे साथ भागीदार बनें', giveH1a: 'आराधना के रूप में', giveH1b: 'दान',
    giveSub: 'आपकी उदारता मदुक्करै में हमारी सेवकाई को जारी रखने में मदद करती है। आपके विश्वसनीय समर्थन के लिए धन्यवाद।',
    bankTransfer: 'बैंक ट्रांसफर', bankDesc: 'हमारे चर्च खाते में सीधे बैंक ट्रांसफर के माध्यम से दें।',
    acctName: 'खाता नाम', acctNo: 'खाता संख्या', ifsc: 'IFSC कोड', bank: 'बैंक',
    upiPayment: 'UPI भुगतान', upiDesc: 'तत्काल दान के लिए हमारी UPI ID स्कैन करें या उपयोग करें।',
    offeringBox: 'भेंट पेटी', offeringDesc: 'आप हमारी किसी भी सेवा के दौरान भेंट पेटी में व्यक्तिगत रूप से दे सकते हैं।',
    connectWithUs: 'हमसे जुड़ें', contactH1a: 'संपर्क', contactH1b: 'करें',
    contactSub: 'हम आपके साथ प्रार्थना करने, आपके सवालों का जवाब देने और आपका हमारे समुदाय में स्वागत करने के लिए यहाँ हैं।',
    hereToServe: 'सेवा के लिए यहाँ', hereToServeDesc: 'प्रार्थना, मार्गदर्शन या हमारी सेवकाई के बारे में जानकारी के लिए हमारी पादरी टीम से संपर्क करें।',
    sendMessage: 'संदेश भेजें', firstName: 'पहला नाम', lastName: 'उपनाम',
    emailLabel: 'ईमेल पता', subject: 'विषय', message: 'आपका संदेश', sendBtn: 'संदेश भेजें',
    successTitle: 'संदेश भेजा गया!', successDesc: 'संपर्क करने के लिए धन्यवाद। हमारी टीम जल्द ही आपसे संपर्क करेगी।',
    statsYears: 'सेवकाई के वर्ष', statsLives: 'जीवन प्रभावित', statsSermons: 'YouTube उपदेश', statsServices: 'साप्ताहिक सेवाएं',
    footerGlory: 'परमेश्वर की महिमा हो।',
    prayerRequest: 'प्रार्थना अनुरोध', prayerNeed: 'अपनी प्रार्थना आवश्यकता साझा करें...', submitPrayer: 'प्रार्थना अनुरोध भेजें',
    prayerSuccess: 'प्रार्थना प्राप्त', prayerSuccessDesc: 'हमारी मध्यस्थ टीम आपके लिए प्रार्थना करेगी। ईश्वर आपको आशीर्वाद दें।',
  },
};

type Translations = typeof translations.en;

interface LangContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
  showPicker: boolean;
  setShowPicker: (show: boolean) => void;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
  showPicker: false,
  setShowPicker: () => {},
});

export const useLang = () => useContext(LangContext);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');
  const [showPicker, setShowPicker] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tph-lang') as Language | null;
    if (saved && translations[saved]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(saved);
      document.documentElement.lang = saved;
    } else {
      setShowPicker(true);
    }
    setMounted(true);
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('tph-lang', l);
    document.documentElement.lang = l === 'ta' ? 'ta' : l === 'hi' ? 'hi' : 'en';
    setShowPicker(false);
  };

  if (!mounted) return null;

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang], showPicker, setShowPicker }}>
      {children}
    </LangContext.Provider>
  );
}
