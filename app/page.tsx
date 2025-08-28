import { getAllCars, getAllCategories } from '@/lib/cosmic'
import CarCard from '@/components/CarCard'
import CategoryFilter from '@/components/CategoryFilter'
import { Car, Category } from '@/types'

export default async function HomePage() {
  const [cars, categories] = await Promise.all([
    getAllCars(),
    getAllCategories()
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16 bg-gradient-to-r from-red-50 to-gray-50 rounded-2xl p-12">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Premium Motors
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Discover the finest collection of luxury and sports cars. Each vehicle carefully selected for performance, elegance, and prestige.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg">
            Browse Inventory
          </button>
          <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Schedule Test Drive
          </button>
        </div>
      </section>

      {/* Category Filter */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <CategoryFilter categories={categories as Category[]} />
      </section>

      {/* Car Inventory */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Vehicles</h2>
        {cars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No cars found in inventory.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {(cars as Car[]).map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}