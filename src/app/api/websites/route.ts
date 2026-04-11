import { NextRequest, NextResponse } from 'next/server'
import { getAllWebsites } from '@/data/websites'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") || null);
    const limit = 20;
    const skip = (page - 1) * limit;

    const expertRating = searchParams.get("expertRating") || null;
    const earningPotential = searchParams.get("earningPotential") || null;
    const waysToEarnParam = searchParams.get("waysToEarn") || null;
    const payoutMethods = searchParams.get("payoutMethods") || null;
    const investmentRequired = searchParams.get("investmentRequired") || null;

    console.log('expertRating', expertRating);
    console.log('earningPotential', earningPotential);
    console.log('waysToEarn', waysToEarnParam);
    console.log('payoutMethods', payoutMethods);
    console.log('investmentRequired', investmentRequired);

    const waysToEarnArray = waysToEarnParam
    ? waysToEarnParam.split(',').map(item => item.trim())
    : [];

    const payoutMethodsArray = payoutMethods
    ? payoutMethods.split(',').map(item => item.trim())
    : [];

    const where: Prisma.WebsitesWhereInput = {
      expertRating: expertRating ? { gte: String(expertRating) } : undefined,
      earningPotentialIn1hr: earningPotential ? { contains: earningPotential, mode: 'insensitive' } : undefined,
      ...(waysToEarnArray.length > 0
        ? {
            OR: waysToEarnArray.map((value) => ({
              waystoEarn: {
                contains: value,
                mode: 'insensitive',
              },
            })),
          }
        : {}),
      ...(payoutMethodsArray.length > 0
        ? {
            OR: payoutMethodsArray.map((value) => ({
              payoutMethods: {
                contains: value,
                mode: 'insensitive',
              },
            })),
          }
        : {}),
      investment: investmentRequired === 'true' ? { contains: 'Yes', mode: 'insensitive' } : undefined,
    }

    if(page) {
      const [websites, total] = await Promise.all([
        prisma.websites.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            sNo: 'asc'
          }
        }),
        prisma.websites.count({
          where
        })
      ])
      //console.log('websites', websites);
      console.log('total', total);
      return NextResponse.json({
        websites,
        total
      })
    }else{
      console.log('no page number is provided')
      const websites = await getAllWebsites()
      return NextResponse.json(websites)
    }
  } catch (error) {
    console.error('Error fetching websites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch websites' },
      { status: 500 }
    )
  }
}
