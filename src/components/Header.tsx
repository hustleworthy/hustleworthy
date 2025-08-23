'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search, User, LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const isReviewsPage = pathname?.startsWith('/reviews/')
  return (
    <header className="text-white shadow-lg backdrop-blur-sm" style={{background: 'linear-gradient(90deg, #01579b 0%, #0277bd 50%, #03a9f4 100%)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-white">
              <Image src="/images/logo.png" alt="Hustleworthy" width={125} height={100} />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
                  Home
                </Link>
                <Link href="/reviews" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
                  Reviews
                </Link>
                <Link href="/best" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
                  Top Picks
                </Link>
                <Link href="/blog" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
                  Blog
                </Link>
          </nav>

          {/* Monthly Pick Badge & Auth */}
          <div className="flex items-center space-x-4">
            
            <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-white to-gray-100 text-black px-4 py-2 rounded-full shadow-lg border border-white/20">
              <span className="text-sm font-medium">⭐ Monthly Pick:</span>
              <span className="text-sm font-bold text-white px-3 py-1 rounded-full text-xs shadow-md" style={{background: '#03a9f4'}}>
                <a href="/reviews/swagbucks" target="_blank">Swagbucks</a>
              </span>
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-2">
              {status === 'loading' ? (
                <div className="animate-pulse bg-white/20 rounded-full px-4 py-2 w-20 h-8"></div>
              ) : session ? (
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm font-medium">
                    {session.user?.name || session.user?.email}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
                  >
                    <LogOut size={16} />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/auth/login"
                    className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
                  >
                    <User size={16} />
                    <span className="text-sm">Login</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 