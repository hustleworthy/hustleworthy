import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Payout Methods - Find Sites by Payment Options | GPTCritic',
  description: 'Browse money-making websites by payout methods. Find sites that pay through PayPal, bank transfer, gift cards, cryptocurrency, and more payment options.',
  openGraph: {
    title: 'Payout Methods - Find Sites by Payment Options',
    description: 'Browse money-making websites by payout methods. Find sites that pay through PayPal, bank transfer, gift cards, cryptocurrency, and more.',
    type: 'website'
  }
}

// Define the payout methods categories
const PAYOUT_METHODS_CATEGORIES = [
  {
    slug: 'paypal',
    name: 'PayPal',
    description: 'Sites that pay directly to your PayPal account',
    icon: '💳'
  },
  {
    slug: 'bank-transfer',
    name: 'Bank Transfer',
    description: 'Direct bank transfers and wire payments',
    icon: '🏦'
  },
  {
    slug: 'check',
    name: 'Check',
    description: 'Physical or digital check payments',
    icon: '📄'
  },
  {
    slug: 'payoneer',
    name: 'Payoneer',
    description: 'Payoneer card and account payments',
    icon: '💳'
  },
  {
    slug: 'skrill',
    name: 'Skrill',
    description: 'Skrill digital wallet payments',
    icon: '💳'
  },
  {
    slug: 'wise',
    name: 'Wise',
    description: 'Wise (formerly TransferWise) payments',
    icon: '💳'
  },
  {
    slug: 'revolut',
    name: 'Revolut',
    description: 'Revolut digital banking payments',
    icon: '💳'
  },
  {
    slug: 'venmo',
    name: 'Venmo',
    description: 'Venmo mobile payments',
    icon: '📱'
  },
  {
    slug: 'zelle',
    name: 'Zelle',
    description: 'Zelle instant bank transfers',
    icon: '⚡'
  },
  {
    slug: 'papara',
    name: 'Papara',
    description: 'Papara digital wallet payments',
    icon: '💳'
  },
  {
    slug: 'qiwi',
    name: 'QIWI',
    description: 'QIWI wallet payments',
    icon: '💳'
  },
  {
    slug: 'yoomoney',
    name: 'YooMoney',
    description: 'YooMoney (formerly Yandex.Money) payments',
    icon: '💳'
  },
  {
    slug: 'gift-cards',
    name: 'Gift Cards',
    description: 'Various gift card rewards',
    icon: '🎁'
  },
  {
    slug: 'amazon-gift-card',
    name: 'Amazon Gift Card',
    description: 'Amazon gift card rewards',
    icon: '🛒'
  },
  {
    slug: 'visa-prepaid-card',
    name: 'Visa Prepaid Card',
    description: 'Visa prepaid card rewards',
    icon: '💳'
  },
  {
    slug: 'mastercard-prepaid-card',
    name: 'MasterCard Prepaid Card',
    description: 'MasterCard prepaid card rewards',
    icon: '💳'
  },
  {
    slug: 'cryptocurrency',
    name: 'Cryptocurrency',
    description: 'Various cryptocurrency payments',
    icon: '₿'
  },
  {
    slug: 'bitcoin',
    name: 'Bitcoin',
    description: 'Bitcoin cryptocurrency payments',
    icon: '₿'
  },
  {
    slug: 'ethereum',
    name: 'Ethereum',
    description: 'Ethereum cryptocurrency payments',
    icon: '⟠'
  },
  {
    slug: 'litecoin',
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
                href={`/payout-methods/${method.slug}`}
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
