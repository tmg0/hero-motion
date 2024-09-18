import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { ref } from 'vue'
import { useProvideHeroContext } from '../composables/use-hero-context'

export default defineNuxtPlugin({
  name: 'hero-motion',

  setup() {
    const config = useRuntimeConfig()

    useProvideHeroContext({
      layouts: ref({}),
      props: ref(config.public.hero ?? {}),
    })
  },
})
