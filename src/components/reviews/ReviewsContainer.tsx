'use client'

import { useState, useEffect } from 'react'
import { Website } from '@/data/websites'
import ReviewsGrid from './ReviewsGrid'
import FilterPopup, { FilterCriteria } from './FilterPopup'

export default function ReviewsContainer() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [filteredWebsites, setFilteredWebsites] = useState<Website[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<FilterCriteria | null>(null)

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
        setFilteredWebsites(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching websites:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWebsites()
  }, [])

  const applyFilters = (filters: FilterCriteria) => {
    let filtered = [...websites]

    // Apply expert rating filter
    if (filters.expertRating) {
      const minRating = parseFloat(filters.expertRating)
      filtered = filtered.filter(website => {
        const rating = parseFloat(website.expertRating?.split(' ')[0] || '0')
        return rating >= minRating
      })
    }

    // Apply hourly earning potential filter
    if (filters.earningPotential) {
      const minEarning = parseFloat(filters.earningPotential)
      filtered = filtered.filter(website => {
        const earning = parseFloat(website.earningPotentialIn1hr?.replace(/[^0-9.]/g, '') || '0')
        return earning >= minEarning
      })
    }

    setFilteredWebsites(filtered)
    setActiveFilters(filters)
  }

  const clearFilters = () => {
    setFilteredWebsites(websites)
    setActiveFilters(null)
  }

  const openFilterPopup = () => {
    setIsFilterPopupOpen(true)
  }

  const closeFilterPopup = () => {
    setIsFilterPopupOpen(false)
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
    <>
      {/* Filter Header */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {activeFilters ? 'Filtered Results' : 'All Reviews'}
              </h2>
              <p className="text-sm text-gray-600">
                {activeFilters 
                  ? `Showing ${filteredWebsites.length} filtered results` 
                  : `Showing ${websites.length} website reviews`
                }
              </p>
              {activeFilters && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeFilters.expertRating && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Rating: {activeFilters.expertRating}+ out of 5
                    </span>
                  )}
                  {activeFilters.earningPotential && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Earning: ${activeFilters.earningPotential}+ per hour
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              {activeFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              )}
              <button
                onClick={openFilterPopup}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                Filter Reviews
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <ReviewsGrid 
        websites={filteredWebsites} 
        showAllResults={!!activeFilters} 
      />

      {/* Filter Popup */}
      <FilterPopup
        isOpen={isFilterPopupOpen}
        onClose={closeFilterPopup}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
        hasActiveFilters={!!activeFilters}
      />
    </>
  )
}
