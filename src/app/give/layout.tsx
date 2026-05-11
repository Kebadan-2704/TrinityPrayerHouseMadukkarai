import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Give | Trinity Prayer House — Worship Through Giving',
  description: 'Partner with Trinity Prayer House Madukkarai through tithes, offerings, and donations. Bank transfer, UPI, and in-person giving options available.',
  openGraph: {
    title: 'Giving — Trinity Prayer House',
    description: 'Your generosity helps us continue ministry in Madukkarai and reach the unreached.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
