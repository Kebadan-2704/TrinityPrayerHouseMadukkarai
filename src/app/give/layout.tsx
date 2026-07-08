import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Give & Support — Trinity Prayer House Madukkarai | Tamil Church Coimbatore',
  description: 'Support the gospel mission of Trinity Prayer House Madukkarai — the best Tamil Christian church in Coimbatore. Partner with Pastor Vasanth Sathyanathan in spreading Christ\'s love across Tamil Nadu.',
  keywords: [
    'support Tamil church Coimbatore', 'donate Christian church Madukkarai',
    'Trinity Prayer House giving', 'church donation Coimbatore', 'support gospel Tamil Nadu',
    'give to church Madukkarai', 'support Pastor Vasanth Sathyanathan ministry',
    'Tamil church offering Coimbatore', 'Christian church fundraising Tamil Nadu',
  ],
  alternates: { canonical: '/give' },
  openGraph: {
    title: 'Give & Support | Trinity Prayer House — Tamil Church Madukkarai Coimbatore',
    description: 'Support the mission of Trinity Prayer House Madukkarai — the best Tamil Christian church in Coimbatore.',
    url: '/give',
  },
};

export default function GiveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
