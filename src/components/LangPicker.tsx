'use client';

import { useLang } from './LangContext';
import type { Language } from './LangContext';
import styles from './LangPicker.module.css';

const languages: { code: Language; label: string; native: string; flag: string }[] = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
];

export default function LangPicker() {
  const { showPicker, setLang, t, lang } = useLang();

  if (!showPicker) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.crossIcon}>✝</div>
        <h2 className={styles.title}>{t.selectLang}</h2>
        <p className={styles.subtitle}>{t.selectLangSub}</p>
        <div className={styles.langGrid}>
          {languages.map(l => (
            <button
              key={l.code}
              className={`${styles.langBtn} ${lang === l.code ? styles.active : ''}`}
              onClick={() => setLang(l.code)}
            >
              <span className={styles.flag}>{l.flag}</span>
              <span className={styles.langLabel}>{l.label}</span>
              <span className={styles.langNative}>{l.native}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
