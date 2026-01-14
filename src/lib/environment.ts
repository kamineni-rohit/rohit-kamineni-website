/**
 * Environment Detection Utilities
 *
 * Handles detection of deployment environment (GitHub Pages vs AWS Amplify)
 * to conditionally show/hide blog functionality.
 */

/**
 * Deployment environment type
 */
export type DeploymentEnvironment = 'github' | 'amplify';

/**
 * Get the current deployment environment
 * Reads from NEXT_PUBLIC_DEPLOYMENT_ENV environment variable
 *
 * @returns 'github' for GitHub Pages, 'amplify' for AWS Amplify
 */
export function getDeploymentEnvironment(): DeploymentEnvironment {
  const env = process.env.NEXT_PUBLIC_DEPLOYMENT_ENV;
  return env === 'amplify' ? 'amplify' : 'github';
}

/**
 * Check if currently running on GitHub Pages
 */
export function isGitHubPages(): boolean {
  return getDeploymentEnvironment() === 'github';
}

/**
 * Check if currently running on AWS Amplify
 */
export function isAmplify(): boolean {
  return getDeploymentEnvironment() === 'amplify';
}

/**
 * Check if blog should be enabled
 * Blog is only shown on AWS Amplify deployment
 */
export function isBlogEnabled(): boolean {
  return isAmplify();
}

/**
 * Get base path for the current environment
 * GitHub Pages uses /rohit-kamineni-website, Amplify uses /
 */
export function getBasePath(): string {
  return isGitHubPages() ? '/rohit-kamineni-website' : '';
}

/**
 * Get absolute URL for a given path based on environment
 * @param path - Relative path (e.g., '/blog/my-post')
 */
export function getAbsoluteUrl(path: string): string {
  const basePath = getBasePath();
  // Remove leading slash from path if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}/${cleanPath}`;
}

/**
 * Get environment-specific configuration
 */
export function getEnvironmentConfig() {
  const env = getDeploymentEnvironment();

  return {
    environment: env,
    basePath: getBasePath(),
    blogEnabled: isBlogEnabled(),
    siteUrl:
      env === 'amplify'
        ? 'https://rohitkamineni.com'
        : 'https://kamineni-rohit.github.io/rohit-kamineni-website',
  };
}
