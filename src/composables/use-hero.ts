import { type MaybeRef, type Ref, computed, unref, useAttrs } from 'vue'
import { tryOnBeforeUnmount, tryOnMounted, useElementBounding } from '@vueuse/core'
import { useElementTransform, useMotion } from '@vueuse/motion'
import { defu } from 'defu'
import type { HeroProps } from '../components/hero'
import { useHeroContext } from '../composables/use-hero-context'

export interface UseHeroProps extends Omit<HeroProps, 'as'> {
  onComplete: () => void
}

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

export function useHero(domRef: Ref<HTMLElement | SVGElement | undefined>, options: MaybeRef<UseHeroProps>) {
  let motionInstance: any

  const attrs = useAttrs()
  const bounding: Record<string, number> = { x: 0, y: 0, width: 0, height: 0 }
  const { layouts, props: ctxProps } = useHeroContext()
  const { height, width, x, y, update } = useElementBounding(domRef)
  const props = unref(options)

  const style = computed(() => attrs?.style ?? {})
  const transition = computed(() => defu(props.transition ?? {}, ctxProps.transition ?? {}, defaultTransition))

  const previous = computed({
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

  tryOnMounted(setupAnimation)

  function setupAnimation() {
    bounding.x = x.value + width.value / 2
    bounding.y = y.value + height.value / 2
    bounding.width = width.value
    bounding.height = height.value

    let _y = 0
    if (previous.value.y)
      _y = previous.value.y - bounding.y

    let _x = 0
    if (previous.value.x)
      _x = previous.value.x - bounding.x

    const _transition = {
      ...unref(transition),
      onComplete: props.onComplete,
    }

    const size = { width: bounding.width, height: bounding.height }
    const scale = { x: previous.value.width / size.width, y: previous.value.height / size.height }

    const initial = { ...unref(previous), x: _x, y: _y, scaleX: scale.x, scaleY: scale.y, ...size }
    const enter = { ...style.value, x: 0, y: 0, scaleX: 1, scaleY: 1, ...size, transition: _transition }

    motionInstance = useMotion(domRef, {
      initial: omit(initial, props.ignore as any),
      enter: omit(enter, props.ignore as any),
    })
  }

  tryOnBeforeUnmount(() => {
    update()
    bounding.x = x.value + width.value / 2
    bounding.y = y.value + height.value / 2
    const { transform } = useElementTransform(domRef)
    bounding.x = bounding.x + (transform.x as number ?? 0)
    bounding.y = bounding.y + (transform.y as number ?? 0)
    bounding.z = bounding.z + (transform.x as number ?? 0)
    const motionProperties = motionInstance ? motionInstance.motionProperties : style.value
    const _props = { ...motionProperties, ...bounding }
    if (transform.scaleX)
      _props.width = _props.width * (transform.scaleX as number ?? 1)
    if (transform.scaleY)
      _props.height = _props.height * (transform.scaleY as number ?? 1)
    previous.value = _props
  })

  return { bounding, x, y }
}
