import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Trinity Prayer House — Our History & Calling',
  description: 'Learn about Trinity Prayer House Madukkarai — founded in 1976 by Pastor D.A. Sathyanathan. Now led by Senior Pastor Vasanth Sathyanathan in Coimbatore.',
  openGraph: {
    title: 'About Trinity Prayer House Madukkarai',
    description: 'A legacy of prayer since 1976. Building a house of prayer for all nations at the foothill of Madukkarai.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
