import { Metadata } from 'next';

export default function generateMetadata(): Metadata {
  return {
    title: 'Old Age Home Ministry',
    description: 'Providing care, love, and spiritual support for the elderly at Trinity Prayer House Madukkarai.',
    alternates: { canonical: '/ministries/oldage' },
    openGraph: {
      title: 'Old Age Home Ministry | Trinity Prayer House Madukkarai',
      description: 'A ministry of love, compassion, and dignified care for our elders.',
      url: '/ministries/oldage',
      type: 'website',
    },
  };
}
