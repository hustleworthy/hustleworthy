import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import PayoutMethodsContainer from '@/components/reviews/PayoutMethodsContainer'
import { getPayoutMethodBySlug } from '@/data/payoutMethodsCategories'
import { getAllWebsites } from '@/data/websites'
import { parsePayoutMethodsSearchParams } from '@/lib/payoutMethodsFilters'
import { createPageMetadata } from '@/lib/seo'
import { CATEGORY_PAGE_SIZE, filterWebsites } from '@/lib/websiteFilters'

interface PayoutMethodsPaginationPageProps {
  params: Promise<{ slug: string; page: string }>
  searchParams: Promise<{
    expertRating?: string
    earningPotential?: string
    waysToEarn?: string | string[]
    investmentRequired?: string
  }>
}

export default async function PayoutMethodsPaginationPage({
  params,
  searchParams,
}: PayoutMethodsPaginationPageProps) {
  const { slug, page } = await params
  const query = await searchParams
  const method = getPayoutMethodBySlug(slug)

  if (!method) {
    notFound()
  }

  const pageNumber = Number.parseInt(page, 10)

  if (!Number.isFinite(pageNumber) || Number.isNaN(pageNumber)) {
    notFound()
  }

  if (pageNumber <= 1) {
    const queryString = new URLSearchParams()
    if (query.expertRating) queryString.set('expertRating', query.expertRating)
    if (query.earningPotential) queryString.set('earningPotential', query.earningPotential)
    const waysToEarn = Array.isArray(query.waysToEarn)
      ? query.waysToEarn
      : query.waysToEarn
        ? [query.waysToEarn]
        : []
    waysToEarn.forEach((w) => queryString.append('waysToEarn', w))
    if (query.investmentRequired === 'true') queryString.set('investmentRequired', 'true')
    const qs = queryString.toString()
    redirect(qs ? `/payout-methods/${slug}?${qs}` : `/payout-methods/${slug}`)
  }

  if (pageNumber > 1000) {
    notFound()
  }

  const filters = parsePayoutMethodsSearchParams(query)
  const websites = await getAllWebsites()
  const filteredWebsites = filterWebsites(websites, filters, { payoutMethod: method.name })
  const totalPages = Math.max(1, Math.ceil(filteredWebsites.length / CATEGORY_PAGE_SIZE))

  if (filteredWebsites.length > 0 && pageNumber > totalPages) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
          currentPage={pageNumber}
          filters={filters}
          initialWebsites={websites}
          initialFilteredWebsites={filteredWebsites}
        />
      </div>

      <Footer />
    </div>
  )
}

export async function generateMetadata({
  params,
}: PayoutMethodsPaginationPageProps): Promise<Metadata> {
  const { slug, page } = await params
  const method = getPayoutMethodBySlug(slug)

  if (!method) {
    notFound()
  }

  const title = `${method.name} Payout Sites - Page ${page} | Hustle Worthy`
  const description = `Browse money-making websites that pay through ${method.name}. ${method.description}`

  return createPageMetadata({
    title,
    description,
    path: `/payout-methods/${slug}`,
  })
}
