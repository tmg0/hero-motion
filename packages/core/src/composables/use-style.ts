import { tryOnMounted, tryOnUnmounted } from '@vueuse/core'
import { type MaybeRef, ref, unref } from 'vue'

function parseTransform(value: string) {
  const translate3dMatch = /translate3d\(([^)]+)\)/.exec(value)
  const scaleXMatch = /scaleX\(([\d.]+)\)/.exec(value)
  const scaleYMatch = /scaleY\(([\d.]+)\)/.exec(value)

  const [x, y, z] = translate3dMatch
    ? translate3dMatch[1].split(',').map(val => Number.parseFloat(val))
    : [0, 0, 0]

  return {
    translateX: x,
    translateY: y,
    translateZ: z,
    scaleX: scaleXMatch ? Number.parseFloat(scaleXMatch[1]) : 1,
    scaleY: scaleYMatch ? Number.parseFloat(scaleYMatch[1]) : 1,
  }
}

export function useStyle(target: MaybeRef<HTMLElement | SVGElement | undefined>) {
  let observer: MutationObserver

  const transform = ref<Record<string, number>>({})

  tryOnMounted(() => {
    observer = new MutationObserver((mutations) => {
      mutations.forEach(({ target }) => {
        transform.value = parseTransform((target as any).style.transform ?? '')
      })
    })

    const elt = unref(target)

    if (!elt)
      return

    observer.observe(elt, { attributes: true, attributeFilter: ['style'] })
  })

  tryOnUnmounted(() => {
    observer?.disconnect()
  })

  return {
    transform,
  }
}
