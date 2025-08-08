import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(req: Request) {
  try {
    console.log('Reviews API called')
    console.log('Request headers:', Object.fromEntries(req.headers.entries()))
    
    // Get session - in App Router we don't need req/res
    const session = await getServerSession(authOptions)
    console.log('Full session:', session)
    
    if (!session || !session.user) {
      console.log('No session found')
      return NextResponse.json({ error: 'Unauthorized - Please login again' }, { status: 401 })
    }
    
    const user = session.user
    console.log('Session user:', user)

    if (!user?.email) {
      console.log('No user email found')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { content, websiteId } = await req.json()
    console.log('Request data:', { content, websiteId })

    if (!content || !websiteId) {
      console.log('Missing content or websiteId')
      return NextResponse.json({ error: 'Content and websiteId are required' }, { status: 400 })
    }

    const dbUser = await prisma.user.findUnique({ where: { email: user.email } })
    console.log('Database user found:', dbUser)
    
    if (!dbUser) {
      console.log('User not found in database')
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if website exists
    const website = await prisma.websites.findUnique({ 
      where: { sNo: parseInt(websiteId) } 
    })
    console.log('Website found:', website)
    
    if (!website) {
      console.log('Website not found')
      return NextResponse.json({ error: 'Website not found' }, { status: 404 })
    }

    const review = await prisma.review.create({
      data: {
        content,
        websiteId: parseInt(websiteId),
        userId: dbUser.id,
      }
    })
    
    console.log('Review created:', review)
    return NextResponse.json(review)
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}