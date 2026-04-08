import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './custom.css'
import Header from '@/components/Header'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.hustleworthy.com/#organization',
  name: 'Hustleworthy',
  url: 'https://www.hustleworthy.com/',
  email: 'info@hustleworthy.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.hustleworthy.com/images/logo.png',
  },
  description:
    'Hustleworthy is a directory and review website that helps users discover make-money platforms, side hustle websites, reward apps, GPT sites, and online earning opportunities.',
  sameAs: [
    'https://www.facebook.com/official.hustleworthy/',
    'https://x.com/hustleworthy',
    'https://www.youtube.com/@HustleWorthy',
    'https://www.linkedin.com/company/hustle-worthy/',
  ],
} as const

export const metadata: Metadata = {
  title: 'Find Legit Money Making Websites | Hustle Worthy',
  description: 'Discover and review money-making websites with detailed ratings, payment methods, and user experiences.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-256x256', url: '/android-chrome-256x256.png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#03a9f4" />
        <meta name="msapplication-TileColor" content="#03a9f4" />
        <meta name="msapplication-TileImage" content="/android-chrome-192x192.png" />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2JRGYFELTP"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2JRGYFELTP');
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
} 