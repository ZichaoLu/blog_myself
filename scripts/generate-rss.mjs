import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docsRoot = join(projectRoot, 'docs')
const publicRoot = join(docsRoot, 'public')
const siteUrl = (process.env.SITE_URL || 'https://zichaolu.github.io/blog_myself/').replace(/\/?$/, '/')
const ignoredDirectories = new Set(['.vitepress', 'public', 'tags', 'archives'])

function escapeXml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null

  const data = {}
  let activeList = null

  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([a-zA-Z][\w-]*):\s*(.*)$/)
    if (field) {
      const [, key, rawValue] = field
      activeList = rawValue ? null : key
      data[key] = rawValue.replace(/^['"]|['"]$/g, '')
      if (!rawValue) data[key] = []
      continue
    }

    const item = line.match(/^\s+-\s+(.+)$/)
    if (item && activeList) data[activeList].push(item[1].replace(/^['"]|['"]$/g, ''))
  }

  return data
}

async function findMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue
    const fullPath = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await findMarkdownFiles(fullPath))
    if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') files.push(fullPath)
  }

  return files
}

const files = await findMarkdownFiles(docsRoot)
const posts = []

for (const file of files) {
  const source = await readFile(file, 'utf8')
  const data = parseFrontmatter(source)
  if (!data?.title || !data?.date || data.draft === 'true') continue

  const path = relative(docsRoot, file).replaceAll('\\', '/').replace(/\.md$/, '')
  posts.push({
    title: data.title,
    description: data.description || '',
    date: data.date,
    url: new URL(path, siteUrl).href
  })
}

posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

const items = posts.map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(post.url)}</link>
      <guid>${escapeXml(post.url)}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00+08:00`).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`).join('')

const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Lucas的博客</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>科研、投资理财、生活与就业记录</description>
    <language>zh-CN</language>${items}
  </channel>
</rss>
`

await mkdir(publicRoot, { recursive: true })
await writeFile(join(publicRoot, 'feed.xml'), rss, 'utf8')
console.log(`Generated RSS with ${posts.length} posts.`)
