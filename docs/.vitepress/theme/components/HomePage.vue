<script setup lang="ts">
import { withBase } from 'vitepress'
import { data as posts } from '../../../posts.data'

const sections = [
  {
    key: 'research',
    index: '01',
    title: '科研',
    summary: '实验设计、研究方法与可复现记录。',
    href: '/research/'
  },
  {
    key: 'finance',
    index: '02',
    title: '投资理财',
    summary: '投资框架、风险认识与长期财务实践。',
    href: '/finance/'
  },
  {
    key: 'life',
    index: '03',
    title: '生活',
    summary: '阅读、习惯与日常观察。',
    href: '/life/'
  },
  {
    key: 'career',
    index: '04',
    title: '就业',
    summary: '求职准备、面试复盘与职业成长。',
    href: '/career/'
  }
]

const formatDate = (date: string) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}).format(new Date(`${date}T00:00:00+08:00`))
</script>

<template>
  <main class="home-page">
    <section class="home-intro" aria-labelledby="home-title">
      <div class="home-profile">
        <img
          class="author-avatar"
          :src="withBase('/images/avatar.jpg')"
          alt="Lu Zichao 的头像"
          width="156"
          height="156"
        >
        <p class="profile-caption">Lu Zichao</p>
      </div>
      <div class="home-copy">
        <p class="eyebrow">Personal Notes · Since 2026</p>
        <h1 id="home-title">Lucas的博客</h1>
        <p class="home-tagline">一个简单的个人博客</p>
        <p class="home-description">
          记录科研中的问题与方法，也记录投资、生活和就业中的长期思考。写下来，是为了让零散经验能够被再次找到。
        </p>
        <nav class="home-actions" aria-label="首页快捷入口">
          <a class="primary-link" :href="withBase('/research/')">开始阅读</a>
          <a class="text-link" :href="withBase('/about')">关于作者 <span aria-hidden="true">→</span></a>
        </nav>
      </div>
    </section>

    <section class="home-section" aria-labelledby="sections-title">
      <div class="section-heading">
        <p class="eyebrow">Sections</p>
        <h2 id="sections-title">四个主题，持续记录</h2>
      </div>
      <div class="section-grid">
        <a v-for="section in sections" :key="section.key" class="section-item" :href="withBase(section.href)">
          <span class="section-index">{{ section.index }}</span>
          <span class="section-body">
            <strong>{{ section.title }}</strong>
            <span>{{ section.summary }}</span>
          </span>
          <span class="section-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </section>

    <section class="home-section latest-section" aria-labelledby="latest-title">
      <div class="section-heading section-heading-row">
        <div>
          <p class="eyebrow">Recent Notes</p>
          <h2 id="latest-title">最近更新</h2>
        </div>
        <a class="text-link" :href="withBase('/archives/')">查看归档 <span aria-hidden="true">→</span></a>
      </div>
      <div class="post-list">
        <article v-for="post in posts.slice(0, 5)" :key="post.url" class="post-row">
          <time class="post-date" :datetime="post.date">{{ formatDate(post.date) }}</time>
          <div class="post-copy">
            <h3><a :href="withBase(post.url)">{{ post.title }}</a></h3>
            <p>{{ post.description }}</p>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 74px 32px 96px;
}

.home-intro {
  display: grid;
  grid-template-columns: 180px minmax(0, 680px);
  gap: 64px;
  align-items: center;
  min-height: 360px;
  padding: 18px 0 70px;
}

.home-profile {
  text-align: center;
}

.author-avatar {
  display: block;
  width: 156px;
  height: 156px;
  margin: 0 auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  object-fit: cover;
  filter: saturate(0.78) contrast(0.96);
}

.profile-caption {
  margin: 13px 0 0;
  color: var(--vp-c-text-3);
  font-family: Georgia, serif;
  font-size: 0.78rem;
}

.home-copy h1 {
  margin: 0;
  font-family: Georgia, "Noto Serif SC", "Songti SC", serif;
  font-size: 4rem;
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: 0;
}

.home-tagline {
  margin: 16px 0 0;
  color: var(--vp-c-text-1);
  font-family: Georgia, "Noto Serif SC", "Songti SC", serif;
  font-size: 1.3rem;
}

.home-description {
  max-width: 620px;
  margin: 18px 0 0;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.9;
}

.home-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
  margin-top: 28px;
}

.primary-link {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 18px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 4px;
  color: white;
  background: var(--vp-c-brand-1);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
}

.primary-link:hover {
  border-color: var(--vp-c-brand-2);
  background: var(--vp-c-brand-2);
}

.text-link {
  color: var(--vp-c-text-2);
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
}

.text-link:hover {
  color: var(--vp-c-brand-1);
}

.home-section {
  padding: 68px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.section-heading {
  margin-bottom: 30px;
}

.section-heading h2 {
  margin: 0;
  border: 0;
  font-family: Georgia, "Noto Serif SC", "Songti SC", serif;
  font-size: 1.72rem;
  line-height: 1.4;
}

.section-heading-row {
  display: flex;
  gap: 24px;
  align-items: end;
  justify-content: space-between;
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--vp-c-divider);
  border-left: 1px solid var(--vp-c-divider);
}

.section-item {
  display: grid;
  grid-template-columns: 38px 1fr 22px;
  gap: 14px;
  align-items: start;
  min-height: 136px;
  padding: 26px;
  border-right: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: background-color 160ms ease;
}

.section-item:hover {
  background: var(--vp-c-bg-soft);
}

.section-index {
  color: var(--vp-c-brand-1);
  font-family: Georgia, serif;
  font-size: 0.78rem;
}

.section-body {
  display: grid;
  gap: 8px;
}

.section-body strong {
  font-family: Georgia, "Noto Serif SC", "Songti SC", serif;
  font-size: 1.15rem;
}

.section-body span {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.65;
}

.section-arrow {
  color: var(--vp-c-text-3);
}

@media (max-width: 760px) {
  .home-page {
    padding: 42px 24px 72px;
  }

  .home-intro {
    grid-template-columns: 1fr;
    gap: 32px;
    min-height: 0;
    padding: 8px 0 52px;
  }

  .home-profile {
    text-align: left;
  }

  .author-avatar {
    width: 112px;
    height: 112px;
    margin: 0;
  }

  .profile-caption {
    text-align: left;
  }

  .home-copy h1 {
    font-size: 2.7rem;
  }

  .section-grid {
    grid-template-columns: 1fr;
  }

  .section-item {
    min-height: 118px;
    padding: 22px;
  }
}

@media (max-width: 420px) {
  .home-page {
    padding-right: 20px;
    padding-left: 20px;
  }

  .section-heading-row {
    align-items: start;
  }
}
</style>
