import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Footer from '@/components/Footer'
import ReviewsContainer from '@/components/reviews/ReviewsContainer'
import type { FilterCriteria } from '@/components/reviews/FilterSidebar'
import { getAllWebsites } from '@/data/websites'
import { createPageMetadata } from '@/lib/seo'
import { REVIEWS_PAGE_SIZE, filterWebsites, paginateWebsites } from '@/lib/websiteFilters'

export const metadata: Metadata = createPageMetadata({
  title: 'List Of Money Making Sites | Hustle Worthy',
  description:
    'Browse our comprehensive collection of website reviews. Get expert analysis, user feedback, and detailed insights on earning potential, payout methods, and legitimacy.',
  path: '/reviews',
})

interface ReviewsPaginationPageProps {
  params: Promise<{ page: string }>
  searchParams: Promise<{
    expertRating?: string
    earningPotential?: string
    waysToEarn?: string | string[]
    payoutMethods?: string | string[]
    investmentRequired?: string
  }>
}

export default async function ReviewsPaginationPage({
  params,
  searchParams,
}: ReviewsPaginationPageProps) {
  const { page } = await params
  const query = await searchParams
  const pageNumber = Number.parseInt(page, 10)

  if (!Number.isFinite(pageNumber) || Number.isNaN(pageNumber)) {
    notFound()
  }

  if (pageNumber <= 1) {
    redirect('/reviews')
  }

  if (pageNumber > 1000) {
    notFound()
  }

  const filtersValue: FilterCriteria = {
    expertRating: query.expertRating || '',
    earningPotential: query.earningPotential || '',
    waysToEarn: Array.isArray(query.waysToEarn)
      ? query.waysToEarn
      : query.waysToEarn
        ? [query.waysToEarn]
        : [],
    payoutMethods: Array.isArray(query.payoutMethods)
      ? query.payoutMethods
      : query.payoutMethods
        ? [query.payoutMethods]
        : [],
    investmentRequired: query.investmentRequired === 'true',
  }
  const websites = await getAllWebsites()
  const filteredWebsites = filterWebsites(websites, filtersValue)
  const totalPages = Math.max(1, Math.ceil(filteredWebsites.length / REVIEWS_PAGE_SIZE))

  if (filteredWebsites.length > 0 && pageNumber > totalPages) {
    notFound()
  }

  const initialWebsites = paginateWebsites(filteredWebsites, pageNumber, REVIEWS_PAGE_SIZE)

  //console.log('filtersValue', filtersValue);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-10 sm:py-14 lg:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Money Making Site Reviews</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Expert analysis and user feedback on the best money-making websites. Find legitimate
            platforms that actually pay.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <ReviewsContainer
          currentPage={pageNumber}
          pageSize={REVIEWS_PAGE_SIZE}
          filters={filtersValue}
          initialWebsites={initialWebsites}
          initialTotalWebsitesCount={filteredWebsites.length}
        />
      </div>

      <Footer />
    </div>
  )
}
