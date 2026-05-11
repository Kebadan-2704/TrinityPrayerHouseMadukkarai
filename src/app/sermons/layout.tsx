import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sermons & Messages | Trinity Prayer House Madukkarai',
  description: 'Watch the latest sermons, worship services, and Bible study messages from Pastor Vasanth Sathyanathan at Trinity Prayer House Madukkarai, Coimbatore.',
  openGraph: {
    title: 'Sermons — Trinity Prayer House',
    description: 'Catch up on Sunday services, mid-week Bible studies, and special messages from Trinity Prayer House.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
