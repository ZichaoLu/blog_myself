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
    <article v-for="post in filteredPosts" :key="post.url" class="post-row">
      <time class="post-date" :datetime="post.date">{{ post.date }}</time>
      <div class="post-copy">
        <h2><a :href="withBase(post.url)">{{ post.title }}</a></h2>
        <p>{{ post.description }}</p>
      </div>
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
}

.filter-summary {
  margin: 0 0 28px;
  color: var(--vp-c-text-3);
  font-size: 0.86rem;
}
</style>
