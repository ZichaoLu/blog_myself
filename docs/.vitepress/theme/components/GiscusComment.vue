<script setup lang="ts">
import { computed } from 'vue'
import Giscus from '@giscus/vue'
import { useData } from 'vitepress'

const { frontmatter, isDark } = useData()
const repo = import.meta.env.VITE_GISCUS_REPO || ''
const repoId = import.meta.env.VITE_GISCUS_REPO_ID || ''
const categoryId = import.meta.env.VITE_GISCUS_CATEGORY_ID || ''
const enabled = computed(() => Boolean(
  frontmatter.value.comments === true && repo && repoId && categoryId
))
</script>

<template>
  <div v-if="enabled" class="comment-section">
    <Giscus
      :repo="repo"
      :repo-id="repoId"
      category="Announcements"
      :category-id="categoryId"
      mapping="pathname"
      strict="1"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="bottom"
      :theme="isDark ? 'dark' : 'light'"
      lang="zh-CN"
      loading="lazy"
    />
  </div>
</template>

<style scoped>
.comment-section {
  margin-top: 56px;
  padding-top: 32px;
  border-top: 1px solid var(--vp-c-divider);
}
</style>
