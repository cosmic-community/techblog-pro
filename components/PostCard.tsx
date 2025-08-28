import Link from 'next/link'
import { Post } from '@/types'

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const publishedDate = post.metadata?.published_date ? 
    new Date(post.metadata.published_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) : null

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Featured Image */}
      {post.metadata?.featured_image && (
        <div className="aspect-video">
          <img 
            src={`${post.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
            width={300}
            height={200}
          />
        </div>
      )}

      <div className="p-6">
        {/* Category Badge */}
        {post.metadata?.category && (
          <Link 
            href={`/categories/${post.metadata.category.slug}`}
            className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-3"
            style={{ backgroundColor: post.metadata.category.metadata?.color || '#6b7280' }}
          >
            {post.metadata.category.metadata?.name}
          </Link>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Author and Date */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          {post.metadata?.author && (
            <Link 
              href={`/authors/${post.metadata.author.slug}`}
              className="flex items-center gap-2 hover:text-gray-700"
            >
              {post.metadata.author.metadata?.avatar && (
                <img 
                  src={`${post.metadata.author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata?.full_name}
                  className="w-6 h-6 rounded-full"
                  width={24}
                  height={24}
                />
              )}
              <span>{post.metadata.author.metadata?.full_name}</span>
            </Link>
          )}
          
          {publishedDate && (
            <span>{publishedDate}</span>
          )}
        </div>
      </div>
    </article>
  )
}