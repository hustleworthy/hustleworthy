import { Metadata } from 'next'
import Footer from '@/components/Footer'
import ReviewsContainer from '@/components/reviews/ReviewsContainer'

export const metadata: Metadata = {
  title: 'List Of Money Making Sites | Hustle Worthy',
  description: 'Browse our comprehensive collection of website reviews. Get expert analysis, user feedback, and detailed insights on earning potential, payout methods, and legitimacy.',
}

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Money Making Site Reviews
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Expert analysis and user feedback on the best money-making websites. 
            Find legitimate platforms that actually pay.
          </p>
        </div>
      </div>

      {/* Reviews Container */}
      <div className="container mx-auto px-6 py-12">
        <ReviewsContainer />
      </div>

      <Footer />
    </div>
  )
}
