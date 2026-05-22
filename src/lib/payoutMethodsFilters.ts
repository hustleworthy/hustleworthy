import type { FilterCriteria } from '@/components/reviews/FilterSidebar'

export function parsePayoutMethodsSearchParams(query: {
  expertRating?: string
  earningPotential?: string
  waysToEarn?: string | string[]
  investmentRequired?: string
}): FilterCriteria {
  return {
    expertRating: query.expertRating || '',
    earningPotential: query.earningPotential || '',
    waysToEarn: Array.isArray(query.waysToEarn)
      ? query.waysToEarn
      : query.waysToEarn
        ? [query.waysToEarn]
        : [],
    payoutMethods: [],
    investmentRequired: query.investmentRequired === 'true',
  }
}
