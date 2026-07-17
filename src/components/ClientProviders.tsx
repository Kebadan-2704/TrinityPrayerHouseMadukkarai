'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { LangProvider } from './LangContext';
import LangPicker from './LangPicker';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './ui/WhatsAppButton';
import BackToTop from './ui/BackToTop';
import { Toaster } from 'sonner';

// Lazy-load heavy/decorative components that aren't needed at first paint
const Chatbot = dynamic(() => import('./Chatbot'), { ssr: false });
const MeetNotifier = dynamic(() => import('./MeetNotifier'), { ssr: false });

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <Toaster position="bottom-center" toastOptions={{ style: { background: 'var(--surface-elevated)', color: 'var(--text-primary)', border: '1px solid var(--border)' } }} />
      <LangPicker />
      <Navbar />
      <MeetNotifier />
      <main className="site-main" id="main-content">{children}</main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <Chatbot />
    </LangProvider>
  );
}

