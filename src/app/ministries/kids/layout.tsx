import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kids Ministry | Trinity Prayer House Madukkarai",
  description: "Children's ministry at Trinity Prayer House Madukkarai — a fun, safe, and Spirit-filled environment where children in Coimbatore learn about God's Word, build friendships, and grow in faith.",
  keywords: "kids ministry Coimbatore, children's church Madukkarai, Sunday school Coimbatore, Christian kids Coimbatore, Trinity Prayer House children",
  openGraph: {
    title: "Kids Ministry — Trinity Prayer House Madukkarai",
    description: "Raising the next generation for Christ. A vibrant children's ministry in Madukkarai, Coimbatore, where kids experience God's love through worship, stories, and activities.",
    images: [{ url: '/kids_ministry.png', width: 1200, height: 630, alt: 'Trinity Kids Ministry' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
