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

// Get all posts with author and category data
export async function getAllPosts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort by published date (newest first)
    const posts = response.objects.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime();
      const dateB = new Date(b.metadata?.published_date || '').getTime();
      return dateB - dateA;
    });
    
    return posts;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts');
  }
}

// Get a single post by slug
export async function getPost(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'posts',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch post');
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

// Get posts by category
export async function getPostsByCategory(categoryId: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort by published date
    const posts = response.objects.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime();
      const dateB = new Date(b.metadata?.published_date || '').getTime();
      return dateB - dateA;
    });
    
    return posts;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts by category');
  }
}

// Get all authors
export async function getAllAuthors() {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch authors');
  }
}

// Get posts by author
export async function getPostsByAuthor(authorId: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.author': authorId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort by published date
    const posts = response.objects.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime();
      const dateB = new Date(b.metadata?.published_date || '').getTime();
      return dateB - dateA;
    });
    
    return posts;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts by author');
  }
}

// Get author by slug
export async function getAuthor(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'authors',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch author');
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