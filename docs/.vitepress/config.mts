import { defineConfig } from 'vitepress'
import { categories, site } from './site'
import { createSidebar } from './sidebar'

const base = process.env.VITEPRESS_BASE || '/'
const siteUrl = process.env.SITE_URL || 'http://localhost:5173/'

export default defineConfig({
  lang: 'zh-CN',
  title: site.title,
  titleTemplate: ':title | Lucas的博客',
  description: site.description,
  base,
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: siteUrl
  },
  head: [
    ['meta', { name: 'author', content: site.author }],
    ['meta', { name: 'theme-color', content: '#315f72' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: site.title }],
    ['meta', { property: 'og:description', content: site.tagline }],
    ['link', { rel: 'icon', href: `${base}favicon.svg`, type: 'image/svg+xml' }],
    ['link', { rel: 'alternate', href: `${base}feed.xml`, type: 'application/rss+xml', title: 'Lucas的博客 RSS' }]
  ],
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: site.title,
    nav: [
      { text: '首页', link: '/' },
      ...categories.map((category) => ({ text: category.name, link: category.href })),
      {
        text: '浏览',
        items: [
          { text: '标签', link: '/tags/' },
          { text: '归档', link: '/archives/' },
          { text: '关于', link: '/about' }
        ]
      }
    ],
    sidebar: createSidebar(),
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文章'
          },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除查询',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: site.github }
    ],
    editLink: {
      pattern: 'https://github.com/ZichaoLu/blog_myself/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    footer: {
      message: '文章仅代表个人记录与思考，不构成投资建议。',
      copyright: `Copyright © 2026-present ${site.author}`
    }
  },
  transformPageData(pageData) {
    const category = categories.find(
      (item) => pageData.relativePath === `${item.directory}/index.md`
    )

    if (category) {
      pageData.title = category.name
      pageData.description = category.description
    }
  }
})
