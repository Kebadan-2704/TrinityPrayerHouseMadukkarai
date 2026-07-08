import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Prayer Meeting — Tamil Church Live | Trinity Prayer House Coimbatore',
  description: 'Join the daily online prayer meeting of Trinity Prayer House Madukkarai at 9:00 PM IST. Tamil Christian worship and prayer live from Coimbatore. Led by Pastor Vasanth Sathyanathan.',
  keywords: [
    'online Tamil church prayer', 'Tamil church online Coimbatore', 'Trinity Prayer House online meeting',
    'Christian prayer meeting online Tamil', 'live prayer Tamil Nadu', 'Tamil church live worship',
    'online church Madukkarai', 'Pastor Vasanth online prayer', 'Tamil church Google Meet',
    'join Tamil church online', 'nightly prayer meeting Tamil', 'online prayer Coimbatore',
  ],
  alternates: { canonical: '/online-meet' },
  openGraph: {
    title: 'Online Prayer Meeting | Trinity Prayer House — Tamil Church Coimbatore',
    description: 'Join daily online prayer at 9:00 PM IST with Trinity Prayer House Madukkarai. Tamil Christian worship from Coimbatore.',
    url: '/online-meet',
  },
};

export default function OnlineMeetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
