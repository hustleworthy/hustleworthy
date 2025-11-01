import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendOwnershipApprovalEmail } from '@/lib/emailService'

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 1) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { verificationRequestId } = body

    if (!verificationRequestId) {
      return NextResponse.json(
        { error: 'Verification request ID is required' },
        { status: 400 }
      )
    }

    // Find the verification request with related data
    const verificationRequest = await prisma.verificationRequest.findUnique({
      where: { id: verificationRequestId },
      include: {
        user: true,
        website: true
      }
    })

    if (!verificationRequest) {
      return NextResponse.json(
        { error: 'Verification request not found' },
        { status: 404 }
      )
    }

    // Update the website with verification status and owner
    const updatedWebsite = await prisma.websites.update({
      where: { sNo: verificationRequest.websiteId },
      data: {
        isVerified: true,
        verifiedOwner: verificationRequest.userId
      }
    })

    // Send confirmation email to the user
    try {
      await sendOwnershipApprovalEmail({
        userEmail: verificationRequest.user.email,
        userName: verificationRequest.user.name,
        websiteName: verificationRequest.website.websiteName || 'Your Website',
        websiteUrl: verificationRequest.website.url || undefined
      })
      console.log('Ownership approval email sent successfully to:', verificationRequest.user.email)
    } catch (emailError) {
      console.error('Failed to send ownership approval email:', emailError)
      // Don't fail the entire operation if email fails
      // The ownership approval should still succeed
    }

    // Optionally, you might want to delete the verification request after approval
    // or mark it as processed if you want to keep a record
    // await prisma.verificationRequest.delete({
    //   where: { id: verificationRequestId }
    // })

    return NextResponse.json({
      success: true,
      message: 'Ownership approved successfully and confirmation email sent',
      website: {
        id: updatedWebsite.sNo,
        name: updatedWebsite.websiteName,
        isVerified: updatedWebsite.isVerified,
        verifiedOwner: updatedWebsite.verifiedOwner
      }
    })

  } catch (error) {
    console.error('Error approving ownership:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
