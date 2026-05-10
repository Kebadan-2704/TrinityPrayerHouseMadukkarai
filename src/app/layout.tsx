import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Trinity Prayer House | Madukkarai, Coimbatore',
  description: 'Spirit-filled Christian church in Madukkarai, Coimbatore. Join us for worship, prayer, and fellowship. Services: Sun 9:30 AM, 6:30 PM Hindi',
  keywords: 'Trinity Prayer House, Madukkarai church, Coimbatore church, Tamil church, prayer house, Vasanth Sathyanathan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
