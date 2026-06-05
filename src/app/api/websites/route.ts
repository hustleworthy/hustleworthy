import { NextRequest, NextResponse } from 'next/server'
import { getAllWebsites } from '@/data/websites'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import type { Website } from '@/data/websites'

function filterFallbackWebsites(
  websites: Website[],
  filters: {
    expertRating: string | null
    earningPotential: string | null
    waysToEarn: string[]
    payoutMethods: string[]
    investmentRequired: string | null
  }
) {
  return websites.filter((website) => {
    const expertRatingValue = Number.parseFloat(website.expertRating || '0')
    const requestedRating = filters.expertRating ? Number.parseFloat(filters.expertRating) : null
    const matchesExpertRating =
      requestedRating === null || Number.isNaN(requestedRating) || expertRatingValue >= requestedRating

    const matchesEarning =
      !filters.earningPotential ||
      (website.earningPotentialIn1hr || '').toLowerCase().includes(filters.earningPotential.toLowerCase())

    const ways = (website.waystoEarn || '').toLowerCase()
    const matchesWays =
      filters.waysToEarn.length === 0 ||
      filters.waysToEarn.some((way) => ways.includes(way.toLowerCase()))

    const payouts = (website.payoutMethods || '').toLowerCase()
    const matchesPayouts =
      filters.payoutMethods.length === 0 ||
      filters.payoutMethods.some((method) => payouts.includes(method.toLowerCase()))

    const matchesInvestment =
      filters.investmentRequired !== 'true' || (website.investment || '').toLowerCase().includes('yes')

    return matchesExpertRating && matchesEarning && matchesWays && matchesPayouts && matchesInvestment
  })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page") || null);
  const limit = 20;
  const skip = (page - 1) * limit;

  const expertRating = searchParams.get("expertRating") || null;
  const earningPotential = searchParams.get("earningPotential") || null;
  const waysToEarnParam = searchParams.get("waysToEarn") || null;
  const payoutMethods = searchParams.get("payoutMethods") || null;
  const investmentRequired = searchParams.get("investmentRequired") || null;

  const waysToEarnArray = waysToEarnParam
  ? waysToEarnParam.split(',').map(item => item.trim())
  : [];

  const payoutMethodsArray = payoutMethods
  ? payoutMethods.split(',').map(item => item.trim())
  : [];

  try {
    console.log('expertRating', expertRating);
    console.log('earningPotential', earningPotential);
    console.log('waysToEarn', waysToEarnParam);
    console.log('payoutMethods', payoutMethods);
    console.log('investmentRequired', investmentRequired);

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

    const fallbackWebsites = filterFallbackWebsites(await getAllWebsites(), {
      expertRating,
      earningPotential,
      waysToEarn: waysToEarnArray,
      payoutMethods: payoutMethodsArray,
      investmentRequired,
    })

    if (page) {
      return NextResponse.json({
        websites: fallbackWebsites.slice(skip, skip + limit),
        total: fallbackWebsites.length,
      })
    }

    return NextResponse.json(fallbackWebsites)
  }
}
