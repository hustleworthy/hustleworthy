export type PayoutMethodCategory = {
  slug: string
  name: string
  description: string
  icon: string
}

export const PAYOUT_METHODS_CATEGORIES: PayoutMethodCategory[] = [
  { slug: 'paypal', name: 'PayPal', description: 'Sites that pay directly to your PayPal account', icon: '💳' },
  { slug: 'bank-transfer', name: 'Bank Transfer', description: 'Direct bank transfers and wire payments', icon: '🏦' },
  { slug: 'check', name: 'Check', description: 'Physical or digital check payments', icon: '📄' },
  { slug: 'payoneer', name: 'Payoneer', description: 'Payoneer card and account payments', icon: '💳' },
  { slug: 'skrill', name: 'Skrill', description: 'Skrill digital wallet payments', icon: '💳' },
  { slug: 'wise', name: 'Wise', description: 'Wise (formerly TransferWise) payments', icon: '💳' },
  { slug: 'revolut', name: 'Revolut', description: 'Revolut digital banking payments', icon: '💳' },
  { slug: 'venmo', name: 'Venmo', description: 'Venmo mobile payments', icon: '📱' },
  { slug: 'zelle', name: 'Zelle', description: 'Zelle instant bank transfers', icon: '⚡' },
  { slug: 'papara', name: 'Papara', description: 'Papara digital wallet payments', icon: '💳' },
  { slug: 'qiwi', name: 'QIWI', description: 'QIWI wallet payments', icon: '💳' },
  { slug: 'yoomoney', name: 'YooMoney', description: 'YooMoney (formerly Yandex.Money) payments', icon: '💳' },
  { slug: 'gift-cards', name: 'Gift Cards', description: 'Various gift card rewards', icon: '🎁' },
  { slug: 'amazon-gift-card', name: 'Amazon Gift Card', description: 'Amazon gift card rewards', icon: '🛒' },
  { slug: 'visa-prepaid-card', name: 'Visa Prepaid Card', description: 'Visa prepaid card rewards', icon: '💳' },
  { slug: 'mastercard-prepaid-card', name: 'MasterCard Prepaid Card', description: 'MasterCard prepaid card rewards', icon: '💳' },
  { slug: 'cryptocurrency', name: 'Cryptocurrency', description: 'Various cryptocurrency payments', icon: '₿' },
  { slug: 'bitcoin', name: 'Bitcoin', description: 'Bitcoin cryptocurrency payments', icon: '₿' },
  { slug: 'ethereum', name: 'Ethereum', description: 'Ethereum cryptocurrency payments', icon: '⟠' },
  { slug: 'litecoin', name: 'Litecoin', description: 'Litecoin cryptocurrency payments', icon: 'Ł' },
]

export function getPayoutMethodBySlug(slug: string): PayoutMethodCategory | undefined {
  return PAYOUT_METHODS_CATEGORIES.find((method) => method.slug === slug.toLowerCase())
}
