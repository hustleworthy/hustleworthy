import { prisma } from '@/lib/prisma'

export interface Website {
  id: string
  sNo: number
  websiteName?: string | null
  url?: string | null
  signUpBonus?: string | null
  payoutMethods?: string | null
  minimumWithdrawl?: string | null
  noteEarningPotential?: string | null
  earningPotentialIn1hr?: string | null
  earningPotentialinaMonth?: string | null
  countriesSupported?: string | null
  payoutFrequency?: string | null
  video?: string | null
  type?: string | null
  expertReview?: string | null
  expertRating?: string | null
  expertTips?: string | null
  isitLegit?: string | null
  waystoEarn?: string | null
  about?: string | null
  createdAt: Date
  updatedAt: Date
}

export const websites: Website[] = [
  {
    id: '1',
    sNo: 1,
    websiteName: 'PollPay',
    url: 'https://pollpay.com',
    signUpBonus: '$0.25',
    payoutMethods: 'PayPal Cash, Gift Cards',
    minimumWithdrawl: '$25',
    noteEarningPotential: 'Legitimate platform for surveys, app trials, and micro-tasks with wide availability',
    earningPotentialIn1hr: '$3',
    earningPotentialinaMonth: '$300',
    countriesSupported: 'Global',
    payoutFrequency: '5-7 Days',
    video: null,
    type: 'Survey Sites',
    expertReview: 'PollPay is a legitimate platform that pays users for surveys, app trials, games and other "micro-tasks." Its major pros are wide availability and multiple payout options (PayPal, gift cards). Major cons include a relatively high $25 USD payout threshold, occasional low-paying "game" tasks (often $0.01/minute at higher levels), and support issues prior to the Prodege acquisition. Earnings are modest; better as a supplemental side income than a primary source.',
    expertRating: '4.9',
    expertTips: 'Complete the initial profiling survey immediately to unlock higher-value surveys. Focus on surveys with longer durations (best pay ratio) and avoid low-pay "game" tasks once past the initial easy tiers.',
    isitLegit: 'true',
    waystoEarn: 'Surveys, App Trials, Games, Micro-tasks',
    about: 'PollPay offers multiple ways to earn money online through surveys, app testing, and various micro-tasks. The platform is owned by Prodege and provides reliable payouts.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    sNo: 2,
    websiteName: 'CashApp Surveys',
    url: 'https://cashappsurveys.com',
    signUpBonus: '$1.00',
    payoutMethods: 'PayPal, Bank Transfer',
    minimumWithdrawl: '$10',
    noteEarningPotential: 'Quick and easy survey platform with instant cash rewards',
    earningPotentialIn1hr: '$4',
    earningPotentialinaMonth: '$240',
    countriesSupported: 'US, UK, Canada',
    payoutFrequency: '1-3 Days',
    video: null,
    type: 'Survey Sites',
    expertReview: 'CashApp Surveys offers a streamlined experience for users looking to earn through market research participation. The platform\'s lower payout threshold and faster processing times make it attractive for beginners.',
    expertRating: '4.7',
    expertTips: 'Complete your profile thoroughly for better survey matching. Check for new surveys multiple times per day. Focus on demographic-specific surveys for higher payouts.',
    isitLegit: 'true',
    waystoEarn: 'Surveys, Market Research, Product Testing',
    about: 'CashApp Surveys connects users with market research opportunities and provides quick payouts through popular payment apps.',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

// Database utility functions
function transformWebsiteData(data: any): Website {
  return {
    id: data.id,
    sNo: data.sNo,
    websiteName: data.websiteName,
    url: data.url,
    signUpBonus: data.signUpBonus,
    payoutMethods: data.payoutMethods,
    minimumWithdrawl: data.minimumWithdrawl,
    noteEarningPotential: data.noteEarningPotential,
    earningPotentialIn1hr: data.earningPotentialIn1hr,
    earningPotentialinaMonth: data.earningPotentialinaMonth,
    countriesSupported: data.countriesSupported,
    payoutFrequency: data.payoutFrequency,
    video: data.video,
    type: data.type,
    expertReview: data.expertReview,
    expertRating: data.expertRating,
    expertTips: data.expertTips,
    isitLegit: data.isitLegit,
    waystoEarn: data.waystoEarn,
    about: data.about,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export async function getWebsiteBySlug(slug: string): Promise<Website | null> {
  try {
    // Try to find by websiteName (exact match first, then case-insensitive)
    let website = await prisma.websites.findFirst({
      where: { 
        websiteName: {
          equals: slug,
          mode: 'insensitive'
        }
      }
    })
    
    // If not found, try with slug format (replace dashes with spaces)
    if (!website) {
      const nameFromSlug = slug.replace(/-/g, ' ')
      website = await prisma.websites.findFirst({
        where: { 
          websiteName: {
            contains: nameFromSlug,
            mode: 'insensitive'
          }
        }
      })
    }
    
    if (!website) return null
    
    return transformWebsiteData(website)
  } catch (error) {
    console.error('Database connection error, falling back to mock data:', error)
    // Fallback to mock data if database connection fails
    return websites.find(w => 
      w.websiteName?.toLowerCase().replace(/\s+/g, '-') === slug
    ) || null
  }
}

export async function getAllWebsites(): Promise<Website[]> {
  try {
    const websitesData = await prisma.websites.findMany({
      orderBy: {
        sNo: 'asc'
      }
    })
    
    return websitesData.map(transformWebsiteData)
  } catch (error) {
    console.error('Database connection error, falling back to mock data:', error)
    // Fallback to mock data if database connection fails
    return websites
  }
}

export async function getFeaturedWebsites(limit: number = 3): Promise<Website[]> {
  try {
    const websitesData = await prisma.websites.findMany({
      orderBy: {
        sNo: 'asc'
      },
      take: limit
    })
    
    return websitesData.map(transformWebsiteData)
  } catch (error) {
    console.error('Database connection error, falling back to mock data:', error)
    // Fallback to mock data if database connection fails
    return websites.slice(0, limit)
  }
} 