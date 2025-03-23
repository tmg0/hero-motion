import { getLifeCycleTarget } from '@vueuse/core'
import { nextTick, onActivated } from 'vue'

export function tryOnActivated(fn: () => void) {
  const instance = getLifeCycleTarget()
  if (instance)
    onActivated(fn)
  else
    nextTick(fn)
}

export function tryOnBeforeRouteLeave(fn: () => void) {
  const instance = getLifeCycleTarget()

  try {
    import('vue-router').then(({ onBeforeRouteLeave }) => {
      if (instance)
        onBeforeRouteLeave(fn)
      else
        nextTick(fn)
    })
  }
  catch {
    nextTick(fn)
  }
}
