import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Men's Ministry — Tamil Christian Men's Fellowship Coimbatore Madukkarai | Trinity Prayer House",
  description: "Trinity Prayer House Madukkarai's Men's Ministry — equipping Tamil Christian men in Coimbatore to lead with faith and integrity. Best men's church fellowship Coimbatore Madukkarai.",
  keywords: [
    "men's church Coimbatore", "men's church Madukkarai", "men's church Coimbatore Madukkarai",
    "Tamil men's ministry Coimbatore", "Tamil men's ministry Madukkarai",
    "Christian men's fellowship Coimbatore", "Christian men's fellowship Madukkarai",
    "Christian men's fellowship Coimbatore Madukkarai",
    "best men's ministry Coimbatore", "best men's ministry Madukkarai",
    'men fellowship Tamil church Coimbatore', 'men fellowship Tamil church Madukkarai',
    'men prayer group Coimbatore', 'men prayer group Madukkarai',
    'Trinity Prayer House men', "men's ministry Trinity Prayer House Coimbatore",
    'church for men Coimbatore', 'church for men Madukkarai',
    'Tamil Christian men Coimbatore', 'Tamil Christian men Madukkarai',
    'godly men ministry Tamil Nadu', 'men leadership church Coimbatore',
  ],
  alternates: { canonical: '/ministries/mens' },
  openGraph: {
    title: "Men's Ministry | Trinity Prayer House — Tamil Church Coimbatore Madukkarai",
    description: "Tamil Christian men's ministry at Trinity Prayer House Madukkarai, Coimbatore — faith, leadership and fellowship.",
    url: '/ministries/mens',
  },
};

export default function MensLayout({ children }: { children: React.ReactNode }) {
  return children;
}
