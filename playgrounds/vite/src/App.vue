<script setup>
import { ref } from 'vue'
import { HeroProvider } from 'hero-motion'
import Cursor from './components/Cursor.vue'

const activeKey = ref(5)
const isActive = i => i === activeKey.value

const mapRange = (from, to) => (value) => {
  const [fromMin, fromMax] = from
  const [toMin, toMax] = to
  return (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin
}

const fontSizeRange = mapRange([1, 9], [12, 12 * 9])

const BG_COLORS = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#14b8a6',
  '#06b6d4'
]
</script>

<template>
  <div class="flex">
    <div class="p-5 grid grid-cols-3 gap-5 shadow-xl m-5 rounded-xl bg-slate-500">
      <HeroProvider>
        <div v-for="i in 9" :key="i" class="w-32 h-32 cursor-pointer rounded-xl bg-slate-700" @click="activeKey = i">
          <Cursor v-if="isActive(i)" :style="{ background: BG_COLORS[i - 1], fontSize: `${fontSizeRange(i)}px` }" />
        </div>
      </HeroProvider>
    </div>
  </div>
</template>
