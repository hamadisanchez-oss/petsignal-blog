import { client } from '@/lib/sanity'
import { Post } from '@/lib/types'
import Link from 'next/link'

async function getPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt
    }`
  )
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-12">
        <Link href="https://petsignal.io" className="text-blue-500 hover:underline text-sm">
          ← Back to PetSignal
        </Link>
        <h1 className="text-4xl font-bold mt-4 mb-2">PetSignal Blog</h1>
        <p className="text-gray-500">Dog health tips, insights, and guides</p>
      </div>
      {posts.length === 0 ? (
        <p className="text-gray-400">No posts yet. Check back soon!</p>
      ) : (
        <div className="space-y-10">
          {posts.map((post) => (
            <article key={post._id} className="border-b pb-10">
              <Link href={`/blog/${post.slug.current}`}>
                <h2 className="text-2xl font-semibold hover:text-blue-500 transition-colors">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-400 text-sm mt-1">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
              {post.excerpt && <p className="text-gray-300 mt-3">{post.excerpt}</p>}
              <Link href={`/blog/${post.slug.current}`} className="text-blue-500 hover:underline text-sm mt-3 inline-block">
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}