import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'
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
      <div style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>

        {/* NAV */}
        <nav style={{ background: '#ffffff', borderBottom: '1px solid #e8f0fe', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            <Link href="https://petsignal.io" style={{ textDecoration: 'none' }}>
              <img src="/logo-color.png" alt="PetSignal" style={{ height: '32px', width: 'auto' }} />
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <Link href="/blog" style={{ color: '#137dc5', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>Blog</Link>
              <Link href="https://petsignal.io" style={{ background: '#137dc5', color: 'white', fontSize: '14px', textDecoration: 'none', fontWeight: 600, padding: '8px 18px', borderRadius: '10px' }}>Go to App →</Link>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ background: '#ffffff', padding: '48px 24px', textAlign: 'center', borderBottom: '1px solid #e8f0fe' }}>
          <p style={{ color: '#137dc5', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px' }}>Blog</p>
          <h1 style={{ color: '#1a1a2e', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>Dog Health Tips &amp; Insights</h1>
          <p style={{ color: '#64748b', margin: '0 auto', maxWidth: '520px', lineHeight: 1.6 }}>
            Expert guidance to help you understand and monitor your dog&apos;s health between vet visits.
          </p>
        </div>

        {/* POSTS */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', background: 'white', borderRadius: '16px', padding: '64px 48px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <p style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
                    {post.mainImage ? (
                      <img
                        src={urlFor(post.mainImage).width(300).height(200).url()}
                        alt={post.title}
                        style={{ width: '200px', minWidth: '200px', height: '160px', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <div style={{ width: '200px', minWidth: '200px', height: '160px', background: 'linear-gradient(135deg, #1a3a6e, #137dc5)' }} />
                    )}
                    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0 0 8px', fontWeight: 600 }}>
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                      </p>
                      <h3 style={{ color: '#1a1a2e', fontSize: '18px', fontWeight: 700, margin: '0 0 8px', lineHeight: 1.3 }}>{post.title}</h3>
                      {post.excerpt && <p style={{ color: '#64748b', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>{post.excerpt}</p>}
                      <p style={{ color: '#137dc5', fontSize: '13px', fontWeight: 600, margin: '12px 0 0' }}>Read article →</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* MOBILE STYLES */}
        <style>{`
          @media (max-width: 600px) {
            a > div[style*="flex-direction: row"] {
              flex-direction: column !important;
            }
            a > div[style*="flex-direction: row"] img,
            a > div[style*="flex-direction: row"] > div[style*="200px"] {
              width: 100% !important;
              min-width: 100% !important;
              height: 180px !important;
            }
          }
        `}</style>

        {/* FOOTER */}
        <footer style={{ background: '#1a1a2e', padding: '32px 24px', textAlign: 'center' }}>
          <img src="/logo-color.png" alt="PetSignal" style={{ height: '28px', width: 'auto', marginBottom: '8px', filter: 'brightness(0) invert(1)' }} />
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: 0 }}>© 2026 PETSIGNAL · See what your dog can&apos;t tell you</p>
        </footer>

      </div>
    </>
  )
}