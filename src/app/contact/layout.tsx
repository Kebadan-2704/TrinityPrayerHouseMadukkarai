import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Trinity Prayer House Madukkarai, Coimbatore',
  description: 'Contact Trinity Prayer House Madukkarai — the best Tamil Christian church in Coimbatore. Find our address, phone number, email, and visit us. Pastor Vasanth Sathyanathan.',
  keywords: [
    'Trinity Prayer House contact', 'Trinity Prayer House address',
    'Trinity Prayer House Madukkarai address', 'Trinity Prayer House Coimbatore address',
    'Trinity Prayer House Madukkarai Coimbatore contact',
    'church address Madukkarai', 'church address Coimbatore',
    'church address Madukkarai Coimbatore', 'church address Coimbatore Madukkarai',
    'Madukkarai church contact', 'Coimbatore church contact',
    'Madukkarai Coimbatore church contact', 'Coimbatore Madukkarai church contact',
    'Tamil church address Coimbatore', 'Tamil church address Madukkarai',
    'Tamil church address Madukkarai Coimbatore', 'Tamil church address Coimbatore Madukkarai',
    'Pastor Vasanth Sathyanathan contact', 'Vasanth Sathyanathan contact Coimbatore',
    'Trinity Prayer House location', 'Trinity Prayer House location Madukkarai',
    'Trinity Prayer House location Coimbatore',
    'visit church Madukkarai', 'visit church Coimbatore',
    'visit church Madukkarai Coimbatore', 'visit church Coimbatore Madukkarai',
    'church phone number Coimbatore', 'church phone number Madukkarai',
    'Christian church Madukkarai address', 'Christian church Coimbatore address',
    'how to reach Trinity Prayer House', 'directions to Trinity Prayer House Madukkarai',
    'church directions Coimbatore Madukkarai', 'Gandhi Nagar Madukkarai church',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Trinity Prayer House | Madukkarai, Coimbatore',
    description: 'Reach Trinity Prayer House Madukkarai — address, phone, email and social media. Best Tamil Christian church in Coimbatore.',
    url: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
