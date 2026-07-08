import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hindi Ministry — Hindi Christian Church Coimbatore Madukkarai | Trinity Prayer House',
  description: 'Hindi Ministry at Trinity Prayer House Madukkarai, Coimbatore — worship, prayer, and teaching in Hindi for Hindi-speaking believers. Best Hindi church in Coimbatore Madukkarai.',
  keywords: [
    'Hindi church Coimbatore', 'Hindi church Madukkarai', 'Hindi church Coimbatore Madukkarai',
    'Hindi Christian church Coimbatore', 'Hindi Christian church Madukkarai',
    'Hindi speaking church Coimbatore', 'Hindi speaking church Madukkarai',
    'Hindi worship Coimbatore', 'Hindi worship Madukkarai',
    'Hindi ministry Tamil Nadu', 'Hindi ministry Coimbatore', 'Hindi ministry Madukkarai',
    'Hindi prayer Coimbatore', 'Hindi prayer Madukkarai',
    'best Hindi church Coimbatore', 'best Hindi church Madukkarai',
    'Hindi church near me Coimbatore', 'church for Hindi speakers Coimbatore',
    'Trinity Prayer House Hindi ministry', 'Hindi fellowship Coimbatore',
    'North Indian church Coimbatore', 'North Indian Christian church Madukkarai',
  ],
  alternates: { canonical: '/ministries/hindi' },
  openGraph: {
    title: 'Hindi Ministry | Trinity Prayer House — Tamil Church Coimbatore Madukkarai',
    description: 'Hindi Christian worship and ministry at Trinity Prayer House Madukkarai, Coimbatore — best Hindi church in Coimbatore Madukkarai.',
    url: '/ministries/hindi',
  },
};

export default function HindiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
