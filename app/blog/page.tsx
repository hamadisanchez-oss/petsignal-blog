import Link from 'next/link'
import { client } from '@/lib/sanity'
import { Post } from '@/lib/types'

async function getPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt, mainImage
    }`
  )
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: '#f0f7ff', minHeight: '100vh' }}>

        <header style={{ background: 'linear-gradient(135deg, #1a3a6e 0%, #137dc5 100%)' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto', padding: '24px 24px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
              <Link href="https://petsignal.io" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4aa8e0"/>
                      <stop offset="100%" stopColor="#1a3a6e"/>
                    </linearGradient>
                  </defs>
                  <path d="M20 10 L20 90" stroke="url(#pGrad)" strokeWidth="18" strokeLinecap="round"/>
                  <path d="M20 10 Q70 10 70 35 Q70 60 20 60" stroke="url(#pGrad)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                <span style={{ color: 'white', fontWeight: 800, fontSize: '18px', letterSpacing: '0.08em' }}>PETSIGNAL</span>
              </Link>
              <Link href="https://petsignal.io" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>
                ← Back to app
              </Link>
            </div>
            <h1 style={{ color: 'white', fontWeight: 800, fontSize: '34px', margin: '0 0 8px', lineHeight: 1.2 }}>
              PetSignal Blog
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', margin: 0, lineHeight: 1.6 }}>
              Dog health tips, insights, and guides
            </p>
          </div>
        </header>

        <main style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px 64px' }}>
          {posts.length === 0 ? (
            <div style={{ background: 'white', borderRadius: '16px', padding: '48px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <p style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'white', borderRadius: '16px', padding: '28px 32px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: '4px solid #137dc5' }}>
                    <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 8px', fontWeight: 600 }}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <h2 style={{ color: '#1a1a2e', fontWeight: 700, fontSize: '20px', margin: '0 0 10px', lineHeight: 1.3 }}>
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p style={{ color: '#475569', fontSize: '15px', margin: '0 0 16px', lineHeight: 1.6 }}>
                        {post.excerpt}
                      </p>
                    )}
                    <span style={{ color: '#137dc5', fontSize: '14px', fontWeight: 600 }}>Read more →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>

        <footer style={{ borderTop: '1px solid #e2e8f0', padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
            © {new Date().getFullYear()} PETSIGNAL · <em>See what your dog can't tell you</em>
          </p>
        </footer>
      </div>
    </>
  )
}