import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Mission | Trinity Prayer House Madukkarai — Coimbatore',
  description: 'Discover the mission and vision of Trinity Prayer House Madukkarai — reaching the lost, discipling believers, planting churches, and serving the community in Coimbatore and beyond, following the Great Commission.',
  keywords: 'church mission Coimbatore, Trinity Prayer House mission, Christian mission Madukkarai, church vision Coimbatore, Great Commission Coimbatore church',
  openGraph: {
    title: 'Our Mission — Trinity Prayer House Madukkarai',
    description: 'Called to reach the unreached — Trinity Prayer House Madukkarai is committed to evangelism, discipleship, church planting, and community transformation in the name of Jesus Christ.',
    images: [{ url: '/hero-bg.jpg', width: 1200, height: 630, alt: 'Trinity Prayer House Mission' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
