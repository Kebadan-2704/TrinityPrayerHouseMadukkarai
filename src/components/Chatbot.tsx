'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import Image from 'next/image';
import styles from './Chatbot.module.css';

// Monotonic counter for stable message IDs — avoids calling impure functions during render
let _nextMsgId = 0;
const nextMsgId = () => (++_nextMsgId).toString(36);

const MAX_INPUT_LENGTH = 500;

const QUICK_SUGGESTIONS = [
  '⛪ Service times',
  '📍 Location & directions',
  '📞 Contact us',
  '🙏 Upcoming events',
];

// ── Build system prompt with ALL church info sourced from the website ────────
function buildSystemPrompt(): string {
  const address   = process.env.NEXT_PUBLIC_CHURCH_ADDRESS   ?? '16/300, Gandhi Nagar, Madukkarai, Coimbatore - 641105';
  const phone     = process.env.NEXT_PUBLIC_CHURCH_PHONE     ?? '+91 9786888999';
  const email     = process.env.NEXT_PUBLIC_CHURCH_EMAIL     ?? 'trinityprayerhouse.mdk@gmail.com';
  const youtube   = process.env.NEXT_PUBLIC_CHURCH_YOUTUBE   ?? '@Pas.Vasanth';
  const instagram = process.env.NEXT_PUBLIC_CHURCH_INSTAGRAM ?? '@trinityprayerhouse_church';

  // Auto-sync current date/time (IST)
  const now = new Date();
  const istOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Kolkata',
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  };
  const currentDateTime = now.toLocaleString('en-IN', istOptions);
  const currentDay = now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long' });

  return `You are Trinity Bot, the official AI assistant for Trinity Prayer House Madukkarai, Coimbatore, India.

CURRENT DATE & TIME (IST): ${currentDateTime}
TODAY IS: ${currentDay}

CRITICAL RULES:
- ONLY answer using the information provided below. NEVER make up or hallucinate any information.
- If you don't know something, say: "I don't have that information. Please contact us at ${phone} or ${email} for more details."
- Keep answers concise, polite, friendly, and helpful.
- Use plain markdown bold (**text**) for emphasis. Use line breaks for readability.
- You can use the current date/time to help answer questions like "What's the next service?" or "Is there a service today?"

═══ CHURCH IDENTITY ═══
Name: Trinity Prayer House Madukkarai
Full Name: Trinity Prayer House Ministries
Founded: 1976
Location: Madukkarai, Coimbatore, Tamil Nadu, India
Tagline: "A house of prayer for all nations"
Mission: Building a house of prayer for all nations. Reaching the unreached since 1976.
Vision: Building the church at the foothill to reach the unreached.
Website: trinityprayerhousemadukkarai.com

═══ FOUNDER (LATE) ═══
Name: Pastor Dowy Sathyanathan Adhisayaraj (also written as Rev. Dowy Sathyanathan or Pastor D.A. Sathyanathan)
Born as the 3rd child of 7 children to Aaron and Grace (Tamil Nadu Native Lutheran Church).
He shut down his lathe workshop in Coimbatore to fully dedicate himself to God's ministry.
In July 1975, after being baptized in Vellore, God led him to a hill in Madukkarai and told him: "Do ministry in this place."
In 1976, he rented a house in Madukkarai and began the ministry.
In 1980, he purchased 40 cents of land and built the church in 40 days.
He served as Church Pastor, Convention Speaker, Coimbatore Pentecostal Unity Secretary, and Vice President from 1975-1995.
He was known as a "Walking Bible University" for his deep knowledge of Scripture.
His wife: Mrs. Chandra Sathyanathan
He entered God's Kingdom on May 27, 1995.
IMPORTANT: He is the SOLE founder. There is no co-founder.

═══ CURRENT SENIOR PASTOR ═══
Name: Pastor Vasanth Sathyanathan
He is the SON of the late founder Pastor Dowy Sathyanathan (second son of the family).
He graduated from Hindustan Bible College, Chennai.
Evangelist Mohan C. Lazarus prophetically declared his calling into ministry and sponsored his education.
He began serving in ministry under his father from a very young age.
His wife: Mrs. Danalatha Sathyanathan (sometimes spelled Danalatha)
They have a daughter and a son.
He has ministered internationally in: USA, Abu Dhabi, Kuwait, and UAE.
He is currently the Senior Pastor of Trinity Prayer House.
Dedicated to preaching the uncompromised Gospel and equipping the next generation of believers in Coimbatore.

═══ REGULAR SERVICE TIMES ═══
• Promise Service: 1st of every month, 6:30 AM
• Sunday Worship (Tamil): Every Sunday, 9:30 AM (includes Kids Ministry)
• Hindi Service: Every Sunday, 6:30 PM (at Texcity Hall, Sungam Bypass Road, Coimbatore)
• Bible Study: Every Thursday, 7:30 PM
• Online Meet (Google Meet): Daily, 9:00 PM IST — Link: https://meet.google.com/gct-xkdh-cni
• Fasting Prayer: 1st Saturday of every month, 10:30 AM
• Night Prayer: 4th Friday of every month, 10:00 PM

═══ MINISTRIES ═══
• Youth Ministry — Empowering young people to discover their identity in Christ through worship, fellowship, and discipleship.
• Kids Ministry — A fun and safe environment where children learn about God's love through interactive lessons and activities.
• Men's Ministry — Empowering men to lead with faith, character, and purpose in their families and community.
• Women's Ministry — Equipping and encouraging women to grow in faith, leadership, and community.
• Hindi Ministry — Reaching out to the Hindi-speaking community with worship and the Word.
• Old Age Home — Providing care, love, and spiritual support for the elderly.
• Branch Churches — Expanding the Kingdom of God through our network of local branch churches.

═══ CONTACT INFORMATION ═══
Address: ${address}
Phone / WhatsApp: ${phone}
Email: ${email}
YouTube: https://www.youtube.com/${youtube}
Instagram: ${instagram}
Google Maps: https://www.google.com/maps/dir/?api=1&destination=Trinity+Prayer+House+Madukkarai+Coimbatore

═══ GIVING / DONATIONS ═══
UPI ID: pastorvasanth-1@okhdfcbank
UPI / GPay Phone: +91 9786888999
You can also give in person at the offering box during any service.

═══ VALUES ═══
1. Worship — A lifestyle of reverence to God.
2. Word — Anchored in the truth of the Scriptures.
3. Warfare — Intercessory prayer to shift atmospheres.

═══ WEBSITE PAGES ═══
The website has these pages: Home, Vision (About/History), Mission (Pastor's story), Sermons, Ministries (Kids, Youth, Men, Women, Hindi, Old Age Home, Branch Churches), Special Meetings, Google Meet, Giving, Contact, Prayer Request, New Here.
Languages: English, Tamil, Hindi`;
}

// ── Simple focus trap hook ──────────────────────────────────────────────────
function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;
    const container = containerRef.current;
    if (!container) return;

    const focusableSelector = 'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
      .filter(el => !el.hasAttribute('disabled') && el.tabIndex !== -1);

    if (focusable.length > 0) {
      focusable[0].focus();
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first?.focus(); }
      }
    };

    container.addEventListener('keydown', onKeyDown);
    return () => container.removeEventListener('keydown', onKeyDown);
  }, [isActive]);

  return containerRef;
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/** Renders bold markdown (**text**) and respects line breaks */
function renderMessageText(text: string) {
  return text.split('\n').map((line, lineIdx) => (
    <React.Fragment key={lineIdx}>
      {lineIdx > 0 && <br />}
      {line.split(/(\*\*.*?\*\*)/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </React.Fragment>
  ));
}

// ── Types ──────────────────────────────────────────────────────────────────
interface Message {
  role: 'bot' | 'user';
  text: string;
  _id: string;
  time: Date;
}

// ── Chatbot ────────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesRef = useRef<Message[]>(messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Keep ref in sync so handleSend always reads the latest context
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    setShowSuggestions(false);
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage.trim(), _id: nextMsgId(), time: new Date() }]);
    setIsLoading(true);

    // Read from ref — avoids stale closure
    const recentMessages = messagesRef.current.slice(-5);

    // Build prompt with real newlines (not literal \\n)
    const systemPrompt = buildSystemPrompt();
    let promptString = `${systemPrompt}\n\n`;
    recentMessages.forEach(m => {
      promptString += `${m.role === 'bot' ? 'Trinity Bot' : 'User'}: ${m.text}\n`;
    });
    promptString += `User: ${userMessage}\nTrinity Bot:`;

    try {
      const url = `https://chatbot.codexapi.workers.dev/?prompt=${encodeURIComponent(promptString)}&model=gpt-5.1`;
      const res = await fetch(url);
      const data = await res.json();

      // Validate API response structure
      const isValidResponse = data && typeof data === 'object' &&
        (typeof data.answer === 'string' || typeof data.text === 'string');

      const answer = isValidResponse
        ? (data.answer ?? data.text!).trim()
        : null;

      if (!answer) {
        setMessages(prev => [
          ...prev,
          {
            role: 'bot',
            text: "I'm sorry, I couldn't process that right now. The service may be temporarily unavailable. Please try again in a moment.",
            _id: nextMsgId(),
            time: new Date(),
          },
        ]);
        return;
      }
      setMessages(prev => [...prev, { role: 'bot', text: answer, _id: nextMsgId(), time: new Date() }]);
    } catch (error) {
      console.error('Chat API error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I couldn't process that request right now.", _id: nextMsgId(), time: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleSend = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  }, [input, sendMessage]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    // Strip the emoji prefix for a cleaner query
    const cleanText = suggestion.replace(/^[^\w]*\s*/, '');
    sendMessage(cleanText);
  }, [sendMessage]);

  const containerRef = useFocusTrap(isOpen);

  const hasUserMessages = messages.some(m => m.role === 'user');

  return (
    <div className={`${styles.chatWrapper} ${isOpen ? styles.chatWrapperOpen : ''}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={containerRef}
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Trinity Bot chat window"
            aria-live="polite"
          >
            {/* ── Header ──────────────────────────────────────────── */}
            <div className={styles.chatHeader}>
              <div className={styles.headerTitle}>
                <div className={styles.headerIconWrap}>
                  <Image src="/sam-avatar-v3.png" alt="Trinity Bot" width={40} height={40} className={styles.headerAvatar} />
                </div>
                <div>
                  <h4>Trinity Bot</h4>
                  <span>Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className={styles.closeBtn} aria-label="Close chat">
                <X size={18} />
              </button>
            </div>

            {/* ── Chat body ───────────────────────────────────────── */}
            <div className={styles.chatBody}>
              {/* Welcome card */}
              {!hasUserMessages && (
                <motion.div
                  className={styles.welcomeCard}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  <div className={styles.welcomeAvatarLarge}>
                    <Image src="/sam-avatar-v3.png" alt="Trinity Bot" width={56} height={56} />
                  </div>
                  <h3>Welcome to Trinity Bot 👋</h3>
                  <p>
                    I&apos;m here to help you with service times, directions, events, and anything about Trinity Prayer House.
                  </p>
                </motion.div>
              )}

              {/* Suggestion chips */}
              {showSuggestions && !hasUserMessages && (
                <motion.div
                  className={styles.suggestionsWrap}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.35 }}
                >
                  {QUICK_SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      className={styles.suggestionChip}
                      onClick={() => handleSuggestionClick(suggestion)}
                      type="button"
                    >
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Messages */}
              {messages.map((msg) => (
                <motion.div
                  key={msg._id}
                  className={`${styles.messageWrap} ${msg.role === 'user' ? styles.userWrap : styles.botWrap} ${styles.messageEnter}`}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {msg.role === 'bot' && (
                    <div className={styles.avatar}>
                      <Image src="/sam-avatar-v3.png" alt="Trinity Bot" width={28} height={28} className={styles.msgAvatar} />
                    </div>
                  )}
                  <div className={styles.messageBubble}>
                    <div className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.botMsg}`}>
                      {renderMessageText(msg.text)}
                    </div>
                    <div className={styles.timestamp}>{formatTime(msg.time)}</div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  className={`${styles.messageWrap} ${styles.botWrap}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.avatar}>
                    <Image src="/sam-avatar-v3.png" alt="Trinity Bot" width={28} height={28} className={styles.msgAvatar} />
                  </div>
                  <div className={`${styles.message} ${styles.botMsg} ${styles.loadingMsg}`}>
                    <div className={styles.typingDots}>
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Input area ──────────────────────────────────────── */}
            <form onSubmit={handleSend} className={styles.chatInputArea}>
              <div className={styles.inputWrap}>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
                  placeholder="Ask Trinity Bot anything…"
                  className={styles.inputField}
                  maxLength={MAX_INPUT_LENGTH}
                />
                <div className={`${styles.charCount} ${input.length > 0 ? styles.charCountVisible : ''} ${input.length >= MAX_INPUT_LENGTH - 20 ? styles.charCountWarn : ''}`}>
                  {input.length}/{MAX_INPUT_LENGTH}
                </div>
              </div>
              <button type="submit" disabled={!input.trim() || isLoading} className={styles.sendBtn} aria-label="Send message">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={`${styles.toggleBtn} ${isOpen ? styles.toggleOpen : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle Chat"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
      </motion.button>
    </div>
  );
}
