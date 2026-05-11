import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Here? | Trinity Prayer House Madukkarai',
  description: 'Planning a visit to Trinity Prayer House? Here is everything you need to know about what to expect, service times, and our community.',
  openGraph: {
    title: 'New Here? — Trinity Prayer House',
    description: 'Welcome to our family. Find out what to expect when you visit us in Madukkarai.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
