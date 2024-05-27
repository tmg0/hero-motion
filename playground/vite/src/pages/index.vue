<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFetch } from '@vueuse/core'
import Avatar from '../components/Avatar.vue'

const router = useRouter()
const { data } = useFetch('https://ungh.cc/repos/unjs/h3/contributors').get().json()
const contributors = computed(() => (data.value?.contributors ?? []).slice(0, 3))

function onNavi({ username }) {
  router.push(`/${username}`)
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div v-for="contributor of contributors" :key="contributor.id" class="flex items-center gap-4 p-3 bg-gray-50 rounded-xl shadow-sm cursor-pointer hover:shadow-xl hover:bg-gray-100 transition-all duration-300 w-64" @click="onNavi(contributor)">
      <Avatar :id="contributor.username" size="40" />

      <div>
        <div class="text-sm font-bold">
          {{ contributor.username }}
        </div>
        <div class="text-xs text-black/50">
          contributions: {{ contributor.contributions }}
        </div>
      </div>
    </div>
  </div>
</template>
