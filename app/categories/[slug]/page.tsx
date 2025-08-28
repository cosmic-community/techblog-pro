// app/categories/[slug]/page.tsx
import { getCategory, getPostsByCategory, getAllCategories } from '@/lib/cosmic'
import { Category, Post } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PostCard from '@/components/PostCard'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  
  return categories.map((category) => ({
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
    title: `${category.metadata?.name} - TechBlog Pro`,
    description: category.metadata?.description || `Posts in ${category.metadata?.name} category`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug) as Category | null

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id) as Post[]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Link */}
      <Link 
        href="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        ← Back to Blog
      </Link>

      {/* Category Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span 
            className="px-4 py-2 rounded-full text-white font-medium"
            style={{ backgroundColor: category.metadata?.color || '#6b7280' }}
          >
            {category.metadata?.name}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {category.metadata?.name} Posts
        </h1>
        {category.metadata?.description && (
          <p className="text-xl text-gray-600">
            {category.metadata.description}
          </p>
        )}
      </header>

      {/* Posts */}
      <section>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts found in this category.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}