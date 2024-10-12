<script setup>
import { HeroProvider } from 'hero-motion'
import { ref } from 'vue'
import MultipleItems from './components/MultipleItems.vue'
import { Tab, Tabs } from './components/Tabs'
import ToggleSize from './components/ToggleSize.vue'

const activeTab = ref('A')

function onSelect(value) {
  activeTab.value = value
}
</script>

<template>
  <HeroProvider :transition="{ type: 'spring' }">
    <div class="bg-black/90 w-full min-h-screen text-white">
      <div class="px-6 py-12 lg:py-24  lg:px-0 lg:w-[768px] mx-auto flex flex-col gap-6">
        <div class="text-6xl font-bold flex gap-4">
          <span>Hero</span>
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Motion.</span>
        </div>

        <div class="text-lg leading-relaxed lg:text-2xl font-extralight">
          🌊 A shared layout animations for vue like framer motion, use layoutId prop and components will animate from one to another.
        </div>

        <div class="h-px w-full bg-white/10" />

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
          <ToggleSize />
        </div>

        <div class="font-bold">
          Multiple Items
        </div>

        <div class="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
          <MultipleItems />
        </div>
      </div>
    </div>
  </HeroProvider>
</template>
