<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const progress = ref(0)

const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  progress.value = scrollable > 0
    ? Math.min(100, Math.max(0, window.scrollY / scrollable * 100))
    : 0
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})

watch(() => frontmatter.value.date, () => nextTick(updateProgress))
</script>

<template>
  <div
    v-if="frontmatter.date"
    class="reading-progress"
    role="progressbar"
    aria-label="文章阅读进度"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="Math.round(progress)"
  >
    <span :style="{ transform: `scaleX(${progress / 100})` }" />
  </div>
</template>
