import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import HomePage from './components/HomePage.vue'
import PostList from './components/PostList.vue'
import TagsPage from './components/TagsPage.vue'
import ArchivesPage from './components/ArchivesPage.vue'
import GiscusComment from './components/GiscusComment.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(GiscusComment)
    })
  },
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    app.component('PostList', PostList)
    app.component('TagsPage', TagsPage)
    app.component('ArchivesPage', ArchivesPage)
  }
} satisfies Theme
