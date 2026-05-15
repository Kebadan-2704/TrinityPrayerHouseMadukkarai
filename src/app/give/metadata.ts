import { Metadata } from 'next';

export default function generateMetadata(): Metadata {
  return {
    title: 'Giving',
    description: 'Worship through giving at Trinity Prayer House Madukkarai. Give via bank transfer (NEFT/IMPS), UPI/GPay, or in-person offering.',
    alternates: { canonical: '/give' },
    openGraph: {
      title: 'Giving | Trinity Prayer House Madukkarai',
      description: 'Your generosity helps us continue our ministry in Madukkarai and reach the unreached.',
      url: '/give',
      type: 'website',
    },
  };
}
