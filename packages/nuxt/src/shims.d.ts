declare module '#app' {
  import { defineNuxtPlugin, useNuxtApp, useRuntimeConfig } from 'nuxt/app'

  export const defineNuxtPlugin
  export const useRuntimeConfig
  export const useNuxtApp
}

declare module '#imports' {
  import { computed } from 'vue'

  export const computed
}

declare module 'hero-motion' {
  import { Hero } from 'hero-motion'

  export const Hero
}
