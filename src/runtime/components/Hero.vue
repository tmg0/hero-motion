<script setup lang="ts">
import type { Transition } from '../../types'
import { useNuxtApp } from '#app'
import { Hero } from 'hero-motion'

defineProps<{
  as?: string
  layoutId: string | number
  transition?: Transition
  ignore?: string[]
}>()

const { $hero } = useNuxtApp()
</script>

<template>
  <Hero :as="as" :layout-id="layoutId" :transition="{ ...$hero.transition, ...transition }" :ignore="ignore">
    <slot />
  </Hero>
</template>
