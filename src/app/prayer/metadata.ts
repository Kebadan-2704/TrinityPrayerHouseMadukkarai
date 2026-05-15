import { Metadata } from 'next';

export default function generateMetadata(): Metadata {
  return {
    title: 'Prayer Request',
    description: 'Share your prayer need with the intercessory team at Trinity Prayer House Madukkarai. We are here to stand with you in prayer.',
    alternates: { canonical: '/prayer' },
    openGraph: {
      title: 'Prayer Request | Trinity Prayer House Madukkarai',
      description: 'Submit your prayer request — our team will be praying for you.',
      url: '/prayer',
      type: 'website',
    },
  };
}
