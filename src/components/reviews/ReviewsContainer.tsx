'use client'

import { useState, useEffect } from 'react'
import { Website } from '@/data/websites'
import ReviewsGrid from './ReviewsGrid'
import FilterSidebar, { FilterCriteria, SortOption } from './FilterSidebar'

interface ReviewsContainerProps {
  currentPage?: number
  pageSize?: number
  filters?: FilterCriteria
}

export default function ReviewsContainer({ currentPage = 1, pageSize = 20, filters = {
  expertRating: '',
  earningPotential: '',
  waysToEarn: [],
  payoutMethods: [],
  investmentRequired: false
} }: ReviewsContainerProps) {
  const [websites, setWebsites] = useState<Website[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  //const [filtersState, setFiltersState] = useState<FilterCriteria>(filters)

  const [sortBy, setSortBy] = useState<SortOption>('default')

  const [totalWebsitesCount, setTotalWebsitesCount] = useState(0)

  useEffect(() => {
    const fetchWebsites = async () => {
      //console.log('hit api call');
      const params = new URLSearchParams({
        page: String(currentPage),
        expertRating: filters.expertRating,
        earningPotential: filters.earningPotential,
        waysToEarn: filters.waysToEarn.join(','),
        payoutMethods: filters.payoutMethods.join(','),
        investmentRequired: filters.investmentRequired ? 'true' : 'false',
      });
      const url = `/api/websites?${params.toString()}`;
     // console.log('url', url);
      const response = await fetch(url)
      const data = await response.json()
     // console.log('data', data.websites)
     // console.log('data', data.total)
      setWebsites(data.websites)
      setTotalWebsitesCount(data.total)
      setIsLoading(false)
    }

    fetchWebsites()
  }, [currentPage, filters])

  // console.log('websites', websites);
  // console.log('totalWebsitesCount', totalWebsitesCount);

  useEffect(() => {
    const sortedWebsites = applySorting(websites, sortBy)
    setWebsites(sortedWebsites)
  }, [sortBy])

  // Apply sorting to the filtered websites
  const applySorting = (websitesToSort: Website[], sortOption: SortOption) => {
    const sorted = [...websitesToSort]
    
    switch (sortOption) {
      case 'earning-high-to-low':
        return sorted.sort((a, b) => {
          const earningA = parseFloat(a.earningPotentialIn1hr?.replace(/[^0-9.]/g, '') || '0')
          const earningB = parseFloat(b.earningPotentialIn1hr?.replace(/[^0-9.]/g, '') || '0')
          return earningB - earningA
        })
      
      case 'withdrawal-low-to-high':
        return sorted.sort((a, b) => {
          const withdrawalA = parseFloat(a.minimumWithdrawl?.replace(/[^0-9.]/g, '') || '0')
          const withdrawalB = parseFloat(b.minimumWithdrawl?.replace(/[^0-9.]/g, '') || '0')
          return withdrawalA - withdrawalB
        })
      
      case 'rating-high-to-low':
        return sorted.sort((a, b) => {
          const ratingA = parseFloat(a.expertRating?.split(' ')[0] || '0')
          const ratingB = parseFloat(b.expertRating?.split(' ')[0] || '0')
          return ratingB - ratingA
        })
      
      default:
        return sorted
    }
  }

  // Check if filters are active
  const hasActiveFilters = !!(filters.expertRating || filters.earningPotential || filters.waysToEarn.length > 0 || filters.payoutMethods.length > 0 || filters.investmentRequired)

  const setFilters = (filters: FilterCriteria) => {
    //setFiltersState(filters)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }


  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Reviews</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-6">
      {/* Filter Sidebar */}
      <FilterSidebar
        filters={filters}
        //onFiltersChange={setFilters}
        hasActiveFilters={hasActiveFilters}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={toggleSidebar}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            Filters
          </button>
        </div>

        {/* Results Header */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {hasActiveFilters ? 'Filtered Reviews' : 'All Reviews'}
                </h2>
                <p className="text-sm text-gray-600">
                  {hasActiveFilters 
                    ? `Total ${totalWebsitesCount} website reviews` 
                    : `Total ${totalWebsitesCount} website reviews`
                  }
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full sm:w-auto appearance-none bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="default">Sort by</option>
                    <option value="earning-high-to-low">Earning Potential (High to Low)</option>
                    <option value="withdrawal-low-to-high">Minimum Withdrawal (Low to High)</option>
                    <option value="rating-high-to-low">Ratings (High to Low)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <ReviewsGrid 
          websites={websites} 
          currentPage={currentPage}
          filters={filters}
          pageSize={pageSize}
          totalWebsitesCount={totalWebsitesCount}
        />
      </div>
    </div>
  )
}
