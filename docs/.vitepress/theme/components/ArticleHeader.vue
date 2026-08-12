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

const formatDate = (date: string) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(new Date(`${date}T00:00:00+08:00`))
</script>

<template>
  <header v-if="visible && post" class="article-header">
    <p class="article-kicker">
      <a v-if="category" :href="withBase(category.href)">{{ category.name }}</a>
      <span v-if="category" aria-hidden="true">·</span>
      <time :datetime="post.date">{{ formatDate(post.date) }}</time>
    </p>
    <h1>{{ post.title }}</h1>
    <p class="article-description">{{ post.description }}</p>
    <div class="article-details">
      <span>约 {{ post.readingMinutes }} 分钟阅读</span>
      <span>{{ post.wordCount.toLocaleString('zh-CN') }} 字</span>
      <ul class="tag-list" aria-label="文章标签">
        <li v-for="tag in post.tags" :key="tag">
          <a class="tag-link" :href="withBase(`/tags/?tag=${encodeURIComponent(tag)}`)"># {{ tag }}</a>
        </li>
      </ul>
    </div>
  </header>
</template>
