import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hindi Ministry | Trinity Prayer House Madukkarai',
  description: 'Hindi Ministry at Trinity Prayer House Madukkarai — a welcoming spiritual home for Hindi-speaking believers in Coimbatore to worship, pray, and grow in faith in their mother tongue.',
  keywords: 'Hindi ministry Coimbatore, Hindi church Coimbatore, Hindi worship Madukkarai, Hindi believers Coimbatore, Trinity Prayer House Hindi',
  openGraph: {
    title: 'Hindi Ministry — Trinity Prayer House Madukkarai',
    description: 'Worship in your heart language. The Hindi Ministry at Trinity Prayer House provides a warm spiritual community for Hindi-speaking believers in Coimbatore.',
    images: [{ url: '/hindi_ministry_new.jpg', width: 1200, height: 630, alt: 'Trinity Hindi Ministry' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
