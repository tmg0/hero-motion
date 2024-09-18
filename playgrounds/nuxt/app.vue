<script setup lang="ts">
import { Hero } from 'hero-motion'

const isLarge = ref(false)
</script>

<template>
  <div>
    <Hero v-if="!isLarge" layout-id="1" style="width: 10px; height: 10px; background: red;" />
    <Hero v-else layout-id="1" style="width: 20px; height: 20px; background: blue;" />

    <button @click="isLarge = !isLarge">Toggle</button>
  </div>
</template>
