import { Metadata } from 'next';

export default function generateMetadata(): Metadata {
  return {
    title: 'Branch Churches',
    description: 'Expanding the Kingdom of God through our network of local branch churches — spreading the Gospel to villages and communities.',
    alternates: { canonical: '/ministries/branches' },
    openGraph: {
      title: 'Branch Churches | Trinity Prayer House Madukkarai',
      description: 'Extending the Gospel to neighboring villages through local branch churches.',
      url: '/ministries/branches',
      type: 'website',
    },
  };
}
