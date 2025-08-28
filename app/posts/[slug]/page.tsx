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

  const publishedDate = post.metadata?.published_date ? 
    new Date(post.metadata.published_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Link */}
      <Link 
        href="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        ← Back to Blog
      </Link>

      {/* Post Header */}
      <header className="mb-8">
        {/* Category Badge */}
        {post.metadata?.category && (
          <Link 
            href={`/categories/${post.metadata.category.slug}`}
            className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-4"
            style={{ backgroundColor: post.metadata.category.metadata?.color || '#6b7280' }}
          >
            {post.metadata.category.metadata?.name}
          </Link>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>

        {/* Author and Date */}
        <div className="flex items-center gap-4 mb-6">
          {post.metadata?.author && (
            <Link 
              href={`/authors/${post.metadata.author.slug}`}
              className="flex items-center gap-3 hover:text-gray-700"
            >
              {post.metadata.author.metadata?.avatar && (
                <img 
                  src={`${post.metadata.author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata?.full_name}
                  className="w-12 h-12 rounded-full"
                  width={48}
                  height={48}
                />
              )}
              <div>
                <p className="font-medium text-gray-900">
                  {post.metadata.author.metadata?.full_name}
                </p>
                {publishedDate && (
                  <p className="text-sm text-gray-500">{publishedDate}</p>
                )}
              </div>
            </Link>
          )}
        </div>

        {/* Featured Image */}
        {post.metadata?.featured_image && (
          <div className="aspect-video mb-8 rounded-lg overflow-hidden">
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
      <article className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.metadata?.content || '' }} />
      </article>

      {/* Tags */}
      {post.metadata?.tags && (
        <div className="mt-8 pt-8 border-t border-gray-200">
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
    </div>
  )
}