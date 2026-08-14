<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../../../posts.data'

const tags = [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b))
const selectedTag = ref('')

onMounted(() => {
  selectedTag.value = new URLSearchParams(window.location.search).get('tag') || ''
})

const filteredPosts = computed(() => selectedTag.value
  ? posts.filter((post) => post.tags.includes(selectedTag.value))
  : posts
)

const selectTag = (tag: string) => {
  selectedTag.value = selectedTag.value === tag ? '' : tag
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href)
    selectedTag.value ? url.searchParams.set('tag', selectedTag.value) : url.searchParams.delete('tag')
    window.history.replaceState({}, '', url)
  }
}
</script>

<template>
  <div class="tags-filter" aria-label="标签筛选">
    <button
      v-for="tag in tags"
      :key="tag"
      type="button"
      class="tag-link"
      :class="{ active: selectedTag === tag }"
      @click="selectTag(tag)"
    >
      # {{ tag }}
    </button>
  </div>

  <p class="filter-summary">
    {{ selectedTag ? `“${selectedTag}”下的 ${filteredPosts.length} 篇文章` : `全部 ${filteredPosts.length} 篇文章` }}
  </p>

  <div class="post-list">
    <article v-for="(post, index) in filteredPosts" :key="post.url" class="post-row">
      <div class="post-index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</div>
      <div class="post-copy">
        <div class="post-row-meta">
          <time class="post-date" :datetime="post.date">{{ post.date }}</time>
          <span>约 {{ post.readingMinutes }} 分钟阅读</span>
          <span>{{ post.wordCount.toLocaleString('zh-CN') }} 字</span>
        </div>
        <h2><a :href="withBase(post.url)">{{ post.title }}</a></h2>
        <p>{{ post.description }}</p>
      </div>
      <a class="post-arrow" :href="withBase(post.url)" :aria-label="`阅读《${post.title}》`">→</a>
    </article>
  </div>
</template>

<style scoped>
.tags-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin: 28px 0 18px;
}

button.tag-link {
  cursor: pointer;
  transition: border-color 160ms var(--vp-ease-out), color 160ms var(--vp-ease-out),
    background-color 160ms var(--vp-ease-out), transform 160ms var(--vp-ease-out);
}

button.tag-link:hover {
  transform: translateY(-1px);
}

.filter-summary {
  margin: 0 0 28px;
  color: var(--vp-c-text-3);
  font-size: 0.86rem;
}
</style>
