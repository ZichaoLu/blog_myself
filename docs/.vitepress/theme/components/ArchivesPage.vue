<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../../../posts.data'

const groups = computed(() => {
  const years = new Map<string, typeof posts>()
  for (const post of posts) {
    const year = post.date.slice(0, 4)
    years.set(year, [...(years.get(year) || []), post])
  }
  return [...years.entries()]
})
</script>

<template>
  <section v-for="[year, yearPosts] in groups" :key="year" class="archive-year">
    <h2>{{ year }}</h2>
    <ol>
      <li v-for="post in yearPosts" :key="post.url">
        <time :datetime="post.date">{{ post.date.slice(5) }}</time>
        <a :href="withBase(post.url)">{{ post.title }}</a>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.archive-year {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  gap: 28px;
  padding: 28px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.archive-year h2 {
  margin: 0;
  padding: 0;
  border: 0;
  color: var(--vp-c-brand-1);
  font-size: 1.35rem;
}

.archive-year ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

.archive-year li {
  display: grid;
  grid-template-columns: 62px minmax(0, 1fr);
  gap: 18px;
  padding: 8px 0;
}

.archive-year time {
  color: var(--vp-c-text-3);
  font-size: 0.82rem;
  font-variant-numeric: tabular-nums;
}

.archive-year a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 160ms var(--vp-ease-out);
}

.archive-year a:hover {
  color: var(--vp-c-brand-1);
}

@media (max-width: 520px) {
  .archive-year {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
