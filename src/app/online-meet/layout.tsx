import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Meeting | Trinity Prayer House Madukkarai — Daily Prayer',
  description: 'Join the daily online prayer meeting at Trinity Prayer House Madukkarai via Google Meet. Morning and evening prayer sessions open to all believers from anywhere in the world.',
  keywords: 'online prayer meeting Trinity Prayer House, daily prayer Coimbatore online, Google Meet church prayer, Trinity Prayer House live prayer',
  openGraph: {
    title: 'Online Prayer Meeting — Trinity Prayer House Madukkarai',
    description: 'Join us online for daily prayer and fellowship. Connect with our prayer community from anywhere in the world through Google Meet.',
    images: [{ url: '/hero-bg.jpg', width: 1200, height: 630, alt: 'Trinity Prayer House Online Meeting' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
