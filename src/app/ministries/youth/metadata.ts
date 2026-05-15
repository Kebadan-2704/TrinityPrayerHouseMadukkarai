import { Metadata } from 'next';

export default function generateMetadata(): Metadata {
  return {
    title: 'Youth Ministry',
    description: 'Empowering young people to discover their identity in Christ through worship, fellowship, and discipleship at Trinity Prayer House Madukkarai.',
    alternates: { canonical: '/ministries/youth' },
    openGraph: {
      title: 'Youth Ministry | Trinity Prayer House Madukkarai',
      description: 'A vibrant Christ-centered community for young people growing in faith.',
      url: '/ministries/youth',
      type: 'website',
    },
  };
}
