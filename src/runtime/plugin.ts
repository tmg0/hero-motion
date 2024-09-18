import { defineNuxtPlugin } from '#app'
import { ref } from 'vue'
import { useProvideHeroContext } from '../composables/use-hero-context'

export default defineNuxtPlugin({
  name: 'hero-motion',

  setup() {
    useProvideHeroContext({
      layouts: ref({}),
      props: ref({}),
    })
  },
})
