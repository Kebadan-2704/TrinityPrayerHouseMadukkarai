import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Ministries | Trinity Prayer House Madukkarai',
  description: "Explore all the ministries of Trinity Prayer House Madukkarai — Youth Fellowship, Kids Ministry, Men's Ministry, Women's Ministry, Hindi Ministry, and Old Age Home Ministry. Serving God and our community in Coimbatore, Tamil Nadu.",
  keywords: "church ministries Coimbatore, Trinity Prayer House ministries, youth ministry Coimbatore, kids church Coimbatore, women's ministry Coimbatore, men's ministry Coimbatore, Hindi ministry Coimbatore",
  openGraph: {
    title: 'Ministries — Trinity Prayer House Madukkarai',
    description: "From youth to seniors, from Tamil to Hindi — our ministries serve every generation and community in Coimbatore with the love of Christ.",
    images: [{ url: '/hero-bg.jpg', width: 1200, height: 630, alt: 'Trinity Prayer House Ministries' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
