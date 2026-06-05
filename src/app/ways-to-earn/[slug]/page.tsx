import { notFound } from 'next/navigation'
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
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema, createPageMetadata } from '@/lib/seo'
import { filterWebsites } from '@/lib/websiteFilters'

interface WaysToEarnCategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    expertRating?: string
    earningPotential?: string
    payoutMethods?: string | string[]
    investmentRequired?: string
  }>
}

export default async function WaysToEarnCategoryPage({
  params,
  searchParams,
}: WaysToEarnCategoryPageProps) {
  const { slug } = await params
  const query = await searchParams
  const category = getWaysToEarnCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const filters = parseWaysToEarnSearchParams(query)
  const websites = await getAllWebsites()
  const filteredWebsites = filterWebsites(websites, filters, { wayToEarnCategory: category.name })

  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Ways to Earn', path: '/ways-to-earn' },
          { name: category.name, path: `/ways-to-earn/${slug}` },
        ])}
      />
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
          currentPage={1}
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
}: WaysToEarnCategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getWaysToEarnCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const title = getWaysToEarnCategoryMetaTitle(category.name)
  const description = getWaysToEarnCategoryMetaDescription(category.name)

  return createPageMetadata({
    title,
    description,
    path: `/ways-to-earn/${slug}`,
  })
}
