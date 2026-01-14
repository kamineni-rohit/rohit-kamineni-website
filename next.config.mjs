/** @type {import('next').NextConfig} */
const nextConfig = {
  // Environment detection
  env: {
    DEPLOYMENT_ENV: process.env.DEPLOYMENT_ENV || 'github',
    NEXT_PUBLIC_DEPLOYMENT_ENV: process.env.NEXT_PUBLIC_DEPLOYMENT_ENV || 'github',
  },

  // GitHub Pages configuration (conditional)
  ...(process.env.DEPLOYMENT_ENV === 'github' && {
    output: 'export',
    basePath: '/rohit-kamineni-website',
    images: {
      unoptimized: true,
    },
  }),

  // AWS Amplify configuration (default - full Next.js features)
  ...(process.env.DEPLOYMENT_ENV === 'amplify' && {
    // No special config needed for Amplify
    // Full Next.js features available
  }),

  // Preserve Tailwind and PostCSS config
  // (Next.js auto-detects tailwind.config.js and postcss.config.js)
}

export default nextConfig
