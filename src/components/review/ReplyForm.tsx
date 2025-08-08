'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function ReplyForm({ reviewId }: { reviewId: string }) {
  const { data: session, status } = useSession()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    await fetch('/api/replies', {
      method: 'POST',
      body: JSON.stringify({ content, reviewId }),
      headers: { 'Content-Type': 'application/json' }
    })

    setContent('')
    setLoading(false)
    window.location.reload()
  }

  if (status === 'loading') {
    return (
      <div className="animate-pulse bg-gray-200 rounded p-2 h-16 mt-3">
        <div className="text-gray-500 text-sm">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="mt-3 p-3 bg-gray-50 border rounded text-center text-sm">
        <span className="text-gray-600">
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in
          </Link>
          {' '}to reply to this review
        </span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-2">
      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        required
        placeholder="Reply to this review..."
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" 
        rows={3}
      />
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Replying as: {session.user?.name || session.user?.email}
        </span>
        <button 
          type="submit" 
          disabled={loading || !content.trim()}
          className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-3 py-1 text-sm rounded transition-colors"
        >
          {loading ? 'Replying...' : 'Reply'}
        </button>
      </div>
    </form>
  )
}
