'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './DailyVerse.module.css';

const verses = [
  { text: "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope.", ref: "Jeremiah 29:11" },
  { text: "I can do all things through him who strengthens me.", ref: "Philippians 4:13" },
  { text: "Trust in the LORD with all your heart, and do not lean on your own understanding.", ref: "Proverbs 3:5" },
  { text: "Be strong and courageous. Do not be frightened, and do not be dismayed, for the LORD your God is with you wherever you go.", ref: "Joshua 1:9" },
  { text: "The LORD is my shepherd; I shall not want.", ref: "Psalm 23:1" },
  { text: "But they who wait for the LORD shall renew their strength; they shall mount up with wings like eagles.", ref: "Isaiah 40:31" },
  { text: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.", ref: "Romans 8:28" },
  { text: "Come to me, all who labor and are heavy laden, and I will give you rest.", ref: "Matthew 11:28" },
  { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7" },
  { text: "The LORD is my light and my salvation; whom shall I fear?", ref: "Psalm 27:1" },
  { text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.", ref: "Philippians 4:6" },
  { text: "For God gave us a spirit not of fear but of power and love and self-control.", ref: "2 Timothy 1:7" },
  { text: "The steadfast love of the LORD never ceases; his mercies never come to an end; they are new every morning.", ref: "Lamentations 3:22-23" },
  { text: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you.", ref: "Isaiah 41:10" },
  { text: "Rejoice always, pray without ceasing, give thanks in all circumstances.", ref: "1 Thessalonians 5:16-18" },
  { text: "Your word is a lamp to my feet and a light to my path.", ref: "Psalm 119:105" },
  { text: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness.", ref: "Galatians 5:22" },
  { text: "Commit your work to the LORD, and your plans will be established.", ref: "Proverbs 16:3" },
  { text: "Take delight in the LORD, and he will give you the desires of your heart.", ref: "Psalm 37:4" },
  { text: "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.", ref: "2 Corinthians 5:17" },
  { text: "And my God will supply every need of yours according to his riches in glory in Christ Jesus.", ref: "Philippians 4:19" },
  { text: "Let all that you do be done in love.", ref: "1 Corinthians 16:14" },
  { text: "He heals the brokenhearted and binds up their wounds.", ref: "Psalm 147:3" },
  { text: "Peace I leave with you; my peace I give to you. Not as the world gives do I give to you.", ref: "John 14:27" }
];

export default function DailyVerse() {
  const [isVisible, setIsVisible] = useState(false);
  const [verse, setVerse] = useState({ text: '', ref: '' });

  useEffect(() => {
    // Check session storage so it only shows once per visit
    const hasSeenPopup = sessionStorage.getItem('tph-verse-seen');
    if (hasSeenPopup) return;

    // Get current hour (0-23) to determine the verse
    const currentHour = new Date().getHours();
    setVerse(verses[currentHour]);

    // Show popup after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Mark as seen for this session
    sessionStorage.setItem('tph-verse-seen', 'true');
  };

  if (!verse.text) return null;

  return (
    <div className={`${styles.versePopup} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.header}>
        <span className={styles.title}>Word of the Hour</span>
        <button onClick={handleClose} className={styles.closeBtn} aria-label="Close verse popup">
          <X size={18} />
        </button>
      </div>
      <p className={styles.verseText}>"{verse.text}"</p>
      <span className={styles.verseRef}>— {verse.ref}</span>
    </div>
  );
}
