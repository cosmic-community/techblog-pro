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
    description: author.metadata?.bio || `Posts by ${author.metadata?.full_name}`,
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Link */}
      <Link 
        href="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        ← Back to Blog
      </Link>

      {/* Author Header */}
      <header className="mb-12">
        <div className="flex items-center gap-6 mb-6">
          {author.metadata?.avatar && (
            <img 
              src={`${author.metadata.avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={author.metadata?.full_name}
              className="w-24 h-24 rounded-full"
              width={96}
              height={96}
            />
          )}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {author.metadata?.full_name}
            </h1>
            {author.metadata?.bio && (
              <p className="text-xl text-gray-600">
                {author.metadata.bio}
              </p>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          {author.metadata?.email && (
            <a 
              href={`mailto:${author.metadata.email}`}
              className="text-gray-600 hover:text-gray-800"
            >
              Email
            </a>
          )}
          {author.metadata?.twitter && (
            <a 
              href={`https://twitter.com/${author.metadata.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              Twitter
            </a>
          )}
          {author.metadata?.linkedin && (
            <a 
              href={author.metadata.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              LinkedIn
            </a>
          )}
        </div>
      </header>

      {/* Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Posts by {author.metadata?.full_name}
        </h2>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts found from this author.</p>
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