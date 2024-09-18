<script setup lang="ts">
import { Hero } from 'hero-motion'

defineProps<{
  id: number | string
  size?: number | string
  src?: string
}>()
</script>

<template>
  <Hero :layout-id="`avatar:${id}`" :style="{ width: `${size}px`, height: `${size}px` }" class="text-white rounded-lg flex items-center justify-center uppercase overflow-hidden">
    <img :src="src">
  </Hero>
</template>
