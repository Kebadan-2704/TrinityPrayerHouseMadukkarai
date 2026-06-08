import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trinityprayerhouse.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }> = [
    // Core discovery pages — high priority, frequently updated
    { path: '',                       changeFrequency: 'weekly',   priority: 1.0 },
    { path: '/sermons',               changeFrequency: 'daily',    priority: 0.95 },
    { path: '/new-here',              changeFrequency: 'monthly',  priority: 0.9  },
    { path: '/online-meet',           changeFrequency: 'weekly',   priority: 0.85 },
    { path: '/special-meeting',       changeFrequency: 'monthly',  priority: 0.85 },
    { path: '/contact',               changeFrequency: 'yearly',   priority: 0.8  },

    // About & mission
    { path: '/vision',                changeFrequency: 'yearly',   priority: 0.75 },
    { path: '/mission',               changeFrequency: 'yearly',   priority: 0.75 },

    // Ministry hub + sub-pages
    { path: '/ministries',            changeFrequency: 'monthly',  priority: 0.8  },
    { path: '/ministries/youth',      changeFrequency: 'monthly',  priority: 0.75 },
    { path: '/ministries/kids',       changeFrequency: 'monthly',  priority: 0.75 },
    { path: '/ministries/mens',       changeFrequency: 'monthly',  priority: 0.7  },
    { path: '/ministries/womens',     changeFrequency: 'monthly',  priority: 0.7  },
    { path: '/ministries/hindi',      changeFrequency: 'monthly',  priority: 0.7  },
    { path: '/ministries/oldage',     changeFrequency: 'monthly',  priority: 0.7  },

    // Supporting pages
    { path: '/give',                  changeFrequency: 'yearly',   priority: 0.65 },
  ];

  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

