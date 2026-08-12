import { createContentLoader } from 'vitepress'

export type Category = 'research' | 'finance' | 'life' | 'career'

export interface Post {
  title: string
  description: string
  url: string
  date: string
  category: Category
  tags: string[]
}

declare const data: Post[]
export { data }

export default createContentLoader(['research/*.md', 'finance/*.md', 'life/*.md', 'career/*.md'], {
  transform(source): Post[] {
    return source
      .filter(({ url, frontmatter }) => !url.endsWith('/') && frontmatter.date && !frontmatter.draft)
      .map(({ url, frontmatter }) => ({
        title: String(frontmatter.title),
        description: String(frontmatter.description || ''),
        url,
        date: String(frontmatter.date),
        category: frontmatter.category as Category,
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : []
      }))
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  }
})
