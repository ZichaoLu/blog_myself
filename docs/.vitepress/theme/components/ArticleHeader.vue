<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as posts } from '../../../posts.data'
import { getCategory } from '../../site'

const { frontmatter, page } = useData()

const post = computed(() => {
  const relativePath = page.value.relativePath.replace(/\.md$/, '')
  return posts.find((item) => item.url.replace(/^\//, '') === relativePath)
})

const category = computed(() => post.value ? getCategory(post.value.category) : undefined)
const visible = computed(() => Boolean(post.value && frontmatter.value.date))
const noteNumber = computed(() => {
  if (!post.value) return ''
  const index = posts.findIndex((item) => item.url === post.value?.url)
  return `Note ${String(posts.length - index).padStart(3, '0')}`
})

const formatDate = (date: string) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(new Date(`${date}T00:00:00+08:00`))

const updatedDate = computed(() => {
  const updated = frontmatter.value.updated
  return typeof updated === 'string' && updated && updated !== post.value?.date ? updated : ''
})
</script>

<template>
  <header v-if="visible && post" class="article-header">
    <p class="article-kicker">
      <span class="article-context">
        <a v-if="category" :href="withBase(category.href)">{{ category.name }}</a>
        <span v-if="category" aria-hidden="true">·</span>
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      </span>
      <span class="article-number" aria-hidden="true">{{ noteNumber }}</span>
    </p>
    <h1>{{ post.title }}</h1>
    <p class="article-description">{{ post.description }}</p>
    <div class="article-details">
      <span>约 {{ post.readingMinutes }} 分钟阅读</span>
      <span>{{ post.wordCount.toLocaleString('zh-CN') }} 字</span>
      <span v-if="updatedDate">更新于 {{ formatDate(updatedDate) }}</span>
      <ul class="tag-list" aria-label="文章标签">
        <li v-for="tag in post.tags" :key="tag">
          <a class="tag-link" :href="withBase(`/tags/?tag=${encodeURIComponent(tag)}`)"># {{ tag }}</a>
        </li>
      </ul>
    </div>
  </header>
</template>
