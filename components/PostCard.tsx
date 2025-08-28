import Link from 'next/link'
import { Car } from '@/types'

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <article className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 relative">
      {/* Main Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        {car.metadata?.main_image && (
          <img 
            src={`${car.metadata.main_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={`${car.metadata?.year} ${car.metadata?.make} ${car.metadata?.model}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            width={400}
            height={300}
          />
        )}
        
        {/* Availability Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            car.metadata?.availability === 'Available' 
              ? 'bg-green-500 text-white' 
              : car.metadata?.availability === 'Reserved'
              ? 'bg-yellow-500 text-white'
              : 'bg-red-500 text-white'
          }`}>
            {car.metadata?.availability}
          </span>
        </div>

        {/* Condition Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            {car.metadata?.condition}
          </span>
        </div>

        {/* Hover Overlay with Details */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
          <div className="p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold">Engine</div>
                <div>{car.metadata?.engine}</div>
              </div>
              <div>
                <div className="font-semibold">Horsepower</div>
                <div>{car.metadata?.horsepower} HP</div>
              </div>
              <div>
                <div className="font-semibold">Top Speed</div>
                <div>{car.metadata?.top_speed} mph</div>
              </div>
              <div>
                <div className="font-semibold">0-60</div>
                <div>{car.metadata?.acceleration}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Category Badge */}
        {car.metadata?.category && (
          <Link 
            href={`/categories/${car.metadata.category.slug}`}
            className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-3 hover:opacity-80 transition-opacity"
            style={{ backgroundColor: car.metadata.category.metadata?.color || '#dc2626' }}
          >
            {car.metadata.category.metadata?.name}
          </Link>
        )}

        {/* Car Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          <Link href={`/cars/${car.slug}`} className="hover:text-red-600 transition-colors">
            {car.metadata?.year} {car.metadata?.make} {car.metadata?.model}
          </Link>
        </h2>

        {/* Price */}
        <div className="text-2xl font-bold text-red-600 mb-3">
          {formatPrice(car.metadata?.price || 0)}
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <span className="font-medium">Mileage:</span>
            <span>{car.metadata?.mileage?.toLocaleString() || 'N/A'} mi</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Fuel:</span>
            <span>{car.metadata?.fuel_type}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Exterior:</span>
            <span>{car.metadata?.exterior_color}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Interior:</span>
            <span>{car.metadata?.interior_color}</span>
          </div>
        </div>

        {/* Brand and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {car.metadata?.brand && (
            <Link 
              href={`/brands/${car.metadata.brand.slug}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {car.metadata.brand.metadata?.logo && (
                <img 
                  src={`${car.metadata.brand.metadata.logo.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                  alt={car.metadata.brand.metadata?.name}
                  className="w-6 h-6 rounded-full"
                  width={24}
                  height={24}
                />
              )}
              <span className="font-medium">{car.metadata.brand.metadata?.name}</span>
            </Link>
          )}
          
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors font-medium">
              View Details
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Test Drive
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}