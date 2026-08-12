<script setup lang="ts">
import { computed } from 'vue'
import { getCategory, type CategoryKey } from '../../site'

const props = defineProps<{ category: CategoryKey }>()
const details = computed(() => getCategory(props.category))
</script>

<template>
  <template v-if="details">
    <p class="eyebrow">{{ details.englishName }}</p>
    <h1>{{ details.name }}</h1>
    <p>{{ details.intro }}</p>
    <PostList :category="details.key" />
  </template>
</template>
