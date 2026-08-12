<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../../../posts.data'
import { getCategory, type CategoryKey } from '../../site'

const props = defineProps<{ category: CategoryKey }>()
const details = computed(() => getCategory(props.category))
const categoryPosts = computed(() => posts.filter((post) => post.category === props.category))

const formatDate = (date: string) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}).format(new Date(`${date}T00:00:00+08:00`))
</script>

<template>
  <div v-if="details" class="category-page" :class="`category-${details.key}`">
    <header class="category-header">
      <div class="category-title-block">
        <p class="eyebrow">{{ details.englishName }} · Notes</p>
        <h1>{{ details.name }}</h1>
      </div>
      <p class="category-intro">{{ details.intro }}</p>
      <dl class="category-stats" aria-label="栏目概况">
        <div>
          <dt>公开文章</dt>
          <dd>{{ categoryPosts.length }}</dd>
        </div>
        <div>
          <dt>最近更新</dt>
          <dd>{{ categoryPosts[0] ? formatDate(categoryPosts[0].date) : '—' }}</dd>
        </div>
      </dl>
    </header>

    <div class="category-list-heading">
      <p>All Notes</p>
      <span>{{ String(categoryPosts.length).padStart(2, '0') }}</span>
    </div>
    <PostList :category="details.key" />
  </div>
</template>

<style scoped>
.category-page {
  --category-accent: var(--vp-c-brand-1);
}

.category-finance {
  --category-accent: #86623f;
}

.category-life {
  --category-accent: #5d7359;
}

.category-career {
  --category-accent: #7d5863;
}

:global(.dark) .category-finance {
  --category-accent: #c3a07b;
}

:global(.dark) .category-life {
  --category-accent: #91ad8d;
}

:global(.dark) .category-career {
  --category-accent: #bc909c;
}

.category-header {
  position: relative;
  display: grid;
  grid-template-columns: minmax(190px, 0.55fr) minmax(0, 1.45fr);
  gap: 22px 54px;
  margin-bottom: 52px;
  padding: 10px 0 32px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.category-header::after {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 72px;
  height: 2px;
  background: var(--category-accent);
  content: "";
}

.category-title-block .eyebrow {
  color: var(--category-accent);
}

.category-title-block h1 {
  margin: 0;
  font-family: Georgia, "Noto Serif SC", "Songti SC", serif;
  font-size: 3rem;
  line-height: 1.2;
}

.category-intro {
  align-self: end;
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.98rem;
  line-height: 1.9;
}

.category-stats {
  display: flex;
  grid-column: 2;
  gap: 0;
  margin: 2px 0 0;
}

.category-stats div {
  min-width: 120px;
  padding-right: 24px;
  border-right: 1px solid var(--vp-c-divider);
}

.category-stats div + div {
  padding-left: 24px;
}

.category-stats div:last-child {
  border-right: 0;
}

.category-stats dt {
  color: var(--vp-c-text-3);
  font-size: 0.7rem;
}

.category-stats dd {
  margin: 5px 0 0;
  color: var(--vp-c-text-1);
  font-family: Georgia, "Noto Serif SC", "Songti SC", serif;
  font-size: 0.95rem;
  font-variant-numeric: tabular-nums;
}

.category-list-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.category-list-heading p,
.category-list-heading span {
  margin: 0;
  color: var(--vp-c-text-3);
  font-family: Georgia, serif;
  font-size: 0.7rem;
  text-transform: uppercase;
}

.category-list-heading p {
  color: var(--category-accent);
  font-weight: 700;
}

@media (max-width: 640px) {
  .category-header {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 40px;
  }

  .category-title-block h1 {
    font-size: 2.35rem;
  }

  .category-stats {
    grid-column: auto;
  }
}
</style>
