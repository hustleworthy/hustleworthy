'use client'

import { useState } from 'react'
import { User, Websites, VerificationRequest } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface UserInfoCardProps {
  verificationRequest: VerificationRequest & {
    user: User
    website: Websites
  }
}

export default function UserInfoCard({ verificationRequest }: UserInfoCardProps) {
  const { user, website } = verificationRequest
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const router = useRouter()

  const handleApproveOwnership = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/approve-ownership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verificationRequestId: verificationRequest.id
        })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Ownership approved successfully!'
        })
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to approve ownership'
        })
      }
    } catch (error) {
      console.error('Error approving ownership:', error)
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 max-w-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Verification Request Details</h2>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="font-medium text-gray-600 w-32 mb-1 sm:mb-0">Website Name:</label>
            <span className="text-gray-900 font-medium">
              {website.websiteName || 'N/A'}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="font-medium text-gray-600 w-32 mb-1 sm:mb-0">User Name:</label>
            <span className="text-gray-900 font-medium">
              {user.name}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="font-medium text-gray-600 w-32 mb-1 sm:mb-0">User Email:</label>
            <span className="text-gray-900 font-medium">
              {user.email}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="font-medium text-gray-600 w-32 mb-1 sm:mb-0">Website URL:</label>
            <span className="text-gray-900 font-medium">
              {website.url ? (
                <a 
                  href={website.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {website.url}
                </a>
              ) : (
                'N/A'
              )}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="font-medium text-gray-600 w-32 mb-1 sm:mb-0">Request Date:</label>
            <span className="text-gray-900 font-medium">
              {new Date(verificationRequest.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-4">
        {message && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message.text}
          </div>
        )}
        
        <button 
          onClick={handleApproveOwnership}
          disabled={isLoading}
          className={`font-medium py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
          }`}
          type="button"
        >
          {isLoading ? 'Approving...' : 'Approve Ownership'}
        </button>
      </div>
    </div>
  )
}
