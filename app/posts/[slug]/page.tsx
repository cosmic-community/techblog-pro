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
  
  return posts.map((post) => ({
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
    title: post.title,
    description: post.metadata?.excerpt || 'Read more on TechBlog Pro',
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
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Link */}
      <Link 
        href="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        ← Back to Blog
      </Link>

      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        
        {post.metadata?.excerpt && (
          <p className="text-xl text-gray-600 mb-6">
            {post.metadata.excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          {post.metadata?.author && (
            <Link 
              href={`/authors/${post.metadata.author.slug}`}
              className="flex items-center gap-2 hover:text-gray-700"
            >
              {post.metadata.author.metadata?.avatar && (
                <img 
                  src={`${post.metadata.author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata.full_name}
                  className="w-8 h-8 rounded-full"
                  width={32}
                  height={32}
                />
              )}
              <span>By {post.metadata.author.metadata.full_name}</span>
            </Link>
          )}
          
          {post.metadata?.category && (
            <Link 
              href={`/categories/${post.metadata.category.slug}`}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: post.metadata.category.metadata?.color || '#gray-200',
                color: '#fff'
              }}
            >
              {post.metadata.category.metadata.name}
            </Link>
          )}
          
          {publishedDate && (
            <span>{publishedDate}</span>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {post.metadata?.featured_image && (
        <div className="mb-8">
          <img 
            src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full rounded-lg shadow-lg"
            width={600}
            height={300}
          />
        </div>
      )}

      {/* Post Content */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.metadata?.content || '' }}
      />

      {/* Tags */}
      {post.metadata?.tags && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.metadata.tags.split(',').map((tag: string, index: number) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Author Bio */}
      {post.metadata?.author && (
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
          <div className="flex items-start gap-4">
            {post.metadata.author.metadata?.avatar && (
              <img 
                src={`${post.metadata.author.metadata.avatar.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                alt={post.metadata.author.metadata.full_name}
                className="w-16 h-16 rounded-full"
                width={64}
                height={64}
              />
            )}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                {post.metadata.author.metadata.full_name}
              </h4>
              {post.metadata.author.metadata?.bio && (
                <p className="text-gray-600 mb-3">
                  {post.metadata.author.metadata.bio}
                </p>
              )}
              <div className="flex gap-3">
                {post.metadata.author.metadata?.twitter && (
                  <a 
                    href={`https://twitter.com/${post.metadata.author.metadata.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Twitter
                  </a>
                )}
                {post.metadata.author.metadata?.linkedin && (
                  <a 
                    href={post.metadata.author.metadata.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}