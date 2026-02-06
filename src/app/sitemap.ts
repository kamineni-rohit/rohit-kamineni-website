import { MetadataRoute } from 'next';
import { getEnvironmentConfig } from '@/lib/environment';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getEnvironmentConfig();
  const baseUrl = config.siteUrl;

  // Portfolio pages
  const portfolioPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
  ];

  return portfolioPages;
}
