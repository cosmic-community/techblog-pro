'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const pathname = usePathname()

  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Link 
        href="/"
        className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
          pathname === '/' 
            ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
        }`}
      >
        All Articles
      </Link>
      
      {categories.map((category) => {
        const isActive = pathname === `/categories/${category.slug}`
        
        return (
          <Link 
            key={category.id}
            href={`/categories/${category.slug}`}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              isActive 
                ? 'text-white shadow-lg transform scale-105' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
            }`}
            style={isActive ? { backgroundColor: category.metadata?.color || '#3B82F6' } : {}}
          >
            {category.metadata?.name}
          </Link>
        )
      })}
    </div>
  )
}