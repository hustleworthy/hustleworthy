import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import WaysToEarnContainer from '@/components/reviews/WaysToEarnContainer'
import { getWebsiteCountForCategory } from '@/data/websites'

interface WaysToEarnPageProps {
  params: Promise<{ slug: string }>
}

// Define the ways to earn categories
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

// Map slugs to display names
const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  'watching-videos': 'Watching Videos',
  'taking-surveys': 'Taking Surveys',
  'typing': 'Typing',
  'testing': 'Testing',
  'reading': 'Reading',
  'doing-data-entry': 'Doing Data Entry',
  'installing-apps': 'Installing Apps',
  'referrals': 'Referrals',
  'sharing-internet': 'Sharing Internet',
  'doing-tasks': 'Doing Tasks',
  'writing': 'Writing',
  'watching-ads': 'Watching Ads',
  'writing-reviews': 'Writing Reviews',
  'answering-questions': 'Answering Questions',
  'listening-to-music': 'Listening to Music',
  'chatting': 'Chatting',
  'shopping-online': 'Shopping Online',
  'playing-games': 'Playing Games'
}

export default async function WaysToEarnPage({ params }: WaysToEarnPageProps) {
  const { slug } = await params
  
  // Check if the slug is a valid ways to earn category
  if (!WAYS_TO_EARN_CATEGORIES.includes(slug)) {
    notFound()
  }

  const categoryName = CATEGORY_DISPLAY_NAMES[slug]
  const websiteCount = await getWebsiteCountForCategory(categoryName)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Best Sites to Earn Money for {categoryName}
          </h1>
        </div>
      </div>

      {/* Ways To Earn Container */}
      <div className="container mx-auto px-6 py-12">
        <WaysToEarnContainer category={categoryName} />
      </div>

      <Footer />
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  if (!WAYS_TO_EARN_CATEGORIES.includes(slug)) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    }
  }

  const categoryName = CATEGORY_DISPLAY_NAMES[slug]
  const websiteCount = await getWebsiteCountForCategory(categoryName)
  const title = `${websiteCount} Best Sites to Earn Money for ${categoryName.toLowerCase()}`
  const description = `Find the best websites that pay you for ${categoryName.toLowerCase()}. Expert reviews, earning potential, payout methods, and user feedback.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  }
}
