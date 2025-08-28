export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TB</span>
              </div>
              <span className="text-xl font-bold">TechBlog Pro</span>
            </div>
            <p className="text-gray-300">
              Your source for insights about web development, design, and business strategy.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="/categories/web-development" className="text-gray-300 hover:text-white">
                  Web Development
                </a>
              </li>
              <li>
                <a href="/categories/design" className="text-gray-300 hover:text-white">
                  Design
                </a>
              </li>
              <li>
                <a href="/categories/business" className="text-gray-300 hover:text-white">
                  Business
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  RSS Feed
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 TechBlog Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}