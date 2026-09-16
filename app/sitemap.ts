import type { MetadataRoute } from 'next';

import { caseSlugs } from '@/lib/cases';
import { site } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...caseSlugs.map((slug) => ({
      url: `${site.url}/cases/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
