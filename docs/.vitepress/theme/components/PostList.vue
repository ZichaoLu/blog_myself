<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../../../posts.data'
import type { CategoryKey } from '../../site'

const props = defineProps<{
  category?: CategoryKey
  limit?: number
}>()

const filteredPosts = computed(() => {
  const selected = props.category
    ? posts.filter((post) => post.category === props.category)
    : posts

  return props.limit ? selected.slice(0, props.limit) : selected
})

const formatDate = (date: string) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}).format(new Date(`${date}T00:00:00+08:00`))
</script>

<template>
  <div v-if="filteredPosts.length" class="post-list">
    <article v-for="post in filteredPosts" :key="post.url" class="post-row">
      <time class="post-date" :datetime="post.date">{{ formatDate(post.date) }}</time>
      <div class="post-copy">
        <h2><a :href="withBase(post.url)">{{ post.title }}</a></h2>
        <p>{{ post.description }}</p>
        <p class="post-reading">约 {{ post.readingMinutes }} 分钟阅读 · {{ post.wordCount }} 字</p>
        <ul class="tag-list" aria-label="文章标签">
          <li v-for="tag in post.tags" :key="tag">
            <a class="tag-link" :href="withBase(`/tags/?tag=${encodeURIComponent(tag)}`)"># {{ tag }}</a>
          </li>
        </ul>
      </div>
    </article>
  </div>
  <p v-else class="empty-state">这个栏目还没有文章。</p>
</template>
