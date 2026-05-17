'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import Image from 'next/image';
import styles from './Chatbot.module.css';


// Monotonic counter for stable message IDs — avoids calling impure functions during render
let _nextMsgId = 0;
const nextMsgId = () => (++_nextMsgId).toString(36);

// ── Build system prompt with all church info in one place ──────────────────────
function buildSystemPrompt(): string {
  const address    = process.env.NEXT_PUBLIC_CHURCH_ADDRESS    ?? '16/300, Gandhi Nagar, Madukkarai, Coimbatore - 641105';
  const phone      = process.env.NEXT_PUBLIC_CHURCH_PHONE      ?? '+91 9786888999';
  const email      = process.env.NEXT_PUBLIC_CHURCH_EMAIL      ?? 'trinityprayerhouse.mdk@gmail.com';
  const youtube    = process.env.NEXT_PUBLIC_CHURCH_YOUTUBE    ?? '@Pas.Vasanth';
  const instagram  = process.env.NEXT_PUBLIC_CHURCH_INSTAGRAM  ?? '@trinityprayerhouse_church';

  return `You are Trinity Bot, a friendly AI assistant for Trinity Prayer House in Madukkarai, Coimbatore, India.
Keep answers concise, polite, friendly, and helpful. Use plain markdown formatting only (bold with **text**).

Here is important church info you should know:
Promise Service: 1st of every month, 6:30 AM
Sunday Worship (Tamil): Every Sunday, 9:30 AM
Hindi Service: Every Sunday, 6:30 PM
Bible Study: Every Thursday, 7:30 PM
Online Meet (Google Meet): Daily, 9:00 PM IST
Fasting Prayer: 1st Saturday of every month, 10:30 AM
Night Prayer: 4th Friday of every month, 10:00 PM
Address: ${address}
Phone / WhatsApp: ${phone}
Email: ${email}
YouTube: ${youtube}
Instagram: ${instagram}`;
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

// ── Types ──────────────────────────────────────────────────────────────────
interface Message {
  role: 'bot' | 'user';
  text: string;
  _id: string;
}

// ── Chatbot ────────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hello! I'm Trinity Bot from Trinity Prayer House. How can I help you today?", _id: nextMsgId() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef<Message[]>(messages);  // keeps latest messages for send
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Keep ref in sync so handleSend always reads the latest context
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage, _id: nextMsgId() }]);
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
        },
      ]);
      return;
    }
    setMessages(prev => [...prev, { role: 'bot', text: answer, _id: nextMsgId() }]);
    } catch (error) {
      console.error('Chat API error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I couldn't process that request right now.", _id: nextMsgId() }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  const containerRef = useFocusTrap(isOpen);

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
            <div className={styles.chatHeader}>
              <div className={styles.headerTitle}>
                <div className={styles.headerIconWrap}>
                  <Image src="/sam-avatar-v3.png" alt="Trinity Bot" width={38} height={38} className={styles.headerAvatar} />
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

            <div className={styles.chatBody}>
              {messages.map((msg) => (
                <div key={msg._id} className={`${styles.messageWrap} ${msg.role === 'user' ? styles.userWrap : styles.botWrap}`}>
                  {msg.role === 'bot' && (
                    <div className={styles.avatar}>
                      <Image src="/sam-avatar-v3.png" alt="Trinity Bot" width={28} height={28} className={styles.msgAvatar} />
                    </div>
                  )}
                  <div className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.botMsg}`}>
                    {msg.text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={index}>{part.slice(2, -2)}</strong>;
                      }
                      return <span key={index}>{part}</span>;
                    })}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={`${styles.messageWrap} ${styles.botWrap}`}>
                  <div className={styles.avatar}>
                    <Image src="/sam-avatar-v3.png" alt="Trinity Bot" width={28} height={28} className={styles.msgAvatar} />
                  </div>
                  <div className={`${styles.message} ${styles.botMsg} ${styles.loadingMsg}`}>
                    <Loader2 size={16} className={styles.spinner} />
                    <span>Typing…</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className={styles.chatInputArea}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask Trinity Bot anything…"
                className={styles.inputField}
              />
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
