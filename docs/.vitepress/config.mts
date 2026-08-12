import { defineConfig } from 'vitepress'

const base = process.env.VITEPRESS_BASE || '/'
const siteUrl = process.env.SITE_URL || 'http://localhost:5173/'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Lucas的博客',
  titleTemplate: ':title | Lucas的博客',
  description: 'Lu Zichao 的个人博客，记录科研、投资理财、生活与就业。',
  base,
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: siteUrl
  },
  head: [
    ['meta', { name: 'author', content: 'Lu Zichao' }],
    ['meta', { name: 'theme-color', content: '#315f72' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Lucas的博客' }],
    ['meta', { property: 'og:description', content: '一个简单的个人博客' }],
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
    siteTitle: 'Lucas的博客',
    nav: [
      { text: '首页', link: '/' },
      { text: '科研', link: '/research/' },
      { text: '投资理财', link: '/finance/' },
      { text: '生活', link: '/life/' },
      { text: '就业', link: '/career/' },
      {
        text: '浏览',
        items: [
          { text: '标签', link: '/tags/' },
          { text: '归档', link: '/archives/' },
          { text: '关于', link: '/about' }
        ]
      }
    ],
    sidebar: {
      '/research/': [
        {
          text: '科研',
          items: [
            { text: '全部科研记录', link: '/research/' },
            { text: '可复现实验记录方法', link: '/research/reproducible-experiment' }
          ]
        }
      ],
      '/finance/': [
        {
          text: '投资理财',
          items: [
            { text: '全部投资笔记', link: '/finance/' },
            { text: '建立个人投资检查清单', link: '/finance/investment-checklist' }
          ]
        }
      ],
      '/life/': [
        {
          text: '生活',
          items: [
            { text: '全部生活记录', link: '/life/' },
            { text: '一套可持续的每周回顾', link: '/life/weekly-review' }
          ]
        }
      ],
      '/career/': [
        {
          text: '就业',
          items: [
            { text: '全部就业笔记', link: '/career/' },
            { text: '技术面试复盘方法', link: '/career/interview-retrospective' }
          ]
        }
      ]
    },
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
      { icon: 'github', link: 'https://github.com/ZichaoLu' }
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
      copyright: 'Copyright © 2026-present Lu Zichao'
    }
  }
})
