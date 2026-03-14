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
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f5f7fa; }

        .blog-nav {
          background: #fff;
          border-bottom: 1px solid #e8edf2;
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .blog-nav-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }
        .nav-cta {
          background: #137dc5;
          color: #fff !important;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: 8px;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: background 0.2s;
        }
        .nav-cta:hover { background: #0f6aaa; }

        .blog-hero {
          background: linear-gradient(135deg, #1a3a6e 0%, #137dc5 100%);
          padding: 72px 32px 64px;
          text-align: center;
        }
        .blog-hero-label {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.9);
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 20px;
        }
        .blog-hero h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(32px, 6vw, 56px);
          font-weight: 800;
          color: #fff;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .blog-hero p {
          font-family: 'Inter', sans-serif;
          color: rgba(255,255,255,0.75);
          font-size: 17px;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .blog-posts {
          max-width: 780px;
          margin: 0 auto;
          padding: 56px 24px 80px;
        }

        .post-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 28px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
          text-decoration: none;
          display: block;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .post-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(19,125,197,0.12), 0 2px 8px rgba(0,0,0,0.06);
        }
        .post-card-inner {
          display: flex;
          flex-direction: row;
          align-items: stretch;
        }
        .post-card-image {
          width: 240px;
          min-width: 240px;
          flex-shrink: 0;
          align-self: stretch;
        }
        .post-card-image-placeholder {
          width: 240px;
          min-width: 240px;
          height: 200px;
          background: linear-gradient(135deg, #1a3a6e 0%, #137dc5 100%);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .post-card-body {
          padding: 28px 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
        }
        .post-card-date {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #137dc5;
          margin-bottom: 10px;
        }
        .post-card-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: #1a1a2e;
          line-height: 1.3;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }
        .post-card-excerpt {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .post-card-link {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #137dc5;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .empty-state {
          text-align: center;
          background: white;
          border-radius: 20px;
          padding: 80px 48px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          font-family: 'Inter', sans-serif;
          color: #94a3b8;
          font-size: 16px;
        }

        .blog-footer {
          background: #1a1a2e;
          padding: 36px 24px;
          text-align: center;
        }
        .blog-footer p {
          font-family: 'Inter', sans-serif;
          color: rgba(255,255,255,0.4);
          font-size: 13px;
          margin-top: 8px;
        }

        @media (max-width: 600px) {
          .blog-hero { padding: 48px 20px 40px; }
          .blog-posts { padding: 32px 16px 60px; }
          .post-card-inner { flex-direction: column; }
          .post-card-image { width: 100%; min-width: 100%; height: 200px; }
          .post-card-image-placeholder { width: 100%; min-width: 100%; height: 160px; }
          .post-card-body { padding: 20px 20px 24px; }
          .post-card-title { font-size: 19px; }
          .blog-nav { padding: 0 16px; }
        }
      `}</style>

      <div style={{ fontFamily: 'Inter, sans-serif', background: '#f5f7fa', minHeight: '100vh' }}>

        {/* NAV */}
        <nav className="blog-nav">
          <div className="blog-nav-inner">
            <Link href="https://caniqo.com" style={{ textDecoration: 'none' }}>
              <img src="/logo-color.png" alt="Caniqo" style={{ height: '30px', width: 'auto' }} />
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Link href="/blog" style={{ fontFamily: 'Inter, sans-serif', color: '#137dc5', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>Blog</Link>
              <Link href="https://caniqo.com" className="nav-cta">Go to App →</Link>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <div className="blog-hero">
          <span className="blog-hero-label">Dog Health</span>
          <h1>Tips &amp; Insights</h1>
          <p>Expert guidance to help you understand and monitor your dog&apos;s health between vet visits.</p>
        </div>

        {/* POSTS */}
        <div className="blog-posts">
          {posts.length === 0 ? (
            <div className="empty-state">No posts yet. Check back soon!</div>
          ) : (
            posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`} className="post-card">
                <div className="post-card-inner">
                  <div
                    className="post-card-image"
                    style={post.mainImage ? {
                      backgroundImage: `url(${urlFor(post.mainImage).width(480).height(600).url()})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    } : { background: 'linear-gradient(135deg, #1a3a6e 0%, #137dc5 100%)' }}
                  />
                  <div className="post-card-body">
                    <p className="post-card-date">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                    </p>
                    <h2 className="post-card-title">{post.title}</h2>
                    {post.excerpt && <p className="post-card-excerpt">{post.excerpt}</p>}
                    <span className="post-card-link">Read article <span>→</span></span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* FOOTER */}
        <footer className="blog-footer">
          <img src="/logo-color.png" alt="Caniqo" style={{ height: '26px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.6 }} />
          <p>© {new Date().getFullYear()} CANIQO · See what your dog can&apos;t tell you</p>
        </footer>

      </div>
    </>
  )
}