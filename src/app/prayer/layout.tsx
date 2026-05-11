import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prayer Request | Trinity Prayer House Madukkarai',
  description: 'Submit your prayer requests. Our intercessory prayer team at Trinity Prayer House is ready to stand in faith with you.',
  openGraph: {
    title: 'Prayer Requests — Trinity Prayer House',
    description: 'Let us pray for you. Share your needs with our prayer team.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
