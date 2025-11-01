import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import UserInfoCard from '@/components/UserInfoCard'


export const metadata: Metadata = {
  title: 'Verification | Hustle Worthy',
  description: 'Verification for Hustle Worthy',
}

export default async function VerificationPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ vid?: string }> 
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/auth/login')
  }

  if (session.user.role !== 1) {
    return <div className="container mx-auto px-4 py-8 text-center">
      <p className="text-xl font-bold pt-[100px]">You are not authorized to access this page</p>
      <Link href="/" className="text-blue-500 hover:text-blue-700 text-sm font-normal underline">Go to home</Link>
    </div>
  }

  const resolvedSearchParams = await searchParams;
  const vid = resolvedSearchParams.vid;
  console.log("Verification ID: ", vid);

  if (!vid) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">No verification ID provided</p>
          <Link href="/admin" className="text-blue-500 hover:text-blue-700 underline">
            Back to Admin
          </Link>
        </div>
      </div>
    )
  }

  // Fetch verification request with user and website data
  const verificationRequest = await prisma.verificationRequest.findUnique({
    where: { id: vid },
    include: {
      user: true,
      website: true
    }
  });

  if (!verificationRequest) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Verification request not found</p>
          <Link href="/admin" className="text-blue-500 hover:text-blue-700 underline">
            Back to Admin
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Website Ownership Verification</h1>
      <UserInfoCard verificationRequest={verificationRequest} />
    </div>
  )
}