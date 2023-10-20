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
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-teal-500',
  'bg-sky-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500'
]
</script>

<template>
  <div class="flex">
    <div class="p-5 grid grid-cols-3 gap-5 shadow-xl m-5 rounded-xl bg-slate-500">
      <HeroProvider>
        <div v-for="i in 9" :key="i" class="w-32 h-32 cursor-pointer rounded-xl bg-slate-700" @click="activeKey = i">
          <Cursor v-if="isActive(i)" :class="BG_COLORS[i - 1]" :style="{ fontSize: `${fontSizeRange(i)}px` }" />
        </div>
      </HeroProvider>
    </div>
  </div>
</template>
