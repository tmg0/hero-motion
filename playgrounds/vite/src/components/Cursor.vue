<script setup>
import { Hero } from 'hero-motion'

const emit = defineEmits(['click'])
</script>

<template>
  <Hero
    layout-id="cursor"
    class="w-full h-full rounded-xl cursor-pointer"
    :transition="{ type: 'spring', duration: 1000 }"
    @click="emit('click')"
  >
    123
  </Hero>
</template>
