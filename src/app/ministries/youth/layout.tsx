import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Youth Ministry — Tamil Christian Youth Church Coimbatore | Trinity Prayer House',
  description: 'Tamil Christian youth ministry at Trinity Prayer House Madukkarai, Coimbatore. Empowering young people in faith, worship, and community. Best youth church in Coimbatore Madukkarai.',
  keywords: [
    'Tamil youth church Coimbatore', 'Christian youth ministry Madukkarai', 'youth church Coimbatore',
    'young adults Tamil church', 'church youth group Coimbatore', 'Trinity Prayer House youth',
    'Christian youth Tamil Nadu', 'youth prayer Coimbatore', 'Tamil youth fellowship Coimbatore',
    'best youth ministry Coimbatore', 'youth church Madukkarai',
  ],
  alternates: { canonical: '/ministries/youth' },
  openGraph: {
    title: 'Youth Ministry | Trinity Prayer House — Tamil Church Coimbatore',
    description: 'Tamil Christian youth ministry at Trinity Prayer House Madukkarai, Coimbatore — empowering young people in faith.',
    url: '/ministries/youth',
  },
};

export default function YouthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
