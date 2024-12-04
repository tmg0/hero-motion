<script setup lang="ts">
import type { Transition as MotionTransition } from '@vueuse/motion'
import { useRuntimeConfig } from '#app'
import { computed, useAttrs } from '#imports'
import { Hero } from 'hero-motion'

export type Transition = MotionTransition

defineProps<{
  as?: string
  layoutId: string | number
  transition?: Transition
  ignore?: string[]
}>()

const emit = defineEmits(['complete'])

const config = useRuntimeConfig()
const ctx = computed(() => config.public.hero ?? {})
const attrs = useAttrs()
</script>

<template>
  <ClientOnly>
    <Hero
      :as="as"
      :layout-id="layoutId"
      :transition="{ ...ctx.transition, ...transition }"
      :ignore="ignore"
      :style="attrs.style"
      @complete="emit('complete')"
    >
      <slot />
    </Hero>
  </ClientOnly>
</template>
