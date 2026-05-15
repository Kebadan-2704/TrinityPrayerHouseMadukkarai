import { Metadata } from 'next';

export default function generateMetadata(): Metadata {
  return {
    title: 'Our Mission',
    description: 'Our mission at Trinity Prayer House Madukkarai: to spread the Gospel, make disciples, and serve our community with compassion and excellence.',
    alternates: { canonical: '/mission' },
    openGraph: {
      title: 'Our Mission | Trinity Prayer House Madukkarai',
      description: 'Empowering believers to reach their full potential in Christ.',
      url: '/mission',
      type: 'website',
    },
  };
}
