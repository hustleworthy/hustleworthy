import { MetadataRoute } from 'next'
import { getAllWebsites } from '@/data/websites'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hustleworthy.vercel.app'
  
  try {
    // Fetch all websites
    const websites = await getAllWebsites()

    // Generate sitemap entries for each website review
    const reviewEntries = websites.map((website) => ({
      url: `${baseUrl}/reviews/${website.websiteName?.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return reviewEntries
  } catch (error) {
    console.error('Error generating reviews sitemap:', error)
    return []
  }
}
