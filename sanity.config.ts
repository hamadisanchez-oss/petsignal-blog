import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

export default defineConfig({
  name: 'petsignal-blog',
  title: 'PetSignal Blog',
  projectId: 'x83dfyeq',
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: [
      {
        name: 'post',
        title: 'Post',
        type: 'document',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
          { name: 'excerpt', title: 'Excerpt', type: 'text' },
          { name: 'mainImage', title: 'Main Image', type: 'image' },
          { name: 'publishedAt', title: 'Published At', type: 'datetime' },
          { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
        ],
      },
    ],
  },
})