import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { content, reviewId } = await req.json()

  const dbUser = await prisma.User.findUnique({ where: { email: user.email } })
  if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const reply = await prisma.Reply.create({
    data: {
      content,
      reviewId,
      userId: dbUser.id,
    }
  })

  return NextResponse.json(reply)
}
