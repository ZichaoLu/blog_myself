import { createContentLoader } from 'vitepress'
import type { CategoryKey } from './.vitepress/site'

export interface Post {
  title: string
  description: string
  url: string
  date: string
  category: CategoryKey
  tags: string[]
  wordCount: number
  readingMinutes: number
  cover: string
}

declare const data: Post[]
export { data }

function calculateReadingStats(source: string) {
  const content = source
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/https?:\/\/\S+/g, '')

  const cjkCount = (content.match(/[\u3400-\u9fff]/g) || []).length
  const latinWordCount = (content.match(/[a-zA-Z0-9]+(?:['-][a-zA-Z0-9]+)*/g) || []).length

  return {
    wordCount: cjkCount + latinWordCount,
    readingMinutes: Math.max(1, Math.ceil(cjkCount / 350 + latinWordCount / 200))
  }
}

export default createContentLoader(['research/*.md', 'finance/*.md', 'life/*.md', 'career/*.md'], {
  includeSrc: true,
  transform(source): Post[] {
    return source
      .filter(({ url, frontmatter }) => !url.endsWith('/') && frontmatter.date && !frontmatter.draft)
      .map(({ url, frontmatter, src }) => {
        const stats = calculateReadingStats(src)

        return {
          title: String(frontmatter.title),
          description: String(frontmatter.description || ''),
          url,
          date: String(frontmatter.date),
          category: frontmatter.category as CategoryKey,
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : [],
          cover: String(frontmatter.cover || ''),
          ...stats
        }
      })
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  }
})
