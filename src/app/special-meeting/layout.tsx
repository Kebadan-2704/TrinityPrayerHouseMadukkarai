import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Special Meetings & Events — Tamil Church Coimbatore | Trinity Prayer House',
  description: 'Attend special meetings, revival services, conferences, and events at Trinity Prayer House Madukkarai — the best Tamil Christian church in Coimbatore. Led by Pastor Vasanth Sathyanathan.',
  keywords: [
    'Tamil church special meeting Coimbatore', 'Christian revival meeting Madukkarai',
    'Tamil church conference Coimbatore', 'church events Coimbatore', 'Trinity Prayer House events',
    'Tamil revival service Tamil Nadu', 'Pastor Vasanth special meeting', 'church retreat Coimbatore',
    'Tamil church celebration Coimbatore', 'Christian conference Madukkarai', 'gospel meeting Coimbatore',
  ],
  alternates: { canonical: '/special-meeting' },
  openGraph: {
    title: 'Special Meetings | Trinity Prayer House — Tamil Church Coimbatore',
    description: 'Revivals, conferences, and special events at Trinity Prayer House Madukkarai, the best Tamil Christian church in Coimbatore.',
    url: '/special-meeting',
  },
};

export default function SpecialMeetingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
