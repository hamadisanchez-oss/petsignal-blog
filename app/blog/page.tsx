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
  const featured = posts.slice(0, 3)
  const latest = posts.slice(3, 8)

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
        <div style={{ background: '#ffffff', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid #e8f0fe' }}>
          <p style={{ color: '#137dc5', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px' }}>Blog</p>
          <h1 style={{ color: '#1a1a2e', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>Dog Health Tips &amp; Insights</h1>
          <p style={{ color: '#64748b', fontSize: '16px', margin: '0 auto 32px', maxWidth: '520px', lineHeight: 1.6 }}>
            Expert guidance to help you understand and monitor your dog&apos;s health between vet visits.
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: posts.length > 0 ? 'minmax(0,1fr) 300px' : '1fr', gap: '40px' }}>

          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', background: 'white', borderRadius: '16px', padding: '64px 48px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <p style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>No posts yet. Check back soon!</p>
            </div>
          ) : (
            <>
              {/* LEFT: POST GRID */}
              <div>
                <h2 style={{ color: '#1a1a2e', fontWeight: 700, fontSize: '18px', margin: '0 0 20px' }}>Latest Articles</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                  {featured.map((post) => (
                    <Link key={post._id} href={`/blog/${post.slug.current}`} style={{ textDecoration: 'none' }}>
                      <div className="post-card" style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'transform 0.2s', cursor: 'pointer' }}>
                        {post.mainImage ? (
                          <img
                            src={urlFor(post.mainImage).width(600).height(340).url()}
                            alt={post.title}
                            style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                          />
                        ) : (
                          <div style={{ background: 'linear-gradient(135deg, #1a3a6e 0%, #137dc5 100%)', height: '180px', display: 'flex', alignItems: 'flex-end', padding: '16px' }}>
                            <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '20px' }}>Dog Health</span>
                          </div>
                        )}
                        <div style={{ padding: '20px' }}>
                          <h3 style={{ color: '#1a1a2e', fontSize: '16px', fontWeight: 700, margin: '0 0 8px', lineHeight: 1.4 }}>{post.title}</h3>
                          {post.excerpt && <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 12px', lineHeight: 1.5 }}>{post.excerpt}</p>}
                          <p style={{ color: '#137dc5', fontSize: '12px', fontWeight: 600, margin: 0 }}>
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* RIGHT: SIDEBAR */}
              <div>
                <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
                  <h3 style={{ color: '#1a1a2e', fontWeight: 700, fontSize: '16px', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '2px solid #e8f4fd' }}>Featured</h3>
                  {featured.map((post) => (
                    <Link key={post._id} href={`/blog/${post.slug.current}`} style={{ textDecoration: 'none', display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-start' }}>
                      {post.mainImage ? (
                        <img
                          src={urlFor(post.mainImage).width(112).height(112).url()}
                          alt={post.title}
                          style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                        />
                      ) : (
                        <div style={{ width: '56px', height: '56px', borderRadius: '8px', background: 'linear-gradient(135deg, #1a3a6e, #137dc5)', flexShrink: 0 }} />
                      )}
                      <div>
                        <p style={{ color: '#94a3b8', fontSize: '11px', margin: '0 0 4px' }}>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</p>
                        <p style={{ color: '#1a1a2e', fontSize: '13px', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{post.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                {latest.length > 0 && (
                  <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <h3 style={{ color: '#1a1a2e', fontWeight: 700, fontSize: '16px', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '2px solid #e8f4fd' }}>Latest</h3>
                    {latest.map((post) => (
                      <Link key={post._id} href={`/blog/${post.slug.current}`} style={{ textDecoration: 'none', display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-start' }}>
                        {post.mainImage ? (
                          <img
                            src={urlFor(post.mainImage).width(112).height(112).url()}
                            alt={post.title}
                            style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                          />
                        ) : (
                          <div style={{ width: '56px', height: '56px', borderRadius: '8px', background: '#e8f4fd', flexShrink: 0 }} />
                        )}
                        <div>
                          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '0 0 4px' }}>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</p>
                          <p style={{ color: '#1a1a2e', fontSize: '13px', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{post.title}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* MOBILE STYLES */}
        <style>{`
          .post-card:hover { transform: translateY(-4px); }
          @media (max-width: 768px) {
            nav div { flex-wrap: wrap; gap: 12px; height: auto !important; padding: 12px 0; }
            div[style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; }
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
