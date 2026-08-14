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

function setupImageZoom() {
  const onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (target.tagName !== 'IMG') return
    if (target.classList.contains('author-avatar')) return
    if (target.closest('.featured-cover') || target.closest('.related-cover')) return
    if (!target.closest('.vp-doc')) return

    const image = target as HTMLImageElement
    const src = image.currentSrc || image.src
    if (!src) return

    const overlay = document.createElement('div')
    overlay.className = 'lightbox-overlay'
    const img = document.createElement('img')
    img.src = src
    img.alt = image.alt || ''
    overlay.appendChild(img)
    document.body.appendChild(overlay)
    document.body.style.overflow = 'hidden'

    function close() {
      overlay.remove()
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeydown)
    }

    function onKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }

    overlay.addEventListener('click', close)
    document.addEventListener('keydown', onKeydown)
  }

  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}

export default {
  extends: DefaultTheme,
  Layout() {
    const { isDark } = useData()
    const cleanups: Array<() => void> = []

    onMounted(() => {
      const onScroll = () => {
        document.documentElement.classList.toggle('is-scrolled', window.scrollY > 8)
      }

      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      cleanups.push(() => window.removeEventListener('scroll', onScroll))
      cleanups.push(setupImageZoom())
    })

    onBeforeUnmount(() => cleanups.forEach((fn) => fn()))

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
