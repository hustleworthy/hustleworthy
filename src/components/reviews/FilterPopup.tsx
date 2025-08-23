'use client'

import { useState } from 'react'
import { Website } from '@/data/websites'

interface FilterPopupProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: FilterCriteria) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export interface FilterCriteria {
  expertRating: string
  earningPotential: string
}

export default function FilterPopup({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  onClearFilters,
  hasActiveFilters 
}: FilterPopupProps) {
  const [filters, setFilters] = useState<FilterCriteria>({
    expertRating: '',
    earningPotential: ''
  })

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleClear = () => {
    setFilters({ expertRating: '', earningPotential: '' })
    onClearFilters()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Filter Reviews</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-6">
          {/* Expert Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expert Rating
            </label>
            <select
              value={filters.expertRating}
              onChange={(e) => setFilters(prev => ({ ...prev, expertRating: e.target.value }))}
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
                onChange={(e) => setFilters(prev => ({ ...prev, earningPotential: e.target.value }))}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter the minimum hourly earning amount (e.g., 5 for $5.00/hr)
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear All
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
