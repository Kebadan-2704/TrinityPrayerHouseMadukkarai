'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Trash2 } from 'lucide-react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
  const youtubeHandle   = process.env.NEXT_PUBLIC_CHURCH_YOUTUBE   ?? '@Pas.Vasanth';
  const instagramHandle = process.env.NEXT_PUBLIC_CHURCH_INSTAGRAM ?? '@trinityprayerhouse_church';
  const youtube = youtubeHandle.startsWith('http')
    ? youtubeHandle
    : `https://www.youtube.com/${youtubeHandle}`;
  const instagram = instagramHandle.startsWith('http')
    ? instagramHandle
    : `https://www.instagram.com/${instagramHandle.replace(/^@/, '')}`;
  const whatsapp = `https://wa.me/${phone.replace(/\D/g, '')}`;

  // ── Auto-sync current date/time (IST) ──────────────────────────────────
  // We compute in IST by offsetting UTC → +5:30
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + istOffset + now.getTimezoneOffset() * 60 * 1000);

  const fmt = (d: Date) =>
    d.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const currentDateTime = istNow.toLocaleString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
  const currentDay = istNow.toLocaleDateString('en-IN', { weekday: 'long' });

  // ── Pre-compute next service dates so the LLM doesn't have to ─────────
  function nextWeekday(from: Date, targetDay: number): Date {
    const d = new Date(from);
    const diff = (targetDay - d.getDay() + 7) % 7;
    d.setDate(d.getDate() + (diff === 0 ? 7 : diff));
    return d;
  }

  function nextNthWeekdayOfMonth(from: Date, weekday: number, nth: number): Date {
    // Find the nth occurrence of a weekday in the current or next month
    let month = from.getMonth(), year = from.getFullYear();
    for (let attempt = 0; attempt < 3; attempt++) {
      const firstDay = new Date(year, month, 1);
      const firstOccurrence = ((weekday - firstDay.getDay() + 7) % 7) + 1;
      const targetDate = firstOccurrence + (nth - 1) * 7;
      if (targetDate <= new Date(year, month + 1, 0).getDate()) {
        const result = new Date(year, month, targetDate);
        if (result > from || (result.toDateString() === from.toDateString())) return result;
      }
      month++;
      if (month > 11) { month = 0; year++; }
    }
    return from; // fallback
  }

  const todayDay = istNow.getDay(); // 0=Sun, 4=Thu, 5=Fri, 6=Sat

  // Next Sunday (0)
  const nextSunday = todayDay === 0 ? new Date(istNow) : nextWeekday(istNow, 0);
  // Next Thursday (4)
  const nextThursday = todayDay === 4 ? new Date(istNow) : nextWeekday(istNow, 4);
  // 1st of next/current month
  let next1st: Date;
  if (istNow.getDate() === 1) {
    next1st = new Date(istNow);
  } else {
    const m = istNow.getMonth() + 1;
    next1st = new Date(istNow.getFullYear(), m > 11 ? 0 : m, 1);
  }
  // 1st Saturday of month (6)
  const next1stSat = nextNthWeekdayOfMonth(istNow, 6, 1);
  // 4th Friday of month (5)
  const next4thFri = nextNthWeekdayOfMonth(istNow, 5, 4);

  const todayServices: string[] = [];
  if (todayDay === 0) todayServices.push('Sunday Worship (Tamil) at 9:30 AM', 'Hindi Service at 6:30 PM');
  if (todayDay === 4) todayServices.push('Bible Study at 7:30 PM');
  if (istNow.getDate() === 1) todayServices.push('Promise Service at 6:30 AM');
  if (todayDay === 6) {
    // Check if it's the 1st Saturday
    const firstDay = new Date(istNow.getFullYear(), istNow.getMonth(), 1);
    const firstSatDay = ((6 - firstDay.getDay() + 7) % 7) + 1;
    if (istNow.getDate() === firstSatDay) todayServices.push('Fasting Prayer at 10:30 AM');
  }
  if (todayDay === 5) {
    // Check if it's the 4th Friday
    const firstDay = new Date(istNow.getFullYear(), istNow.getMonth(), 1);
    const firstFriDay = ((5 - firstDay.getDay() + 7) % 7) + 1;
    if (istNow.getDate() === firstFriDay + 21) todayServices.push('Night Prayer at 10:00 PM');
  }

  const todayServicesStr = todayServices.length > 0
    ? todayServices.join(', ')
    : 'No in-person service today';

  // ── Sort upcoming events by date (ascending — closest first) ──────────
  const upcomingEvents: { date: Date; label: string }[] = [
    { date: nextSunday, label: `Sunday Worship: ${fmt(nextSunday)} at 9:30 AM (Tamil) & 6:30 PM (Hindi) — IN-PERSON at church` },
    { date: nextThursday, label: `Bible Study: ${fmt(nextThursday)} at 7:30 PM — IN-PERSON at church (NOT online)` },
    { date: next1st, label: `Promise Service: ${fmt(next1st)} at 6:30 AM — IN-PERSON at church` },
    { date: next1stSat, label: `Fasting Prayer: ${fmt(next1stSat)} at 10:30 AM — IN-PERSON at church` },
    { date: next4thFri, label: `Night Prayer: ${fmt(next4thFri)} at 10:00 PM — IN-PERSON at church` },
  ];
  upcomingEvents.sort((a, b) => a.date.getTime() - b.date.getTime());

  const upcomingEventsStr = upcomingEvents
    .map((ev, i) => `${i + 1}. ${ev.label}`)
    .join('\n');

  return `You are Trinity Bot, the official AI assistant for Trinity Prayer House Madukkarai, Coimbatore, India.

CURRENT DATE & TIME (IST): ${currentDateTime}
TODAY IS: ${currentDay}

SERVICES TODAY: ${todayServicesStr}

═══ UPCOMING IN-PERSON SERVICES (sorted by nearest date first — ALWAYS present in this exact order) ═══
${upcomingEventsStr}

═══ DAILY ONLINE MEET (SEPARATE from the above in-person services) ═══
This is a DIFFERENT event from Bible Study or any other service listed above.
• Daily Online Meet via Google Meet: Every day at 9:00 PM IST
• Google Meet Link: https://meet.google.com/gct-xkdh-cni
Only share this link when the user asks about the "online meet", "Google Meet", "daily meet", or "9 PM meet". NEVER attach this link to Bible Study, Sunday Worship, or any other in-person service.

CRITICAL RULES:
- ONLY answer using the information provided below. NEVER make up or hallucinate any information.
- If you don't know something, say: "I don't have that information. Please contact us at ${phone} or ${email} for more details."
- Keep answers concise, polite, friendly, and helpful.
- Use plain markdown bold (**text**) for emphasis. Use line breaks for readability.
- When asked about upcoming events or next service dates, ALWAYS list them in the EXACT order shown above (nearest date first). Do NOT reorder them.
- When sharing maps, social media, Google Meet, WhatsApp, email, YouTube, Instagram, or website details, include the full clickable URL.
- NEVER mix up Bible Study with the Daily Online Meet. Bible Study is IN-PERSON at church on Thursdays at 7:30 PM. The Daily Online Meet is a SEPARATE event on Google Meet every day at 9:00 PM.

MEETING QUERY RULES (VERY IMPORTANT):
- When a user asks "is there a meeting today?", "any meeting tomorrow?", "next meeting?", or "upcoming meetings?" — ONLY list IN-PERSON services first. Do NOT mention the Daily Online Meet in your initial answer.
- If there are NO in-person services on the asked day (today/tomorrow), clearly say "There is no meeting today" or "There is no meeting tomorrow" FIRST.
- AFTER saying there is no in-person meeting, you may THEN add: "However, you can join our **Daily Online Prayer Meet** every day at 9:00 PM IST on Google Meet: https://meet.google.com/gct-xkdh-cni"
- If the user specifically asks about "online meet", "Google Meet", "daily meet", or "9 PM meet", THEN directly share the Google Meet details.
- The Daily Online Meet should NEVER be the primary answer to "is there a meeting today/tomorrow?" — it should only appear as a secondary option after stating whether any in-person service exists.

LANGUAGE TOLERANCE (VERY IMPORTANT):
- Many users type in broken English, Tanglish (Tamil + English mix), or with heavy spelling/grammar mistakes. You MUST try your best to understand and respond helpfully.
- Common misspellings to recognise: "servis" = service, "paster" / "pastur" = pastor, "chruch" / "chuch" = church, "worshp" = worship, "prayr" / "pryer" = prayer, "tims" / "timings" = times, "whr" / "wer" = where, "wen" = when, "wat" / "wht" = what, "evnts" / "evens" = events, "dirction" / "dirctn" = direction, "locaton" / "locatn" = location, "onlin" / "onlne" = online, "donaton" / "donasion" = donation, "contct" / "contac" = contact, "upcomng" = upcoming, "tomoro" / "tmrw" / "tomorow" = tomorrow, "ystrdy" = yesterday, "pls" / "plz" = please, "thx" / "thnks" = thanks, "hw" = how, "abt" = about, "giv" / "givng" = giving, "bibel" / "bibl" = bible, "fastin" / "fastng" = fasting, "nite" / "nght" = night.
- If a user message is unclear, make your best guess at what they mean based on context. Only ask for clarification as a last resort.
- Always reply in clear, proper English regardless of how the user types.

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
• Hindi Service: Every Sunday, 6:30 PM (at Divyodaya Inter-Religious Centre, Gopalapuram, Coimbatore)
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
YouTube: ${youtube}
Instagram: ${instagram}
WhatsApp: ${whatsapp}
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
  const [isMounted, setIsMounted] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesRef = useRef<Message[]>(messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('tph_chatbot_messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed.map((m: any) => ({ ...m, time: new Date(m.time) })));
          setShowSuggestions(false);
        }
      } catch (e) {
        console.error('Failed to parse saved chat messages', e);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('tph_chatbot_messages', JSON.stringify(messages));
    }
  }, [messages, isMounted]);

  // Keep ref in sync so handleSend always reads the latest context
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  const clearChat = () => {
    setMessages([]);
    setShowSuggestions(true);
    localStorage.removeItem('tph_chatbot_messages');
  };

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
                  <Image src="/sam-avatar-v3.webp" alt="Trinity Bot" width={40} height={40} className={styles.headerAvatar} />
                </div>
                <div>
                  <h4>Trinity Bot</h4>
                  <span>Online</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                {messages.length > 0 && (
                  <button onClick={clearChat} className={styles.closeBtn} aria-label="Clear chat" title="Clear chat">
                    <Trash2 size={16} />
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className={styles.closeBtn} aria-label="Close chat">
                  <X size={18} />
                </button>
              </div>
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
                    <Image src="/sam-avatar-v3.webp" alt="Trinity Bot" width={56} height={56} />
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
                      <Image src="/sam-avatar-v3.webp" alt="Trinity Bot" width={28} height={28} className={styles.msgAvatar} />
                    </div>
                  )}
                  <div className={styles.messageBubble}>
                    <div className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.botMsg}`}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
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
                    <Image src="/sam-avatar-v3.webp" alt="Trinity Bot" width={28} height={28} className={styles.msgAvatar} />
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
