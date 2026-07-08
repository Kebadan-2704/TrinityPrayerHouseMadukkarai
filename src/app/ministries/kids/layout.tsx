import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kids Ministry — Tamil Church Children's Programme Coimbatore Madukkarai | Trinity Prayer House",
  description: "Trinity Prayer House Madukkarai's Kids Ministry — the best Tamil Christian children's programme in Coimbatore. Biblical values, songs, and fun activities for kids. Best church for kids Coimbatore Madukkarai.",
  keywords: [
    'kids church Coimbatore', 'kids church Madukkarai', 'kids church Coimbatore Madukkarai',
    'children church Coimbatore', 'children church Madukkarai', 'children church Tamil Coimbatore',
    'Tamil church for kids Coimbatore', 'Tamil church for kids Madukkarai',
    'best kids church Coimbatore', 'best kids church Madukkarai', 'best kids church Coimbatore Madukkarai',
    'Sunday school Coimbatore', 'Sunday school Madukkarai', 'Sunday school Tamil church Coimbatore',
    'Christian Sunday school Coimbatore', 'Christian Sunday school Madukkarai',
    'children ministry Tamil Nadu', 'children ministry Coimbatore', 'children ministry Madukkarai',
    'Trinity Prayer House kids', 'kids ministry Trinity Prayer House Coimbatore',
    'church for children Coimbatore', 'church for children Madukkarai',
    'Tamil church children programme Coimbatore', 'Tamil church children programme Madukkarai',
  ],
  alternates: { canonical: '/ministries/kids' },
  openGraph: {
    title: "Kids Ministry | Trinity Prayer House — Best Tamil Church for Children Coimbatore Madukkarai",
    description: "Best Tamil Christian children's ministry in Coimbatore Madukkarai — Trinity Prayer House kids programme with biblical values and activities.",
    url: '/ministries/kids',
  },
};

export default function KidsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
