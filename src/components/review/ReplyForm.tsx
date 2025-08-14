'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function ReplyForm({ reviewId }: { reviewId: string }) {
  const { data: session, status } = useSession()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false);

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
        <span className="text-gray-600">
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 text-xs">
            Reply
          </Link>
        </span>
    )
  }

  return (
    <>
    <span className="text-blue-600 text-xs" onClick={() => setShowReplyForm(!showReplyForm)}>Reply</span>
    {showReplyForm && (
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
        <button 
          type="submit" 
          disabled={loading || !content.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1 text-sm rounded"
        >
          {loading ? 'Replying...' : 'Reply'}
          </button>
        </div>
      </form>
    )}
    </>
  )
}
