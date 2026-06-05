'use client'

import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

type TurnstileRenderOptions = {
  sitekey: string
  theme?: 'auto' | 'light' | 'dark'
  callback?: (token: string) => void
  'expired-callback'?: () => void
  'error-callback'?: () => void
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileRenderOptions) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
    }
  }
}

type TurnstileWidgetProps = {
  siteKey: string
  onVerify: (token: string) => void
  onExpire: () => void
  onError: () => void
  resetSignal: number
}

export default function TurnstileWidget({
  siteKey,
  onVerify,
  onExpire,
  onError,
  resetSignal,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [scriptReady, setScriptReady] = useState(false)

  useEffect(() => {
    if (window.turnstile) {
      setScriptReady(true)
      return
    }

    const intervalId = window.setInterval(() => {
      if (window.turnstile) {
        setScriptReady(true)
        window.clearInterval(intervalId)
      }
    }, 100)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (!scriptReady || !siteKey || !containerRef.current || !window.turnstile || widgetIdRef.current) {
      return
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: 'light',
      callback: onVerify,
      'expired-callback': onExpire,
      'error-callback': onError,
    })
  }, [scriptReady, siteKey, onVerify, onExpire, onError])

  useEffect(() => {
    if (!resetSignal || !window.turnstile || !widgetIdRef.current) {
      return
    }

    window.turnstile.reset(widgetIdRef.current)
  }, [resetSignal])

  useEffect(() => {
    return () => {
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current)
      }
    }
  }, [])

  return (
    <>
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        async
        defer
        onLoad={() => setScriptReady(true)}
      />
      <div ref={containerRef} className="flex justify-center min-h-[65px]" />
    </>
  )
}
