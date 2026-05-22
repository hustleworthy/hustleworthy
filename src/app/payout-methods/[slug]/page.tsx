import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import PayoutMethodsContainer from '@/components/reviews/PayoutMethodsContainer'
import { getPayoutMethodBySlug } from '@/data/payoutMethodsCategories'
import { parsePayoutMethodsSearchParams } from '@/lib/payoutMethodsFilters'

interface PayoutMethodCategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    expertRating?: string
    earningPotential?: string
    waysToEarn?: string | string[]
    investmentRequired?: string
  }>
}

export default async function PayoutMethodCategoryPage({
  params,
  searchParams,
}: PayoutMethodCategoryPageProps) {
  const { slug } = await params
  const query = await searchParams
  const method = getPayoutMethodBySlug(slug)

  if (!method) {
    notFound()
  }

  const filters = parsePayoutMethodsSearchParams(query)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{method.name}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">{method.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <PayoutMethodsContainer
          payoutMethod={method.name}
          methodSlug={slug}
          currentPage={1}
          filters={filters}
        />
      </div>

      <Footer />
    </div>
  )
}

export async function generateMetadata({
  params,
}: PayoutMethodCategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const method = getPayoutMethodBySlug(slug)

  if (!method) {
    notFound()
  }

  const title = `${method.name} Payout Sites - Earn Money Online | Hustle Worthy`
  const description = `Browse money-making websites that pay through ${method.name}. ${method.description}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
