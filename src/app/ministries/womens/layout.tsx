import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Women's Ministry | Trinity Prayer House Madukkarai",
  description: "Women's Ministry at Trinity Prayer House Madukkarai — Daughters of the King and Women's Outreach Program. Equipping and encouraging women in Coimbatore to grow in faith, leadership, and community.",
  keywords: "women's ministry Coimbatore, Daughters of the King, women's fellowship Madukkarai, Christian women Coimbatore, women's outreach Coimbatore",
  openGraph: {
    title: "Women's Ministry — Trinity Prayer House Madukkarai",
    description: "A place of faith, encouragement, and genuine fellowship where women of all ages come together to grow in God's presence — Daughters of the King at Trinity Prayer House.",
    images: [{ url: '/womens_ministry.png', width: 1200, height: 630, alt: "Trinity Women's Ministry" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
