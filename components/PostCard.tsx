import Link from 'next/link'
import { Post } from '@/types'

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500">
      {/* Featured Image */}
      <div className="aspect-[16/9] overflow-hidden relative">
        {post.metadata?.featured_image && (
          <img 
            src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            width={400}
            height={225}
          />
        )}
        
        {/* Category Badge */}
        {post.metadata?.category && (
          <div className="absolute top-4 left-4">
            <Link 
              href={`/categories/${post.metadata.category.slug}`}
              className="px-3 py-1 rounded-full text-xs font-medium text-white hover:opacity-80 transition-opacity"
              style={{ backgroundColor: post.metadata.category.metadata?.color || '#3B82F6' }}
            >
              {post.metadata.category.metadata?.name}
            </Link>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
          <div className="p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-3">
              {post.metadata?.author?.metadata?.avatar && (
                <img 
                  src={`${post.metadata.author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata?.full_name}
                  className="w-8 h-8 rounded-full"
                  width={32}
                  height={32}
                />
              )}
              <div>
                <div className="text-sm font-medium">
                  {post.metadata?.author?.metadata?.full_name}
                </div>
                <div className="text-xs opacity-90">
                  {formatDate(post.metadata?.published_date || '')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Post Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Tags */}
        {post.metadata?.tags && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {post.metadata.tags.split(',').slice(0, 3).map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author and Date */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {post.metadata?.author && (
            <Link 
              href={`/authors/${post.metadata.author.slug}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {post.metadata.author.metadata?.avatar && (
                <img 
                  src={`${post.metadata.author.metadata.avatar.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata?.full_name}
                  className="w-6 h-6 rounded-full"
                  width={24}
                  height={24}
                />
              )}
              <span className="font-medium">{post.metadata.author.metadata?.full_name}</span>
            </Link>
          )}
          
          <time className="text-xs text-gray-500">
            {formatDate(post.metadata?.published_date || '')}
          </time>
        </div>
      </div>
    </article>
  )
}