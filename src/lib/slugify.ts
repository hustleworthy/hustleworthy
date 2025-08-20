/**
 * Convert a string to a URL-friendly slug
 * Examples:
 * "How to Make Money Online" -> "how-to-make-money-online"
 * "Best Ways to Earn $100/Day!" -> "best-ways-to-earn-100-day"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Remove special characters except hyphens and alphanumeric
    .replace(/[^\w\s-]/g, '')
    // Replace spaces and multiple hyphens with single hyphen
    .replace(/[\s_-]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Find a blog post by matching the slug against the title
 * This searches through all blog posts to find one whose title matches the slug
 */
export function findPostBySlug(posts: any[], slug: string): any | null {
  return posts.find(post => slugify(post.title) === slug) || null;
}
