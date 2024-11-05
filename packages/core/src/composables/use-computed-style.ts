import type { PermissiveTarget } from '../types'
import { watchImmediate } from '@vueuse/core'
import { camelCase } from 'scule'
import { nextTick, ref, toRef, unref } from 'vue'

interface UseComputedStyleOptions {
  parse: (v: string | number) => string | number
  filter: (k: string, v: string | number) => boolean
}

export function useComputedStyle(target: PermissiveTarget, options: Partial<UseComputedStyleOptions> = {}) {
  const domRef = toRef(target)
  const style = ref<Record<string, string | number>>({})

  watchImmediate(domRef, update)

  async function update() {
    const dom = unref(domRef)

    if (!dom)
      return

    await nextTick()

    const css = getComputedStyle(dom)

    for (let i = 0; i < css.length; i++) {
      const o = css[i]
      const k = camelCase(o)
      const v = css.getPropertyValue(o)
      if (options.filter && !options.filter(k, v))
        continue
      style.value[k] = v ?? ''
    }
  }

  return {
    style,
    update,
  }
}
