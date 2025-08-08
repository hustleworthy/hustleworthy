'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function ReviewForm({ websiteId }: { websiteId: string }) {
  const { data: session, status } = useSession()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    console.log('Form submission started')
    console.log('Session data:', session)
    console.log('Request data:', { content, websiteId })

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({ content, websiteId }),
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('API Error:', data)
        alert(`Error: ${data.error || 'Failed to submit review'}`)
        return
      }

      console.log('Review created successfully:', data)
      setContent('')
      alert('Review submitted successfully!')
      window.location.reload()
    } catch (error) {
      console.error('Request failed:', error)
      alert('Failed to submit review. Please try again.')
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

  if (!session) {
    return (
      <div className="bg-gray-50 border rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Sign in to write a review</h3>
        <p className="text-gray-600 mb-4">You need to be logged in to share your experience with this website.</p>
        <div className="flex justify-center space-x-3">
          <Link
            href="/auth/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-600">
        Writing as: <strong>{session.user?.name || session.user?.email}</strong>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required
          placeholder="Share your experience with this website..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
        />
        <button 
          type="submit" 
          disabled={loading || !content.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors font-medium"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  )
}