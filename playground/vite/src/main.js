import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import './style.css'

const routes = [
  { path: '/', component: () => import('./pages/index.vue') },
  { path: '/:id', component: () => import('./pages/[id].vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
