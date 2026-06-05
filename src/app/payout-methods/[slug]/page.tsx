import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import PayoutMethodsContainer from '@/components/reviews/PayoutMethodsContainer'
import { getPayoutMethodBySlug } from '@/data/payoutMethodsCategories'
import { parsePayoutMethodsSearchParams } from '@/lib/payoutMethodsFilters'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema, createPageMetadata } from '@/lib/seo'

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
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Payout Methods', path: '/payout-methods' },
          { name: method.name, path: `/payout-methods/${slug}` },
        ])}
      />
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-10 sm:py-14 lg:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">{method.name}</h1>
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

  return createPageMetadata({
    title,
    description,
    path: `/payout-methods/${slug}`,
  })
}
