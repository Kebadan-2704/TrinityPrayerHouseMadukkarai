import { Metadata } from 'next';

export default function generateMetadata(): Metadata {
  return {
    title: 'Women\'s Ministry',
    description: 'Equipping and encouraging women to grow in faith, leadership, and community at Trinity Prayer House Madukkarai.',
    alternates: { canonical: '/ministries/womens' },
    openGraph: {
      title: 'Women\'s Ministry | Trinity Prayer House Madukkarai',
      description: 'A place of faith, encouragement, and genuine fellowship for women of all ages.',
      url: '/ministries/womens',
      type: 'website',
    },
  };
}
