import type { Metadata, Viewport } from 'next';
import './globals.css';
import './presentation.css';
import ClientProviders from '@/components/ClientProviders';
import CustomCursor from '@/components/ui/CustomCursor';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://trinityprayerhouse.com'),
  title: {
    default: 'Trinity Prayer House | Madukkarai, Coimbatore',
    template: '%s | Trinity Prayer House Madukkarai',
  },
  description: 'Spirit-filled Christian church in Madukkarai, Coimbatore. Join us for worship, prayer, and fellowship. Founded by Pastor D.A. Sathyanathan. Senior Pastor: Vasanth Sathyanathan.',
  keywords: 'Trinity Prayer House, Madukkarai church, Coimbatore church, Tamil church, prayer house, Vasanth Sathyanathan, Christian church Coimbatore',
  authors: [{ name: 'Trinity Prayer House Madukkarai' }],
  creator: 'Trinity Prayer House',
  publisher: 'Trinity Prayer House',
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Trinity Prayer House | Madukkarai, Coimbatore',
    description: 'A house of prayer for all nations. Spirit-filled church in Coimbatore since 1976.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Trinity Prayer House',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trinity Prayer House | Madukkarai, Coimbatore',
    description: 'A house of prayer for all nations. Spirit-filled church in Coimbatore since 1976.',
  },
};

export const viewport: Viewport = {
  themeColor: '#141428',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trinityprayerhouse.com';

  // Structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Church', 'LocalBusiness', 'PlaceOfWorship'],
    name: 'Trinity Prayer House Madukkarai',
    description: 'A Spirit-filled Christian church in Madukkarai, Coimbatore, Tamil Nadu, India.',
    url: siteUrl,
    telephone: '+919786888999',
    email: 'trinityprayerhouse.mdk@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '16/300, Gandhi Nagar',
      addressLocality: 'Madukkarai',
      addressRegion: 'Coimbatore',
      addressCountry: 'IN',
      postalCode: '641105',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.8988,
      longitude: 76.9626,
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '09:00', closes: '13:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '18:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '19:00', closes: '21:00' },
    ],
    priceRange: 'Free',
    founder: {
      '@type': 'Person',
      name: 'Pastor D.A. Sathyanathan',
      jobTitle: 'Founder',
    },
    sameAs: [
      'https://www.youtube.com/@Pas.Vasanth',
      'https://www.instagram.com/trinityprayerhouse_church',
      'https://www.facebook.com/share/1HXvvKSbNE/',
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/tph-icon-192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/tph-icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Skip link for keyboard accessibility */}
        <style dangerouslySetInnerHTML={{ __html: `
           body { scroll-behavior: smooth; }
           .skip-link { position: absolute; top: -100%; left: 50%; transform: translateX(-50%); background: var(--accent); color: var(--primary-deep); padding: 0.75rem 1.5rem; border-radius: var(--radius-pill); font-weight: 700; font-size: 0.8rem; z-index: 100000; transition: top 0.2s ease; }
           .skip-link:focus { top: 1rem; }
         `}} />
        {/* Open Graph / Social Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Trinity Prayer House | Madukkarai, Coimbatore" />
        <meta name="twitter:description" content="A house of prayer for all nations. Spirit-filled church in Coimbatore since 1976." />
        <meta name="twitter:image" content="https://trinityprayerhouse.com/hero-bg.jpg" />
        <meta name="twitter:site" content="@PasVasanth" />
        <link rel="canonical" href={siteUrl} />
        {/* Hreflang — alternate language versions */}
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/`} />
        <link rel="alternate" hrefLang="ta" href={`${siteUrl}/?lang=ta`} />
        <link rel="alternate" hrefLang="hi" href={`${siteUrl}/?lang=hi`} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link" id="skip-link">
          Skip to main content
        </a>
        <CustomCursor />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
