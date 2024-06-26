import { type Ref, computed, nextTick, unref, useAttrs } from 'vue'
import { tryOnBeforeUnmount, tryOnMounted, useElementBounding } from '@vueuse/core'
import { useElementTransform, useMotion } from '@vueuse/motion'
import { defu } from 'defu'
import type { HeroProps } from '../components/hero'
import { useHeroContext } from '../composables/use-hero-context'

export type UseHeroProps = Omit<HeroProps, 'as'>

export const defaultTransition = {
  type: 'spring',
  stiffness: 600,
  damping: 35,
}

function omit<T extends Record<string, any>, K extends keyof T>(source: T, keys: K[] = []): Omit<T, K> {
  if (!keys.length)
    return source
  const picks: any = {}
  for (const key in source) {
    if (!keys.includes(key as unknown as K))
      picks[key] = source[key]
  }
  return picks as Omit<T, K>
}

export function useHero(domRef: Ref<any>, props: UseHeroProps, emit: any) {
  let motionInstance: any

  const attrs = useAttrs()
  const bounding: Record<string, number> = { x: 0, y: 0, width: 0, height: 0 }
  const { layouts, props: ctxProps } = useHeroContext()
  const curr = useElementBounding(domRef)

  const style = computed(() => attrs?.style ?? {})
  const transition = computed(() => defu(props.transition ?? {}, ctxProps.transition ?? {}, defaultTransition))

  const prev = computed({
    get() {
      if (!props.layoutId)
        return {}
      return layouts.value[props.layoutId] ?? {}
    },
    set(value) {
      if (!props.layoutId)
        return
      layouts.value[props.layoutId] = value
    },
  })

  tryOnMounted(async () => {
    bounding.x = curr.x.value
    bounding.y = curr.y.value
    bounding.width = curr.width.value
    bounding.height = curr.height.value

    let _y = 0
    if (prev.value.y)
      _y = prev.value.y - bounding.y

    let _x = 0
    if (prev.value.x)
      _x = prev.value.x - bounding.x

    await nextTick()

    const _transition = {
      ...unref(transition),

      onComplete() {
        emit('complete')
      },
    }

    const initial = { ...unref(prev), x: _x, y: _y, width: prev.value.width, height: prev.value.height }
    const enter = { ...style.value, x: 0, y: 0, width: bounding.width, height: bounding.height, transition: _transition }

    motionInstance = useMotion(domRef, {
      initial: omit(initial, props.ignore as any),
      enter: omit(enter, props.ignore as any),
    })
  })

  tryOnBeforeUnmount(() => {
    const { transform } = useElementTransform(domRef)
    bounding.x += transform.x as number ?? 0
    bounding.y += transform.y as number ?? 0
    bounding.z += transform.z as number ?? 0
    const motionProperties = motionInstance ? motionInstance.motionProperties : style.value
    prev.value = { ...motionProperties, ...bounding }
  })

  return { bounding }
}
