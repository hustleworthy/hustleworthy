import { NextResponse } from 'next/server'
import { getAllWebsites } from '@/data/websites'

export async function GET() {
  try {
    const websites = await getAllWebsites()
    return NextResponse.json(websites)
  } catch (error) {
    console.error('Error fetching websites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch websites' },
      { status: 500 }
    )
  }
}
