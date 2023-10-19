<script setup>
import { Hero } from 'hero-motion'

const emit = defineEmits(['click'])
</script>

<template>
  <Hero
    layout-id="cursor"
    class="w-full h-full rounded-xl cursor-pointer flex items-center justify-center"
    :transition="{ type: 'spring', duration: 1000 }"
    @click="emit('click')"
  >
    H
  </Hero>
</template>
