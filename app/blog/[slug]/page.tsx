import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'
import { Post } from '@/lib/types'

async function getPost(slug: string): Promise<Post> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, publishedAt, body, mainImage,
      author->{ name }
    }`,
    { slug }
  )
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return (
      <div style={{ fontFamily: 'Inter, sans-serif', background: '#f0f7ff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Post not found.</p>
      </div>
    )
  }

  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).height(675).url() : null

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ fontFamily: 'Inter, sans-serif', background: '#f0f7ff', minHeight: '100vh' }}>
        <header style={{ background: 'linear-gradient(135deg, #1a3a6e 0%, #137dc5 100%)' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto', padding: '24px 24px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href="https://petsignal.io" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                <img src="/logo-white.png" alt="PetSignal" style={{ height: '36px', width: 'auto' }} />
              </Link>
              <Link href="/blog" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>
                ← All posts
              </Link>
            </div>
          </div>
        </header>
        <main style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px 64px' }}>
          <article style={{ background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 12px', fontWeight: 600 }}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              {post.author && ` · ${post.author.name}`}
            </p>
            <h1 style={{ color: '#1a1a2e', fontWeight: 800, fontSize: '34px', margin: '0 0 16px', lineHeight: 1.2 }}>
              {post.title}
            </h1>
            {post.excerpt && (
              <p style={{ color: '#475569', fontSize: '18px', margin: '0 0 32px', lineHeight: 1.6, borderBottom: '1px solid #e2e8f0', paddingBottom: '24px', fontStyle: 'italic' }}>
                {post.excerpt}
              </p>
            )}
            {imageUrl && (
              <img src={imageUrl} alt={post.title} style={{ width: '100%', borderRadius: '12px', marginBottom: '32px', display: 'block' }} />
            )}
            <div style={{ color: '#1a1a2e', fontSize: '16px', lineHeight: 1.8 }}>
              {post.body?.map((block: any, i: number) => {
                if (block._type === 'block') {
                  return <p key={i} style={{ margin: '0 0 20px' }}>{block.children?.map((child: any) => child.text).join('')}</p>
                }
                return null
              })}
            </div>
          </article>
          <div style={{ background: 'linear-gradient(135deg, #1a3a6e 0%, #137dc5 100%)', borderRadius: '16px', padding: '32px', textAlign: 'center', marginTop: '24px' }}>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', margin: '0 0 8px' }}>AI-powered dog health monitoring</p>
            <h3 style={{ color: 'white', fontWeight: 800, fontSize: '22px', margin: '0 0 20px' }}>See what your dog cannot tell you</h3>
            <Link href="https://petsignal.io" style={{ background: 'white', color: '#137dc5', fontWeight: 700, fontSize: '15px', padding: '12px 28px', borderRadius: '10px', textDecoration: 'none', display: 'inline-block' }}>
              Try PetSignal Free →
            </Link>
          </div>
        </main>
        <footer style={{ borderTop: '1px solid #e2e8f0', padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
            © {new Date().getFullYear()} PETSIGNAL · <em>See what your dog cannot tell you</em>
          </p>
        </footer>
      </div>
    </>
  )
}