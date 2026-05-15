import { Metadata } from 'next';

export default function generateMetadata(): Metadata {
  return {
    title: 'Daily Online Meet',
    description: 'Join Trinity Prayer House Madukkarai for our daily online Google Meet at 9:00 PM IST — prayer, worship, and the Word from anywhere.',
    alternates: { canonical: '/online-meet' },
    openGraph: {
      title: 'Daily Online Meet | Trinity Prayer House Madukkarai',
      description: 'Join us every day at 9:00 PM IST for virtual prayer and worship.',
      url: '/online-meet',
      type: 'website',
    },
  };
}
