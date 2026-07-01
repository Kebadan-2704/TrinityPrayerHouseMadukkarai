'use client';

import { ReactNode } from 'react';
import { LangProvider } from './LangContext';
import LangPicker from './LangPicker';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './ui/WhatsAppButton';
import AmbientSiteBackground from './ui/AmbientSiteBackground';
import Chatbot from './Chatbot';
import SplashScreen from './ui/SplashScreen';
import MeetNotifier from './MeetNotifier';
import BackToTop from './ui/BackToTop';
import { Toaster } from 'sonner';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <Toaster position="bottom-center" toastOptions={{ style: { background: 'var(--surface-elevated)', color: 'var(--text-primary)', border: '1px solid var(--border)' } }} />
      <SplashScreen />
      <AmbientSiteBackground />
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
