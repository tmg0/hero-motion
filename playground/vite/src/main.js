import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from './App.vue'

import './style.css'

const routes = [
  { path: '/', component: () => import('./pages/index.vue') },
  { path: '/:id', component: () => import('./pages/[id].vue') },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
