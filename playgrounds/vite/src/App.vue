<script setup>
import { ref } from 'vue'
import { HeroProvider } from 'hero-motion'
import Cursor from './components/Cursor.vue'

const activeKey = ref(1)
const isActive = i => i === activeKey.value

const bgColors = ref(['#ef4444', '#f59e0b', '#84cc16', '#10b981', '#06b6d4'])
</script>

<template>
  <div class="p-5 flex gap-5 shadow-xl m-5 rounded-xl bg-slate-500">
    <HeroProvider>
      <div v-for="i in 5" :key="i" class="w-32 h-32 cursor-pointer rounded-xl bg-slate-700" @click="activeKey = i">
        <Cursor v-if="isActive(i)" :color="bgColors[i - 1]" />
      </div>
    </HeroProvider>
  </div>
</template>
