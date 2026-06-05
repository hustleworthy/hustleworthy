import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import WaysToEarnContainer from '@/components/reviews/WaysToEarnContainer'
import {
  getWaysToEarnCategoryBySlug,
  getWaysToEarnCategoryHeading,
  getWaysToEarnCategoryMetaDescription,
  getWaysToEarnCategoryMetaTitle,
} from '@/data/waysToEarnCategories'
import { getAllWebsites } from '@/data/websites'
import { parseWaysToEarnSearchParams } from '@/lib/waysToEarnFilters'
import { createPageMetadata } from '@/lib/seo'
import { CATEGORY_PAGE_SIZE, filterWebsites } from '@/lib/websiteFilters'

interface WaysToEarnPaginationPageProps {
  params: Promise<{ slug: string; page: string }>
  searchParams: Promise<{
    expertRating?: string
    earningPotential?: string
    payoutMethods?: string | string[]
    investmentRequired?: string
  }>
}

export default async function WaysToEarnPaginationPage({
  params,
  searchParams,
}: WaysToEarnPaginationPageProps) {
  const { slug, page } = await params
  const query = await searchParams
  const category = getWaysToEarnCategoryBySlug(slug)

  if (!category) {
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
    const payoutMethods = Array.isArray(query.payoutMethods)
      ? query.payoutMethods
      : query.payoutMethods
        ? [query.payoutMethods]
        : []
    payoutMethods.forEach((m) => queryString.append('payoutMethods', m))
    if (query.investmentRequired === 'true') queryString.set('investmentRequired', 'true')
    const qs = queryString.toString()
    redirect(qs ? `/ways-to-earn/${slug}?${qs}` : `/ways-to-earn/${slug}`)
  }

  if (pageNumber > 1000) {
    notFound()
  }

  const filters = parseWaysToEarnSearchParams(query)
  const websites = await getAllWebsites()
  const filteredWebsites = filterWebsites(websites, filters, { wayToEarnCategory: category.name })
  const totalPages = Math.max(1, Math.ceil(filteredWebsites.length / CATEGORY_PAGE_SIZE))

  if (filteredWebsites.length > 0 && pageNumber > totalPages) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-10 sm:py-14 lg:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            {getWaysToEarnCategoryHeading(category.name)}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">{category.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <WaysToEarnContainer
          category={category.name}
          categorySlug={slug}
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
}: WaysToEarnPaginationPageProps): Promise<Metadata> {
  const { slug, page } = await params
  const category = getWaysToEarnCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const pageNumber = Number.parseInt(page, 10)
  const title = getWaysToEarnCategoryMetaTitle(
    category.name,
    Number.isFinite(pageNumber) ? pageNumber : undefined
  )
  const description = getWaysToEarnCategoryMetaDescription(category.name)

  return createPageMetadata({
    title,
    description,
    path: `/ways-to-earn/${slug}`,
  })
}
