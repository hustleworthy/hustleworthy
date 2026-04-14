'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Website } from '@/data/websites'
import { FilterCriteria } from './FilterSidebar'

interface ReviewsGridProps {
  websites: Website[]
  currentPage?: number
  filters?: FilterCriteria
  pageSize?: number
  totalWebsitesCount?: number
}

export default function ReviewsGrid({ 
  websites, 
  currentPage = 1, 
  pageSize = 20,
  totalWebsitesCount = 0,
  filters
}: ReviewsGridProps) {
  const totalPages = Math.max(1, Math.ceil(totalWebsitesCount / pageSize))

  // check if filters are set so that can pass to href
  const filtersParams = new URLSearchParams()
  if (filters?.expertRating) {
    filtersParams.set('expertRating', filters.expertRating)
  }
  if (filters?.earningPotential) {
    filtersParams.set('earningPotential', filters.earningPotential)
  }
  if (filters?.waysToEarn) {
    filters.waysToEarn.forEach((way) => filtersParams.append('waysToEarn', way))
  }
  if (filters?.payoutMethods) {
    filters.payoutMethods.forEach((method) => filtersParams.append('payoutMethods', method))
  }
  if (filters?.investmentRequired) {
    filtersParams.set('investmentRequired', 'true')
  }

  //console.log('filtersParams', filtersParams.toString());
  //console.log('filters', filters);
  const makePageHref = (page: number) => (page <= 1 ? `/reviews?${filtersParams.toString()}` : `/reviews/page/${page}?${filtersParams.toString()}`)

  return (
    <>
      {/* Reviews Grid */}
      <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto px-4 sm:px-6">
        {websites.map((website) => (
          <div key={website.sNo} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                {/* Left Side - Website Name and Logo */}
                <div className="w-full lg:w-1/5 flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-center border mx-auto">
                    <div className="text-center">
                      <div className="text-gray-400 text-xs">
                        <img 
                          alt={`${website.websiteName} logo`} 
                          width="60" 
                          height="60" 
                          style={{width: '100%'}} 
                          src={`https://firebasestorage.googleapis.com/v0/b/virtualnod-storage.firebasestorage.app/o/hustleworthy%2Flogo-images%2F${website.websiteName}.png?alt=media`}
                          onError={(e) => {
                            // Fallback to text if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="text-gray-500 font-bold text-lg">${(website.websiteName || 'W').charAt(0)}</div>`;
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-2 sm:mt-3 text-center">
                    <a href={`/reviews/${encodeURIComponent(website.websiteName?.toLowerCase().replace(/\s+/g, '-') || 'website')}`} target="_blank">{website.websiteName || 'Unknown Website'}</a>
                  </h3>
                </div>

                {/* Right Side - Basic Details */}
                <div className="w-full lg:w-4/5 space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 text-sm border border-white rounded-lg overflow-hidden">
                    <div className="border-r-0 sm:border-r border-b border-white p-2 sm:p-3 bg-gray-100">
                      <span className="text-gray-600 font-medium text-xs uppercase tracking-wide">Earning Potential</span>
                      <div className="text-gray-900 font-bold text-base sm:text-lg mt-1">
                        {website.earningPotentialIn1hr || 'N/A'}/hr
                      </div>
                    </div>
                    <div className="border-b border-white p-2 sm:p-3 bg-gray-100">
                      <span className="text-gray-600 font-medium text-xs uppercase tracking-wide">Payout Methods</span>
                      <div className="text-gray-900 font-semibold text-sm sm:text-base mt-1">
                        {website.payoutMethods || 'N/A'}
                      </div>
                    </div>
                    <div className="border-r-0 sm:border-r border-b border-white p-2 sm:p-3 bg-gray-100">
                      <span className="text-gray-600 font-medium text-xs uppercase tracking-wide">Min Withdrawal</span>
                      <div className="text-gray-900 font-semibold text-sm sm:text-base mt-1">
                        {website.minimumWithdrawl || 'N/A'}
                      </div>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-100">
                      <span className="text-gray-600 font-medium text-xs uppercase tracking-wide">Countries</span>
                      <div className="text-gray-900 font-semibold text-sm sm:text-base mt-1">
                        {website.countriesSupported || 'N/A'}
                      </div>
                    </div>
                  </div>

                  {/* Go to Full Review Button */}
                  <div className="flex justify-center sm:justify-end pt-2">
                    <a 
                      rel="nofollow noopener"
                      href={`/reviews/${encodeURIComponent(website.websiteName?.toLowerCase().replace(/\s+/g, '-') || 'website')}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200 text-sm w-full sm:w-auto text-center"
                    >
                      Go to Full Review
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination - Only show when no filters are active */}
      {totalWebsitesCount > 1 && (
        <nav aria-label="Reviews pagination" className="mt-8 sm:mt-12 px-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link
  href={makePageHref(Math.max(1, currentPage - 1))}
  aria-disabled={currentPage <= 1 || currentPage > totalPages}
  className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-colors ${
    currentPage <= 1
      ? 'pointer-events-none opacity-50 border-gray-200 text-gray-500 bg-white'
      : 'border-gray-300 text-gray-800 bg-white hover:bg-gray-50'
  }`}
>
  Previous
</Link>

<div className="text-sm text-gray-600">
  Page <span className="font-semibold text-gray-900">{currentPage}</span> of{' '}
  <span className="font-semibold text-gray-900">{totalPages}</span>
</div>

<Link
  href={makePageHref(Math.min(totalPages, currentPage + 1))}
  aria-disabled={currentPage >= totalPages}
  className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-colors ${
    currentPage >= totalPages
      ? 'pointer-events-none opacity-50 border-gray-200 text-gray-500 bg-white'
      : 'border-gray-300 text-gray-800 bg-white hover:bg-gray-50'
  }`}
>
  Next
</Link>
          </div>
        </nav>
      )}

      <p className="text-center text-gray-600 text-sm mt-4">Showing {websites.length} of {totalWebsitesCount} websites</p>

    </>
  )
}
