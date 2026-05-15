import { Metadata } from 'next';

export default function generateMetadata(): Metadata {
  return {
    title: 'Men\'s Ministry',
    description: 'Empowering men to lead with faith, character, and purpose in their families, church, and community at Trinity Prayer House Madukkarai.',
    alternates: { canonical: '/ministries/mens' },
    openGraph: {
      title: 'Men\'s Ministry | Trinity Prayer House Madukkarai',
      description: 'A brotherhood of faith building men of character and purpose.',
      url: '/ministries/mens',
      type: 'website',
    },
  };
}
