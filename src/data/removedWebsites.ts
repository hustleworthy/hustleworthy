import { slugify } from '@/lib/slugify'

export const REMOVED_WEBSITE_NAMES = [
  'OddsMonkey',
  'Pocket7Games',
  'Mobile Premier League MPL',
  'MPL',
  'Skillz',
  'Skillz Powered Games',
  'WorldWinner',
  'World Winner',
  'Play Fabulous Bingo',
  'LuckyRush',
  'Lucky Rush',
] as const

const REMOVED_WEBSITE_SLUG_ALIASES = [
  'oddsmonkey',
  'pocket7games',
  'mobile-premier-league-mpl',
  'mobile-premier-league',
  'mpl',
  'skillz',
  'skillz-powered-games',
  'worldwinner',
  'world-winner',
  'play-fabulous-bingo',
  'luckyrush',
  'lucky-rush',
] as const

export const REMOVED_WEBSITE_SLUGS = new Set<string>([
  ...REMOVED_WEBSITE_NAMES.map((name) => slugify(name)),
  ...REMOVED_WEBSITE_SLUG_ALIASES,
])

export function isRemovedWebsiteSlug(slug: string | null | undefined): boolean {
  if (!slug) {
    return false
  }

  return REMOVED_WEBSITE_SLUGS.has(slugify(slug))
}

export function isRemovedWebsiteName(name: string | null | undefined): boolean {
  return isRemovedWebsiteSlug(name || '')
}
