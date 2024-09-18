<script setup lang="ts">
import { Hero } from 'hero-motion'
</script>

<template>
  <Hero layout-id="tab-cursor" as="span" class="absolute z-0 inset-0 rounded-lg bg-white dark:bg-default shadow-small">
    <slot />
  </Hero>
</template>
