import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DefaultTheme } from 'vitepress'
import { categories } from './site'

interface ArticleEntry {
  title: string
  date: string
  link: string
  draft: boolean
}

const docsRoot = fileURLToPath(new URL('..', import.meta.url))

function readFrontmatter(source: string) {
  const block = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!block) return {}

  return Object.fromEntries(
    block[1]
      .split(/\r?\n/)
      .map((line) => line.match(/^([\w-]+):\s*(.+)$/))
      .filter((match): match is RegExpMatchArray => Boolean(match))
      .map((match) => [match[1], match[2].replace(/^['"]|['"]$/g, '')])
  )
}

function loadArticles(directory: string): ArticleEntry[] {
  const directoryPath = resolve(docsRoot, directory)

  return readdirSync(directoryPath)
    .filter((file) => file.endsWith('.md') && file !== 'index.md')
    .map((file) => {
      const source = readFileSync(resolve(directoryPath, file), 'utf8')
      const frontmatter = readFrontmatter(source)

      return {
        title: frontmatter.title || file.replace(/\.md$/, ''),
        date: frontmatter.date || '',
        link: `/${directory}/${file.replace(/\.md$/, '')}`,
        draft: frontmatter.draft === 'true'
      }
    })
    .filter((article) => !article.draft)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}

export function createSidebar(): DefaultTheme.Sidebar {
  return Object.fromEntries(
    categories.map((category) => [
      category.href,
      [
        {
          text: category.name,
          items: [
            { text: category.allLabel, link: category.href },
            ...loadArticles(category.directory).map((article) => ({
              text: article.title,
              link: article.link
            }))
          ]
        }
      ]
    ])
  )
}
