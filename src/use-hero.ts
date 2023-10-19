import { computed, nextTick, unref, type Ref, useAttrs } from 'vue'
import { tryOnBeforeUnmount, tryOnMounted, useElementBounding } from '@vueuse/core'
import { useMotion } from '@vueuse/motion'
import { defu } from 'defu'
import omit from 'lodash.omit'
import type { HeroProps } from './hero'
import { useHeroContext } from './use-hero-context'

export type UseHeroProps = Omit<HeroProps, 'as'>

export interface UseHeroContext {
  domRef: Ref<any>
}

export const defaultTransition = {
  type: 'spring',
  bounce: 0,
  duration: 500
}

export const useHero = (props: UseHeroProps, { domRef }: UseHeroContext) => {
  const attrs = useAttrs()
  const bounding: Record<string, number> = { x: 0, y: 0, width: 0, height: 0 }
  const context = useHeroContext()
  const curr = useElementBounding(domRef)

  const style = computed(() => attrs?.style ?? {})
  const transition = computed(() => defu(props.transition ?? {}, defaultTransition))

  const prev = computed({
    get () {
      if (!props.layoutId) { return {} }
      return context.value[props.layoutId] ?? {}
    },
    set (value) {
      if (!props.layoutId) { return }
      context.value[props.layoutId] = value
    }
  })

  tryOnMounted(async () => {
    bounding.x = curr.x.value
    bounding.y = curr.y.value
    bounding.width = curr.width.value
    bounding.height = curr.height.value

    let _y = 0
    if (prev.value.y) {
      _y = prev.value.y - bounding.y
    }

    let _x = 0
    if (prev.value.x) {
      _x = prev.value.x - bounding.x
    }

    await nextTick()

    const initial = { ...unref(prev), x: `${_x}px`, y: `${_y}px`, width: prev.value.width, height: prev.value.height }
    const enter = { ...style.value, x: 0, y: 0, width: bounding.width, height: bounding.height, transition: transition.value }

    useMotion(domRef, {
      initial: omit(initial, props.ignore),
      enter: omit(enter, props.ignore)
    })
  })

  tryOnBeforeUnmount(() => {
    prev.value = { ...style.value, ...bounding }
  })

  return { bounding }
}
