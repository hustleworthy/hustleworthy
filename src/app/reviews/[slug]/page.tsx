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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hustleworthy.com'
  const reviewPageUrl = `${baseUrl.replace(/\/$/, '')}/reviews/${slug}`
  const officialUrl = website.url?.trim() || reviewPageUrl

  const reviewDates = website.reviews.map(r => new Date(r.createdAt).getTime()).filter(Number.isFinite)
  const dateCreatedIso =
    reviewDates.length > 0 ? new Date(Math.min(...reviewDates)).toISOString() : undefined
  const dateModifiedIso =
    reviewDates.length > 0 ? new Date(Math.max(...reviewDates)).toISOString() : new Date().toISOString()

  const softwareApplicationSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: website.websiteName || 'Website',
    url: officialUrl,
    applicationCategory: website.type || 'WebApplication',
    operatingSystem: 'Web',
    softwareVersion: '1.0',
    ...(dateCreatedIso ? { dateCreated: dateCreatedIso } : {}),
    dateModified: dateModifiedIso,
    description:
      website.about ||
      website.noteEarningPotential ||
      `${website.websiteName || 'This platform'} — earn-money platform reviewed on Hustleworthy.`,
  ...(totalRatings > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: aggregateRatingValue.toFixed(1),
            reviewCount: totalRatings.toString(),
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
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
