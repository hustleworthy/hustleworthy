import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'


export const metadata: Metadata = {
  title: 'Admin Panel | Hustle Worthy',
  description: 'Admin panel for Hustle Worthy',
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/login')
  }

  if (session.user.role !== 1) {
    return (
    <div className="container mx-auto px-4 py-8 text-center">
      <p className="text-xl font-bold pt-[100px]">You are not authorized to access this page</p>
      <Link href="/" className="text-blue-500 hover:text-blue-700 text-sm font-normal underline">Go to home</Link>
    </div>
    )
  }

  return (
     <div className="container mx-auto px-4 py-8">
       <h1>Admin</h1>
    </div>
  )
}