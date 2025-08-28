import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getWebsiteBySlug } from '@/data/websites'
import { Star, CheckCircle, X, User, Calendar, MessageSquare, ExternalLink, Edit } from 'lucide-react'
import Image from 'next/image'
import ReviewForm from '@/components/review/ReviewForm'
import ReplyForm from '@/components/review/ReplyForm'
import Footer from '@/components/Footer'
import VideoReview from '@/components/VideoReview'

interface ReviewPageProps {
  params: Promise<{ slug: string }>
}

function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params
  const website = await getWebsiteBySlug(slug)

  if (!website) {
    notFound()
  }

  // Calculate average user rating
  const userRatings = website.reviews.filter(review => review.rating).map(review => review.rating)
  const averageUserRating = userRatings.length > 0 
    ? userRatings.reduce((sum, rating) => sum + rating, 0) / userRatings.length 
    : 0

  // Build JSON-LD Schema.org structure
  const expertRatingValue = parseFloat((website.expertRating || '0').toString().split(' ')[0]) || 0
  const ratingCount = website.reviews.filter(r => typeof r.rating === 'number').length
  const aggregateRatingValue = ratingCount > 0
    ? (website.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / ratingCount)
    : expertRatingValue

  const reviewsForSchema = website.reviews.slice(0, 20).map(r => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: r.user?.name || 'Anonymous'
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: r.rating || 0,
      bestRating: '5',
      worstRating: '1'
    },
    name: `${website.websiteName} User Review`,
    reviewBody: r.content || '',
    datePublished: r.createdAt instanceof Date ? r.createdAt.toISOString().split('T')[0] : ''
  }))

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: website.websiteName || 'Website',
    description: website.about || website.noteEarningPotential || '',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: aggregateRatingValue.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      ratingCount: ratingCount.toString(),
      reviewCount: ratingCount.toString()
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Folasade Oluwagbenga',
          jobTitle: 'Money Making Expert'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: expertRatingValue || aggregateRatingValue,
          bestRating: '5',
          worstRating: '1'
        },
        name: `Expert Review of ${website.websiteName}`,
        reviewBody: website.about || 'Expert review',
        datePublished: new Date().toISOString().split('T')[0],
        dateModified: new Date().toISOString().split('T')[0],
        publisher: {
          '@type': 'Organization',
          name: 'Hustleworthy'
        }
      },
      ...reviewsForSchema
    ]
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Logo Section */}
                <div className="flex-shrink-0">
                  <div className="w-40 p-2 bg-gray-100 rounded-lg flex items-center justify-center border">
                    <div className="text-center">
                      <div className="text-gray-400 text-xs">
                        <Image alt="logo" width={100} height={200} style={{width: '100%'}} src={`https://firebasestorage.googleapis.com/v0/b/virtualnod-storage.firebasestorage.app/o/hustleworthy%2Flogo-images%2F${website.websiteName}.png?alt=media`}/>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{website.websiteName || 'Unknown Website'}</h1>
                  <h2 className="text-xl text-gray-600 mb-4">Expert and User Insights by {website.websiteName || 'Website'} Customers</h2>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                   <a href="#" className="relative group text-blue-500 hover:text-blue-600 text-sm">
                     Rating Methodology
                     {/* Tooltip */}
                                           <span
                        className="absolute bottom-full left-0 mb-2 
                                   px-4 py-3 text-xs text-gray-700 bg-gray-100 rounded 
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                   whitespace-normal w-64 z-10 leading-relaxed"
                      >
                       We personally test and check each app before writing our review, in addition to it we spend hours reading other user experiences and seeing facts before making our judgement.
                     <span className="absolute top-full left-6 w-2 h-2 bg-gray-100 rotate-45 -mt-1"></span>
                    </span>
                  </a>

                                         <a href="#" className="relative group text-blue-500 hover:text-blue-600 text-sm">
                       Advertising disclosure
                       {/* Tooltip */}
                       <span
                         className="absolute bottom-full left-0 mb-2 
                                    px-4 py-3 text-xs text-gray-700 bg-gray-100 rounded 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                    whitespace-normal w-64 z-10 leading-relaxed"
                       >
                        We do not promote any app or service with affiliate links, all our reviews are honest and transparent. That being said, we do offer providers the option to feature themselves on our platform through advertisement.
                       <span className="absolute top-full left-6 w-2 h-2 bg-gray-100 rotate-45 -mt-1"></span>
                      </span>
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <button className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </button>
                    <button className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                    <button className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                      </svg>
                    </button>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    {website.about || website.noteEarningPotential || 'No description available'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Rating and Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Rating */}
                <div className="text-center items-center justify-center flex flex-col border-r border-gray-200 pr-10">
                  <div className="text-5xl font-bold text-gray-900 mb-2">{website.expertRating?.split(" ")[0] || 'N/A'}</div>
                  <StarRating rating={parseFloat(website.expertRating || '0')} className="justify-center mb-3" />
                  <p className="text-sm text-blue-500">
                    Based on expert ratings
                  </p>
                </div>

                {/* Stats Table */}
                <div className="space-y-2 border-r border-gray-200 pr-10">
                  <div className="mb-4">
                    <span className="text-gray-500 font-semibold text-lg">Stats</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-700 w-2/3">Minimum Withdrawal</span>
                    <span className="font-semibold text-gray-900">{website.minimumWithdrawl || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-700 w-2/3">Countries supported</span>
                    <span className="font-semibold text-gray-900 w-1/3 text-right">{website.countriesSupported || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-700 w-2/3">Earning Potential (1hr)</span>
                    <span className="font-semibold text-gray-900">{website.earningPotentialIn1hr || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-700 w-2/3">Signup Bonus</span>
                    <span className="font-semibold text-gray-900">{website.signUpBonus || 'N/A'}</span>
                  </div>
                </div>

                {/* Visit Button and Affiliate Disclosure */}
                <div className="flex flex-col items-center space-y-6 items-center justify-center">
                  <a 
                    href={website.url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 w-full transition-colors rounded-full text-center block"
                  >
                    Visit {website.websiteName || 'Website'}
                  </a>
                  <p className="text-gray-700 text-center text-sm">Honest Review with no Affiliate ties to the featured platform.</p>
                </div>
                
              </div>
            </div>

            {/* Video Review Section */}
            { website.video === 'yes' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
             <h2 className="text-2xl font-bold text-gray-900 mb-6">Video Review</h2>
             <div className="relative bg-black rounded-lg overflow-hidden align-middle">
              <video 
               controls
               preload="metadata"
               className="lg:min-h-[420px] min-h-[200px] w-full"
              >
               <source 
                src={`https://firebasestorage.googleapis.com/v0/b/virtualnod-storage.firebasestorage.app/o/hustleworthy%2Fvideos%2F${website.websiteName}.mp4?alt=media`} 
                type="video/mp4" 
               />
               Your browser does not support the video tag.
               </video>
              </div>
             </div>
            )}

            {/* Expert Review */}
           <div id="expert-review" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Expert Review</h2>
              
              {/* Expert Profile */}
              <div className="flex items-center mb-2 p-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  <img 
                    src="/images/Folasade-Oluwagbenga.png" 
                    alt="Folasade Oluwagbenga" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Folasade Oluwagbenga</h3>
                  <p className="text-gray-600">Money Making Expert</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                {website.expertReview || 'Expert review information not available.'}
              </p>
            </div>

            {/* Earning Potential */}
            <div id="earning-potential" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Earning Potential</h2>
              <p className="text-gray-700 mb-6">
                {website.noteEarningPotential || 'Earning potential information not available.'}
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Earning Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Monthly Earning Potential</td>
                      <td className="px-4 py-3 text-gray-700">{website.earningPotentialinaMonth || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Hourly Earning Potential</td>
                      <td className="px-4 py-3 text-gray-700">{website.earningPotentialIn1hr || 'N/A'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tips to Earn More */}
            <div id="tips-to-earn" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips to Earn More</h2>
              <div className="text-gray-700 leading-relaxed">
                {website.expertTips || 'No tips available'}
              </div>
            </div>

            {/* Payment Details */}
            <div id="payout-details" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Details</h2>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Payout Methods</td>
                      <td className="px-4 py-3 text-gray-700">{website.payoutMethods || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Payout Frequency</td>
                      <td className="px-4 py-3 text-gray-700">{website.payoutFrequency || 'N/A'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* User Reviews */}
            <div id="user-reviews" className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  User Reviews | <span className="text-blue-600">{website.websiteName}</span>
                </h2>
              </div>

              <div className="space-y-6">
                {/* {website.userReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold">
                          {review.author.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.author}</h4>
                            {review.verified && (
                              <span className="inline-flex items-center text-sm text-green-600">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Pinned review
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        
                        <StarRating rating={review.rating} className="mb-3" />
                        
                        <p className="text-gray-700 mb-4">{review.content}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <button className="flex items-center hover:text-blue-600">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Reply
                          </button>
                          <button className="flex items-center hover:text-blue-600">
                            <Edit className="h-4 w-4 mr-1" />
                            Change review
                          </button>
                          <button className="flex items-center hover:text-blue-600">
                            <span className="mr-1">👍</span>
                            Helpful (6)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}


                <div id="review-form">
                  <ReviewForm websiteId={website.sNo.toString() || ''} />
                </div>

      {/* List of Reviews */}
      <div className="space-y-6 mt-10">
        {website.reviews.map((review) => (
          <div key={review.id} className="border p-4 rounded-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Image 
                  src="/images/profile-picture.png" 
                  alt="User avatar" 
                  width={32} 
                  height={32} 
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-700">{review.user.name}</p>
                  <StarRating rating={review.rating || 0} className="mt-1" />
                </div>
              </div>
              { /* the date shown as like 12th sept 2025*/}
              <span className="text-xs text-gray-500">{review.createdAt.toLocaleString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}</span>
            </div>
            <p className="mt-3 text-gray-700">{review.content}</p>

            {/* Reply Form */}
            <ReplyForm reviewId={review.id} />

            {/* Replies */}
            <div className="ml-4 mt-3 space-y-2">
              {review.replies.map(reply => (
                <div key={reply.id} className="border-l-2 pl-3 text-sm text-gray-700">
                  <p className="font-medium text-gray-700">{reply.user.name}</p>
                  <p className="text-gray-700">{reply.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8 lg:self-start lg:max-h-screen lg:overflow-y-auto">
            {/* Legitimacy Check */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Is {website.websiteName || 'Website'} Legit?
              </h3>
              <div className="mb-1">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {website.isitLegit === 'true' ? 'Yes' : website.isitLegit === 'false' ? 'No' : 'Yes'}
                </div>
              </div>
            </div>

            {/* ScalaHosting Ad */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="mb-4">
                <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">
                  Top Monthly Pick
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">BigCashWeb</h3>
              <p className="text-sm text-gray-600 mb-4"><a href="/reviews/Bigcashweb">Check Detailed Review</a></p>
              <div className="text-right text-xs text-gray-500">📊</div>
            </div>

            {/* Expert Review Stats */}
            <div id="expert-review" className="bg-white rounded-lg shadow-sm p-6">
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <a href="#expert-review" className="text-gray-600">Expert Review</a>
                </li>
                <li className="flex justify-between">
                  <a href="#earning-potential" className="text-gray-600">Earning Potential</a>
                </li>
                <li className="flex justify-between">
                  <a href="#tips-to-earn" className="text-gray-600">Tips to Earn</a>
                </li>
                <li className="flex justify-between">
                  <a href="#payout-details" className="text-gray-600">Payout Details</a>
                </li>
                <li className="flex justify-between">
                  <a href="#user-reviews" className="text-gray-600">User Reviews</a>
                  <span>{averageUserRating.toFixed(1)}</span>
                </li>
              </ul>
              <a href="#review-form" className="btn-primary block w-full mt-8 py-2.5 text-center text-sm cursor-pointer hover:bg-blue-700">Write a review</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const website = await getWebsiteBySlug(slug)

  const websiteName = website?.websiteName || 'This Website'
  const expertRating = (website?.expertRating || '').split(' ')[0] || 'Our'
  const earningMonthly = website?.earningPotentialinaMonth || 'an extra $0'

  const title = `Is ${websiteName} worth it? Read Expert & User Reviews`
  const description = `Our review answers if ${websiteName} is legit. Read User reviews, cashout threshold, proof of payment, and how to earn up to ${earningMonthly} a month.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  }
}