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
    description: post.metadata?.excerpt || '',
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

      {/* Post Header */}
      <header className="mb-12">
        {/* Category */}
        {post.metadata?.category && (
          <div className="mb-4">
            <Link 
              href={`/categories/${post.metadata.category.slug}`}
              className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white hover:opacity-80 transition-opacity"
              style={{ backgroundColor: post.metadata.category.metadata?.color || '#3B82F6' }}
            >
              {post.metadata.category.metadata?.name}
            </Link>
          </div>
        )}

        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-xl text-gray-600 mb-8">
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
              <Link 
                href={`/authors/${post.metadata?.author?.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {post.metadata?.author?.metadata?.full_name}
              </Link>
            </div>
            <div className="text-gray-600">
              {formatDate(post.metadata?.published_date || '')}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.metadata?.featured_image && (
          <div className="aspect-[16/9] overflow-hidden rounded-lg mb-8">
            <img 
              src={`${post.metadata.featured_image.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover"
              width={800}
              height={450}
            />
          </div>
        )}
      </header>

      {/* Post Content */}
      <article className="prose prose-lg max-w-none mb-12">
        <div 
          dangerouslySetInnerHTML={{ __html: post.metadata?.content || '' }}
        />
      </article>

      {/* Tags */}
      {post.metadata?.tags && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.metadata.tags.split(',').map((tag: string, index: number) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Author Bio */}
      {post.metadata?.author && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
          <div className="flex items-start gap-4">
            {post.metadata.author.metadata?.avatar && (
              <img 
                src={`${post.metadata.author.metadata.avatar.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                alt={post.metadata.author.metadata?.full_name}
                className="w-16 h-16 rounded-full flex-shrink-0"
                width={64}
                height={64}
              />
            )}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                <Link 
                  href={`/authors/${post.metadata.author.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.metadata.author.metadata?.full_name}
                </Link>
              </h4>
              <p className="text-gray-600 mb-3">
                {post.metadata.author.metadata?.bio}
              </p>
              <div className="flex gap-4">
                {post.metadata.author.metadata?.email && (
                  <a 
                    href={`mailto:${post.metadata.author.metadata.email}`}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Email
                  </a>
                )}
                {post.metadata.author.metadata?.twitter && (
                  <a 
                    href={`https://twitter.com/${post.metadata.author.metadata.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Twitter
                  </a>
                )}
                {post.metadata.author.metadata?.linkedin && (
                  <a 
                    href={post.metadata.author.metadata.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}