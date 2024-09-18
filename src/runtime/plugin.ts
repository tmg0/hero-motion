import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin({
  name: 'hero-motion',

  setup() {
    const config = useRuntimeConfig()

    return {
      provide: {
        hero: config.public.hero ?? {},
      },
    }
  },
})
