import { Metadata } from 'next';

export default function generateMetadata(): Metadata {
  return {
    title: 'Our Vision & History',
    description: 'Discover the history and calling of Trinity Prayer House Madukkarai — founded in 1976 by Pastor D.A. Sathyanathan, now led by Senior Pastor Vasanth Sathyanathan.',
    alternates: { canonical: '/vision' },
    openGraph: {
      title: 'Our Vision & History | Trinity Prayer House Madukkarai',
      description: 'A legacy of prayer, faith, and service spanning 50 years at the foothill of Madukkarai.',
      url: '/vision',
      type: 'website',
    },
  };
}
