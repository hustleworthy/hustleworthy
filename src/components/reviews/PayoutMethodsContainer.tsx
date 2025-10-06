'use client'

import { useState, useEffect } from 'react'
import { Website } from '@/data/websites'
import ReviewsGrid from './ReviewsGrid'
import FilterSidebar, { FilterCriteria, SortOption } from './FilterSidebar'

interface PayoutMethodsContainerProps {
  payoutMethod: string
}

export default function PayoutMethodsContainer({ payoutMethod }: PayoutMethodsContainerProps) {
  const [websites, setWebsites] = useState<Website[]>([])
  const [filteredWebsites, setFilteredWebsites] = useState<Website[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [filters, setFilters] = useState<FilterCriteria>({
    expertRating: '',
    earningPotential: '',
    waysToEarn: [],
    payoutMethods: [],
    investmentRequired: false
  })
  const [sortBy, setSortBy] = useState<SortOption>('default')

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch('/api/websites')
        if (!response.ok) {
          throw new Error('Failed to fetch websites')
        }
        
        const data = await response.json()
        setWebsites(data)
        // Apply payout method filter immediately
        const filtered = applyPayoutMethodFilter(data, payoutMethod)
        setFilteredWebsites(filtered)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching websites:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWebsites()
  }, [payoutMethod])

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

  // Filter websites by payout method
  const applyPayoutMethodFilter = (websitesToFilter: Website[], targetPayoutMethod: string) => {
    return websitesToFilter.filter(website => {
      const websitePayoutMethods = website.payoutMethods || ''
      // Split the payout methods string by comma and clean up whitespace
      const websiteMethodsList = websitePayoutMethods
        .split(',')
        .map(method => method.trim().toLowerCase())
      
      const targetMethodLower = targetPayoutMethod.toLowerCase()
      
      // Check if this payout method exists in the website's methods
      return websiteMethodsList.some(websiteMethod => {
        // Exact match
        if (websiteMethod === targetMethodLower) {
          return true
        }
        
        // Handle specific mappings for common variations
        const methodMappings: Record<string, string[]> = {
          'paypal': ['paypal', 'paypal cash'],
          'bank transfer': ['bank transfer', 'bank', 'wire transfer', 'direct deposit', 'ach'],
          'check': ['check', 'cheque', 'paper check'],
          'payoneer': ['payoneer', 'payoneer card'],
          'skrill': ['skrill', 'skrill wallet'],
          'wise': ['wise', 'transferwise', 'wise transfer'],
          'revolut': ['revolut', 'revolut card'],
          'venmo': ['venmo'],
          'zelle': ['zelle'],
          'papara': ['papara'],
          'qiwi': ['qiwi', 'qiwi wallet'],
          'yoomoney': ['yoomoney', 'yandex.money', 'yandex money'],
          'gift cards': ['gift cards', 'gift card', 'vouchers', 'rewards'],
          'amazon gift card': ['amazon gift card', 'amazon', 'amazon voucher'],
          'visa prepaid card': ['visa prepaid', 'visa card', 'prepaid visa'],
          'mastercard prepaid card': ['mastercard prepaid', 'mastercard', 'prepaid mastercard'],
          'cryptocurrency': ['cryptocurrency', 'crypto', 'digital currency'],
          'bitcoin': ['bitcoin', 'btc'],
          'ethereum': ['ethereum', 'eth'],
          'litecoin': ['litecoin', 'ltc']
        }
        
        // Check if the target method has any mappings
        const mappings = methodMappings[targetMethodLower]
        if (mappings) {
          return mappings.some(mapping => websiteMethod.includes(mapping))
        }
        
        // For other methods, check if the website method contains the target method
        if (targetMethodLower.length > 3) {
          return websiteMethod.includes(targetMethodLower)
        }
        
        return false
      })
    })
  }

  // Apply additional filters (from FilterSidebar) on top of payout method filtering
  const applyFilters = (websitesToFilter: Website[], filterCriteria: FilterCriteria) => {
    let filtered = [...websitesToFilter]

    // Apply expert rating filter
    if (filterCriteria.expertRating) {
      const minRating = parseFloat(filterCriteria.expertRating)
      filtered = filtered.filter(website => {
        const rating = parseFloat(website.expertRating?.split(' ')[0] || '0')
        return rating >= minRating
      })
    }

    // Apply hourly earning potential filter
    if (filterCriteria.earningPotential) {
      const minEarning = parseFloat(filterCriteria.earningPotential)
      filtered = filtered.filter(website => {
        const earning = parseFloat(website.earningPotentialIn1hr?.replace(/[^0-9.]/g, '') || '0')
        return earning >= minEarning
      })
    }

    // Apply ways to earn filter
    if (filterCriteria.waysToEarn && filterCriteria.waysToEarn.length > 0) {
      filtered = filtered.filter(website => {
        const websiteWaysToEarn = website.waystoEarn || ''
        const websiteWaysList = websiteWaysToEarn
          .split(',')
          .map(way => way.trim().toLowerCase())
        
        return filterCriteria.waysToEarn.every(selectedWay => {
          const selectedWayLower = selectedWay.toLowerCase()
          
          return websiteWaysList.some(websiteWay => {
            if (websiteWay === selectedWayLower) {
              return true
            }
            
            const wayMappings: Record<string, string[]> = {
              'watching videos': ['watching videos', 'videos', 'video watching'],
              'playing games': ['playing games', 'games', 'gaming'],
              'taking surveys': ['taking surveys', 'surveys', 'survey'],
              'doing data entry': ['doing data entry', 'data entry'],
              'installing apps': ['installing apps', 'app install', 'app trials'],
              'doing tasks': ['doing tasks', 'tasks', 'micro-tasks'],
              'watching ads': ['watching ads', 'ads', 'ad viewing'],
              'writing reviews': ['writing reviews', 'reviews'],
              'answering questions': ['answering questions', 'questions'],
              'listening to music': ['listening to music', 'music'],
              'shopping online': ['shopping online', 'shopping', 'online shopping']
            }
            
            const mappings = wayMappings[selectedWayLower]
            if (mappings) {
              return mappings.some(mapping => websiteWay.includes(mapping))
            }
            
            if (selectedWayLower.length > 3) {
              return websiteWay.includes(selectedWayLower)
            }
            
            return false
          })
        })
      })
    }

    // Apply additional payout methods filter (on top of main payout method filter)
    if (filterCriteria.payoutMethods && filterCriteria.payoutMethods.length > 0) {
      filtered = filtered.filter(website => {
        const websitePayoutMethods = website.payoutMethods || ''
        const websiteMethodsList = websitePayoutMethods
          .split(',')
          .map(method => method.trim().toLowerCase())
        
        return filterCriteria.payoutMethods.every(selectedMethod => {
          const selectedMethodLower = selectedMethod.toLowerCase()
          
          return websiteMethodsList.some(websiteMethod => {
            if (websiteMethod === selectedMethodLower) {
              return true
            }
            
            const methodMappings: Record<string, string[]> = {
              'paypal': ['paypal cash', 'paypal'],
              'gift cards': ['gift cards', 'giftcards'],
              'amazon gift card': ['amazon gift card', 'amazon gift cards'],
              'visa prepaid card': ['visa prepaid card', 'visa prepaid'],
              'mastercard prepaid card': ['mastercard prepaid card', 'mastercard prepaid'],
              'bank transfer': ['bank transfer', 'direct deposit', 'wire transfer'],
              'check': ['check', 'cheque'],
              'cryptocurrency': ['crypto', 'cryptocurrency', 'bitcoin', 'ethereum', 'litecoin']
            }
            
            const mappings = methodMappings[selectedMethodLower]
            if (mappings) {
              return mappings.some(mapping => websiteMethod.includes(mapping))
            }
            
            if (selectedMethodLower.length > 3) {
              return websiteMethod.includes(selectedMethodLower)
            }
            
            return false
          })
        })
      })
    }

    // Apply investment required filter
    if (filterCriteria.investmentRequired) {
      filtered = filtered.filter(website => {
        const websiteInvestmentRequired = website.investment || 'No'
        return websiteInvestmentRequired === 'Yes'
      })
    }

    return filtered
  }

  // Check if filters are active
  const hasActiveFilters = !!(filters.expertRating || filters.earningPotential || filters.waysToEarn.length > 0 || filters.payoutMethods.length > 0 || filters.investmentRequired)

  // Update filtering and sorting when filters, sortBy, or payoutMethod changes
  useEffect(() => {
    // First apply payout method filter
    let result = applyPayoutMethodFilter(websites, payoutMethod)
    
    // Then apply additional filters if any are active
    if (hasActiveFilters) {
      result = applyFilters(result, filters)
    }
    
    // Finally apply sorting
    result = applySorting(result, sortBy)
    
    setFilteredWebsites(result)
  }, [websites, payoutMethod, filters, sortBy, hasActiveFilters])

  const clearFilters = () => {
    setFilters({
      expertRating: '',
      earningPotential: '',
      waysToEarn: [],
      payoutMethods: [],
      investmentRequired: false
    })
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading websites...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Websites</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
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
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
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
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
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
                  {hasActiveFilters ? `Filtered ${payoutMethod} Sites` : `${payoutMethod} Sites`}
                </h2>
                <p className="text-sm text-gray-600">
                  {hasActiveFilters 
                    ? `Showing ${filteredWebsites.length} websites that pay via ${payoutMethod.toLowerCase()}` 
                    : `Showing ${filteredWebsites.length} websites that pay via ${payoutMethod.toLowerCase()}`
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
                
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full sm:w-auto px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* No Results Message */}
        {filteredWebsites.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">💳</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Websites Found</h3>
            <p className="text-gray-600">
              {hasActiveFilters 
                ? `No websites match your current filters for ${payoutMethod} payouts.`
                : `We couldn't find any websites that offer ${payoutMethod} payouts.`
              }
              {hasActiveFilters && ' Try adjusting your filters.'}
              {!hasActiveFilters && ' Check back later as we\'re always adding new reviews.'}
            </p>
          </div>
        )}

        {/* Websites Grid */}
        {filteredWebsites.length > 0 && (
          <ReviewsGrid 
            websites={filteredWebsites} 
            showAllResults={true} 
          />
        )}
      </div>
    </div>
  )
}
