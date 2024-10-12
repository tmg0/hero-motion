<script setup>
import { Hero } from 'hero-motion'
import { ref } from 'vue'

const isSingle = ref(false)

function onToggle() {
  isSingle.value = !isSingle.value
}
</script>

<template>
  <div class="grid place-items-center h-48 w-48">
    <button class="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-violet-200" @click="onToggle">
      Toggle
    </button>

    <div class="flex gap-3">
      <Hero v-if="isSingle" layout-id="multi-item">
        <div class="w-24 h-24 rounded-xl cursor-pointer" :style="{ background: '#2dd4bf' }" />
      </Hero>

      <Hero v-if="!isSingle" layout-id="multi-item">
        <div class="w-12 h-12 rounded-xl cursor-pointer" :style="{ background: '#4ade80' }" />
      </Hero>

      <Hero v-if="!isSingle" layout-id="multi-item">
        <div class="w-12 h-12 rounded-xl cursor-pointer" :style="{ background: '#22d3ee' }" />
      </Hero>
    </div>
  </div>
</template>
