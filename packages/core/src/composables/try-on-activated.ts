import { getLifeCycleTarget } from '@vueuse/core'
import { nextTick, onActivated } from 'vue'

export function tryOnActivated(fn: () => void) {
  const instance = getLifeCycleTarget()
  if (instance)
    onActivated(fn)
  else
    nextTick(fn)
}
