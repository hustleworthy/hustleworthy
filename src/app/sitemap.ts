import { MetadataRoute } from 'next'
import { getAllWebsites } from '@/data/websites'
import { client, isMicroCmsConfigured } from "@/lib/microcms"
import { slugify } from '@/lib/slugify'
import { PAYOUT_METHODS_CATEGORIES } from '@/data/payoutMethodsCategories'
import { WAYS_TO_EARN_CATEGORIES } from '@/data/waysToEarnCategories'

function dedupeSitemapEntries(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>()

  return entries.filter((entry) => {
    if (seen.has(entry.url)) {
      return false
    }

    seen.add(entry.url)
    return true
  })
}

function staticPages(baseUrl: string): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ways-to-earn`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/payout-methods`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hustleworthy.com'
  
  // Helper function to create safe URL slugs
  const createSafeSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[&<>"']/g, '') // Remove XML problematic characters
      .replace(/[^\w\-]/g, '') // Keep only alphanumeric, underscore, and dash
      .replace(/--+/g, '-') // Replace multiple dashes with single dash
      .replace(/^-|-$/g, '') // Remove leading/trailing dashes
  }
  
  try {
    // Fetch all websites
    const websites = await getAllWebsites()

    // Fetch all blog posts
    let blogEntries: any[] = []
    try {
      if (!isMicroCmsConfigured) {
        throw new Error('microCMS is not configured')
      }

      // microCMS max limit per request is typically 100
      const blogData = await client.get<{ contents: any[] }>({
        endpoint: "blog",
        queries: {
          limit: 100,
          orders: '-publishedAt',
        },
      })

      // Use slugify(title) to match blog [slug] routes (same as blog page)
      blogEntries = (blogData.contents ?? []).map((post) => {
        const slug = post.title ? slugify(post.title) : createSafeSlug(post.id || 'post')
        return {
          url: `${baseUrl}/blog/${slug}`,
          lastModified: new Date(post.publishedAt || post.updatedAt || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        }
      })
    } catch (blogError) {
      if (isMicroCmsConfigured) {
        console.error('Error fetching blog posts for sitemap:', blogError)
      }
    }

    // Generate sitemap entries for each website review
    const reviewEntries = websites.map((website) => ({
      url: `${baseUrl}/reviews/${createSafeSlug(website.websiteName || 'website')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Generate sitemap entries for ways-to-earn category pages
    const waysToEarnEntries = WAYS_TO_EARN_CATEGORIES.map((category) => ({
      url: `${baseUrl}/ways-to-earn/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Generate sitemap entries for payout-methods category pages
    const payoutMethodsEntries = PAYOUT_METHODS_CATEGORIES.map((method) => ({
      url: `${baseUrl}/payout-methods/${method.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Combine all entries: static pages, review entries, ways-to-earn entries, payout-methods entries, and blog entries
    return dedupeSitemapEntries([
      ...staticPages(baseUrl),
      ...reviewEntries,
      ...waysToEarnEntries,
      ...payoutMethodsEntries,
      ...blogEntries,
    ])
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return only static pages if there's an error
    return staticPages(baseUrl)
  }
}
