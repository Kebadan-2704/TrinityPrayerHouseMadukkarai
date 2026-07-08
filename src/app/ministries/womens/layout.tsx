import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Women's Ministry — Tamil Christian Women's Fellowship Coimbatore Madukkarai | Trinity Prayer House",
  description: "Trinity Prayer House Madukkarai's Women's Ministry — empowering Tamil Christian women in Coimbatore through faith, fellowship, and service. Best women's church ministry Coimbatore Madukkarai.",
  keywords: [
    "women's church Coimbatore", "women's church Madukkarai", "women's church Coimbatore Madukkarai",
    "Tamil women's ministry Coimbatore", "Tamil women's ministry Madukkarai",
    "Tamil women's ministry Coimbatore Madukkarai",
    "Christian women's fellowship Coimbatore", "Christian women's fellowship Madukkarai",
    "best women's ministry Coimbatore", "best women's ministry Madukkarai",
    "best women's church Coimbatore Madukkarai",
    'women fellowship Tamil church Coimbatore', 'women fellowship Tamil church Madukkarai',
    'women prayer group Coimbatore', 'women prayer group Madukkarai',
    'Trinity Prayer House women', "women's ministry Trinity Prayer House Coimbatore",
    'church for women Coimbatore', 'church for women Madukkarai',
    'Tamil Christian women Coimbatore', 'Tamil Christian women Madukkarai',
  ],
  alternates: { canonical: '/ministries/womens' },
  openGraph: {
    title: "Women's Ministry | Trinity Prayer House — Tamil Church Coimbatore Madukkarai",
    description: "Tamil Christian women's ministry at Trinity Prayer House Madukkarai, Coimbatore — faith, fellowship and service.",
    url: '/ministries/womens',
  },
};

export default function WomensLayout({ children }: { children: React.ReactNode }) {
  return children;
}
