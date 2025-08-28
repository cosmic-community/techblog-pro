import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">PM</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">Premium Motors</div>
              <div className="text-sm text-gray-600">Luxury & Sports Cars</div>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Inventory
            </Link>
            <Link href="/categories/luxury" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Luxury
            </Link>
            <Link href="/categories/sports" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Sports Cars
            </Link>
            <Link href="/categories/exotic" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Exotic
            </Link>
            <Link href="/financing" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Financing
            </Link>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-lg">
              Contact Us
            </button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}