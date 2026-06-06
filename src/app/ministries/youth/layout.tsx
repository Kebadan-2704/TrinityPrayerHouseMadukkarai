import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Youth Ministry | Trinity Prayer House Madukkarai',
  description: 'Youth Fellowship, Youth Outreach, and Trinity Youth Media — empowering young people in Coimbatore to grow in faith, lead with purpose, and serve through creativity at Trinity Prayer House Madukkarai.',
  keywords: 'youth ministry Coimbatore, Trinity youth fellowship, Christian youth Madukkarai, youth outreach Coimbatore, Trinity Prayer House youth',
  openGraph: {
    title: 'Youth Ministry — Trinity Prayer House Madukkarai',
    description: 'A vibrant, Christ-centred community where youth discover their God-given identity through worship, fellowship, discipleship, and creative media.',
    images: [{ url: '/youth_ministry_new.jpg', width: 1200, height: 630, alt: 'Trinity Youth Ministry' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
