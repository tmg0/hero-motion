// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['../../packages/nuxt/src/module'],

  hero: {
    transition: {
      type: 'spring',
    },
  },
})
