import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Mission | Trinity Prayer House',
  description: 'Learn about the mission and purpose of Trinity Prayer House Madukkarai.',
  openGraph: {
    title: 'Mission of Trinity Prayer House',
    description: 'Empowering believers to reach their full potential in Christ.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
