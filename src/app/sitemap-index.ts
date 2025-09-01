import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hustleworthy.com'
  
  return [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date(),
    }
  ]
}
