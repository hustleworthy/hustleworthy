'use client'

import { useState, useEffect } from 'react'

interface ResponsiveReviewLayoutProps {
  desktopLayout: React.ReactNode
  mobileLayout: React.ReactNode
}

export default function ResponsiveReviewLayout({ desktopLayout, mobileLayout }: ResponsiveReviewLayoutProps) {
  // Always start with false (desktop) to match server render
  // This ensures server and client initial render match exactly
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Mark as mounted and check device size after hydration
    setMounted(true)
    
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    
    // Small delay to ensure React hydration is complete
    const timeoutId = setTimeout(checkDevice, 0)
    window.addEventListener('resize', checkDevice)
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', checkDevice)
    }
  }, [])

  // Always render desktop initially (matches server render exactly)
  // This prevents hydration mismatch
  if (!mounted) {
    return <>{desktopLayout}</>
  }

  // After hydration is complete, render based on screen size
  return <>{isMobile ? mobileLayout : desktopLayout}</>
}
