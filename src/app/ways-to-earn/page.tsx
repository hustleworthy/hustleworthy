import { Metadata } from 'next'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ways to Earn Money Online - Browse by Category | Hustle Worthy',
  description: 'Explore different ways to earn money online. Browse websites by category including surveys, games, videos, tasks, and more. Find legitimate earning opportunities.',
}

const WAYS_TO_EARN_CATEGORIES = [
  { slug: 'watching-videos', name: 'Watching Videos', description: 'Earn money by watching videos, advertisements, and content online' },
  { slug: 'taking-surveys', name: 'Taking Surveys', description: 'Share your opinions and get paid through market research surveys' },
  { slug: 'playing-games', name: 'Playing Games', description: 'Get paid to play mobile games and complete gaming tasks' },
  { slug: 'typing', name: 'Typing', description: 'Earn through data entry, transcription, and typing tasks' },
  { slug: 'testing', name: 'Testing', description: 'Test websites, apps, and products for money' },
  { slug: 'reading', name: 'Reading', description: 'Get paid to read emails, articles, and content' },
  { slug: 'doing-data-entry', name: 'Doing Data Entry', description: 'Complete data entry tasks and administrative work' },
  { slug: 'installing-apps', name: 'Installing Apps', description: 'Download and try new apps for rewards' },
  { slug: 'referrals', name: 'Referrals', description: 'Earn by referring friends and family to platforms' },
  { slug: 'sharing-internet', name: 'Sharing Internet', description: 'Passive income by sharing your internet bandwidth' },
  { slug: 'doing-tasks', name: 'Doing Tasks', description: 'Complete micro-tasks and small jobs online' },
  { slug: 'writing', name: 'Writing', description: 'Write articles, reviews, and content for money' },
  { slug: 'watching-ads', name: 'Watching Ads', description: 'View advertisements and get paid for your attention' },
  { slug: 'writing-reviews', name: 'Writing Reviews', description: 'Write product and service reviews for compensation' },
  { slug: 'answering-questions', name: 'Answering Questions', description: 'Help others by answering questions and earn money' },
  { slug: 'listening-to-music', name: 'Listening to Music', description: 'Get paid to listen to and review music' },
  { slug: 'chatting', name: 'Chatting', description: 'Earn money through chat support and conversation services' },
  { slug: 'shopping-online', name: 'Shopping Online', description: 'Get cashback and rewards for online purchases' }
]

export default function WaysToEarnIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Ways to Earn Money Online
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover legitimate money-making opportunities organized by category. 
            Find websites that match your interests and earning preferences.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <p className="text-gray-600">
            Choose a category to see websites that offer those specific earning opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WAYS_TO_EARN_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/ways-to-earn/${category.slug}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow hover:border-blue-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">💰</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                View websites
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose Categorized Earning?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              By browsing money-making opportunities by category, you can quickly find websites that match your 
              skills, interests, and available time. Whether you prefer active tasks like surveys and games, 
              or passive income through referrals and internet sharing, we've organized everything to help you 
              find the perfect earning method.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
