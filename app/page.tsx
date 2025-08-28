import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import { Post, Category } from '@/types'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories()
  ])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to TechBlog Pro
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover insights about web development, design, and business from our expert authors
        </p>
      </section>

      {/* Category Filter */}
      <section className="mb-8">
        <CategoryFilter categories={categories as Category[]} />
      </section>

      {/* Blog Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts found.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {(posts as Post[]).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}