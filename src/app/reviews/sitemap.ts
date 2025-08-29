import { MetadataRoute } from 'next'
import { getAllWebsites } from '@/data/websites'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hustleworthy.com'
  
  try {
    // Fetch all websites
    const websites = await getAllWebsites()

    // Static pages that should be included
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/reviews`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/best`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.7,
      },
    ]

    // Generate sitemap entries for each website review
    const reviewEntries = websites.map((website) => ({
      url: `${baseUrl}/reviews/${website.websiteName?.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Combine static pages with review entries
    return [...staticPages, ...reviewEntries]
  } catch (error) {
    console.error('Error generating reviews sitemap:', error)
    return []
  }
}
