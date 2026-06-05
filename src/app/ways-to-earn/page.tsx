import { Metadata } from 'next'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { WAYS_TO_EARN_CATEGORIES } from '@/data/waysToEarnCategories'
import JsonLd from '@/components/JsonLd'
import { createPageMetadata, itemListSchema } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Ways to Earn Money Online - Browse by Category | Hustle Worthy',
  description: 'Explore different ways to earn money online. Browse websites by category including surveys, games, videos, tasks, and more. Find legitimate earning opportunities.',
  path: '/ways-to-earn',
})

export default function WaysToEarnIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd
        data={itemListSchema(
          'Ways to earn money online',
          WAYS_TO_EARN_CATEGORIES.map((category) => ({
            name: category.name,
            path: `/ways-to-earn/${category.slug}`,
            description: category.description,
          }))
        )}
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-10 sm:py-14 lg:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
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
