import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
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
  keywords: [
    // ── Core brand ──────────────────────────────────────────────────────────
    'Trinity Prayer House',
    'Trinity Prayer House Madukkarai',
    'Trinity Prayer House Coimbatore',
    'Trinity Prayer House Madukkarai Coimbatore',
    'Trinity Prayer House Coimbatore Madukkarai',
    'TPH Madukkarai',
    'TPH Coimbatore',

    // ── Madukkarai + Coimbatore order combos ────────────────────────────────
    'Madukkarai Coimbatore church',
    'Coimbatore Madukkarai church',
    'church Madukkarai Coimbatore',
    'church Coimbatore Madukkarai',
    'church in Madukkarai Coimbatore',
    'church in Coimbatore Madukkarai',
    'best church Madukkarai Coimbatore',
    'best church Coimbatore Madukkarai',
    'Christian church Madukkarai Coimbatore',
    'Christian church Coimbatore Madukkarai',
    'Tamil church Madukkarai Coimbatore',
    'Tamil church Coimbatore Madukkarai',

    // ── Madukkarai standalone combos ────────────────────────────────────────
    'church in Madukkarai',
    'Madukkarai church',
    'Tamil church Madukkarai',
    'Tamil Christian church Madukkarai',
    'best Tamil church Madukkarai',
    'best Christian church Madukkarai',
    'Christian church Madukkarai',
    'Christian church near Madukkarai',
    'prayer house Madukkarai',
    'prayer meeting Madukkarai',
    'gospel church Madukkarai',
    'Sunday service Madukkarai',
    'Sunday church Madukkarai',
    'worship church Madukkarai',
    'spirit filled church Madukkarai',
    'church near Madukkarai',
    'church service Madukkarai',
    'church worship Madukkarai',
    'new church Madukkarai',
    'family church Madukkarai',
    'pastor church Madukkarai',

    // ── Coimbatore standalone combos ─────────────────────────────────────────
    'church in Coimbatore',
    'Coimbatore church',
    'Tamil church Coimbatore',
    'Tamil Christian church Coimbatore',
    'best Tamil church Coimbatore',
    'best Christian church Coimbatore',
    'Christian church Coimbatore',
    'prayer house Coimbatore',
    'prayer meeting Coimbatore',
    'gospel church Coimbatore',
    'Sunday service Coimbatore',
    'Sunday church Coimbatore',
    'worship church Coimbatore',
    'spirit filled church Coimbatore',
    'church near Coimbatore',
    'church service Coimbatore',
    'Tamil church near me Coimbatore',
    'Tamil speaking church Coimbatore',
    'Tamil church worship Coimbatore',
    'pentecostal church Coimbatore',
    'charismatic church Coimbatore',
    'family church Coimbatore',
    'best church in Coimbatore',
    'top church Coimbatore',
    'church for families Coimbatore',
    'church with Tamil sermons Coimbatore',

    // ── Pastor combos ────────────────────────────────────────────────────────
    'Pastor Vasanth Sathyanathan',
    'Vasanth Sathyanathan',
    'Pastor Vasanth Sathyanathan Coimbatore',
    'Pastor Vasanth Sathyanathan Madukkarai',
    'Pastor Vasanth Sathyanathan church',
    'Pastor Vasanth Sathyanathan sermons',
    'Vasanth Sathyanathan Coimbatore church',
    'Vasanth Sathyanathan Madukkarai church',
    'Pastor D.A. Sathyanathan',
    'D.A. Sathyanathan Madukkarai',
    'Pastor D.A. Sathyanathan Coimbatore',

    // ── Tamil church combos ──────────────────────────────────────────────────
    'Tamil Christian church near me',
    'Tamil church Sunday service',
    'Tamil church near me',
    'Tamil sermons Coimbatore',
    'Tamil sermons Madukkarai',
    'Tamil preaching Coimbatore',
    'Tamil preaching Madukkarai',
    'Tamil worship Coimbatore',
    'Tamil worship Madukkarai',
    'Tamil bible church Coimbatore',
    'Tamil gospel church Madukkarai',
    'Tamil prayer Coimbatore',
    'Tamil prayer Madukkarai',

    // ── General strong combos ────────────────────────────────────────────────
    'church near me Coimbatore',
    'church near me Madukkarai',
    'church Coimbatore Tamil Nadu',
    'best church Tamil Nadu Coimbatore',
    'Christian worship Coimbatore',
    'gospel ministry Coimbatore',
    'gospel ministry Madukkarai',

    // ── best Tamil church combos ─────────────────────────────────────────────
    'best Tamil church',
    'best Tamil church in Coimbatore',
    'best Tamil church in Madukkarai',
    'best Tamil church in Coimbatore Madukkarai',
    'best Tamil church in Madukkarai Coimbatore',
    'best Tamil church Coimbatore Madukkarai',
    'best Tamil church Madukkarai Coimbatore',
    'best Tamil church near me',
    'best Tamil church near Coimbatore',
    'best Tamil church near Madukkarai',
    'number one Tamil church Coimbatore',
    'number one Tamil church Madukkarai',
    'top Tamil church Coimbatore',
    'top Tamil church Madukkarai',
    'top Tamil church Coimbatore Madukkarai',
    'top Tamil church Madukkarai Coimbatore',
    'popular Tamil church Coimbatore',
    'popular Tamil church Madukkarai',
    'famous Tamil church Coimbatore',
    'famous Tamil church Madukkarai',
    'well known Tamil church Coimbatore',
    'biggest Tamil church Coimbatore',
    'biggest Tamil church Madukkarai',
    'Tamil church 2025 Coimbatore',
    'Tamil church 2025 Madukkarai',

    // ── best church combos ───────────────────────────────────────────────────
    'best church in Coimbatore',
    'best church in Madukkarai',
    'best church in Coimbatore Madukkarai',
    'best church in Madukkarai Coimbatore',
    'best church Coimbatore Madukkarai',
    'best church Madukkarai Coimbatore',
    'best church near me Coimbatore',
    'best church near me Madukkarai',
    'best church near Coimbatore',
    'best church near Madukkarai',
    'top church in Coimbatore',
    'top church in Madukkarai',
    'top church Coimbatore Madukkarai',
    'top church Madukkarai Coimbatore',
    'number one church Coimbatore',
    'number one church Madukkarai',
    'famous church Coimbatore',
    'famous church Madukkarai',
    'popular church Coimbatore',
    'popular church Madukkarai',
    'well known church Coimbatore',
    'must visit church Coimbatore',
    'must visit church Madukkarai',
    'best Christian church in Coimbatore Madukkarai',
    'best Christian church in Madukkarai Coimbatore',

    // ── Tamil church near me / best combos ───────────────────────────────────
    'Tamil church near me best',
    'Tamil Christian church best Coimbatore',
    'Tamil Christian church best Madukkarai',
    'best Tamil Christian church Coimbatore Madukkarai',
    'best Tamil Christian church Madukkarai Coimbatore',
    'spirit filled Tamil church Coimbatore',
    'spirit filled Tamil church Madukkarai',
    'best spirit filled church Coimbatore',
    'best spirit filled church Madukkarai',
    'Tamil church for worship Coimbatore',
    'Tamil church for worship Madukkarai',
    'Tamil church for families Coimbatore',
    'Tamil church for families Madukkarai',
    'Tamil church for families Coimbatore Madukkarai',
    'Tamil church community Coimbatore',
    'Tamil church community Madukkarai',
    'Tamil church community Coimbatore Madukkarai',

    // ── Intent-based search combos ───────────────────────────────────────────
    'which church to attend Coimbatore',
    'which Tamil church is best in Coimbatore',
    'where to go to church Coimbatore',
    'find a church in Coimbatore',
    'find a church in Madukkarai',
    'church to join Coimbatore',
    'church to join Madukkarai',
    'church to join Coimbatore Madukkarai',
    'looking for Tamil church Coimbatore',
    'looking for church near Madukkarai',
    'Christian fellowship Coimbatore',
    'Christian fellowship Madukkarai',
    'Christian fellowship Coimbatore Madukkarai',

    // ── Nearby-area and landmark combos ─────────────────────────────────────
    'church near Coimbatore west',
    'church near Walayar Coimbatore',
    'church near Kuniyamuthur',
    'church near Podanur Coimbatore',
    'church near Singanallur Coimbatore',
    'church Coimbatore outskirts',
    'church on NH 544 Coimbatore',

    // ── Worship & prayer specific ────────────────────────────────────────────
    'Tamil worship service Coimbatore',
    'Tamil worship service Madukkarai',
    'Sunday worship Tamil Coimbatore',
    'Sunday worship Tamil Madukkarai',
    'Sunday worship Coimbatore Madukkarai',
    'prayer and worship Tamil church Coimbatore',
    'praise and worship Tamil Coimbatore',
    'praise and worship Tamil Madukkarai',
    'Tamil praise and worship church Coimbatore Madukkarai',

    // ── Church history / legacy combos ───────────────────────────────────────
    'church founded 1976 Coimbatore',
    'oldest Tamil church Coimbatore',
    'established Tamil church Madukkarai',
    'traditional Tamil church Coimbatore',
    'trusted Tamil church Coimbatore',
    'trusted church Madukkarai',
    'Sathyanathan church Coimbatore',
    'Sathyanathan church Madukkarai',
    'D.A. Sathyanathan founded church Coimbatore',
  ],



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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-6VR5XTSV4F"} />
      </body>
    </html>
  );
}
