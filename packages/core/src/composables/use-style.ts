import type { PermissiveTarget } from '../types'
import { tryOnUnmounted, watchImmediate } from '@vueuse/core'
import { destr } from 'destr'
import { computed, ref, toRef, unref } from 'vue'

type Transform = Record<string, string | number | (string | number)[]>

export interface UseStyleOptions {
  lazy?: boolean
  immediate?: boolean
}

export interface UseStyleReturn {
  transform: Transform
}

const TRANSFORM_RE = /(\w+)\(([-\s,.%\w]+)\)/g

function useTransform(target: PermissiveTarget) {
  return computed(() => {
    const transform: Transform = {}

    const dom = unref(target) as HTMLElement | undefined

    if (!dom) {
      return transform
    }

    const value = (dom.style.transform ?? '').trim()

    const matches = value.matchAll(TRANSFORM_RE)
    for (const match of matches) {
      const [_, f, a] = match
      const args = a.split(',').map(i => destr<string | number>(i.trim()))
      transform[f] = args.length > 1 ? args : args[0]
    }

    return transform
  })
}

export function useStyle(target: PermissiveTarget, options: UseStyleOptions = {}) {
  const transform = ref<Partial<Transform>>({})

  let observer: MutationObserver
  const domRef = toRef(target)

  if (domRef.value)
    transform.value = useTransform(domRef).value

  tryOnUnmounted(cleanup)

  watchImmediate(domRef, () => {
    cleanup()
    setup()
  })

  function setup() {
    if (options.lazy)
      return

    observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        transform.value = useTransform(m.target as HTMLElement).value
      })
    })

    if (!domRef.value)
      return

    observer.observe(domRef.value as Node, {
      attributes: true,
      attributeFilter: ['style'],
    })
  }

  function cleanup() {
    observer?.disconnect()
  }

  return {
    transform,
  }
}
