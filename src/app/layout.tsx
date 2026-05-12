import type { Metadata, Viewport } from 'next';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';

export const metadata: Metadata = {
  title: 'Trinity Prayer House | Madukkarai, Coimbatore',
  description: 'Spirit-filled Christian church in Madukkarai, Coimbatore. Join us for worship, prayer, and fellowship. Founded by Pastor D.A. Sathyanathan. Senior Pastor: Vasanth Sathyanathan.',
  keywords: 'Trinity Prayer House, Madukkarai church, Coimbatore church, Tamil church, prayer house, Vasanth Sathyanathan',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Trinity Prayer House' },
  openGraph: {
    title: 'Trinity Prayer House | Madukkarai, Coimbatore',
    description: 'A house of prayer for all nations. Spirit-filled church in Coimbatore since 1976.',
    type: 'website', locale: 'en_IN', siteName: 'Trinity Prayer House',
  },
};

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Church', 'LocalBusiness'],
    name: 'Trinity Prayer House Madukkarai',
    description: 'A Spirit-filled Christian church in Madukkarai, Coimbatore.',
    url: 'https://trinityprayerhouse.com',
    telephone: '+919786888999',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '16/300, Gandhi Nagar',
      addressLocality: 'Madukkarai, Coimbatore',
      addressRegion: 'Tamil Nadu',
      postalCode: '641105',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.8988,
      longitude: 76.9626
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '09:00', closes: '13:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '18:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '19:00', closes: '21:00' }
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
