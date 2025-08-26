'use client'

import Image from 'next/image'
import { useState } from 'react'

interface WebsiteImageProps {
  websiteName: string
  className?: string
}

export default function WebsiteImage({ websiteName, className }: WebsiteImageProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <div className="text-gray-500 font-bold text-lg">
          {(websiteName || 'W').charAt(0)}
        </div>
      </div>
    )
  }

  return (
    <Image 
      alt={`${websiteName} logo`} 
      width={100} 
      height={100} 
      src={`https://firebasestorage.googleapis.com/v0/b/virtualnod-storage.firebasestorage.app/o/hustleworthy%2Flogo-images%2F${websiteName}.png?alt=media`}
      onError={() => setImageError(true)}
      className={className}
    />
  )
}
