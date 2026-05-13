'use client';

import { ReactNode } from 'react';
import { LangProvider } from './LangContext';
import LangPicker from './LangPicker';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './ui/WhatsAppButton';
import AmbientSiteBackground from './ui/AmbientSiteBackground';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <AmbientSiteBackground />
      <LangPicker />
      <Navbar />
      <main className="site-main">{children}</main>
      <Footer />
      <WhatsAppButton />
    </LangProvider>
  );
}
