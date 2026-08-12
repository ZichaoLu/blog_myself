export const site = {
  title: 'Lucas的博客',
  author: 'Lu Zichao',
  tagline: '一个简单的个人博客',
  description: 'Lu Zichao 的个人博客，记录科研、投资理财、生活与就业。',
  github: 'https://github.com/ZichaoLu'
} as const

export const categories = [
  {
    key: 'research',
    name: '科研',
    englishName: 'Research',
    href: '/research/',
    directory: 'research',
    description: '实验设计、研究方法与可复现记录。',
    intro: '这里记录研究问题如何被拆解、实验如何被设计，以及失败结果如何帮助校正下一步。重点不是展示一个漂亮的终点，而是保存通向结论的证据链。',
    allLabel: '全部科研记录'
  },
  {
    key: 'finance',
    name: '投资理财',
    englishName: 'Finance',
    href: '/finance/',
    directory: 'finance',
    description: '投资框架、风险认识与长期财务实践。',
    intro: '整理个人财务与投资学习中的框架、检查清单和复盘。所有内容仅是个人记录，不构成任何投资建议。',
    allLabel: '全部投资笔记'
  },
  {
    key: 'life',
    name: '生活',
    englishName: 'Life',
    href: '/life/',
    directory: 'life',
    description: '阅读、习惯与日常观察。',
    intro: '记录那些不属于工作成果，却在长期塑造判断、节奏和生活质量的事情。',
    allLabel: '全部生活记录'
  },
  {
    key: 'career',
    name: '就业',
    englishName: 'Career',
    href: '/career/',
    directory: 'career',
    description: '求职准备、面试复盘与职业成长。',
    intro: '记录求职准备、技术面试和职业选择中的方法与复盘，把一次性经验变成下一次可复用的材料。',
    allLabel: '全部就业笔记'
  }
] as const

export type CategoryKey = typeof categories[number]['key']

export function getCategory(key: string) {
  return categories.find((category) => category.key === key)
}
