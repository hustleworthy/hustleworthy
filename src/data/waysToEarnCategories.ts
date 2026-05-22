export type WaysToEarnCategory = {
  slug: string
  name: string
  description: string
}

export const WAYS_TO_EARN_CATEGORIES: WaysToEarnCategory[] = [
  {
    slug: 'watching-videos',
    name: 'Watching Videos',
    description: 'Earn money by watching videos, advertisements, and content online',
  },
  {
    slug: 'taking-surveys',
    name: 'Taking Surveys',
    description: 'Share your opinions and get paid through market research surveys',
  },
  {
    slug: 'playing-games',
    name: 'Playing Games',
    description: 'Get paid to play mobile games and complete gaming tasks',
  },
  {
    slug: 'typing',
    name: 'Typing',
    description: 'Earn through data entry, transcription, and typing tasks',
  },
  {
    slug: 'testing',
    name: 'Testing',
    description: 'Test websites, apps, and products for money',
  },
  {
    slug: 'reading',
    name: 'Reading',
    description: 'Get paid to read emails, articles, and content',
  },
  {
    slug: 'doing-data-entry',
    name: 'Doing Data Entry',
    description: 'Complete data entry tasks and administrative work',
  },
  {
    slug: 'installing-apps',
    name: 'Installing Apps',
    description: 'Download and try new apps for rewards',
  },
  {
    slug: 'referrals',
    name: 'Referrals',
    description: 'Earn by referring friends and family to platforms',
  },
  {
    slug: 'sharing-internet',
    name: 'Sharing Internet',
    description: 'Passive income by sharing your internet bandwidth',
  },
  {
    slug: 'doing-tasks',
    name: 'Doing Tasks',
    description: 'Complete micro-tasks and small jobs online',
  },
  {
    slug: 'writing',
    name: 'Writing',
    description: 'Write articles, reviews, and content for money',
  },
  {
    slug: 'watching-ads',
    name: 'Watching Ads',
    description: 'View advertisements and get paid for your attention',
  },
  {
    slug: 'writing-reviews',
    name: 'Writing Reviews',
    description: 'Write product and service reviews for compensation',
  },
  {
    slug: 'answering-questions',
    name: 'Answering Questions',
    description: 'Help others by answering questions and earn money',
  },
  {
    slug: 'listening-to-music',
    name: 'Listening to Music',
    description: 'Get paid to listen to and review music',
  },
  {
    slug: 'chatting',
    name: 'Chatting',
    description: 'Earn money through chat support and conversation services',
  },
  {
    slug: 'shopping-online',
    name: 'Shopping Online',
    description: 'Get cashback and rewards for online purchases',
  },
]

export function getWaysToEarnCategoryBySlug(slug: string): WaysToEarnCategory | undefined {
  return WAYS_TO_EARN_CATEGORIES.find((category) => category.slug === slug.toLowerCase())
}

export function getWaysToEarnCategoryHeading(categoryName: string): string {
  return `Sites that Pay for ${categoryName}`
}

export function getWaysToEarnCategoryMetaTitle(categoryName: string, page?: number): string {
  const title = `Best websites to get paid for ${categoryName.toLowerCase()}`
  if (page && page > 1) {
    return `${title} - Page ${page}`
  }
  return title
}

export function getWaysToEarnCategoryMetaDescription(categoryName: string): string {
  return `Discover the best websites that pay you for ${categoryName.toLowerCase()}. Compare trusted platforms, earning options, and simple ways to start making money online today.`
}
