import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Vision — Trinity Prayer House Madukkarai | Tamil Christian Church Coimbatore',
  description: 'Discover the God-given vision of Trinity Prayer House Madukkarai — a house of prayer for all nations. One of the best Tamil Christian churches in Coimbatore, led by Pastor Vasanth Sathyanathan.',
  keywords: [
    'Trinity Prayer House vision', 'Tamil church vision Coimbatore', 'Christian church vision Madukkarai',
    'house of prayer Tamil Nadu', 'prayer house vision', 'Tamil church mission Coimbatore',
    'Pastor Vasanth Sathyanathan vision', 'gospel church vision Coimbatore',
    'Trinity Prayer House Madukkarai about', 'Tamil Christian community Coimbatore',
  ],
  alternates: { canonical: '/vision' },
  openGraph: {
    title: 'Our Vision | Trinity Prayer House Madukkarai — Tamil Church Coimbatore',
    description: 'A house of prayer for all nations — the vision and calling of Trinity Prayer House Madukkarai, Coimbatore.',
    url: '/vision',
  },
};

export default function VisionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
