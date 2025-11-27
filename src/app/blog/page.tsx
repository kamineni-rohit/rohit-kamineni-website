import { getSortedPosts, getAllCategories, getAllTags } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | Rohit Kamineni',
  description:
    'Exploring AI, data engineering, machine learning, and analytics through in-depth articles and insights.',
};

export default function BlogPage() {
  const posts = getSortedPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              className="text-accent hover:opacity-80 transition text-sm font-medium"
            >
              ← Back to Portfolio
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
            Exploring AI, data engineering, machine learning, and analytics
            through in-depth articles and insights.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className="px-4 py-2 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent/90 transition"
              >
                All Posts
              </Link>
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:border-accent hover:text-accent transition"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {tags.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                Popular Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 10).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Rohit Kamineni. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
