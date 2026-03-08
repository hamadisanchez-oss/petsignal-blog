import { client } from '@/lib/sanity'
import { Post } from '@/lib/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, publishedAt, body, author->{name}
    }`,
    { slug }
  )
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/blog" className="text-blue-500 hover:underline text-sm">
        ← Back to Blog
      </Link>
      <article className="mt-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-400 text-sm mb-8 flex gap-4">
          <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}</span>
          {post.author && <span>by {post.author.name}</span>}
        </div>
        {post.excerpt && (
          <p className="text-xl text-gray-300 mb-8 border-l-4 border-blue-500 pl-4">
            {post.excerpt}
          </p>
        )}
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300">Content coming soon.</p>
        </div>
      </article>
      <div className="mt-16 pt-8 border-t text-center">
        <p className="text-gray-400 mb-4">Monitor your dog's health with PetSignal</p>
        <Link href="https://petsignal.io" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
          Try PetSignal Free →
        </Link>
      </div>
    </main>
  )
}