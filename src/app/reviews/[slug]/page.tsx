import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getWebsiteBySlug } from '@/data/websites'
import Footer from '@/components/Footer'
import ReviewContent from '@/components/reviews/ReviewContent'

interface ReviewPageProps {
  params: Promise<{ slug: string }>
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
  //THIS WILL SHOW AVERAGE OF ALL RATINGS, USER ratings + EXPERT ratings
  const userRatingSum = website.reviews.reduce((sum, r) => sum + (r.rating || 0), 0)
  const totalRatings = ratingCount + (expertRatingValue > 0 ? 1 : 0)
  const aggregateRatingValue = totalRatings > 0
    ? (userRatingSum + expertRatingValue) / totalRatings
    : 0

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
      ratingCount: totalRatings.toString(),
      reviewCount: totalRatings.toString()
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
        <ReviewContent website={website} averageUserRating={averageUserRating} />
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

  const title = `${websiteName} Review - Legit or Scam? Earnings Explained`
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
