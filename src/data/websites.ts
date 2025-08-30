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
  reviews: Review[]
}

export interface Review {
  id: string
  content: string
  rating: number
  createdAt: Date
  user: User
  userId: string
  websiteId: number
  replies: Reply[]
}

export interface User {
  id: string
  name: string
  email: string
}

export interface Reply {
  id: string
  content: string
  createdAt: Date
  user: User
  userId: string
  reviewId: string
}

export const websites: Website[] = [
  {
    id: '0',
    sNo: 0,
    websiteName: 'Swagbucks',
    url: 'https://www.swagbucks.com',
    signUpBonus: '$5.00',
    payoutMethods: 'PayPal, Gift Cards, Prepaid Cards',
    minimumWithdrawl: '$3',
    noteEarningPotential: 'Leading rewards platform with multiple earning opportunities',
    earningPotentialIn1hr: '$5',
    earningPotentialinaMonth: '$500',
    countriesSupported: 'US, UK, Canada, Australia',
    payoutFrequency: '1-2 Days',
    video: null,
    type: 'Rewards Platform',
    expertReview: 'Swagbucks is the gold standard in online rewards platforms. With over 15 years in business, it offers the most reliable and diverse earning opportunities including surveys, shopping rewards, video watching, and more. The platform has excellent user support, fast payouts, and consistently high ratings from users worldwide.',
    expertRating: '5.0 out of 5',
    expertTips: 'Start with the daily poll and daily deals for quick points. Use the Swagbucks toolbar for automatic shopping rewards. Complete your profile to get better survey matches.',
    isitLegit: 'true',
    waystoEarn: 'Surveys, Shopping Rewards, Videos, Games, Search',
    about: 'Swagbucks is one of the most trusted and established online rewards platforms, offering multiple ways to earn points that can be redeemed for cash or gift cards.',
    reviews: []
  },
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
    expertRating: '4.9 out of 5',
    expertTips: 'Complete the initial profiling survey immediately to unlock higher-value surveys. Focus on surveys with longer durations (best pay ratio) and avoid low-pay "game" tasks once past the initial easy tiers.',
    isitLegit: 'true',
    waystoEarn: 'Surveys, App Trials, Games, Micro-tasks',
    about: 'PollPay offers multiple ways to earn money online through surveys, app testing, and various micro-tasks. The platform is owned by Prodege and provides reliable payouts.',
    reviews: []
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
    expertRating: '4.7 out of 5',
    expertTips: 'Complete your profile thoroughly for better survey matching. Check for new surveys multiple times per day. Focus on demographic-specific surveys for higher payouts.',
    isitLegit: 'true',
    waystoEarn: 'Surveys, Market Research, Product Testing',
    about: 'CashApp Surveys connects users with market research opportunities and provides quick payouts through popular payment apps.',
    reviews: []
  },
  {
    id: '3',
    sNo: 3,
    websiteName: 'InboxDollars',
    url: 'https://www.inboxdollars.com',
    signUpBonus: '$5.00',
    payoutMethods: 'PayPal, Check, Gift Cards',
    minimumWithdrawl: '$15',
    noteEarningPotential: 'Established platform with multiple earning methods',
    earningPotentialIn1hr: '$4',
    earningPotentialinaMonth: '$400',
    countriesSupported: 'US Only',
    payoutFrequency: '3-5 Days',
    video: null,
    type: 'Rewards Platform',
    expertReview: 'InboxDollars is a well-established platform that has been paying users for over 20 years. It offers a good variety of earning opportunities including surveys, watching videos, and reading emails. The platform is reliable but limited to US users.',
    expertRating: '4.5 out of 5',
    expertTips: 'Complete the daily email reading for consistent earnings. Take advantage of the sign-up bonus and referral program. Be patient with surveys as they can take time to complete.',
    isitLegit: 'true',
    waystoEarn: 'Surveys, Videos, Emails, Shopping',
    about: 'InboxDollars is a long-standing rewards platform that pays users for various online activities.',
    reviews: []
  },
  {
    id: '4',
    sNo: 4,
    websiteName: 'MyPoints',
    url: 'https://www.mypoints.com',
    signUpBonus: '$10.00',
    payoutMethods: 'Gift Cards, PayPal',
    minimumWithdrawl: '$3',
    noteEarningPotential: 'Shopping-focused rewards platform',
    earningPotentialIn1hr: '$3',
    earningPotentialinaMonth: '$300',
    countriesSupported: 'US, Canada',
    video: null,
    type: 'Shopping Rewards',
    expertReview: 'MyPoints is excellent for users who do a lot of online shopping. The platform offers competitive cashback rates and has a user-friendly interface. While it may not be the highest earner for surveys, it excels in shopping rewards.',
    expertRating: '4.3 out of 5',
    expertTips: 'Use the MyPoints toolbar for automatic cashback on purchases. Take advantage of bonus point promotions and daily deals. Link your credit cards for additional earning opportunities.',
    isitLegit: 'true',
    waystoEarn: 'Shopping, Surveys, Videos, Games',
    about: 'MyPoints is a shopping-focused rewards platform that offers cashback and points for online purchases.',
    reviews: []
  },
  {
    id: '5',
    sNo: 5,
    websiteName: 'Survey Junkie',
    url: 'https://www.surveyjunkie.com',
    signUpBonus: '$2.00',
    payoutMethods: 'PayPal, Gift Cards',
    minimumWithdrawl: '$5',
    noteEarningPotential: 'Survey-focused platform with good pay rates',
    earningPotentialIn1hr: '$4',
    earningPotentialinaMonth: '$350',
    countriesSupported: 'US, Canada, Australia',
    payoutFrequency: '2-3 Days',
    video: null,
    type: 'Survey Sites',
    expertReview: 'Survey Junkie is one of the best survey-only platforms available. It offers consistent survey opportunities with fair pay rates and a low payout threshold. The platform is user-friendly and reliable.',
    expertRating: '4.6 out of 5',
    expertTips: 'Complete your profile thoroughly to get better survey matches. Check for new surveys multiple times per day. Focus on completing surveys quickly to maximize hourly earnings.',
    isitLegit: 'true',
    waystoEarn: 'Surveys Only',
    about: 'Survey Junkie is a dedicated survey platform that offers consistent earning opportunities for users.',
    reviews: []
  }
]

// Helper function to parse rating from "4.5 out of 5" format
function parseRating(rating: string): number {
  if (!rating) return 0
  
  // Handle "4.5 out of 5" format
  if (rating.includes('out of')) {
    const match = rating.match(/(\d+\.?\d*)\s*out\s*of\s*(\d+)/i)
    if (match) {
      return parseFloat(match[1])
    }
  }
  
  // Handle "4.5/5" format
  if (rating.includes('/')) {
    const match = rating.match(/(\d+\.?\d*)\s*\/\s*(\d+)/i)
    if (match) {
      return parseFloat(match[1])
    }
  }
  
  // Handle simple number format
  const num = parseFloat(rating)
  return isNaN(num) ? 0 : num
}

// Database utility functions
function transformWebsiteData(data: any): Website {
  return {
    id: data.sNo?.toString() || data.id?.toString() || '', // Use sNo as id since that's what we're referencing
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
    reviews: data.reviews || []
  }
}

export async function getWebsiteBySlug(slug: string): Promise<Website | null> {
  try {
    // Try to find by websiteName (exact match first)
    let website = await prisma.websites.findFirst({
      where: { 
        websiteName: {
          equals: slug
        }
      },
      include: {
        reviews: {
          include: {
            user: true,
            replies: {
              include: {
                user: true
              }
            }
          }
        }
      }
    })
    
    // If not found, try case-insensitive exact match
    if (!website) {
      website = await prisma.websites.findFirst({
        where: { 
          websiteName: {
            equals: slug,
            mode: 'insensitive'
          }
        },
        include: {
          reviews: {
            include: {
              user: true,
              replies: {
                include: {
                  user: true
                }
              }
            }
          }
        }
      })
    }
    
    // If not found, try with slug format (replace dashes with spaces)
    if (!website) {
      const nameFromSlug = slug.replace(/-/g, ' ')
      website = await prisma.websites.findFirst({
        where: { 
          websiteName: {
            contains: nameFromSlug,
            mode: 'insensitive'
          }
        },
        include: {
          reviews: {
            include: {
              user: true,
              replies: {
                include: {
                  user: true
                }
              }
            }
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
      w.websiteName?.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
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
    // First, find Swagbucks and place it at the top
    const swagbucks = await prisma.websites.findFirst({
      where: {
        websiteName: {
          contains: 'Bigcashweb'
        }
      }
    })
    
    // Get remaining websites ordered by expert rating (highest first)
    const remainingWebsites = await prisma.websites.findMany({
      where: {
        websiteName: {
          not: {
            contains: 'Bigcashweb'
          }
        }
      },
      take: limit - 1
    })
    
    // Sort by expert rating after fetching (since we need to parse the rating format)
    remainingWebsites.sort((a, b) => {
      const ratingA = parseRating(a.expertRating || '0')
      const ratingB = parseRating(b.expertRating || '0')
      return ratingB - ratingA
    })
    
    // Combine Swagbucks (if found) with remaining websites
    const allWebsites = swagbucks ? [swagbucks, ...remainingWebsites] : remainingWebsites
    
    return allWebsites.map(transformWebsiteData)
  } catch (error) {
    console.error('Database connection error, falling back to mock data:', error)
    // Fallback to mock data if database connection fails
    // Find Swagbucks in mock data
    const swagbucks = websites.find(w => 
      w.websiteName?.includes('Bigcashweb')
    )
    
    // Get remaining websites ordered by expert rating
    const remainingWebsites = websites
      .filter(w => !w.websiteName?.includes('Bigcashweb'))
      .sort((a, b) => {
        const ratingA = parseRating(a.expertRating || '0')
        const ratingB = parseRating(b.expertRating || '0')
        return ratingB - ratingA
      })
      .slice(0, limit - 1)
    
    // Combine Swagbucks (if found) with remaining websites
    const allWebsites = swagbucks ? [swagbucks, ...remainingWebsites] : remainingWebsites
    
    return allWebsites
  }
} 