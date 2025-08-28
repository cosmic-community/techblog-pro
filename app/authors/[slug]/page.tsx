// app/authors/[slug]/page.tsx
import { getAuthor, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PostCard from '@/components/PostCard'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  
  return authors.map((author: Author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug)
  
  if (!author) {
    return {
      title: 'Author not found',
    }
  }

  return {
    title: `${author.metadata?.full_name} - TechBlog Pro`,
    description: author.metadata?.bio || `Articles by ${author.metadata?.full_name}`,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug) as Author | null

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id) as Post[]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Link */}
      <Link 
        href="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium"
      >
        ← Back to Articles
      </Link>

      {/* Author Header */}
      <header className="mb-12 text-center">
        {author.metadata?.avatar && (
          <div className="mb-6">
            <img 
              src={`${author.metadata.avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={author.metadata?.full_name}
              className="w-32 h-32 rounded-full mx-auto shadow-lg"
              width={128}
              height={128}
            />
          </div>
        )}
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {author.metadata?.full_name}
        </h1>
        
        {author.metadata?.bio && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            {author.metadata.bio}
          </p>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          {author.metadata?.email && (
            <a 
              href={`mailto:${author.metadata.email}`}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Email
            </a>
          )}
          {author.metadata?.twitter && (
            <a 
              href={`https://twitter.com/${author.metadata.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Twitter
            </a>
          )}
          {author.metadata?.linkedin && (
            <a 
              href={author.metadata.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              LinkedIn
            </a>
          )}
        </div>
      </header>

      {/* Posts */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Articles by {author.metadata?.full_name}
        </h2>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts found by this author.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}