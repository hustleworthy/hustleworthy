import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seedData = [
  {
    sNo: 1,
    websiteName: 'PollPay',
    url: 'https://pollpay.com',
    signUpBonus: '$0.25',
    payoutMethods: 'PayPal Cash, Gift Cards',
    minimumWithdrawl: '$25',
    noteEarningPotential: 'Legitimate platform for surveys, app trials, and micro-tasks with wide availability',
    earningPotentialIn1hr: '$3',
    earningPotentialinaMonth: '$300',
    countriesSupported: 'Global',
    payoutFrequency: '5-7 Days',
    video: 0,
    type: 'Survey Sites',
    expertReview: 'PollPay is a legitimate platform that pays users for surveys, app trials, games and other "micro-tasks." Its major pros are wide availability and multiple payout options (PayPal, gift cards). Major cons include a relatively high $25 USD payout threshold, occasional low-paying "game" tasks (often $0.01/minute at higher levels), and support issues prior to the Prodege acquisition. Earnings are modest; better as a supplemental side income than a primary source.',
    expertRating: '4.9',
    expertTips: 'Complete the initial profiling survey immediately to unlock higher-value surveys. Focus on surveys with longer durations (best pay ratio) and avoid low-pay "game" tasks once past the initial easy tiers. Use referral code to earn 15% commission on referrals\' earnings (provided by PollPay, not deducted from their balance). If possible, switch PayPal currency to EUR (threshold €15) if you live in Europe to redeem faster. Check the "Offers" tab daily for new app-trial or promo tasks that often pay $0.50-$2 each',
    isitLegit: 'true',
    waystoEarn: 'Surveys, App Trials, Games, Micro-tasks',
    about: 'PollPay offers multiple ways to earn money online through surveys, app testing, and various micro-tasks. The platform is owned by Prodege and provides reliable payouts.'
  },
  {
    sNo: 2,
    websiteName: 'CashApp Surveys',
    url: 'https://cashappsurveys.com',
    signUpBonus: '$1.00',
    payoutMethods: 'PayPal, Bank Transfer',
    minimumWithdrawl: '$10',
    noteEarningPotential: 'Quick and easy survey platform with instant cash rewards',
    earningPotentialIn1hr: '$4',
    earningPotentialinaMonth: '$240',
    countriesSupported: 'US, UK, Canada',
    payoutFrequency: '1-3 Days',
    video: 0,
    type: 'Survey Sites',
    expertReview: 'CashApp Surveys offers a streamlined experience for users looking to earn through market research participation. The platform\'s lower payout threshold and faster processing times make it attractive for beginners.',
    expertRating: '4.7',
    expertTips: 'Complete your profile thoroughly for better survey matching. Check for new surveys multiple times per day. Focus on demographic-specific surveys for higher payouts',
    isitLegit: 'true',
    waystoEarn: 'Surveys, Market Research, Product Testing',
    about: 'CashApp Surveys connects users with market research opportunities and provides quick payouts through popular payment apps.'
  },
  {
    sNo: 3,
    websiteName: 'FreelanceHub',
    url: 'https://freelancehub.com',
    signUpBonus: '$0',
    payoutMethods: 'PayPal, Stripe, Bank Transfer',
    minimumWithdrawl: '$20',
    noteEarningPotential: 'Professional freelancing platform connecting skilled workers with high-quality projects',
    earningPotentialIn1hr: '$25',
    earningPotentialinaMonth: '$1500',
    countriesSupported: 'Global',
    payoutFrequency: '2-5 Days',
    video: 0,
    type: 'Freelancing',
    expertReview: 'FreelanceHub stands out in the crowded freelancing space with its focus on quality over quantity. The platform vets both clients and freelancers, resulting in better project matches and fair compensation.',
    expertRating: '4.8',
    expertTips: 'Build a strong portfolio before applying. Focus on long-term client relationships. Specialize in high-demand skills',
    isitLegit: 'true',
    waystoEarn: 'Web Development, Graphic Design, Writing, Digital Marketing',
    about: 'FreelanceHub is a premium freelancing platform that connects skilled professionals with high-quality projects and clients.'
  }
]

async function main() {
  console.log('🌱 Starting seed...')

  // Clean existing data
  await prisma.websites.deleteMany()

  // Seed websites
  for (const websiteData of seedData) {
    const website = await prisma.websites.create({
      data: websiteData
    })

    console.log(`✅ Created website: ${website.websiteName}`)
  }

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })