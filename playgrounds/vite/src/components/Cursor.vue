<script setup>
import { Hero } from 'hero-motion'

defineProps({ color: { type: String, default: 'tansparent' } })

const emit = defineEmits(['click'])
</script>

<template>
  <Hero
    layout-id="cursor"
    class="w-full h-full rounded-xl cursor-pointer"
    :style="{ backgroundColor: color }"
    :transition="{ type: 'keyframes', duration: 3000 }"
    @click="emit('click')"
  />
</template>
