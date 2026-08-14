<script setup lang="ts">
import { withBase } from 'vitepress'
import { categories } from '../../site'
</script>

<template>
  <ul class="category-overview">
    <li v-for="category in categories" :key="category.key">
      <a :href="withBase(category.href)"><strong>{{ category.name }}</strong></a>
      <span>{{ category.description }}</span>
    </li>
  </ul>
</template>

<style scoped>
.category-overview {
  margin: 20px 0 28px;
  padding: 0;
  border-top: 1px solid var(--vp-c-divider);
  list-style: none;
}

.category-overview li {
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  gap: 22px;
  padding: 16px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.category-overview a {
  text-decoration: none;
}

.category-overview strong {
  transition: color 160ms var(--vp-ease-out);
}

.category-overview li:hover strong {
  color: var(--vp-c-brand-1);
}

.category-overview span {
  color: var(--vp-c-text-2);
}

@media (max-width: 520px) {
  .category-overview li {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
