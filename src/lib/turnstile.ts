const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

type TurnstileVerifyResponse = {
  success: boolean
  'error-codes'?: string[]
}

export type TurnstileVerificationResult = {
  success: boolean
  error?: string
  status: number
  errorCodes?: string[]
}

export function getRequestIp(headers: Headers) {
  const forwardedFor = headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim()
  }

  return headers.get('x-real-ip') || undefined
}

export async function verifyTurnstileToken(
  token: string | null | undefined,
  remoteIp?: string
): Promise<TurnstileVerificationResult> {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET

  if (!secret) {
    return {
      success: false,
      error: 'Turnstile is not configured',
      status: 500,
    }
  }

  if (!token) {
    return {
      success: false,
      error: 'Captcha verification is required',
      status: 400,
    }
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    })

    if (remoteIp) {
      body.set('remoteip', remoteIp)
    }

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      body,
    })

    if (!response.ok) {
      return {
        success: false,
        error: 'Captcha verification failed',
        status: 502,
      }
    }

    const result = (await response.json()) as TurnstileVerifyResponse

    if (!result.success) {
      return {
        success: false,
        error: 'Captcha verification failed',
        status: 400,
        errorCodes: result['error-codes'],
      }
    }

    return {
      success: true,
      status: 200,
    }
  } catch (error) {
    console.error('Turnstile verification error:', error)

    return {
      success: false,
      error: 'Captcha verification failed',
      status: 502,
    }
  }
}
