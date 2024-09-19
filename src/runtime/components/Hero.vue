<script setup lang="ts">
import type { Transition } from '../../types'
import { useRuntimeConfig } from '#app'
import { computed } from '#imports'
import { Hero } from 'hero-motion'

defineProps<{
  as?: string
  layoutId: string | number
  transition?: Transition
  ignore?: string[]
}>()

const emit = defineEmits(['complete'])

const config = useRuntimeConfig()
const ctx = computed(() => config.public.hero ?? {})
</script>

<template>
  <Hero
    :as="as"
    :layout-id="layoutId"
    :transition="{ ...ctx.transition, ...transition }"
    :ignore="ignore"
    @complete="emit('complete')"
  >
    <slot />
  </Hero>
</template>
