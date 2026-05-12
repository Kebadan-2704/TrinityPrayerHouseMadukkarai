import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Trinity Prayer House Madukkarai',
  description: 'Get in touch with Trinity Prayer House Madukkarai. Visit us at 16/300, Gandhi Nagar, Madukkarai, Coimbatore - 641105. Call +91 9786888999 or send us a message.',
  openGraph: {
    title: 'Contact — Trinity Prayer House',
    description: 'Reach out to our pastoral team for prayer, guidance, or any questions about Trinity Prayer House.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
