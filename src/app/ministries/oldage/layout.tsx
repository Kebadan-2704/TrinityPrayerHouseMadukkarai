import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Old Age Home Ministry | Trinity Prayer House Madukkarai',
  description: 'Old Age Home Ministry at Trinity Prayer House Madukkarai — bringing the love of Christ, joy, prayer, and practical care to elderly residents in Coimbatore through regular visits and outreach.',
  keywords: 'old age home ministry Coimbatore, elderly outreach Coimbatore, senior ministry Madukkarai, Christian elderly care Coimbatore, Trinity Prayer House old age',
  openGraph: {
    title: 'Old Age Home Ministry — Trinity Prayer House Madukkarai',
    description: 'Honouring the elderly with the love of Christ. Trinity Prayer House Madukkarai regularly visits old age homes in Coimbatore, bringing joy, prayer, and practical support.',
    images: [{ url: '/oldage_ministry_new.jpg', width: 1200, height: 630, alt: 'Trinity Old Age Ministry' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
