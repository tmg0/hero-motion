<script setup>
import { useRouter } from 'vue-router'
import Avatar from '../components/Avatar.vue'
import { useContributor } from '../composables/useContributor'

const router = useRouter()
const { data } = useContributor()

function onNavi({ username }) {
  router.push(`/${username}`)
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div v-for="contributor of data" :key="contributor.id" class="flex items-center gap-4 p-3 bg-gray-50 rounded-xl shadow-sm cursor-pointer hover:shadow-xl hover:bg-gray-100 transition-all duration-300 w-64" @click="onNavi(contributor)">
      <Avatar :id="contributor.username" size="40" :src="contributor.avatar" />

      <div>
        <div class="text-sm font-bold text-black">
          {{ contributor.username }}
        </div>
        <div class="text-xs text-black/50">
          contributions: {{ contributor.contributions }}
        </div>
      </div>
    </div>
  </div>
</template>
