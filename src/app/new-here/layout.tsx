import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Here? Visit Trinity Prayer House — Best Tamil Church in Coimbatore Madukkarai',
  description: 'Visiting Trinity Prayer House Madukkarai for the first time? The best Tamil Christian church in Coimbatore. Led by Pastor Vasanth Sathyanathan. Service times, what to expect, and how to connect.',
  keywords: [
    'visit Tamil church Coimbatore', 'visit Tamil church Madukkarai',
    'visit Tamil church Madukkarai Coimbatore', 'visit Tamil church Coimbatore Madukkarai',
    'new to church Madukkarai', 'new to church Coimbatore',
    'new to church Madukkarai Coimbatore', 'new to church Coimbatore Madukkarai',
    'join church Coimbatore', 'join church Madukkarai',
    'join church Coimbatore Madukkarai', 'join church Madukkarai Coimbatore',
    'best Tamil church to visit Coimbatore', 'best Tamil church to visit Madukkarai',
    'best Tamil church to visit Madukkarai Coimbatore',
    'Trinity Prayer House first visit', 'first time visit church Coimbatore',
    'first time visit church Madukkarai',
    'church service times Madukkarai', 'church service times Coimbatore',
    'church service times Madukkarai Coimbatore', 'church service times Coimbatore Madukkarai',
    'Christian church for newcomers Coimbatore', 'Christian church for newcomers Madukkarai',
    'Tamil church Sunday service Coimbatore', 'Tamil church Sunday service Madukkarai',
    'Tamil church Sunday service Madukkarai Coimbatore',
    'welcome to church Madukkarai', 'welcome to church Coimbatore',
    'church community Coimbatore', 'church community Madukkarai',
    'church community Coimbatore Madukkarai',
    'join Trinity Prayer House Madukkarai', 'join Trinity Prayer House Coimbatore',
    'Sunday church Coimbatore Madukkarai', 'Sunday church Madukkarai Coimbatore',
  ],
  alternates: { canonical: '/new-here' },
  openGraph: {
    title: 'New Here? | Trinity Prayer House Madukkarai — Best Tamil Church Coimbatore',
    description: 'Planning your first visit to the best Tamil Christian church in Coimbatore? Everything you need to know about Trinity Prayer House Madukkarai.',
    url: '/new-here',
  },
};

export default function NewHereLayout({ children }: { children: React.ReactNode }) {
  return children;
}
