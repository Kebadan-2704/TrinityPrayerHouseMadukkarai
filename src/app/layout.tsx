import type { Metadata, Viewport } from 'next';
import './globals.css';
import './presentation.css';
import ClientProviders from '@/components/ClientProviders';
import DailyVerse from '@/components/ui/DailyVerse';

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
    images: [
      {
        url: '/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Trinity Prayer House Madukkarai',
      },
    ],
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
        {/* ── Font performance: preconnect + preload + non-blocking stylesheet ── */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload the actual woff2 files so the browser fetches them ASAP */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/plusjakartasans/v3/Y9aHTaVXtbhi9-dkYwnJxYQ.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/cormorantgaramond/v37/4V8rIHyDQ0UT-T_DdVIbKRqHcd5JGEkE.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Non-render-blocking stylesheet load */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          media="print"
          // @ts-expect-error – valid HTML attribute, not typed in React
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          />
        </noscript>

        <link rel="apple-touch-icon" href="/tph-icon-192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/tph-icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Twitter image and site handle (base twitter config is in metadata export) */}
        <meta name="twitter:image" content="https://trinityprayerhouse.com/hero-bg.jpg" />
        <meta name="twitter:site" content="@PasVasanth" />
        {/* Hreflang — alternate language versions */}
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/`} />
        <link rel="alternate" hrefLang="ta" href={`${siteUrl}/?lang=ta`} />
        <link rel="alternate" hrefLang="hi" href={`${siteUrl}/?lang=hi`} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link" id="skip-link">
          Skip to main content
        </a>
        <ClientProviders>{children}</ClientProviders>
        <DailyVerse />
      </body>
    </html>
  );
}
