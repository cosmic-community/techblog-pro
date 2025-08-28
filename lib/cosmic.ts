import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all cars with brand and category data
export async function getAllCars() {
  try {
    const response = await cosmic.objects
      .find({ type: 'cars' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort by price (lowest first)
    const cars = response.objects.sort((a: any, b: any) => {
      const priceA = a.metadata?.price || 0;
      const priceB = b.metadata?.price || 0;
      return priceA - priceB;
    });
    
    return cars;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch cars');
  }
}

// Get a single car by slug
export async function getCar(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'cars',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch car');
  }
}

// Get all categories
export async function getAllCategories() {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Get cars by category
export async function getCarsByCategory(categoryId: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'cars',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort by price
    const cars = response.objects.sort((a: any, b: any) => {
      const priceA = a.metadata?.price || 0;
      const priceB = b.metadata?.price || 0;
      return priceA - priceB;
    });
    
    return cars;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch cars by category');
  }
}

// Get all brands
export async function getAllBrands() {
  try {
    const response = await cosmic.objects
      .find({ type: 'brands' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch brands');
  }
}

// Get cars by brand
export async function getCarsByBrand(brandId: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'cars',
        'metadata.brand': brandId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort by price
    const cars = response.objects.sort((a: any, b: any) => {
      const priceA = a.metadata?.price || 0;
      const priceB = b.metadata?.price || 0;
      return priceA - priceB;
    });
    
    return cars;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch cars by brand');
  }
}

// Get brand by slug
export async function getBrand(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'brands',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch brand');
  }
}

// Get category by slug
export async function getCategory(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'categories',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch category');
  }
}