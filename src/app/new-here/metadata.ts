import { Metadata } from 'next';

export default function generateMetadata(): Metadata {
  return {
    title: 'New Here?',
    description: 'Planning your first visit to Trinity Prayer House Madukkarai? Here is everything you need to know.',
    alternates: { canonical: '/new-here' },
    openGraph: {
      title: 'New Here? | Trinity Prayer House Madukkarai',
      description: 'We are glad you are here. Here is everything you need to know for your first visit.',
      url: '/new-here',
      type: 'website',
    },
  };
}