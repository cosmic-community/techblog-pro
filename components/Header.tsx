import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TB</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TechBlog Pro</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Home
            </Link>
            <Link href="/categories/web-development" className="text-gray-700 hover:text-gray-900 font-medium">
              Web Development
            </Link>
            <Link href="/categories/design" className="text-gray-700 hover:text-gray-900 font-medium">
              Design
            </Link>
            <Link href="/categories/business" className="text-gray-700 hover:text-gray-900 font-medium">
              Business
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}