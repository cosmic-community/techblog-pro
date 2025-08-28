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

// Author object interface
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    full_name: string;
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    twitter?: string;
    linkedin?: string;
  };
}

// Category object interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    color?: string;
  };
}

// Post object interface
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    content: string;
    excerpt?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author: Author;
    category: Category;
    tags?: string;
    published_date?: string;
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
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}