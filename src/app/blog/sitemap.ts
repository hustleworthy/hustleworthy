import { MetadataRoute } from 'next'
import { client } from "@/lib/microcms"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hustleworthy.vercel.app'
  
  try {
    // Fetch all blog posts
    const data = await client.get<{ contents: any[] }>({
      endpoint: "blog",
      queries: {
        limit: 1000, // Fetch all blog posts
        orders: '-publishedAt',
      },
    })

    // Generate sitemap entries for each blog post
    const blogEntries = data.contents.map((post) => ({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: new Date(post.publishedAt || post.updatedAt || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    return blogEntries
  } catch (error) {
    console.error('Error generating blog sitemap:', error)
    return []
  }
}
