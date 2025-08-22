'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Star } from 'lucide-react'
import LoginPopup from '../auth/LoginPopup'
import { toast } from 'react-hot-toast'

export default function ReviewForm({ websiteId }: { websiteId: string }) {
  const { data: session, status } = useSession()
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showLoginPopup, setShowLoginPopup] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    // console.log('Form submission started')
    // console.log('Session data:', session)
    // console.log('Request data:', { content, websiteId, rating })

    // Check if user is authenticated first
    if (!session) {
      setShowLoginPopup(true)
      setLoading(false)
      return
    }

    if (rating === 0) {
      toast.error('Please select a rating')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({ content, websiteId, rating }),
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('API Error:', data)
        
        // Check if it's an authentication error
        if (response.status === 401 || data.error?.includes('authentication') || data.error?.includes('unauthorized')) {
          setShowLoginPopup(true)
          return
        }
        
        toast.error(`Error: ${data.error || 'Failed to submit review'}`)
        return
      }

      console.log('Review created successfully:', data)
      setContent('')
      setRating(0)
      toast.success('Review submitted successfully!')
      window.location.reload()
    } catch (error) {
      console.error('Request failed:', error)
      // Check if user might not be authenticated
      if (!session) {
        setShowLoginPopup(true)
      } else {
        toast.error('Failed to submit review. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="animate-pulse bg-gray-200 rounded p-4 h-32">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  // if (!session) {
  //   return (
  //     <div className="bg-gray-50 border rounded-lg p-6 text-center">
  //       <h3 className="text-lg font-medium text-gray-900 mb-2">Sign in to write a review</h3>
  //       <p className="text-gray-600 mb-4">You need to be logged in to share your experience with this website.</p>
  //       <div className="flex justify-center space-x-3">
  //         <Link
  //           href="/auth/login"
  //           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
  //         >
  //           Sign In
  //         </Link>
  //         <Link
  //           href="/auth/signup"
  //           className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
  //         >
  //           Sign Up
  //         </Link>
  //       </div>
  //     </div>
  //   )
  // }

  const handleLoginSuccess = () => {
    // Refresh the page to update the session
    window.location.reload()
  }

  return (
    <div className="space-y-3">
      <LoginPopup 
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        title="Sign in"
        onSuccess={handleLoginSuccess}
      />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Rate your experience
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  className={`h-5 w-5 transition-colors ${
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required
          placeholder="Share your experience with this website..."
          className="text-gray-700 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
        />
        <button 
          type="submit" 
          disabled={loading || !content.trim() || rating === 0}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors font-medium"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  )
}