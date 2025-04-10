<script setup>
import { directive, HeroProvider } from 'hero-motion'
import { ref } from 'vue'
import { Tab, Tabs } from './components/Tabs'

const vHero = directive()
const activeTab = ref('A')
const isLarge = ref(false)
const hasCompleted = ref(true)

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
  <HeroProvider>
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
          <RouterView v-slot="{ Component }">
            <KeepAlive>
              <component :is="Component" />
            </KeepAlive>
          </RouterView>
        </div>

        <div class="font-bold">
          Toggle Size Animation
        </div>

        <div class="p-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl">
          <div class="grid place-items-center h-52 w-52">
            <button class="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-violet-200" @click="toggleSize">
              Toggle (loading: {{ !hasCompleted }})
            </button>

            <div v-if="isLarge" v-hero layout-id="box" class="w-36 h-36 rounded-xl flex items-center justify-center bg-rose-500" @complete="onComplete">
              <div>text content</div>
            </div>
            <div v-else v-hero layout-id="box" class="w-24 h-24 rounded-xl flex items-center justify-center bg-teal-400" @complete="onComplete">
              <div>text content</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </HeroProvider>
</template>
