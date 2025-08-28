// app/posts/[slug]/page.tsx
import { getPost, getAllPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  
  return posts.map((post: Post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return {
      title: 'Post not found',
    }
  }

  return {
    title: `${post.title} - TechBlog Pro`,
    description: post.metadata?.excerpt || post.title,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug) as Post | null

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Link */}
      <Link 
        href="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium"
      >
        ← Back to Articles
      </Link>

      <article>
        {/* Header */}
        <header className="mb-8">
          {/* Category */}
          {post.metadata?.category && (
            <Link 
              href={`/categories/${post.metadata.category.slug}`}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white mb-4 hover:opacity-80 transition-opacity"
              style={{ backgroundColor: post.metadata.category.metadata?.color || '#3B82F6' }}
            >
              {post.metadata.category.metadata?.name}
            </Link>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          {post.metadata?.excerpt && (
            <p className="text-xl text-gray-600 mb-6">
              {post.metadata.excerpt}
            </p>
          )}

          {/* Author and Date */}
          <div className="flex items-center gap-4 mb-8">
            {post.metadata?.author?.metadata?.avatar && (
              <img 
                src={`${post.metadata.author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                alt={post.metadata.author.metadata?.full_name}
                className="w-12 h-12 rounded-full"
                width={48}
                height={48}
              />
            )}
            <div>
              <div className="font-semibold text-gray-900">
                {post.metadata?.author && (
                  <Link 
                    href={`/authors/${post.metadata.author.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.metadata.author.metadata?.full_name}
                  </Link>
                )}
              </div>
              <div className="text-sm text-gray-600">
                {formatDate(post.metadata?.published_date || '')}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.metadata?.featured_image && (
            <div className="mb-8">
              <img 
                src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt={post.title}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
                width={800}
                height={400}
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {post.metadata?.content && (
            <div dangerouslySetInnerHTML={{ __html: post.metadata.content }} />
          )}
        </div>

        {/* Tags */}
        {post.metadata?.tags && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.metadata.tags.split(',').map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}