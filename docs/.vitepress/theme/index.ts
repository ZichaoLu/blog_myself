import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h, onBeforeUnmount, onMounted, watch } from 'vue'
import { useData } from 'vitepress'
import HomePage from './components/HomePage.vue'
import PostList from './components/PostList.vue'
import TagsPage from './components/TagsPage.vue'
import ArchivesPage from './components/ArchivesPage.vue'
import GiscusComment from './components/GiscusComment.vue'
import ArticleHeader from './components/ArticleHeader.vue'
import CategoryPage from './components/CategoryPage.vue'
import CategoryOverview from './components/CategoryOverview.vue'
import ReadingProgress from './components/ReadingProgress.vue'
import RelatedPosts from './components/RelatedPosts.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    const { isDark } = useData()
    let cleanup: (() => void) | undefined

    onMounted(() => {
      const onScroll = () => {
        document.documentElement.classList.toggle('is-scrolled', window.scrollY > 8)
      }

      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      cleanup = () => window.removeEventListener('scroll', onScroll)
    })

    onBeforeUnmount(() => cleanup?.())

    watch(isDark, () => {
      document.documentElement.classList.add('theme-switching')
      window.setTimeout(() => {
        document.documentElement.classList.remove('theme-switching')
      }, 420)
    })

    return h(DefaultTheme.Layout, null, {
      'doc-before': () => [h(ReadingProgress), h(ArticleHeader)],
      'doc-after': () => [h(RelatedPosts), h(GiscusComment)]
    })
  },
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    app.component('PostList', PostList)
    app.component('TagsPage', TagsPage)
    app.component('ArchivesPage', ArchivesPage)
    app.component('CategoryPage', CategoryPage)
    app.component('CategoryOverview', CategoryOverview)
  }
} satisfies Theme
