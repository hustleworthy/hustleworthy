'use client'

import { Edit, X } from 'lucide-react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Website } from '@/data/websites'

export default function EditWebsiteButton({ website }: { website: Website }) {
    const { data: session } = useSession()
    const [isPopupOpen, setIsPopupOpen] = useState(false)
  
    if (!session?.user) {
      return null
    }
    if (session?.user?.id !== website.verifiedOwner) {
      return null
    }
  
    const handleClose = () => {
      setIsPopupOpen(false)
    }
  
    return (
      <>
        <span className="cursor-pointer">
          <Edit 
            className="w-5 h-5 text-blue-500 hover:text-blue-600 transition-colors" 
            onClick={() => setIsPopupOpen(true)}
          />
        </span>
  
        <EditWebsitePopup
          website={website}
          isOpen={isPopupOpen}
          onClose={handleClose}
        />
      </>
    )
}

interface EditWebsitePopupProps {
  website: Website
  isOpen: boolean
  onClose: () => void
}

function EditWebsitePopup({ website, isOpen, onClose }: EditWebsitePopupProps) {
  const [formData, setFormData] = useState({
    about: website.about || '',
    waystoEarn: website.waystoEarn || '',
    expertTips: website.expertTips || '',
    payoutMethods: website.payoutMethods || '',
    payoutFrequency: website.payoutFrequency || ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const handleSave = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/websites/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          websiteId: website.sNo,
          ...formData
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update website')
      }

      setSuccess(true)
      // Close popup after a short delay to show success message
      setTimeout(() => {
        onClose()
        // Optionally refresh the page to show updated data
        window.location.reload()
      }, 1500)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      about: website.about || '',
      waystoEarn: website.waystoEarn || '',
      expertTips: website.expertTips || '',
      payoutMethods: website.payoutMethods || '',
      payoutFrequency: website.payoutFrequency || ''
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Edit Website Information
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="text-sm text-red-700">
                  <strong>Error:</strong> {error}
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="text-sm text-green-700">
                  <strong>Success:</strong> Website updated successfully! Refreshing...
                </div>
              </div>
            </div>
          )}

          {/* Description/About */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.about}
              onChange={(e) => handleInputChange('about', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              placeholder="Enter website description..."
            />
          </div>

          {/* Ways to Earn */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ways to Earn
            </label>
            <textarea
              value={formData.waystoEarn}
              onChange={(e) => handleInputChange('waystoEarn', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              placeholder="Describe the different ways users can earn money..."
            />
          </div>

          {/* Tips to Earn More */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tips to Earn More
            </label>
            <textarea
              value={formData.expertTips}
              onChange={(e) => handleInputChange('expertTips', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              placeholder="Share expert tips on how to maximize earnings..."
            />
          </div>

          {/* Payout Methods */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payout Methods
            </label>
            <textarea
              value={formData.payoutMethods}
              onChange={(e) => handleInputChange('payoutMethods', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              placeholder="List available payout methods (e.g., PayPal, Bank Transfer, Gift Cards)..."
            />
          </div>

          {/* Payment Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payout Frequency
            </label>
            <textarea
              value={formData.payoutFrequency}
              onChange={(e) => handleInputChange('payoutFrequency', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              placeholder="Enter payout frequency..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || success}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isLoading ? 'Updating...' : success ? 'Updated!' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  )
}