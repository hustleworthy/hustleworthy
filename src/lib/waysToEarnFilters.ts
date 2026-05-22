import type { FilterCriteria } from '@/components/reviews/FilterSidebar'

export function parseWaysToEarnSearchParams(query: {
  expertRating?: string
  earningPotential?: string
  payoutMethods?: string | string[]
  investmentRequired?: string
}): FilterCriteria {
  return {
    expertRating: query.expertRating || '',
    earningPotential: query.earningPotential || '',
    waysToEarn: [],
    payoutMethods: Array.isArray(query.payoutMethods)
      ? query.payoutMethods
      : query.payoutMethods
        ? [query.payoutMethods]
        : [],
    investmentRequired: query.investmentRequired === 'true',
  }
}
