import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "New Here? | Trinity Prayer House Madukkarai — Welcome",
  description: 'New to Trinity Prayer House Madukkarai? Find out what to expect when you visit, learn about our service times, location in Madukkarai, Coimbatore, and how to get connected with our community.',
  keywords: 'new to Trinity Prayer House, first time visitor Coimbatore church, Madukkarai church visit, what to expect church Coimbatore, Trinity Prayer House welcome',
  openGraph: {
    title: 'New Here? Welcome to Trinity Prayer House Madukkarai',
    description: "We're so glad you're here! Find everything you need to plan your first visit to Trinity Prayer House in Madukkarai, Coimbatore.",
    images: [{ url: '/slide-4.jpg', width: 1200, height: 630, alt: 'Welcome to Trinity Prayer House Madukkarai' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
