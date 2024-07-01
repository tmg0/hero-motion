<script setup>
import { ref } from 'vue'
import { Hero, HeroProvider } from 'hero-motion'
import { Tab, Tabs } from './components/Tabs'

const activeTab = ref('A')
const isLarge = ref(false)
const routerViewRef = ref()

function onSelect(value) {
  activeTab.value = value
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
        <RouterView ref="routerViewRef" />
      </div>

      <div class="font-bold">
        Toggle Size Animation
      </div>

      <div class="p-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl">
        <div class="grid place-items-center h-48 w-48">
          <button class="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-violet-200" @click="isLarge = !isLarge">
            Toggle
          </button>

          <Hero v-if="isLarge" as="div" layout-id="box" :dependencies="[routerViewRef]" class="w-24 h-24 rounded-xl cursor-pointer" :style="{ background: '#f43f5e' }" @click="isLarge = !isLarge" />
          <Hero v-else as="div" layout-id="box" :dependencies="[routerViewRef]" class="w-12 h-12 rounded-xl cursor-pointer" :style="{ background: '#2dd4bf' }" @click="isLarge = !isLarge" />
        </div>
      </div>
    </div>
  </HeroProvider>
</template>
