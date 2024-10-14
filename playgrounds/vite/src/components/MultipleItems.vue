<script setup>
import { Hero } from 'hero-motion'
import { ref } from 'vue'

const isSingle = ref(false)

function toggle() {
  isSingle.value = !isSingle.value
}
</script>

<template>
  <div class="grid place-items-center h-48 w-48">
    <button class="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-violet-200" @click="toggle">
      Toggle
    </button>

    <div class="flex gap-3">
      <template v-if="isSingle">
        <Hero layout-id="multiple-item:1" class="w-24 h-24 rounded-xl cursor-pointer float" :style="{ background: '#f43f5e' }">
          <Hero layout-id="multiple-item:2" class="w-24 h-24 rounded-xl cursor-pointer float" :style="{ background: '#f43f5e' }" />
        </Hero>
      </template>

      <template v-else>
        <Hero layout-id="multiple-item:1" class="w-12 h-12 rounded-xl cursor-pointer" :style="{ background: '#fcd34d' }" />
        <Hero layout-id="multiple-item:2" class="w-12 h-12 rounded-xl cursor-pointer" :style="{ background: '#2dd4bf' }" />
      </template>
    </div>
  </div>
</template>
