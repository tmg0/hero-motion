<script setup lang="ts">
import TabCursor from './TabCursor.vue'

defineProps<{
  isActive: boolean
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <button class="z-0 w-full px-3 py-1 flex group relative justify-center items-center cursor-pointer transition-opacity tap-highlight-transparent data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-30 data-[hover-unselected=true]:opacity-disabled outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 h-8 text-small rounded-small" @click="emit('click')">
    <div class="relative z-10 whitespace-nowrap transition-colors text-black/75 text-sm group-data-[selected=true]:text-default-foreground">
      <slot />
    </div>

    <TabCursor v-if="isActive" />
  </button>
</template>
