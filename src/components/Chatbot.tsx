'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import Image from 'next/image';
import styles from './Chatbot.module.css';

type Message = {
  role: 'bot' | 'user';
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hello! I'm Sam from Trinity Prayer House. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Build context
    const recentMessages = messages.slice(-5);
    let promptString = "You are Sam, a friendly member of Trinity Prayer House in Madukkarai, Coimbatore. You are the AI assistant for the church website. You love helping people and answering questions about the church. Keep answers concise, polite, friendly, and helpful.\\n";
    recentMessages.forEach(m => {
      promptString += `${m.role === 'bot' ? 'Sam' : 'User'}: ${m.text}\\n`;
    });
    promptString += `User: ${userMessage}\\nSam:`;

    try {
      const url = `https://chatbot.codexapi.workers.dev/?prompt=${encodeURIComponent(promptString)}&model=gpt-5.1`;
      const res = await fetch(url);
      const data = await res.json();
      
      let answer = data?.answer || "I'm having trouble connecting right now. Please try again later.";
      
      setMessages(prev => [...prev, { role: 'bot', text: answer }]);
    } catch (error) {
      console.error("Chat API error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I couldn't process that request right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatWrapper}>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.chatHeader}>
              <div className={styles.headerTitle}>
                <div className={styles.headerIconWrap}>
                  <Image src="/sam-avatar-v3.png" alt="Sam" width={38} height={38} className={styles.headerAvatar} />
                </div>
                <div>
                  <h4>Sam</h4>
                  <span>Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className={styles.closeBtn} aria-label="Close chat">
                <X size={18} />
              </button>
            </div>
            
            <div className={styles.chatBody}>
              {messages.map((msg, i) => (
                <div key={i} className={`${styles.messageWrap} ${msg.role === 'user' ? styles.userWrap : styles.botWrap}`}>
                  {msg.role === 'bot' && (
                    <div className={styles.avatar}>
                      <Image src="/sam-avatar-v3.png" alt="Sam" width={28} height={28} className={styles.msgAvatar} />
                    </div>
                  )}
                  <div className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.botMsg}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={`${styles.messageWrap} ${styles.botWrap}`}>
                  <div className={styles.avatar}>
                    <Image src="/sam-avatar-v3.png" alt="Sam" width={28} height={28} className={styles.msgAvatar} />
                  </div>
                  <div className={`${styles.message} ${styles.botMsg} ${styles.loadingMsg}`}>
                    <Loader2 size={16} className={styles.spinner} />
                    <span>Typing...</span>
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
                placeholder="Ask Sam anything..." 
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
      >
        {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
      </motion.button>
    </div>
  );
}
