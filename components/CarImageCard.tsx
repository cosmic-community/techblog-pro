'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Car } from '@/types'

interface CarImageCardProps {
  car: Car;
}

export default function CarImageCard({ car }: CarImageCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        {car.metadata?.main_image && (
          <img 
            src={`${car.metadata.main_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={`${car.metadata?.year} ${car.metadata?.make} ${car.metadata?.model}`}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            width={400}
            height={300}
          />
        )}

        {/* Availability Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
            car.metadata?.availability === 'Available' ? 'bg-green-600' :
            car.metadata?.availability === 'Sold' ? 'bg-red-600' : 'bg-yellow-600'
          }`}>
            {car.metadata?.availability}
          </span>
        </div>

        {/* Condition Badge */}
        {car.metadata?.condition && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
              {car.metadata.condition}
            </span>
          </div>
        )}

        {/* Hover Overlay with Details */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className={`absolute bottom-6 left-6 right-6 text-white transform transition-all duration-500 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            {/* Price */}
            <div className="text-3xl font-bold mb-3">
              {formatPrice(car.metadata?.price || 0)}
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="opacity-80">Year:</span>
                <span className="font-semibold">{car.metadata?.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Engine:</span>
                <span className="font-semibold">{car.metadata?.engine}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Power:</span>
                <span className="font-semibold">{car.metadata?.horsepower} HP</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">0-60:</span>
                <span className="font-semibold">{car.metadata?.acceleration}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Top Speed:</span>
                <span className="font-semibold">{car.metadata?.top_speed} mph</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Fuel:</span>
                <span className="font-semibold">{car.metadata?.fuel_type}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <Link 
                href={`/cars/${car.slug}`}
                className="flex-1 bg-red-600 text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                View Details
              </Link>
              <button className="flex-1 border border-white text-white py-2 px-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
                Contact Dealer
              </button>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons (Always Visible) */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
          <div className="flex justify-between">
            <button className="w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Car Info (Always Visible) */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">
            <Link href={`/cars/${car.slug}`} className="hover:text-red-600 transition-colors">
              {car.metadata?.year} {car.metadata?.make} {car.metadata?.model}
            </Link>
          </h3>
          {car.metadata?.brand && (
            <Link 
              href={`/brands/${car.metadata.brand.slug}`}
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              {car.metadata.brand.metadata?.name}
            </Link>
          )}
        </div>

        <p className="text-2xl font-bold text-red-600 mb-3">
          {formatPrice(car.metadata?.price || 0)}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-900">{car.metadata?.horsepower}</div>
            <div className="text-xs">HP</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-900">{car.metadata?.acceleration}</div>
            <div className="text-xs">0-60 mph</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-900">{car.metadata?.transmission}</div>
            <div className="text-xs">Trans</div>
          </div>
        </div>

        {/* Features */}
        {car.metadata?.features && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {car.metadata.features.split(',').slice(0, 3).map((feature: string, index: number) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                >
                  {feature.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            <span className="font-medium">Exterior:</span> {car.metadata?.exterior_color}
          </div>
          <div>
            <span className="font-medium">Interior:</span> {car.metadata?.interior_color}
          </div>
        </div>
      </div>
    </div>
  )
}