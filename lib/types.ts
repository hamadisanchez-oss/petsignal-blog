export interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImage?: any
  publishedAt: string
  body: any
  author?: { name: string }
}