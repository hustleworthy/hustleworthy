'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { CSSProperties } from 'react'
import { getFirebaseLogoUrl } from '@/lib/media'

interface WebsiteImageProps {
  websiteName: string
  alt: string
  width?: number | string
  height?: number | string
  style?: CSSProperties
  className?: string
}

function parsePixelValue(value: number | string | undefined, fallback: number) {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const parsed = Number.parseInt(value, 10)
    return Number.isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

function toCssSize(value: number | string | undefined, fallback: number) {
  if (typeof value === 'number') return `${value}px`
  return value || `${fallback}px`
}

export default function WebsiteImage({ 
  websiteName, 
  alt, 
  width = "100px", 
  height = "100px", 
  style,
  className 
}: WebsiteImageProps) {
  const [failed, setFailed] = useState(false)
  const numericWidth = parsePixelValue(width, 100)
  const numericHeight = parsePixelValue(height, numericWidth)
  const imageUrl = websiteName ? getFirebaseLogoUrl(websiteName) : ''
  const fallbackInitial = (websiteName || 'W').trim().charAt(0).toUpperCase()
  const imageStyle =
    style && style.width !== undefined && style.height === undefined ? { ...style, height: 'auto' } : style

  if (failed || !imageUrl) {
    return (
      <div
        aria-label={alt}
        className={`flex items-center justify-center rounded-md bg-gray-100 text-gray-500 font-bold ${className || ''}`}
        style={{
          width: toCssSize(width, 100),
          height: toCssSize(height, numericHeight),
          ...style,
        }}
      >
        {fallbackInitial}
      </div>
    )
  }

  return (
    <Image
      alt={alt}
      width={numericWidth}
      height={numericHeight}
      style={imageStyle}
      className={className || 'w-[100px] h-auto object-contain'}
      src={imageUrl}
      sizes={`${numericWidth}px`}
      onError={() => setFailed(true)}
    />
  )
}
