import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { 
      websiteId, 
      about, 
      waystoEarn, 
      expertTips, 
      payoutMethods, 
      payoutFrequency 
    } = body

    if (!websiteId) {
      return NextResponse.json(
        { error: 'Website ID is required' },
        { status: 400 }
      )
    }

    // First, check if the user is the verified owner of this website
    const website = await prisma.websites.findUnique({
      where: { sNo: websiteId },
      select: { verifiedOwner: true, websiteName: true }
    })

    if (!website) {
      return NextResponse.json(
        { error: 'Website not found' },
        { status: 404 }
      )
    }

    if (website.verifiedOwner !== session.user.id) {
      return NextResponse.json(
        { error: 'You are not authorized to edit this website' },
        { status: 403 }
      )
    }

    // Update the website data
    const updatedWebsite = await prisma.websites.update({
      where: { sNo: parseInt(websiteId) },
      data: {
        about: about || null,
        waystoEarn: waystoEarn || null,
        expertTips: expertTips || null,
        payoutMethods: payoutMethods || null,
        payoutFrequency: payoutFrequency || null,
      },
      select: {
        sNo: true,
        websiteName: true,
        about: true,
        waystoEarn: true,
        expertTips: true,
        payoutMethods: true,
        payoutFrequency: true,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Website updated successfully',
      website: updatedWebsite
    })

  } catch (error) {
    console.error('Error updating website:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
