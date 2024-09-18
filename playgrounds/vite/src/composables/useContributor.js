import { ref } from 'vue'

export function useContributor() {
  const data = ref([
    { id: 40710111, username: 'tmg0', name: 'Tamago', twitter: '_tmg0_', contributions: 127, avatar: 'https://avatars.githubusercontent.com/u/40710111?v=4' },
    { id: 29139614, username: 'renovate', contributions: 50, avatar: 'https://avatars.githubusercontent.com/in/2740?v=4' },
  ])

  return {
    data,
  }
}
