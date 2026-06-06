import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Men's Ministry | Trinity Prayer House Madukkarai",
  description: "Men's Ministry at Trinity Prayer House Madukkarai — a brotherhood of faith where men in Coimbatore are equipped to lead with integrity, serve with humility, and grow together in Christ.",
  keywords: "men's ministry Coimbatore, Christian men Madukkarai, men's fellowship Coimbatore, men's discipleship, Trinity Prayer House men",
  openGraph: {
    title: "Men's Ministry — Trinity Prayer House Madukkarai",
    description: "Growing Together — a strong brotherhood where men are strengthened, challenged, and encouraged to become the leaders God has called them to be.",
    images: [{ url: '/mens_ministry_new.jpg', width: 1200, height: 630, alt: "Trinity Men's Ministry" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
