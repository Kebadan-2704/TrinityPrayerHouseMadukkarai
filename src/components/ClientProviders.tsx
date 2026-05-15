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

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <SplashScreen />
      <AmbientSiteBackground />
      <LangPicker />
      <Navbar />
      <MeetNotifier />
      <main className="site-main" id="main-content">{children}</main>
      <Footer />
      <WhatsAppButton />
      <Chatbot />
    </LangProvider>
  );
}
