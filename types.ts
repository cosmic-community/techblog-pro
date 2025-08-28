// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Car brand object interface
export interface Brand extends CosmicObject {
  type: 'brands';
  metadata: {
    name: string;
    description?: string;
    logo?: {
      url: string;
      imgix_url: string;
    };
    color?: string;
    country?: string;
  };
}

// Car category object interface  
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    color?: string;
  };
}

// Car object interface
export interface Car extends CosmicObject {
  type: 'cars';
  metadata: {
    price: number;
    year: number;
    make: string;
    model: string;
    engine: string;
    horsepower: number;
    top_speed: number;
    acceleration: string;
    transmission: string;
    fuel_type: string;
    mileage?: number;
    exterior_color: string;
    interior_color: string;
    features: string;
    description: string;
    images: {
      url: string;
      imgix_url: string;
    }[];
    main_image: {
      url: string;
      imgix_url: string;
    };
    brand: Brand;
    category: Category;
    condition: 'New' | 'Used' | 'Certified Pre-Owned';
    availability: 'Available' | 'Sold' | 'Reserved';
    vin?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards
export function isCar(obj: CosmicObject): obj is Car {
  return obj.type === 'cars';
}

export function isBrand(obj: CosmicObject): obj is Brand {
  return obj.type === 'brands';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}