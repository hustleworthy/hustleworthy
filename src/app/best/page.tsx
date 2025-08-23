import { Metadata } from 'next'
import { getFeaturedWebsites } from '@/data/websites'
import Footer from '@/components/Footer'

// Helper function to parse rating from "4.5 out of 5" format
function parseRating(rating: string): number {
  if (!rating) return 0
  
  // Handle "4.5 out of 5" format
  if (rating.includes('out of')) {
    const match = rating.match(/(\d+\.?\d*)\s*out\s*of\s*(\d+)/i)
    if (match) {
      return parseFloat(match[1])
    }
  }
  
  // Handle "4.5/5" format
  if (rating.includes('/')) {
    const match = rating.match(/(\d+\.?\d*)\s*\/\s*(\d+)/i)
    if (match) {
      return parseFloat(match[1])
    }
  }
  
  // Handle simple number format
  const num = parseFloat(rating)
  return isNaN(num) ? 0 : num
}

export const metadata: Metadata = {
  title: 'Best Online Money Making Website',
  description: 'Tired of scams? Our experts tested dozens of platforms to find the best online money making websites that actually pay. See our top-rated GPT sites, reviews & payment proofs.',
}

export default async function BestPage() {
  // Fetch 5 websites: Swagbucks at top + 4 others by expert rating
  const websites = await getFeaturedWebsites(5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="hero-banner relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
        <div className="wave-animation absolute inset-0 opacity-30"></div>
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Best Online Money Making Websites
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Tired of scams? Our experts tested dozens of platforms to find the best online money making websites that actually pay.
          </p>
        </div>
      </div>

                           {/* Intro Section */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto mb-16">
            {/* Main heading with decorative elements */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#03a9f4] to-blue-600 rounded-full mb-8 shadow-2xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The Results Are In!
              </h2>
              <div className="w-40 h-1.5 bg-gradient-to-r from-[#03a9f4] via-blue-500 to-purple-500 rounded-full mx-auto mb-8"></div>
            </div>
            
            {/* Content in a flowing layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="text-center lg:text-left">
                <div className="bg-gradient-to-br from-[#03a9f4]/10 to-blue-600/10 rounded-2xl p-6 border border-[#03a9f4]/20">
                  <div className="text-3xl font-bold text-[#03a9f4] mb-2">50+</div>
                  <div className="text-gray-700 font-medium">Platforms Tested</div>
                  <div className="text-sm text-gray-600 mt-2">Every major money-making platform analyzed</div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
                  <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
                  <div className="text-gray-700 font-medium">Hours of Testing</div>
                  <div className="text-sm text-gray-600 mt-2">Real-time experience with each platform</div>
                </div>
              </div>
              
              <div className="text-center lg:text-right">
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
                  <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                  <div className="text-gray-700 font-medium">Expert Verified</div>
                  <div className="text-sm text-gray-600 mt-2">All reviews based on personal testing</div>
                </div>
              </div>
            </div>
            
            {/* Description text */}
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Our experts at GPT Critic exhaustively tested and reviewed every major money-making platform, analyzing earning potential, payout reliability, task availability, ease of use, and much more.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Below are our expert's picks for the best Get-Paid-To (GPT) sites of the year, based on their personal experience with each one. Whether you're looking to earn gift cards, PayPal cash, or just some extra spending money, this list has you covered.
              </p>
            </div>
          </div>

        {/* Websites Grid */}
        <div className="space-y-8">
          {websites.map((website, index) => (
            <div key={website.sNo} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Top Badge */}
              <div className="bg-gray-800 px-6 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-white rounded-full px-3 py-1 mr-3">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span className="text-sm font-bold text-gray-800">
                          {index === 0 ? 'Top Overall' : `Top ${website.type || 'Rated'}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-white text-sm font-medium">
                    {index === 0 ? '#1 Overall' : `#${index + 1} in ${website.type || 'Expert Rated'}`}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Side - Branding & CTA */}
                  <div className="space-y-6">
                    <div className="text-center lg:text-left">
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {website.websiteName}
                      </h3>
                      
                      <div className="bg-gray-50 rounded-xl p-6 mb-6">
                        <div className="text-sm text-gray-600 mb-2">Monthly Starting Price</div>
                        <div className="text-4xl font-bold text-gray-900 mb-4">
                          {website.signUpBonus}
                        </div>
                        <a 
                          href={website.url || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-300 text-center"
                        >
                          VISIT SITE 
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Features */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Key Features</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                                               <span className="text-gray-700">
                         <strong>Earning Potential:</strong> {website.earningPotentialIn1hr || 'N/A'}/hr, {website.earningPotentialinaMonth || 'N/A'}/month
                       </span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                                               <span className="text-gray-700">
                         <strong>Payout Methods:</strong> {website.payoutMethods || 'N/A'}
                       </span>
                     </li>
                     <li className="flex items-start">
                       <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                       </svg>
                       <span className="text-gray-700">
                         <strong>Minimum Withdrawal:</strong> {website.minimumWithdrawl || 'N/A'}
                       </span>
                     </li>
                     <li className="flex items-start">
                       <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                       </svg>
                       <span className="text-gray-700">
                         <strong>Countries:</strong> {website.countriesSupported || 'N/A'}
                       </span>
                     </li>
                     <li className="flex items-start">
                       <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                       </svg>
                       <span className="text-gray-700">
                         <strong>Payout Frequency:</strong> {website.payoutFrequency || 'N/A'}
                       </span>
                      </li>
                    </ul>
                    
                    <div className="pt-4">
                      <a 
                        href={website.url || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-600 underline font-medium"
                      >
                                                 Get started on {website.websiteName || 'this platform'} now.
                      </a>
                    </div>
                  </div>
                </div>

                {/* Expert Review Section */}
                <div className="border-t border-gray-200 mt-8 pt-8">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-2xl font-bold text-gray-900 flex items-center">
                      Our Expert's Review
                    </h4>
                    <div className="flex items-center">
                      <div className="flex items-center mr-4">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-5 h-5 ${i < Math.floor(parseRating(website.expertRating ?? '0')) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#03a9f4] to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                             <span className="text-white font-bold text-xl">
                         {(website.websiteName || 'W').charAt(0)}
                       </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h5 className="font-semibold text-gray-900 mr-2">GPT Critic Expert</h5>
                        <span className="text-gray-500 text-sm">(Verified Reviewer)</span>
                      </div>
                      <blockquote className="text-gray-700 leading-relaxed relative">
                        <svg className="absolute -top-2 -left-2 w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                        <span className="ml-4">{website.expertReview}</span>
                        <svg className="absolute -bottom-2 -right-2 w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                      </blockquote>
                      <div className="mt-4">
                        <a 
                                                     href={`/reviews/${(website.websiteName || 'website').toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-[#03a9f4] hover:text-blue-600 font-medium underline"
                        >
                          Go to full review
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features Table */}
                <div className="border-t border-gray-200 mt-8 pt-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Money Back Guarantee</div>
                        <div className="text-lg font-bold text-gray-900">30 days</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Earning Potential</div>
                        <div className="text-lg font-bold text-gray-900">{website.earningPotentialIn1hr}/hr</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Sign Up Bonus</div>
                        <div className="text-lg font-bold text-gray-900">{website.signUpBonus}</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Setup Time</div>
                        <div className="text-lg font-bold text-gray-900">5 minutes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#03a9f4] to-blue-600 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands who trust our expert reviews to find legitimate earning opportunities
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/reviews" 
                className="bg-white text-[#03a9f4] font-bold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors duration-300"
              >
                View All Reviews
              </a>
              <a 
                href="/" 
                className="border-2 border-white/30 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/10 transition-colors duration-300"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
