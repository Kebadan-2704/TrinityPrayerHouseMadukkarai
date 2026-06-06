import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Special Meetings | Trinity Prayer House Madukkarai',
  description: 'Special meetings, conventions, and prayer gatherings at Trinity Prayer House Madukkarai. View our gallery of Spirit-filled special services, conferences, and outreach events in Coimbatore.',
  keywords: 'special meetings Coimbatore church, convention Trinity Prayer House, prayer conference Coimbatore, Trinity Prayer House special service, Madukkarai church events',
  openGraph: {
    title: 'Special Meetings — Trinity Prayer House Madukkarai',
    description: 'Relive the powerful moments from our special conventions, prayer conferences, and outreach events at Trinity Prayer House Madukkarai.',
    images: [{ url: '/hero-bg.jpg', width: 1200, height: 630, alt: 'Trinity Prayer House Special Meetings' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
