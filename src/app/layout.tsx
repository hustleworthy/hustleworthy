import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './custom.css'
import Header from '@/components/Header'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hustle Worthy - Find Legit Money Making Websites',
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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="256x256" href="/android-chrome-256x256.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#03a9f4" />
        <meta name="msapplication-TileColor" content="#03a9f4" />
        <meta name="msapplication-TileImage" content="/android-chrome-192x192.png" />
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