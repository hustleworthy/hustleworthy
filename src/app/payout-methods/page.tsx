import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Payout Methods - Find Sites by Payment Options | Hustle Worthy',
  description: 'Browse money-making websites by payout methods. Find sites that pay through PayPal, bank transfer, gift cards, cryptocurrency, and more payment options.',
  openGraph: {
    title: 'Payout Methods - Find Sites by Payment Options | Hustle Worthy',
    description: 'Browse money-making websites by payout methods. Find sites that pay through PayPal, bank transfer, gift cards, cryptocurrency, and more.',
    type: 'website'
  }
}

// Define the payout methods categories
const PAYOUT_METHODS_CATEGORIES = [
  {
    slug: 'PayPal',
    name: 'PayPal',
    description: 'Sites that pay directly to your PayPal account',
    icon: '💳'
  },
  {
    slug: 'Bank Transfer',
    name: 'Bank Transfer',
    description: 'Direct bank transfers and wire payments',
    icon: '🏦'
  },
  {
    slug: 'Check',
    name: 'Check',
    description: 'Physical or digital check payments',
    icon: '📄'
  },
  {
    slug: 'Payoneer',
    name: 'Payoneer',
    description: 'Payoneer card and account payments',
    icon: '💳'
  },
  {
    slug: 'Skrill',
    name: 'Skrill',
    description: 'Skrill digital wallet payments',
    icon: '💳'
  },
  {
    slug: 'Wise',
    name: 'Wise',
    description: 'Wise (formerly TransferWise) payments',
    icon: '💳'
  },
  {
    slug: 'Revolut',
    name: 'Revolut',
    description: 'Revolut digital banking payments',
    icon: '💳'
  },
  {
    slug: 'Venmo',
    name: 'Venmo',
    description: 'Venmo mobile payments',
    icon: '📱'
  },
  {
    slug: 'Zelle',
    name: 'Zelle',
    description: 'Zelle instant bank transfers',
    icon: '⚡'
  },
  {
    slug: 'Papara',
    name: 'Papara',
    description: 'Papara digital wallet payments',
    icon: '💳'
  },
  {
    slug: 'QIWI',
    name: 'QIWI',
    description: 'QIWI wallet payments',
    icon: '💳'
  },
  {
    slug: 'YooMoney',
    name: 'YooMoney',
    description: 'YooMoney (formerly Yandex.Money) payments',
    icon: '💳'
  },
  {
    slug: 'Gift Cards',
    name: 'Gift Cards',
    description: 'Various gift card rewards',
    icon: '🎁'
  },
  {
    slug: 'Amazon Gift Card',
    name: 'Amazon Gift Card',
    description: 'Amazon gift card rewards',
    icon: '🛒'
  },
  {
    slug: 'Visa Prepaid Card',
    name: 'Visa Prepaid Card',
    description: 'Visa prepaid card rewards',
    icon: '💳'
  },
  {
    slug: 'MasterCard Prepaid Card',
    name: 'MasterCard Prepaid Card',
    description: 'MasterCard prepaid card rewards',
    icon: '💳'
  },
  {
    slug: 'Cryptocurrency',
    name: 'Cryptocurrency',
    description: 'Various cryptocurrency payments',
    icon: '₿'
  },
  {
    slug: 'Bitcoin',
    name: 'Bitcoin',
    description: 'Bitcoin cryptocurrency payments',
    icon: '₿'
  },
  {
    slug: 'Ethereum',
    name: 'Ethereum',
    description: 'Ethereum cryptocurrency payments',
    icon: '⟠'
  },
  {
    slug: 'Litecoin',
    name: 'Litecoin',
    description: 'Litecoin cryptocurrency payments',
    icon: 'Ł'
  }
]

export default function PayoutMethodsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Best Sites to Earn Money with Different Payment Methods
          </h1>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PAYOUT_METHODS_CATEGORIES.map((method) => (
              <Link
                key={method.slug}
                href={`/reviews?payoutMethods=${method.slug}`}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-green-300 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {method.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {method.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
