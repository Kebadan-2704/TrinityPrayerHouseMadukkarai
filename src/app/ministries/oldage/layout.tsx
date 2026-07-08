import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Old Age Ministry — Senior Christian Fellowship Coimbatore Madukkarai | Trinity Prayer House',
  description: 'Old Age Ministry at Trinity Prayer House Madukkarai, Coimbatore — loving care, fellowship, and pastoral support for senior believers. Best church for seniors Coimbatore Madukkarai.',
  keywords: [
    'old age ministry Coimbatore', 'old age ministry Madukkarai', 'old age ministry Coimbatore Madukkarai',
    'senior church Coimbatore', 'senior church Madukkarai', 'senior church Coimbatore Madukkarai',
    'senior Christian fellowship Coimbatore', 'senior Christian fellowship Madukkarai',
    'elders ministry Tamil church Coimbatore', 'elders ministry Tamil church Madukkarai',
    'church for seniors Coimbatore', 'church for seniors Madukkarai',
    'church for elderly Coimbatore', 'church for elderly Madukkarai',
    'Tamil church senior fellowship Coimbatore', 'Tamil church senior fellowship Madukkarai',
    'senior Christian care Coimbatore', 'elder care church Tamil Nadu',
    'Trinity Prayer House senior ministry', 'old age home church Coimbatore',
    'retirement age Christian Coimbatore', 'senior prayer group Madukkarai',
  ],
  alternates: { canonical: '/ministries/oldage' },
  openGraph: {
    title: 'Old Age Ministry | Trinity Prayer House — Tamil Church Coimbatore Madukkarai',
    description: 'Senior Christian fellowship and care at Trinity Prayer House Madukkarai, Coimbatore — best church for seniors Coimbatore Madukkarai.',
    url: '/ministries/oldage',
  },
};

export default function OldAgeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
