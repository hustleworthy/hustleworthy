import type { Metadata } from 'next'

export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://hustleworthy.com').replace(/\/$/, '')
export const SITE_NAME = 'Hustleworthy'
export const DEFAULT_TITLE = 'Find Legit Money Making Websites | Hustle Worthy'
export const DEFAULT_DESCRIPTION =
  'Discover and review money-making websites with detailed ratings, payment methods, and user experiences.'
export const DEFAULT_OG_IMAGE = '/images/og-default.png'

type PageMetadataOptions = {
  title?: string
  description?: string
  path?: string
  type?: 'website' | 'article'
  image?: string
  noIndex?: boolean
}

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}

export function createPageMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  type = 'website',
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageMetadataOptions = {}): Metadata {
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image)

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} social preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  email: 'info@hustleworthy.com',
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl('/images/logo.png'),
  },
  description:
    'Hustleworthy is a directory and review website that helps users discover make-money platforms, side hustle websites, reward apps, GPT sites, and online earning opportunities.',
  sameAs: [
    'https://www.facebook.com/official.hustleworthy/',
    'https://x.com/hustleworthy',
    'https://www.youtube.com/@HustleWorthy',
    'https://www.linkedin.com/company/hustle-worthy/',
  ],
} as const

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  publisher: {
    '@id': organizationSchema['@id'],
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/reviews?query={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
} as const

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function itemListSchema(
  name: string,
  items: Array<{ name: string; path: string; description?: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(item.path),
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
    })),
  }
}

export function articleSchema({
  title,
  description,
  path,
  image,
  author,
  publishedAt,
  updatedAt,
}: {
  title: string
  description: string
  path: string
  image?: string
  author?: string
  publishedAt?: string
  updatedAt?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: absoluteUrl(path),
    image: image ? absoluteUrl(image) : absoluteUrl(DEFAULT_OG_IMAGE),
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: author || 'Hustleworthy Team',
    },
    publisher: {
      '@id': organizationSchema['@id'],
    },
  }
}
