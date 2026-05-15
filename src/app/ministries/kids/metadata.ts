import { Metadata } from 'next';

export default function generateMetadata(): Metadata {
  return {
    title: 'Kids Ministry',
    description: 'Building a strong foundation of faith for the next generation through Sunday School and Vacation Bible School at Trinity Prayer House Madukkarai.',
    alternates: { canonical: '/ministries/kids' },
    openGraph: {
      title: 'Kids Ministry | Trinity Prayer House Madukkarai',
      description: 'A fun and safe environment where children learn about God\'s love.',
      url: '/ministries/kids',
      type: 'website',
    },
  };
}
