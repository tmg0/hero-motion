<script setup>
import { Hero } from 'hero-motion'

const emit = defineEmits(['click'])
</script>

<template>
  <Hero
    layout-id="cursor"
    class="w-full h-full rounded-xl cursor-pointer flex items-center justify-center select-none"
    @click="emit('click')"
  >
    H
  </Hero>
</template>
