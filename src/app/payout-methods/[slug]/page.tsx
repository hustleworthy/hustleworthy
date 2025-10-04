import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import PayoutMethodsContainer from '@/components/reviews/PayoutMethodsContainer'
import { getWebsiteCountForPayoutMethod } from '@/data/websites'

interface PayoutMethodsPageProps {
  params: Promise<{ slug: string }>
}

// Define the payout methods categories
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

// Map slugs to display names
const PAYOUT_METHOD_DISPLAY_NAMES: Record<string, string> = {
  'paypal': 'PayPal',
  'bank-transfer': 'Bank Transfer',
  'check': 'Check',
  'payoneer': 'Payoneer',
  'skrill': 'Skrill',
  'wise': 'Wise',
  'revolut': 'Revolut',
  'venmo': 'Venmo',
  'zelle': 'Zelle',
  'papara': 'Papara',
  'qiwi': 'QIWI',
  'yoomoney': 'YooMoney',
  'gift-cards': 'Gift Cards',
  'amazon-gift-card': 'Amazon Gift Card',
  'visa-prepaid-card': 'Visa Prepaid Card',
  'mastercard-prepaid-card': 'MasterCard Prepaid Card',
  'cryptocurrency': 'Cryptocurrency',
  'bitcoin': 'Bitcoin',
  'ethereum': 'Ethereum',
  'litecoin': 'Litecoin'
}

export default async function PayoutMethodPage({ params }: PayoutMethodsPageProps) {
  const { slug } = await params
  
  // Check if the slug is a valid payout method category
  if (!PAYOUT_METHODS_CATEGORIES.includes(slug)) {
    notFound()
  }

  const methodName = PAYOUT_METHOD_DISPLAY_NAMES[slug]
  const websiteCount = await getWebsiteCountForPayoutMethod(methodName)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Best Sites to Earn Money with {methodName}
          </h1>
        </div>
      </div>

      {/* Payout Methods Container */}
      <div className="container mx-auto px-6 py-12">
        <PayoutMethodsContainer payoutMethod={methodName} />
      </div>

      <Footer />
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  if (!PAYOUT_METHODS_CATEGORIES.includes(slug)) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    }
  }

  const methodName = PAYOUT_METHOD_DISPLAY_NAMES[slug]
  const websiteCount = await getWebsiteCountForPayoutMethod(methodName)
  const title = `${websiteCount} Best Sites to Earn Money with ${methodName}`
  const description = `Find the best websites that pay through ${methodName}. Expert reviews, earning potential, payout speeds, and user feedback on legitimate money-making platforms.`

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
