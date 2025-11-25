import { MetadataRoute } from 'next';
import { getSortedPosts } from '@/lib/blog';
import { getEnvironmentConfig } from '@/lib/environment';

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getEnvironmentConfig();
  const baseUrl = config.siteUrl;

  // Portfolio pages (always available)
  const portfolioPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
  ];

  // Blog pages (only on Amplify)
  let blogPages: MetadataRoute.Sitemap = [];

  if (config.blogEnabled) {
    const posts = getSortedPosts();

    // Blog index page
    blogPages.push({
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    });

    // Individual blog posts
    const postPages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    blogPages = [...blogPages, ...postPages];
  }

  return [...portfolioPages, ...blogPages];
}
