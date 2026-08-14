<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as posts } from '../../../posts.data'
import { getCategory } from '../../site'

const { page } = useData()

const currentPost = computed(() => {
  const relativePath = page.value.relativePath.replace(/\.md$/, '')
  return posts.find((item) => item.url.replace(/^\//, '') === relativePath)
})

const related = computed(() => {
  if (!currentPost.value) return []
  const current = currentPost.value

  const sameCategory = posts
    .filter((post) => post.url !== current.url && post.category === current.category)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

  const sameTags = posts
    .filter((post) =>
      post.url !== current.url &&
      post.category !== current.category &&
      post.tags.some((tag) => current.tags.includes(tag))
    )
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

  const combined = [...sameCategory, ...sameTags]
  const unique = combined.filter((post, index, arr) =>
    arr.findIndex((item) => item.url === post.url) === index
  )

  return unique.slice(0, 3)
})

const formatDate = (date: string) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}).format(new Date(`${date}T00:00:00+08:00`))
</script>

<template>
  <section v-if="related.length" class="related-posts" aria-labelledby="related-title">
    <div class="related-heading">
      <p class="eyebrow">Continue Reading</p>
      <h2 id="related-title">相关文章</h2>
    </div>
    <div class="related-grid">
      <article v-for="post in related" :key="post.url" class="related-card">
        <a class="related-link" :href="withBase(post.url)">
          <img v-if="post.cover" class="related-cover" :src="withBase(post.cover)" :alt="`《${post.title}》封面图`" loading="lazy">
          <span class="related-category">{{ getCategory(post.category)?.name }}</span>
          <h3>{{ post.title }}</h3>
          <p>{{ post.description }}</p>
          <span class="related-meta">
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
            <span aria-hidden="true">·</span>
            <span>约 {{ post.readingMinutes }} 分钟</span>
          </span>
        </a>
      </article>
    </div>
  </section>
</template>

<style scoped>
.related-posts {
  margin-top: 56px;
  padding-top: 36px;
  border-top: 1px solid var(--vp-c-divider);
}

.related-heading {
  margin-bottom: 22px;
}

.related-heading h2 {
  margin: 0;
  border: 0;
  font-family: var(--vp-font-family-serif);
  font-size: 1.4rem;
  line-height: 1.4;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.related-card {
  min-width: 0;
}

.related-link {
  display: flex;
  flex-direction: column;
  gap: 9px;
  height: 100%;
  min-height: 190px;
  padding: 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--vp-radius-sm);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: border-color 180ms var(--vp-ease-out), background-color 180ms var(--vp-ease-out),
    box-shadow 180ms var(--vp-ease-out), transform 180ms var(--vp-ease-out);
}

.related-link:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 38%, var(--vp-c-divider));
  background: color-mix(in srgb, var(--vp-c-bg-soft) 60%, transparent);
  box-shadow: var(--vp-shadow-sm);
  transform: translateY(-2px);
}

.related-cover {
  display: block;
  width: calc(100% + 36px);
  margin: -18px -18px 12px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--vp-radius-sm) var(--vp-radius-sm) 0 0;
}

.related-category {
  color: var(--vp-c-brand-1);
  font-size: 0.72rem;
  font-weight: 700;
}

.related-link h3 {
  margin: 0;
  font-family: var(--vp-font-family-serif);
  font-size: 1.02rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.related-link:hover h3 {
  color: var(--vp-c-brand-1);
}

.related-link p {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  line-height: 1.65;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.related-meta {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
  color: var(--vp-c-text-3);
  font-size: 0.74rem;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 768px) {
  .related-grid {
    grid-template-columns: 1fr;
  }

  .related-link {
    min-height: 0;
  }
}
</style>
