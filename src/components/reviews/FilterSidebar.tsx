'use client'

import { useState, useRef, useEffect } from 'react'

interface FilterSidebarProps {
  filters: FilterCriteria
  onFiltersChange: (filters: FilterCriteria) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
  isOpen: boolean
  onToggle: () => void
}

export interface FilterCriteria {
  expertRating: string
  earningPotential: string
  waysToEarn: string[]
  payoutMethods: string[]
  investmentRequired: boolean
}

export type SortOption = 'default' | 'earning-high-to-low' | 'withdrawal-low-to-high' | 'rating-high-to-low'

export default function FilterSidebar({ 
  filters,
  onFiltersChange,
  onClearFilters,
  hasActiveFilters,
  isOpen,
  onToggle
}: FilterSidebarProps) {
  const [isWaysDropdownOpen, setIsWaysDropdownOpen] = useState(false)
  const [isPayoutDropdownOpen, setIsPayoutDropdownOpen] = useState(false)
  const waysDropdownRef = useRef<HTMLDivElement>(null)
  const payoutDropdownRef = useRef<HTMLDivElement>(null)

  const waysToEarnOptions = [
    'Watching Videos',
    'Playing Games', 
    'Taking Surveys',
    'Typing',
    'Testing',
    'Reading',
    'Doing Data Entry',
    'Installing Apps',
    'Referrals',
    'Sharing Internet',
    'Doing Tasks',
    'Writing',
    'Watching Ads',
    'Writing Reviews',
    'Answering Questions',
    'Listening to Music',
    'Chatting',
    'Shopping Online'
  ]

  const payoutMethodsOptions = [
    'PayPal',
    'Bank Transfer',
    'Check',
    'Payoneer',
    'Skrill',
    'Wise',
    'Revolut',
    'Venmo',
    'Zelle',
    'Papara',
    'QIWI',
    'YooMoney',
    'Gift Cards',
    'Amazon Gift Card',
    'Visa Prepaid Card',
    'MasterCard Prepaid Card',
    'Cryptocurrency',
    'Bitcoin',
    'Ethereum',
    'Litecoin'
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (waysDropdownRef.current && !waysDropdownRef.current.contains(event.target as Node)) {
        setIsWaysDropdownOpen(false)
      }
      if (payoutDropdownRef.current && !payoutDropdownRef.current.contains(event.target as Node)) {
        setIsPayoutDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const updateFilters = (updates: Partial<FilterCriteria>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed lg:sticky top-0 left-0 lg:left-auto h-screen lg:h-screen bg-white border-r border-gray-200 z-50 lg:z-auto transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } w-80 lg:w-72 overflow-y-auto`}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-gray-600 transition-colors lg:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Expert Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expert Rating
            </label>
            <select
              value={filters.expertRating}
              onChange={(e) => updateFilters({ expertRating: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Any Rating</option>
              <option value="5.0">5.0 out of 5</option>
              <option value="4.5">4.5+ out of 5</option>
              <option value="4.0">4.0+ out of 5</option>
              <option value="3.5">3.5+ out of 5</option>
              <option value="3.0">3.0+ out of 5</option>
            </select>
          </div>

          {/* Hourly Earning Potential Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hourly Earning Potential
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="Enter minimum hourly rate"
                value={filters.earningPotential}
                onChange={(e) => updateFilters({ earningPotential: e.target.value })}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter the minimum hourly earning amount (e.g., 5 for $5.00/hr)
            </p>
          </div>

          {/* Ways to Earn Filter */}
          <div ref={waysDropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ways to Earn
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsWaysDropdownOpen(!isWaysDropdownOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-left flex items-center justify-between"
              >
                <span className="text-gray-900">
                  {filters.waysToEarn.length === 0 
                    ? 'Select' 
                    : `${filters.waysToEarn.length} selected`
                  }
                </span>
                <svg className={`w-4 h-4 transition-transform ${isWaysDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isWaysDropdownOpen && (
                <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto top-full mt-1">
                  <div className="p-2">
                    <button
                      type="button"
                      onClick={() => updateFilters({ waysToEarn: [] })}
                      className="w-full text-left px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="border-t border-gray-200">
                    {waysToEarnOptions.map((option) => (
                      <label key={option} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.waysToEarn.includes(option)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateFilters({
                                waysToEarn: [...filters.waysToEarn, option]
                              })
                            } else {
                              updateFilters({
                                waysToEarn: filters.waysToEarn.filter(item => item !== option)
                              })
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payout Methods Filter */}
          <div ref={payoutDropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payout Methods
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPayoutDropdownOpen(!isPayoutDropdownOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-left flex items-center justify-between"
              >
                <span className="text-gray-900">
                  {filters.payoutMethods.length === 0 
                    ? 'Select' 
                    : `${filters.payoutMethods.length} selected`
                  }
                </span>
                <svg className={`w-4 h-4 transition-transform ${isPayoutDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isPayoutDropdownOpen && (
                <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto top-full mt-1">
                  <div className="p-2">
                    <button
                      type="button"
                      onClick={() => updateFilters({ payoutMethods: [] })}
                      className="w-full text-left px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="border-t border-gray-200">
                    {payoutMethodsOptions.map((option) => (
                      <label key={option} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.payoutMethods.includes(option)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateFilters({
                                payoutMethods: [...filters.payoutMethods, option]
                              })
                            } else {
                              updateFilters({
                                payoutMethods: filters.payoutMethods.filter(item => item !== option)
                              })
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Investment Required Filter */}
          <div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.investmentRequired}
                onChange={(e) => {
                  updateFilters({
                    investmentRequired: e.target.checked
                  })
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
              />
              <span className="text-sm font-medium text-gray-700">Investment Required</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Show only websites that require initial investment
            </p>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={onClearFilters}
                className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {filters.expertRating && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Rating: {filters.expertRating}+ out of 5
                  </span>
                )}
                {filters.earningPotential && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Earning: ${filters.earningPotential}+ per hour
                  </span>
                )}
                {filters.waysToEarn && filters.waysToEarn.length > 0 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Ways to Earn: {filters.waysToEarn.length} selected
                  </span>
                )}
                {filters.payoutMethods && filters.payoutMethods.length > 0 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Payout Methods: {filters.payoutMethods.length} selected
                  </span>
                )}
                {filters.investmentRequired && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Investment Required
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
