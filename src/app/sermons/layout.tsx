import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sermons & Messages — Tamil Christian Preaching | Trinity Prayer House',
  description: 'Watch Tamil Christian sermons and spirit-filled messages by Pastor Vasanth Sathyanathan of Trinity Prayer House Madukkarai, Coimbatore. Best Tamil church sermons online.',
  keywords: [
    'Tamil sermons Coimbatore', 'Tamil sermons Madukkarai',
    'Tamil sermons Coimbatore Madukkarai', 'Tamil sermons Madukkarai Coimbatore',
    'Tamil Christian sermons', 'Tamil Christian sermons Coimbatore', 'Tamil Christian sermons Madukkarai',
    'Pastor Vasanth Sathyanathan sermons', 'Pastor Vasanth sermons Coimbatore', 'Pastor Vasanth sermons Madukkarai',
    'Trinity Prayer House sermons', 'Trinity Prayer House sermons Coimbatore', 'Trinity Prayer House sermons Madukkarai',
    'Madukkarai church sermons', 'Coimbatore church sermons',
    'Madukkarai Coimbatore church sermons', 'Coimbatore Madukkarai church sermons',
    'Tamil church preaching Coimbatore', 'Tamil church preaching Madukkarai',
    'Tamil church preaching Madukkarai Coimbatore',
    'Christian sermons Tamil', 'spirit filled sermons Tamil',
    'gospel messages Tamil Coimbatore', 'gospel messages Tamil Madukkarai',
    'Tamil church messages Madukkarai', 'Tamil church messages Coimbatore',
    'Tamil church messages Coimbatore Madukkarai',
    'Vasanth Sathyanathan messages', 'online Tamil church sermons Coimbatore',
    'online Tamil church sermons Madukkarai', 'Tamil preaching online Coimbatore',
  ],
  alternates: { canonical: '/sermons' },
  openGraph: {
    title: 'Tamil Christian Sermons | Trinity Prayer House Madukkarai',
    description: 'Spirit-filled Tamil sermons and messages by Pastor Vasanth Sathyanathan — Trinity Prayer House Madukkarai, Coimbatore.',
    url: '/sermons',
  },
};

export default function SermonLayout({ children }: { children: React.ReactNode }) {
  return children;
}
