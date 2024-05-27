<script setup lang="ts">
import { Hero } from 'hero-motion'

defineProps<{
  id: number | string
  size?: number | string
}>()
</script>

<template>
  <Hero :layout-id="`avatar:${id}`" :style="{ width: `${size}px`, height: `${size}px` }" class="text-white rounded-lg flex items-center justify-center uppercase overflow-hidden">
    <img src="https://avatars.githubusercontent.com/u/40710111?s=96&v=4">
  </Hero>
</template>
