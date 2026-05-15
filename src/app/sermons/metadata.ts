import { Metadata } from 'next';

export default function generateMetadata(): Metadata {
  return {
    title: 'Sermons & Messages',
    description: 'Watch the latest messages from Pastor Vasanth Sathyanathan and the Trinity Prayer House team. Sunday services, revival nights, and special teachings.',
    alternates: { canonical: '/sermons' },
    openGraph: {
      title: 'Sermons & Messages | Trinity Prayer House Madukkarai',
      description: 'Stream the latest worship services and messages from Trinity Prayer House.',
      url: '/sermons',
      type: 'website',
    },
  };
}
