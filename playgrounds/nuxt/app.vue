<script setup lang="ts">
const isLarge = ref(false)
</script>

<template>
  <div>
    <button style="margin-bottom: 4px;" @click="isLarge = !isLarge">
      Trigger
    </button>

    <Hero v-if="!isLarge" layout-id="1" style="width: 100px; height: 100px; background-color: #f43f5e; display: flex; align-items: center; justify-content: center;">
      <div>
        Content
      </div>
    </Hero>

    <Hero v-else layout-id="1" style="width: 200px; height: 200px; background-color: #2dd4bf; display: flex; align-items: center; justify-content: center;">
      <div>
        Content
      </div>
    </Hero>
  </div>
</template>
