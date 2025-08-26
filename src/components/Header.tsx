'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search, User, LogOut, Menu, X } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const isReviewsPage = pathname?.startsWith('/reviews/')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="text-white shadow-lg backdrop-blur-sm" style={{background: 'linear-gradient(90deg, #01579b 0%, #0277bd 50%, #03a9f4 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-white">
                <Image src="/images/logo.png" alt="Hustleworthy" width={125} height={100} />
              </Link>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex space-x-8">
                  <Link href="/" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
                    Home
                  </Link>
                  <Link href="/reviews" rel="nofollow noopener" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
                    Reviews
                  </Link>
                  <Link href="/best" rel="nofollow noopener" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
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
                  <a href="/reviews/Bigcashweb" target="_blank">BigCashWeb</a>
                </span>
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 text-white hover:text-gray-300 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Auth Section */}
              <div className="flex items-center space-x-2">
                {status === 'loading' ? (
                  <div className="animate-pulse bg-white/20 rounded-full px-4 py-2 w-20 h-8"></div>
                ) : session ? (
                  <div className="flex items-center space-x-2">
                    <span className="hidden sm:inline text-white text-sm font-medium">
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

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          
          {/* Mobile Menu */}
          <div className="fixed top-20 left-0 right-0 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="px-6 py-8 space-y-6">
              {/* Mobile Navigation */}
              <nav className="space-y-4">
                <Link 
                  href="/" 
                  className="block text-gray-800 hover:text-blue-600 text-lg font-medium py-3 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/reviews" 
                  className="block text-gray-800 hover:text-blue-600 text-lg font-medium py-3 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reviews
                </Link>
                <Link 
                  href="/best" 
                  className="block text-gray-800 hover:text-blue-600 text-lg font-medium py-3 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Top Picks
                </Link>
                <Link 
                  href="/blog" 
                  className="block text-gray-800 hover:text-blue-600 text-lg font-medium py-3 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
              </nav>

              {/* Mobile Monthly Pick */}
              <div className="pt-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">⭐ Monthly Pick:</span>
                    <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                      <a href="/reviews/Bigcashweb" target="_blank">BigCashWeb</a>
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-200">
                {status === 'loading' ? (
                  <div className="animate-pulse bg-gray-200 rounded-lg h-12"></div>
                ) : session ? (
                  <div className="space-y-4">
                    <div className="text-gray-800">
                      <p className="text-sm font-medium">Welcome, {session.user?.name || session.user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: '/' })
                        setMobileMenuOpen(false)
                      }}
                      className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors"
                    >
                      <LogOut size={16} />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={16} />
                    <span className="text-sm font-medium">Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 