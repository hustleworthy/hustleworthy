'use client'

import { useState, useEffect } from 'react'
import { Website } from '@/data/websites'
import ReviewsGrid from './ReviewsGrid'
import { SortOption } from './FilterSidebar'

interface PayoutMethodsContainerProps {
  payoutMethod: string
}

export default function PayoutMethodsContainer({ payoutMethod }: PayoutMethodsContainerProps) {
  const [websites, setWebsites] = useState<Website[]>([])
  const [filteredWebsites, setFilteredWebsites] = useState<Website[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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

  // Update sorting when sortBy changes
  useEffect(() => {
    const methodFiltered = applyPayoutMethodFilter(websites, payoutMethod)
    const sorted = applySorting(methodFiltered, sortBy)
    setFilteredWebsites(sorted)
  }, [websites, payoutMethod, sortBy])

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
    <div className="max-w-6xl mx-auto">
      {/* Results Header */}
      <div className="mb-6">
          <div className="flex flex-col lg:flex-row max-w-4xl mx-auto px-4 sm:px-6 items-end lg:items-center lg:justify-end gap-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 items-end ml-auto">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full sm:w-auto appearance-none bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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

      {/* No Results Message */}
      {filteredWebsites.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-gray-400 text-6xl mb-4">💳</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Websites Found</h3>
          <p className="text-gray-600">
            We couldn't find any websites that offer {payoutMethod} payouts. 
            Check back later as we're always adding new reviews.
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
  )
}
