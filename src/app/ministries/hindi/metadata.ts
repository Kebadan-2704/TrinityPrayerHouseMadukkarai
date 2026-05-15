import { Metadata } from 'next';

export default function generateMetadata(): Metadata {
  return {
    title: 'Hindi Ministry',
    description: 'Reaching the Hindi-speaking community of Coimbatore with worship and the Word in the heart language.',
    alternates: { canonical: '/ministries/hindi' },
    openGraph: {
      title: 'Hindi Ministry | Trinity Prayer House Madukkarai',
      description: 'Worship and fellowship in Hindi every Sunday at 7:00 PM.',
      url: '/ministries/hindi',
      type: 'website',
    },
  };
}
