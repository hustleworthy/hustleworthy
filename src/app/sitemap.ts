import { MetadataRoute } from 'next'
import { getAllWebsites } from '@/data/websites'
import { client } from "@/lib/microcms"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hustleworthy.com'
  
  try {
    // Fetch all websites
    const websites = await getAllWebsites()

    // Fetch all blog posts
    let blogEntries: any[] = []
    try {
      const blogData = await client.get<{ contents: any[] }>({
        endpoint: "blog",
        queries: {
          limit: 1000, // Fetch all blog posts
          orders: '-publishedAt',
        },
      })
      
      blogEntries = blogData.contents.map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: new Date(post.publishedAt || post.updatedAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    } catch (blogError) {
      console.error('Error fetching blog posts for sitemap:', blogError)
    }

    // Ways to earn categories
    const WAYS_TO_EARN_CATEGORIES = [
      'watching-videos',
      'taking-surveys', 
      'typing',
      'testing',
      'reading',
      'doing-data-entry',
      'installing-apps',
      'referrals',
      'sharing-internet',
      'doing-tasks',
      'writing',
      'watching-ads',
      'writing-reviews',
      'answering-questions',
      'listening-to-music',
      'chatting',
      'shopping-online',
      'playing-games'
    ]

    // Payout methods categories
    const PAYOUT_METHODS_CATEGORIES = [
      'paypal',
      'bank-transfer',
      'check',
      'payoneer',
      'skrill',
      'wise',
      'revolut',
      'venmo',
      'zelle',
      'papara',
      'qiwi',
      'yoomoney',
      'gift-cards',
      'amazon-gift-card',
      'visa-prepaid-card',
      'mastercard-prepaid-card',
      'cryptocurrency',
      'bitcoin',
      'ethereum',
      'litecoin'
    ]

    // Static pages
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
      {
        url: `${baseUrl}/ways-to-earn`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/payout-methods`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/privacy`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/auth/login`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.4,
      },
      {
        url: `${baseUrl}/auth/signup`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.4,
      },
    ]

    // Generate sitemap entries for each website review
    const reviewEntries = websites.map((website) => ({
      url: `${baseUrl}/reviews/${website.websiteName?.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Generate sitemap entries for ways-to-earn category pages
    const waysToEarnEntries = WAYS_TO_EARN_CATEGORIES.map((category) => ({
      url: `${baseUrl}/ways-to-earn/${category}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Generate sitemap entries for payout-methods category pages
    const payoutMethodsEntries = PAYOUT_METHODS_CATEGORIES.map((method) => ({
      url: `${baseUrl}/payout-methods/${method}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Combine all entries: static pages, review entries, ways-to-earn entries, payout-methods entries, and blog entries
    return [...staticPages, ...reviewEntries, ...waysToEarnEntries, ...payoutMethodsEntries, ...blogEntries]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return only static pages if there's an error
    return [
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
      {
        url: `${baseUrl}/ways-to-earn`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/payout-methods`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/privacy`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/auth/login`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.4,
      },
      {
        url: `${baseUrl}/auth/signup`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.4,
      },
    ]
  }
}
