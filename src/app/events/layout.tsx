import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upcoming Events | Trinity Prayer House Madukkarai',
  description: 'View upcoming church events, Bible studies, youth gatherings, and special services at Trinity Prayer House Madukkarai, Coimbatore.',
  openGraph: {
    title: 'Events — Trinity Prayer House',
    description: 'Join us for worship, fellowship, and community events at Trinity Prayer House Madukkarai.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
