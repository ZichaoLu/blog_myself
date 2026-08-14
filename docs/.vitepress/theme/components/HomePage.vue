<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../../../posts.data'
import { categories, getCategory, site, type CategoryKey } from '../../site'

const recentPosts = posts.slice(0, 4)
const latestPost = recentPosts[0]
const otherRecentPosts = recentPosts.slice(1)

const postCounts = computed(() => Object.fromEntries(
  categories.map((category) => [
    category.key,
    posts.filter((post) => post.category === category.key).length
  ])
) as Record<CategoryKey, number>)

const totalWords = computed(() => posts.reduce((sum, post) => sum + post.wordCount, 0))
const totalMinutes = computed(() => posts.reduce((sum, post) => sum + post.readingMinutes, 0))

const formatDate = (date: string) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}).format(new Date(`${date}T00:00:00+08:00`))

const formatShortDate = (date: string) => new Intl.DateTimeFormat('zh-CN', {
  month: '2-digit',
  day: '2-digit'
}).format(new Date(`${date}T00:00:00+08:00`))
</script>

<template>
  <main class="home-page">
    <section class="home-intro" aria-labelledby="home-title">
      <div class="home-copy">
        <div class="intro-kicker">
          <p class="eyebrow">Personal Notes · Since 2026</p>
          <span aria-hidden="true">No. 001</span>
        </div>
        <h1 id="home-title">{{ site.title }}</h1>
        <p class="home-tagline">{{ site.tagline }}</p>
        <p class="home-description">
          记录科研中的证据与方法，也整理投资判断、生活观察和求职复盘。写下来，让零散经验成为可以再次查阅的长期笔记。
        </p>
        <nav class="home-actions" aria-label="首页快捷入口">
          <a class="primary-link" :href="withBase(latestPost?.url || '/research/')">
            阅读最新文章 <span aria-hidden="true">→</span>
          </a>
          <a class="text-link" :href="withBase('/archives/')">浏览全部文章</a>
        </nav>
        <dl class="home-stats" aria-label="博客概况">
          <div>
            <dt>栏目</dt>
            <dd>{{ categories.length }}</dd>
          </div>
          <div>
            <dt>文章</dt>
            <dd>{{ posts.length }}</dd>
          </div>
          <div>
            <dt>最近更新</dt>
            <dd>{{ latestPost ? formatShortDate(latestPost.date) : '—' }}</dd>
          </div>
          <div>
            <dt>总字数</dt>
            <dd>{{ totalWords.toLocaleString('zh-CN') }}</dd>
          </div>
          <div>
            <dt>累计阅读</dt>
            <dd>约 {{ totalMinutes }} 分钟</dd>
          </div>
        </dl>
      </div>

      <aside class="home-profile" aria-label="作者信息">
        <div class="profile-main">
          <img
            class="author-avatar"
            :src="withBase('/images/avatar.jpg')"
            alt="Lu Zichao 的头像"
            width="128"
            height="128"
          >
          <div class="profile-copy">
            <p class="profile-label">Author</p>
            <p class="profile-name">{{ site.author }}</p>
            <a :href="site.github" target="_blank" rel="noopener noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <p class="profile-note">
          以问题为线索，以可复用为标准。这里保存过程、结论，以及下一次行动的依据。
        </p>
      </aside>
    </section>

    <section v-if="latestPost" class="home-section latest-section" aria-labelledby="latest-title">
      <div class="section-heading section-heading-row">
        <div>
          <p class="eyebrow">Recent Notes</p>
          <h2 id="latest-title">最近更新</h2>
        </div>
        <div class="section-heading-side">
          <span class="section-sequence" aria-hidden="true">01</span>
          <a class="text-link" :href="withBase('/archives/')">查看归档 <span aria-hidden="true">→</span></a>
        </div>
      </div>

      <div class="latest-layout">
        <article class="featured-note">
          <div class="post-kicker">
            <a :href="withBase(getCategory(latestPost.category)?.href || '/')">
              {{ getCategory(latestPost.category)?.name }}
            </a>
            <time :datetime="latestPost.date">{{ formatDate(latestPost.date) }}</time>
          </div>
          <h3><a :href="withBase(latestPost.url)">{{ latestPost.title }}</a></h3>
          <p class="featured-description">{{ latestPost.description }}</p>
          <div class="featured-meta">
            <span>约 {{ latestPost.readingMinutes }} 分钟阅读</span>
            <span>{{ latestPost.wordCount.toLocaleString('zh-CN') }} 字</span>
          </div>
          <ul v-if="latestPost.tags.length" class="tag-list" aria-label="最新文章标签">
            <li v-for="tag in latestPost.tags.slice(0, 3)" :key="tag">
              <a class="tag-link" :href="withBase(`/tags/?tag=${encodeURIComponent(tag)}`)"># {{ tag }}</a>
            </li>
          </ul>
          <a class="read-note-link" :href="withBase(latestPost.url)">
            阅读文章 <span aria-hidden="true">→</span>
          </a>
        </article>

        <div class="recent-list" aria-label="其他最近文章">
          <article v-for="post in otherRecentPosts" :key="post.url" class="recent-note">
            <div class="recent-note-meta">
              <span>{{ getCategory(post.category)?.name }}</span>
              <time :datetime="post.date">{{ formatShortDate(post.date) }}</time>
            </div>
            <h3><a :href="withBase(post.url)">{{ post.title }}</a></h3>
            <p>{{ post.description }}</p>
            <span class="reading-time">约 {{ post.readingMinutes }} 分钟阅读</span>
          </article>
        </div>
      </div>
    </section>

    <section class="home-section topics-section" aria-labelledby="sections-title">
      <div class="section-heading section-heading-row">
        <div>
          <p class="eyebrow">Sections</p>
          <h2 id="sections-title">四个主题，持续记录</h2>
        </div>
        <div class="section-heading-side">
          <span class="section-sequence" aria-hidden="true">02</span>
          <p class="section-note">从正在解决的问题出发，按主题沉淀。</p>
        </div>
      </div>
      <div class="section-grid">
        <a
          v-for="(section, index) in categories"
          :key="section.key"
          class="section-item"
          :class="`section-${section.key}`"
          :href="withBase(section.href)"
        >
          <span class="section-index">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="section-english">{{ section.englishName }}</span>
          <span class="section-body">
            <strong>{{ section.name }}</strong>
            <span>{{ section.description }}</span>
          </span>
          <span class="section-footer">
            <span>{{ postCounts[section.key] }} 篇记录</span>
            <span class="section-arrow" aria-hidden="true">→</span>
          </span>
        </a>
      </div>
    </section>

    <footer class="home-footer">
      <div>
        <p class="footer-name">{{ site.title }}</p>
        <p>记录问题，保留证据，持续修正。</p>
      </div>
      <nav aria-label="页尾导航">
        <a :href="withBase('/about')">关于</a>
        <a :href="withBase('/archives/')">归档</a>
        <a :href="withBase('/feed.xml')">RSS</a>
        <a :href="site.github" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      </nav>
      <p class="footer-copyright">© 2026 {{ site.author }}</p>
    </footer>
  </main>
</template>

<style scoped>
.home-page {
  max-width: 1180px;
  margin: 0 auto;
  padding: 56px 32px 96px;
}

.home-intro {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 350px;
  gap: 96px;
  align-items: center;
  min-height: 430px;
  padding: 24px 0 64px;
}

.home-intro::before {
  position: absolute;
  top: -70px;
  right: -40px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--vp-c-brand-soft) 92%, transparent), transparent 68%);
  content: "";
  pointer-events: none;
}

.home-copy {
  min-width: 0;
}

.intro-kicker {
  display: flex;
  gap: 28px;
  align-items: center;
  max-width: 680px;
  margin-bottom: 10px;
}

.intro-kicker::after {
  flex: 1;
  height: 1px;
  background: var(--vp-c-divider);
  content: "";
}

.intro-kicker .eyebrow {
  margin: 0;
}

.intro-kicker > span {
  order: 3;
  color: var(--vp-c-text-3);
  font-family: Georgia, serif;
  font-size: 0.68rem;
  font-variant-numeric: tabular-nums;
}

.home-copy h1 {
  max-width: 760px;
  margin: 0;
  font-family: Georgia, "Noto Serif SC", "Songti SC", serif;
  font-size: 4.35rem;
  font-weight: 600;
  line-height: 1.06;
  letter-spacing: 0;
}

.home-tagline {
  margin: 17px 0 0;
  color: var(--vp-c-text-1);
  font-family: Georgia, "Noto Serif SC", "Songti SC", serif;
  font-size: 1.36rem;
}

.home-description {
  max-width: 680px;
  margin: 20px 0 0;
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
  gap: 10px;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 18px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: var(--vp-radius-sm);
  color: white;
  background: var(--vp-c-brand-1);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: var(--vp-shadow-sm);
  transition: border-color 180ms var(--vp-ease-out), background-color 180ms var(--vp-ease-out),
    box-shadow 180ms var(--vp-ease-out), transform 180ms var(--vp-ease-out);
}

.primary-link:hover {
  border-color: var(--vp-c-brand-2);
  color: white;
  background: var(--vp-c-brand-2);
  box-shadow: var(--vp-shadow-md);
  transform: translateY(-1px);
}

.text-link {
  position: relative;
  color: var(--vp-c-text-2);
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
}

.text-link::after {
  position: absolute;
  right: 0;
  bottom: -4px;
  left: 0;
  height: 1px;
  background: currentColor;
  content: "";
  opacity: 0.3;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 160ms ease;
}

.text-link:hover {
  color: var(--vp-c-brand-1);
}

.text-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.home-stats {
  display: flex;
  flex-wrap: wrap;
  row-gap: 18px;
  margin: 36px 0 0;
}

.home-stats div {
  min-width: 96px;
  padding-right: 20px;
  border-right: 1px solid var(--vp-c-divider);
}

.home-stats div + div {
  padding-left: 20px;
}

.home-stats div:last-child {
  border-right: 0;
}

.home-stats dt {
  color: var(--vp-c-text-3);
  font-size: 0.72rem;
}

.home-stats dd {
  margin: 5px 0 0;
  color: var(--vp-c-text-1);
  font-family: Georgia, "Noto Serif SC", "Songti SC", serif;
  font-size: 1.1rem;
  font-variant-numeric: tabular-nums;
}

.home-profile {
  position: relative;
  padding: 26px 0;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

.home-profile::before {
  position: absolute;
  top: -1px;
  left: 0;
  width: 44px;
  height: 2px;
  background: var(--vp-c-brand-1);
  content: "";
}

.profile-main {
  display: grid;
  grid-template-columns: 128px minmax(0, 1fr);
  gap: 24px;
  align-items: center;
}

.author-avatar {
  display: block;
  width: 128px;
  height: 128px;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--vp-radius-sm);
  object-fit: cover;
  filter: saturate(0.78) contrast(0.96);
  box-shadow: 8px 8px 0 var(--vp-c-bg-soft);
  transition: transform 260ms var(--vp-ease-out), box-shadow 260ms var(--vp-ease-out);
}

.home-profile:hover .author-avatar {
  transform: translate(-2px, -2px);
  box-shadow: 11px 11px 0 var(--vp-c-bg-soft);
}

.profile-label {
  margin: 0 0 7px;
  color: var(--vp-c-brand-1);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
}

.profile-name {
  margin: 0 0 12px;
  font-family: Georgia, serif;
  font-size: 1.18rem;
}

.profile-copy a {
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  text-decoration: none;
}

.profile-copy a:hover {
  color: var(--vp-c-brand-1);
}

.profile-note {
  margin: 24px 0 0;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-family: Georgia, "Noto Serif SC", "Songti SC", serif;
  font-size: 0.9rem;
  line-height: 1.8;
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
  font-size: 1.82rem;
  line-height: 1.4;
}

.section-heading-row {
  display: flex;
  gap: 24px;
  align-items: end;
  justify-content: space-between;
}

.section-heading-side {
  display: flex;
  gap: 22px;
  align-items: center;
}

.section-sequence {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  color: var(--vp-c-text-3);
  font-family: Georgia, serif;
  font-size: 0.68rem;
  font-variant-numeric: tabular-nums;
}

.latest-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(340px, 0.8fr);
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

.featured-note {
  position: relative;
  min-width: 0;
  padding: 34px 48px 34px 0;
  border-right: 1px solid var(--vp-c-divider);
}

.featured-note::before {
  position: absolute;
  top: -1px;
  left: 0;
  width: 72px;
  height: 2px;
  background: var(--vp-c-brand-1);
  content: "";
}

.post-kicker,
.recent-note-meta,
.featured-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  align-items: center;
  color: var(--vp-c-text-3);
  font-size: 0.76rem;
}

.post-kicker a {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  text-decoration: none;
}

.featured-note h3 {
  margin: 18px 0 12px;
  font-family: Georgia, "Noto Serif SC", "Songti SC", serif;
  font-size: 2rem;
  line-height: 1.35;
}

.featured-note h3 a,
.recent-note h3 a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.featured-note h3 a:hover,
.recent-note h3 a:hover {
  color: var(--vp-c-brand-1);
}

.featured-description {
  max-width: 650px;
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.96rem;
  line-height: 1.8;
}

.featured-meta {
  margin-top: 20px;
}

.featured-note .tag-list {
  margin-top: 15px;
}

.read-note-link {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  margin-top: 28px;
  color: var(--vp-c-text-1);
  font-size: 0.86rem;
  font-weight: 700;
  text-decoration: none;
}

.read-note-link span,
.section-arrow {
  transition: transform 160ms ease;
}

.read-note-link:hover {
  color: var(--vp-c-brand-1);
}

.read-note-link:hover span,
.section-item:hover .section-arrow {
  transform: translateX(4px);
}

.recent-list {
  min-width: 0;
  padding-left: 32px;
}

.recent-note {
  position: relative;
  padding: 22px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.recent-note::before {
  position: absolute;
  top: 22px;
  bottom: 22px;
  left: -32px;
  width: 2px;
  background: var(--vp-c-brand-1);
  content: "";
  opacity: 0;
  transition: opacity 160ms ease;
}

.recent-note:hover::before {
  opacity: 1;
}

.recent-note:last-child {
  border-bottom: 0;
}

.recent-note-meta {
  justify-content: space-between;
}

.recent-note-meta span {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.recent-note h3 {
  margin: 8px 0 6px;
  font-family: Georgia, "Noto Serif SC", "Songti SC", serif;
  font-size: 1.08rem;
  line-height: 1.45;
}

.recent-note p {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  color: var(--vp-c-text-2);
  font-size: 0.84rem;
  line-height: 1.65;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.reading-time {
  display: block;
  margin-top: 10px;
  color: var(--vp-c-text-3);
  font-size: 0.72rem;
}

.topics-section {
  padding-bottom: 0;
}

.section-note {
  max-width: 340px;
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 0.84rem;
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-left: 1px solid var(--vp-c-divider);
}

.section-item {
  --section-accent: var(--vp-c-brand-1);
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto 1fr auto;
  gap: 0 16px;
  min-width: 0;
  min-height: 230px;
  padding: 24px;
  border-top: 3px solid var(--section-accent);
  border-right: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: background-color 200ms var(--vp-ease-out), box-shadow 200ms var(--vp-ease-out);
}

.section-finance {
  --section-accent: #86623f;
}

.section-life {
  --section-accent: #5d7359;
}

.section-career {
  --section-accent: #7d5863;
}

:global(.dark) .section-finance {
  --section-accent: #c3a07b;
}

:global(.dark) .section-life {
  --section-accent: #91ad8d;
}

:global(.dark) .section-career {
  --section-accent: #bc909c;
}

.section-item:hover {
  background: color-mix(in srgb, var(--section-accent) 7%, var(--vp-c-bg));
  box-shadow: inset 0 -3px 0 var(--section-accent);
}

.section-item:hover .section-body strong {
  color: var(--section-accent);
}

.section-item:hover .section-footer {
  color: var(--vp-c-text-2);
}

.section-index {
  color: var(--section-accent);
  font-family: Georgia, serif;
  font-size: 0.76rem;
}

.section-english {
  color: var(--vp-c-text-3);
  font-size: 0.68rem;
  text-transform: uppercase;
}

.section-body {
  display: grid;
  grid-column: 1 / -1;
  align-content: start;
  gap: 10px;
  margin-top: 28px;
}

.section-body strong {
  font-family: Georgia, "Noto Serif SC", "Songti SC", serif;
  font-size: 1.25rem;
}

.section-body span {
  color: var(--vp-c-text-2);
  font-size: 0.86rem;
  line-height: 1.7;
}

.section-footer {
  display: flex;
  grid-column: 1 / -1;
  align-self: end;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 15px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-3);
  font-size: 0.74rem;
}

.home-footer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 48px;
  align-items: end;
  margin-top: 76px;
  padding: 30px 0 8px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-3);
  font-size: 0.76rem;
}

.home-footer p {
  margin: 0;
}

.home-footer .footer-name {
  margin-bottom: 7px;
  color: var(--vp-c-text-1);
  font-family: Georgia, "Noto Serif SC", "Songti SC", serif;
  font-size: 1rem;
  font-weight: 600;
}

.home-footer nav {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}

.home-footer a {
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.home-footer a:hover {
  color: var(--vp-c-brand-1);
}

.footer-copyright {
  white-space: nowrap;
  font-family: Georgia, serif;
}

@media (max-width: 960px) {
  .home-intro {
    grid-template-columns: minmax(0, 1fr) 300px;
    gap: 56px;
  }

  .home-copy h1 {
    font-size: 3.6rem;
  }

  .profile-main {
    grid-template-columns: 104px minmax(0, 1fr);
  }

  .author-avatar {
    width: 104px;
    height: 104px;
  }

  .latest-layout {
    grid-template-columns: minmax(0, 1fr) 320px;
  }

  .featured-note {
    padding-right: 32px;
  }

  .section-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .home-footer {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .footer-copyright {
    grid-column: 1 / -1;
  }
}

@media (max-width: 760px) {
  .home-page {
    padding: 38px 24px 72px;
  }

  .home-intro {
    grid-template-columns: 1fr;
    gap: 28px;
    min-height: 0;
    padding: 10px 0 40px;
  }

  .home-copy h1 {
    font-size: 2.8rem;
  }

  .home-stats div {
    min-width: 0;
    flex: 1 1 40%;
    padding-right: 16px;
  }

  .home-stats div + div {
    padding-left: 16px;
  }

  .home-profile {
    max-width: 390px;
    padding: 20px 0;
  }

  .profile-note {
    display: none;
  }

  .home-section {
    padding: 52px 0;
  }

  .latest-layout {
    grid-template-columns: 1fr;
  }

  .featured-note {
    padding: 28px 0 32px;
    border-right: 0;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .featured-note h3 {
    font-size: 1.6rem;
  }

  .recent-note::before {
    left: -1px;
  }

  .recent-list {
    padding-left: 0;
  }

  .section-grid {
    grid-template-columns: 1fr;
  }

  .section-item {
    min-height: 205px;
  }

  .home-footer {
    grid-template-columns: 1fr;
    gap: 22px;
    margin-top: 56px;
  }

  .footer-copyright {
    grid-column: auto;
  }
}

@media (max-width: 520px) {
  .section-heading-row {
    align-items: start;
  }

  .section-note {
    display: none;
  }

  .section-heading-side {
    gap: 14px;
  }

  .section-sequence {
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 420px) {
  .home-page {
    padding-right: 20px;
    padding-left: 20px;
  }

  .profile-main {
    grid-template-columns: 96px minmax(0, 1fr);
    gap: 20px;
  }

  .author-avatar {
    width: 96px;
    height: 96px;
  }

  .intro-kicker {
    gap: 14px;
  }

  .intro-kicker > span {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .primary-link,
  .text-link::after,
  .read-note-link span,
  .section-arrow,
  .recent-note::before,
  .section-item {
    transition: none;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .home-intro > * {
    animation: home-reveal 520ms ease both;
  }

  .home-profile {
    animation-delay: 90ms;
  }

  .home-section {
    animation: home-reveal 560ms ease 120ms both;
  }

  @keyframes home-reveal {
    from {
      transform: translateY(10px);
    }

    to {
      transform: translateY(0);
    }
  }
}
</style>
