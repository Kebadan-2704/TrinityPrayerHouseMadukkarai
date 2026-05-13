'use client';

import { ReactNode } from 'react';
import { LangProvider } from './LangContext';
import LangPicker from './LangPicker';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './ui/WhatsAppButton';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <LangPicker />
      <Navbar />
      <main className="site-main">{children}</main>
      <Footer />
      <WhatsAppButton />
    </LangProvider>
  );
}
