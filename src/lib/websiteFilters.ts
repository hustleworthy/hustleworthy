import type { Website } from '@/data/websites'
import { slugify } from '@/lib/slugify'

export type WebsiteFilterCriteria = {
  expertRating: string
  earningPotential: string
  waysToEarn: string[]
  payoutMethods: string[]
  investmentRequired: boolean
}

export type WebsiteSortOption =
  | 'default'
  | 'earning-high-to-low'
  | 'withdrawal-low-to-high'
  | 'rating-high-to-low'

export const REVIEWS_PAGE_SIZE = 20
export const CATEGORY_PAGE_SIZE = 10
export const STABLE_SITEMAP_LASTMOD = new Date('2026-06-05T00:00:00.000Z')

const WAYS_TO_EARN_MAPPINGS: Record<string, string[]> = {
  'watching videos': ['watching videos', 'videos', 'video watching'],
  'playing games': ['playing games', 'games', 'gaming'],
  'taking surveys': ['taking surveys', 'surveys', 'survey'],
  'doing data entry': ['doing data entry', 'data entry'],
  'installing apps': ['installing apps', 'app install', 'app trials'],
  'doing tasks': ['doing tasks', 'tasks', 'micro-tasks'],
  'watching ads': ['watching ads', 'ads', 'ad viewing'],
  'writing reviews': ['writing reviews', 'reviews'],
  'answering questions': ['answering questions', 'questions'],
  'listening to music': ['listening to music', 'music'],
  'shopping online': ['shopping online', 'shopping', 'online shopping'],
  typing: ['typing', 'data entry', 'transcription'],
  testing: ['testing', 'app testing', 'website testing', 'product testing'],
  reading: ['reading', 'reading emails', 'content reading'],
  referrals: ['referrals', 'referring friends', 'affiliate'],
  'sharing internet': ['sharing internet', 'passive income', 'bandwidth sharing'],
  writing: ['writing', 'content writing', 'article writing'],
  chatting: ['chatting', 'chat support', 'customer service'],
}

const PAYOUT_METHOD_MAPPINGS: Record<string, string[]> = {
  paypal: ['paypal', 'paypal cash'],
  'bank transfer': ['bank transfer', 'bank', 'wire transfer', 'direct deposit', 'ach'],
  check: ['check', 'cheque', 'paper check'],
  payoneer: ['payoneer', 'payoneer card'],
  skrill: ['skrill', 'skrill wallet'],
  wise: ['wise', 'transferwise', 'wise transfer'],
  revolut: ['revolut', 'revolut card'],
  venmo: ['venmo'],
  zelle: ['zelle'],
  papara: ['papara'],
  qiwi: ['qiwi', 'qiwi wallet'],
  yoomoney: ['yoomoney', 'yandex.money', 'yandex money'],
  'gift cards': ['gift cards', 'gift card', 'giftcards', 'vouchers', 'rewards'],
  'amazon gift card': ['amazon gift card', 'amazon gift cards', 'amazon', 'amazon voucher'],
  'visa prepaid card': ['visa prepaid card', 'visa prepaid', 'visa card', 'prepaid visa'],
  'mastercard prepaid card': [
    'mastercard prepaid card',
    'mastercard prepaid',
    'mastercard',
    'prepaid mastercard',
  ],
  cryptocurrency: ['cryptocurrency', 'crypto', 'digital currency'],
  bitcoin: ['bitcoin', 'btc'],
  ethereum: ['ethereum', 'eth'],
  litecoin: ['litecoin', 'ltc'],
}

function normalize(value: string | null | undefined): string {
  return (value || '').trim().toLowerCase()
}

function splitList(value: string | null | undefined): string[] {
  return normalize(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function matchesMappedValue(values: string[], target: string, mappings: Record<string, string[]>): boolean {
  const normalizedTarget = normalize(target)
  const mappedValues = mappings[normalizedTarget]

  return values.some((value) => {
    if (value === normalizedTarget) {
      return true
    }

    if (mappedValues?.some((mapped) => value.includes(mapped))) {
      return true
    }

    return normalizedTarget.length > 3 && value.includes(normalizedTarget)
  })
}

export function createWebsiteSlug(name: string | null | undefined): string {
  return slugify(name || 'website') || 'website'
}

export function createReviewPath(website: Pick<Website, 'websiteName'>): string {
  return `/reviews/${createWebsiteSlug(website.websiteName)}`
}

export function parseRating(value: string | null | undefined): number {
  const rating = value || ''

  if (rating.includes('out of')) {
    const match = rating.match(/(\d+\.?\d*)\s*out\s*of\s*(\d+)/i)
    if (match) {
      return Number.parseFloat(match[1])
    }
  }

  if (rating.includes('/')) {
    const match = rating.match(/(\d+\.?\d*)\s*\/\s*(\d+)/i)
    if (match) {
      return Number.parseFloat(match[1])
    }
  }

  const parsed = Number.parseFloat(rating)
  return Number.isNaN(parsed) ? 0 : parsed
}

export function parseMoney(value: string | null | undefined): number {
  const parsed = Number.parseFloat((value || '').replace(/[^0-9.]/g, ''))
  return Number.isNaN(parsed) ? 0 : parsed
}

export function matchesWaysToEarn(website: Website, category: string): boolean {
  return matchesMappedValue(splitList(website.waystoEarn), category, WAYS_TO_EARN_MAPPINGS)
}

export function matchesPayoutMethod(website: Website, payoutMethod: string): boolean {
  return matchesMappedValue(splitList(website.payoutMethods), payoutMethod, PAYOUT_METHOD_MAPPINGS)
}

export function filterWebsites(
  websites: Website[],
  filters: WebsiteFilterCriteria,
  required?: {
    wayToEarnCategory?: string
    payoutMethod?: string
  }
): Website[] {
  return websites.filter((website) => {
    if (required?.wayToEarnCategory && !matchesWaysToEarn(website, required.wayToEarnCategory)) {
      return false
    }

    if (required?.payoutMethod && !matchesPayoutMethod(website, required.payoutMethod)) {
      return false
    }

    if (filters.expertRating && parseRating(website.expertRating) < Number.parseFloat(filters.expertRating)) {
      return false
    }

    if (filters.earningPotential && parseMoney(website.earningPotentialIn1hr) < Number.parseFloat(filters.earningPotential)) {
      return false
    }

    if (
      filters.waysToEarn.length > 0 &&
      !filters.waysToEarn.every((way) => matchesWaysToEarn(website, way))
    ) {
      return false
    }

    if (
      filters.payoutMethods.length > 0 &&
      !filters.payoutMethods.every((method) => matchesPayoutMethod(website, method))
    ) {
      return false
    }

    if (filters.investmentRequired && normalize(website.investment) !== 'yes') {
      return false
    }

    return true
  })
}

export function sortWebsites(websites: Website[], sortBy: WebsiteSortOption = 'default'): Website[] {
  const sorted = [...websites]

  switch (sortBy) {
    case 'earning-high-to-low':
      return sorted.sort((a, b) => parseMoney(b.earningPotentialIn1hr) - parseMoney(a.earningPotentialIn1hr))
    case 'withdrawal-low-to-high':
      return sorted.sort((a, b) => parseMoney(a.minimumWithdrawl) - parseMoney(b.minimumWithdrawl))
    case 'rating-high-to-low':
      return sorted.sort((a, b) => parseRating(b.expertRating) - parseRating(a.expertRating))
    default:
      return sorted
  }
}

export function paginateWebsites<T>(items: T[], currentPage: number, pageSize: number): T[] {
  const safePage = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1
  return items.slice((safePage - 1) * pageSize, safePage * pageSize)
}

export function latestReviewDate(website: Website): Date | undefined {
  const reviewDates = (website.reviews || [])
    .map((review) => new Date(review.createdAt).getTime())
    .filter(Number.isFinite)

  if (reviewDates.length === 0) {
    return undefined
  }

  return new Date(Math.max(...reviewDates))
}
