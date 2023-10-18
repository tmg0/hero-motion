import { computed, type Ref } from 'vue'
import { tryOnBeforeUnmount, tryOnMounted, useElementBounding } from '@vueuse/core'
import { useMotion } from '@vueuse/motion'
import type { HeroProps } from './hero'
import { useHeroContext } from './use-hero-context'

export type UseHeroProps = Omit<HeroProps, 'as'>

export interface UseHeroContext {
  domRef: Ref<any>
}

export const useHero = (props: UseHeroProps, { domRef }: UseHeroContext) => {
  const bounding: Record<string, number> = { x: 0, y: 0, width: 0, height: 0 }
  const context = useHeroContext()
  const curr = useElementBounding(domRef)

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

  tryOnMounted(() => {
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

    useMotion(domRef, {
      initial: { x: `${_x}px`, y: `${_y}px`, width: prev.value.width, height: prev.value.height },
      enter: { x: 0, y: 0, width: bounding.width, height: bounding.height, transition: props.transition }
    })
  })

  tryOnBeforeUnmount(() => {
    prev.value = { ...bounding }
  })

  return { bounding }
}
