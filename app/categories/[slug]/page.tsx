// app/categories/[slug]/page.tsx
import { getCategory, getCarsByCategory, getAllCategories } from '@/lib/cosmic'
import { Category, Car } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CarCard from '@/components/CarCard'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  
  return categories.map((category: Category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)
  
  if (!category) {
    return {
      title: 'Category not found',
    }
  }

  return {
    title: `${category.metadata?.name} - Premium Motors`,
    description: category.metadata?.description || `${category.metadata?.name} cars for sale`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug) as Category | null

  if (!category) {
    notFound()
  }

  const cars = await getCarsByCategory(category.id) as Car[]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Link */}
      <Link 
        href="/" 
        className="inline-flex items-center text-red-600 hover:text-red-800 mb-8 font-medium"
      >
        ← Back to Inventory
      </Link>

      {/* Category Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span 
            className="px-6 py-3 rounded-full text-white font-medium shadow-lg"
            style={{ backgroundColor: category.metadata?.color || '#dc2626' }}
          >
            {category.metadata?.name}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {category.metadata?.name} Collection
        </h1>
        {category.metadata?.description && (
          <p className="text-xl text-gray-600">
            {category.metadata.description}
          </p>
        )}
      </header>

      {/* Cars */}
      <section>
        {cars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No cars found in this category.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((car: Car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}