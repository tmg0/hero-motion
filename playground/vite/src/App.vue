<script setup>
import { ref } from 'vue'
import { HeroProvider, directive } from 'hero-motion'
import { Tab, Tabs } from './components/Tabs'

const activeTab = ref('A')
const isLarge = ref(false)
const hasCompleted = ref(true)
const vHero = directive()

function onSelect(value) {
  activeTab.value = value
}

function onComplete() {
  hasCompleted.value = true
}

function toggleSize() {
  isLarge.value = !isLarge.value
  hasCompleted.value = false
}
</script>

<template>
  <HeroProvider :transition="{ type: 'keyframes' }">
    <div class="p-6 flex flex-col gap-3">
      <div class="font-bold">
        Toggle Position Animation
      </div>

      <div class="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
        <Tabs>
          <Tab :is-active="activeTab === 'A'" @click="onSelect('A')">
            TabA
          </Tab>
          <Tab :is-active="activeTab === 'B'" @click="onSelect('B')">
            TabB
          </Tab>
        </Tabs>
      </div>

      <div class="font-bold">
        Transition Across the Pages
      </div>

      <div class="p-4 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl">
        <RouterView />
      </div>

      <div class="font-bold">
        Toggle Size Animation
      </div>

      <div class="p-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl">
        <div class="grid place-items-center h-48 w-48">
          <button class="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-violet-200" @click="toggleSize">
            Toggle (loading: {{ !hasCompleted }})
          </button>

          <div v-if="isLarge" v-hero as="div" layout-id="box" class="w-24 h-24 rounded-xl cursor-pointer" :style="{ background: '#f43f5e' }" @complete="onComplete" />
          <div v-else v-hero as="div" layout-id="box" class="w-12 h-12 rounded-xl cursor-pointer" :style="{ background: '#2dd4bf' }" @complete="onComplete" />
        </div>
      </div>
    </div>
  </HeroProvider>
</template>
