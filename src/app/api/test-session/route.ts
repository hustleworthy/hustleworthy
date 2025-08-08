import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    return NextResponse.json({
      hasSession: !!session,
      session: session,
      user: session?.user,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Session test error:', error)
    return NextResponse.json({ 
      error: 'Session test failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
