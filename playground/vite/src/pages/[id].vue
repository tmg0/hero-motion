<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContributor } from '../composables/useContributor'
import Avatar from '../components/Avatar.vue'

const route = useRoute()
const router = useRouter()
const { data } = useContributor()
const user = computed(() => data.value.find(({ username }) => username === route.params.id) ?? {})
</script>

<template>
  <div class="flex flex-col gap-3">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 cursor-pointer" @click="router.go(-1)">
      <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>

    <div class="flex gap-6">
      <div class="text-sm flex flex-col justify-between w-36">
        <div>Username: {{ user.username }}</div>
        <div>Name: {{ user.name }}</div>
        <div>Twitter: {{ user.twitter || '--' }}</div>
      </div>

      <Avatar :id="route.params.id" size="80" :src="user.avatar" />
    </div>
  </div>
</template>
