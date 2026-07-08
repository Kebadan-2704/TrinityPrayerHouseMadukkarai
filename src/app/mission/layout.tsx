import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Mission — Trinity Prayer House Madukkarai | Best Tamil Church Coimbatore',
  description: 'The mission of Trinity Prayer House Madukkarai — reaching the lost, making disciples, and serving Coimbatore with Christ\'s love. Best Tamil Christian church in Coimbatore. Pastor Vasanth Sathyanathan.',
  keywords: [
    'Trinity Prayer House mission', 'Tamil church mission Coimbatore', 'Christian mission Madukkarai',
    'gospel outreach Coimbatore', 'discipleship Tamil church', 'Tamil church community service Coimbatore',
    'reaching lost Coimbatore', 'Christian church mission Tamil Nadu', 'Pastor Vasanth Sathyanathan mission',
    'best Tamil church mission Coimbatore', 'Tamil church evangelism Coimbatore',
  ],
  alternates: { canonical: '/mission' },
  openGraph: {
    title: 'Our Mission | Trinity Prayer House Madukkarai — Tamil Church Coimbatore',
    description: 'Reaching the lost, making disciples, and serving Coimbatore — the mission of Trinity Prayer House Madukkarai.',
    url: '/mission',
  },
};

export default function MissionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
