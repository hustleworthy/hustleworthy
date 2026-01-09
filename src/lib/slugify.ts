/**
 * Convert a string to a URL-friendly slug
 * Examples:
 * "How to Make Money Online" -> "how-to-make-money-online"
 * "Best Ways to Earn $100/Day!" -> "best-ways-to-earn-100-day"
 */
export function slugify(text: string): string {
  if (!text) return '';
  
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Normalize unicode characters (e.g., é -> e)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
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
  if (!slug || !posts || posts.length === 0) return null;
  
  // Normalize the input slug (Next.js already decodes URL, but handle edge cases)
  let normalizedSlug: string;
  try {
    normalizedSlug = decodeURIComponent(slug).toLowerCase().trim();
  } catch {
    // If decoding fails, use the slug as-is
    normalizedSlug = slug.toLowerCase().trim();
  }
  
  // Find exact match
  const post = posts.find(post => {
    if (!post || !post.title) return false;
    const postSlug = slugify(post.title);
    return postSlug === normalizedSlug;
  });
  
  return post || null;
}
