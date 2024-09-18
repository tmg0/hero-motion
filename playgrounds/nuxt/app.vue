<script setup lang="ts">
const isLarge = ref(false)
</script>

<template>
  <div :transition="{ type: 'spring' }">
    <Hero v-if="!isLarge" layout-id="1" style="width: 50px; height: 50px; background: #f43f5e;" @click="isLarge = !isLarge" />
    <Hero v-else layout-id="1" style="width: 100px; height: 100px; background: #2dd4bf;" @click="isLarge = !isLarge" />
  </div>
</template>
