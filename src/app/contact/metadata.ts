import { Metadata } from 'next';

export default function generateMetadata(): Metadata {
  return {
    title: 'Contact Us',
    description: 'Get in touch with Trinity Prayer House Madukkarai. Call, WhatsApp, email, or send us a message. We are here to serve you.',
    alternates: { canonical: '/contact' },
    openGraph: {
      title: 'Contact Us | Trinity Prayer House Madukkarai',
      description: 'Reach out for prayer, questions, or to plan your visit to Trinity Prayer House.',
      url: '/contact',
      type: 'website',
    },
  };
}
