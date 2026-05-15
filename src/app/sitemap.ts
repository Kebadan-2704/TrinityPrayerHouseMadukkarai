import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trinityprayerhouse.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '',
    '/about',
    '/vision',
    '/mission',
    '/sermons',
    '/ministries',
    '/ministries/youth',
    '/ministries/kids',
    '/ministries/mens',
    '/ministries/womens',
    '/ministries/hindi',
    '/ministries/oldage',
    '/ministries/branches',
    '/special-meeting',
    '/online-meet',
    '/prayer',
    '/give',
    '/new-here',
    '/contact',
  ];

  return pages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
