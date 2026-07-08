import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ministries — Tamil Church Coimbatore Madukkarai | Trinity Prayer House',
  description: 'Explore all ministries of Trinity Prayer House Madukkarai — Youth, Kids, Men\'s, Women\'s, Hindi, and Old Age ministries. Best Tamil Christian church in Coimbatore serving all ages.',
  keywords: [
    'Tamil church ministries Coimbatore', 'Christian church ministries Madukkarai',
    'church youth ministry Coimbatore', 'church kids ministry Tamil Nadu',
    'Trinity Prayer House ministries', 'Tamil church programs Coimbatore',
    'women ministry Tamil church Coimbatore', 'men ministry church Coimbatore',
    'Hindi ministry Tamil Nadu', 'church for all ages Coimbatore', 'Tamil Christian ministries',
  ],
  alternates: { canonical: '/ministries' },
  openGraph: {
    title: 'Ministries | Trinity Prayer House — Tamil Church Madukkarai Coimbatore',
    description: 'Youth, Kids, Men\'s, Women\'s, Hindi, Old Age — all ministries of Trinity Prayer House Madukkarai, the best Tamil Christian church in Coimbatore.',
    url: '/ministries',
  },
};

export default function MinistriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
