'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
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
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {showPicker ? (
        <motion.div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lang-picker-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.35 }}
        >
          <motion.div
            className={styles.modal}
            initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          >
            <div className={styles.crossIcon} aria-hidden>
              ✝
            </div>
            <h2 id="lang-picker-title" className={styles.title}>
              {t.selectLang}
            </h2>
            <p className={styles.subtitle}>{t.selectLangSub}</p>
            <div className={styles.langGrid}>
              {languages.map((l, i) => (
                <motion.button
                  key={l.code}
                  type="button"
                  className={`${styles.langBtn} ${lang === l.code ? styles.active : ''}`}
                  onClick={() => setLang(l.code)}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduce ? 0 : 0.06 * i, duration: 0.35 }}
                  whileHover={reduce ? {} : { x: 4 }}
                  whileTap={reduce ? {} : { scale: 0.99 }}
                >
                  <span className={styles.flag}>{l.flag}</span>
                  <span className={styles.langLabel}>{l.label}</span>
                  <span className={styles.langNative}>{l.native}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
