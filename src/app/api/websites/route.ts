import { NextRequest, NextResponse } from 'next/server'
import { getAllWebsites } from '@/data/websites'
import { REVIEWS_PAGE_SIZE, filterWebsites, paginateWebsites } from '@/lib/websiteFilters'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const page = Number.parseInt(searchParams.get('page') || '', 10)
  const hasPage = Number.isFinite(page) && page > 0
  const waysToEarn = searchParams.get('waysToEarn')
  const payoutMethods = searchParams.get('payoutMethods')

  const filters = {
    expertRating: searchParams.get('expertRating') || '',
    earningPotential: searchParams.get('earningPotential') || '',
    waysToEarn: waysToEarn ? waysToEarn.split(',').map((item) => item.trim()).filter(Boolean) : [],
    payoutMethods: payoutMethods ? payoutMethods.split(',').map((item) => item.trim()).filter(Boolean) : [],
    investmentRequired: searchParams.get('investmentRequired') === 'true',
  }

  try {
    const websites = await getAllWebsites()
    const filteredWebsites = filterWebsites(websites, filters)

    if (!hasPage) {
      return NextResponse.json(filteredWebsites)
    }

    return NextResponse.json({
      websites: paginateWebsites(filteredWebsites, page, REVIEWS_PAGE_SIZE),
      total: filteredWebsites.length,
    })
  } catch (error) {
    console.error('Error fetching websites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch websites' },
      { status: 500 }
    )
  }
}
