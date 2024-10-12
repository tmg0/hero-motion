<script setup>
import { directive } from 'hero-motion'
import { ref } from 'vue'

const isLarge = ref(false)
const hasCompleted = ref(true)
const vHero = directive()

function onComplete() {
  hasCompleted.value = true
}

function toggleSize() {
  isLarge.value = !isLarge.value
  hasCompleted.value = false
}
</script>

<template>
  <div class="grid place-items-center h-48 w-48">
    <button class="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-violet-200" @click="toggleSize">
      Toggle (loading: {{ !hasCompleted }})
    </button>

    <div v-if="isLarge" v-hero as="div" layout-id="box" class="w-24 h-24 rounded-xl cursor-pointer" :style="{ background: '#f43f5e' }" @complete="onComplete" />
    <div v-else v-hero as="div" layout-id="box" class="w-12 h-12 rounded-xl cursor-pointer" :style="{ background: '#2dd4bf' }" @complete="onComplete" />
  </div>
</template>
