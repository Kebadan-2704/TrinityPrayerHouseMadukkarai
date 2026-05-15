import { Metadata } from 'next';

export default function generateMetadata(): Metadata {
  return {
    title: 'Special Meetings | Trinity Prayer House',
    description: 'View upcoming and past special meetings at Trinity Prayer House Madukkarai with photos and sermon videos.',
    alternates: { canonical: '/special-meeting' },
    openGraph: {
      title: 'Special Meetings | Trinity Prayer House Madukkarai',
      description: 'Join us for special gatherings and divine encounters throughout the year.',
      url: '/special-meeting',
      type: 'website',
    },
  };
}