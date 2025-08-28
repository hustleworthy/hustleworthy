'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Website } from '@/data/websites'

interface ReviewsGridProps {
  websites: Website[]
  showAllResults?: boolean
}

export default function ReviewsGrid({ websites, showAllResults = false }: ReviewsGridProps) {
  const [displayCount, setDisplayCount] = useState(10)
  
  // If filters are active, show all results. Otherwise, use pagination
  const displayedWebsites = showAllResults ? websites : websites.slice(0, displayCount)
  const hasMore = showAllResults ? false : displayCount < websites.length

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 10, websites.length))
  }

  return (
    <>
      {/* Reviews Grid */}
      <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto px-4 sm:px-6">
        {displayedWebsites.map((website) => (
          <div key={website.sNo} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                {/* Left Side - Website Name and Logo */}
                <div className="w-full lg:w-1/5 flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-center border mx-auto">
                    <div className="text-center">
                      <div className="text-gray-400 text-xs">
                        <Image 
                          alt={`${website.websiteName} logo`} 
                          width={60} 
                          height={60} 
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
                    <a href={website.url || '#'} target="_blank" rel="noopener noreferrer">{website.websiteName || 'Unknown Website'}</a>
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
                      href={`/reviews/${(website.websiteName || 'website').replace(/\s+/g, '-')}`}
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

      {/* Load More Section - Only show when no filters are active */}
      {hasMore && (
        <div className="text-center mt-8 sm:mt-12 px-4">
          <button 
            onClick={loadMore}
            className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 inline-flex items-center gap-2 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Load More Reviews
          </button>
        </div>
      )}

      {/* Show total count when all are loaded or filters are active */}
      {(!hasMore || showAllResults) && websites.length > 0 && (
        <div className="text-center mt-6 sm:mt-8 px-4">
          <p className="text-gray-600 text-sm sm:text-base">
            {showAllResults 
              ? `Showing ${websites.length} filtered results` 
              : `Showing all ${websites.length} website reviews`
            }
          </p>
        </div>
      )}
    </>
  )
}
