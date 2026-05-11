import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Ministries | Trinity Prayer House Madukkarai',
  description: 'Explore the ministries of Trinity Prayer House — Youth, Kids, Prayer, and Women\'s Ministry. Serving God and our community in Coimbatore.',
  openGraph: {
    title: 'Ministries — Trinity Prayer House',
    description: 'Discover how we serve God and our community across different ministry areas.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
