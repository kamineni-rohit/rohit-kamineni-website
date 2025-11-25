import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Define blog post directory
const postsDirectory = path.join(process.cwd(), 'src/content/blog');

// Type definitions for blog posts
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
  readTime: string;
  tags: string[];
  content?: string;
}

export interface BlogPostMetadata extends Omit<BlogPost, 'content'> {
  // Metadata without content for list views
}

/**
 * Get all blog post slugs from the blog directory
 */
export function getAllPostSlugs(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}

/**
 * Get sorted blog posts (newest first)
 */
export function getSortedPosts(): BlogPostMetadata[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;

      // Return metadata without content
      const { content, ...metadata } = post;
      return metadata;
    })
    .filter((post): post is BlogPostMetadata => post !== null);

  // Sort posts by date (newest first)
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      category: data.category || 'Uncategorized',
      excerpt: data.excerpt || '',
      author: data.author || 'Rohit Kamineni',
      readTime: data.readTime || calculateReadTime(content),
      tags: data.tags || [],
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Convert markdown content to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogPostMetadata[] {
  const allPosts = getSortedPosts();
  return allPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPostMetadata[] {
  const allPosts = getSortedPosts();
  return allPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const allPosts = getSortedPosts();
  const categories = new Set<string>();
  allPosts.forEach((post) => categories.add(post.category));
  return Array.from(categories).sort();
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const allPosts = getSortedPosts();
  const tags = new Set<string>();
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Calculate estimated read time based on word count
 * Assumes average reading speed of 200 words per minute
 */
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Get recent posts (limit to n most recent)
 */
export function getRecentPosts(limit: number = 5): BlogPostMetadata[] {
  const allPosts = getSortedPosts();
  return allPosts.slice(0, limit);
}

/**
 * Search posts by query (searches in title, excerpt, and tags)
 */
export function searchPosts(query: string): BlogPostMetadata[] {
  const allPosts = getSortedPosts();
  const lowerQuery = query.toLowerCase();

  return allPosts.filter((post) => {
    const matchesTitle = post.title.toLowerCase().includes(lowerQuery);
    const matchesExcerpt = post.excerpt.toLowerCase().includes(lowerQuery);
    const matchesTags = post.tags.some((tag) =>
      tag.toLowerCase().includes(lowerQuery)
    );

    return matchesTitle || matchesExcerpt || matchesTags;
  });
}
