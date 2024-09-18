<script setup lang="ts">
import { Hero } from 'hero-motion'

const isLarge = ref(false)
</script>

<template>
  <div>
    <Hero v-if="!isLarge" layout-id="1" style="width: 50px; height: 50px; background: red;" @click="isLarge = !isLarge" />
    <Hero v-else layout-id="1" style="width: 100px; height: 100px; background: blue;" @click="isLarge = !isLarge" />
  </div>
</template>
