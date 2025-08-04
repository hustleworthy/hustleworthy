import Link from 'next/link'
import { Search } from 'lucide-react'

export default function Header() {
  return (
    <header className="text-white shadow-lg backdrop-blur-sm" style={{background: 'linear-gradient(90deg, #01579b 0%, #0277bd 50%, #03a9f4 100%)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-white">
              Hustleworthy
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
            <Link href="/comparisons" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
              Comparisons
            </Link>
            <Link href="/blog" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
              Blog
            </Link>
          </nav>

          {/* Monthly Pick Badge */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-white to-gray-100 text-black px-4 py-2 rounded-full shadow-lg border border-white/20">
              <span className="text-sm font-medium">⭐ Monthly Pick:</span>
              <span className="text-sm font-bold text-white px-3 py-1 rounded-full text-xs shadow-md" style={{background: '#03a9f4'}}>
                BigCashWeb
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 