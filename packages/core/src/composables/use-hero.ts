import type { HeroProps } from '../components/hero'
import { tryOnBeforeUnmount, tryOnMounted, useElementBounding } from '@vueuse/core'
import { useElementTransform, useMotion } from '@vueuse/motion'
import { defu } from 'defu'
import { computed, type MaybeRef, unref } from 'vue'
import { type HeroContext, useHeroContext } from '../composables/use-hero-context'

export interface UseHeroProps extends Omit<HeroProps, 'as' | 'ignore'> {
  ignore?: string[]
  style?: Record<string, any>
  onComplete?: () => void
}

export const defaultTransition = {}

export function omit<T extends Record<string, any>, K extends keyof T>(source: T, keys: K[] = []): Omit<T, K> {
  if (!keys.length)
    return source
  const picks: any = {}
  for (const key in source) {
    if (!keys.includes(key as unknown as K))
      picks[key] = source[key]
  }
  return picks as Omit<T, K>
}

function useBorderRadius(domRef: MaybeRef<HTMLElement | SVGElement | undefined>) {
  return Number.parseInt(getComputedStyle(unref(domRef)!).borderRadius)
}

export function useHero(target: MaybeRef<HTMLElement | SVGElement | undefined>, options: MaybeRef<UseHeroProps>, ctx?: HeroContext) {
  let motionInstance: any

  const bounding: Record<string, number> = { x: 0, y: 0, width: 0, height: 0 }
  const { layouts, props: ctxProps } = ctx ?? useHeroContext()
  const { height, width, x, y, update } = useElementBounding(target)
  const props = computed(() => unref(options))

  const style = computed(() => ({ borderRadius: useBorderRadius(target), ...props.value?.style ?? {} }))

  const transition = computed(() => defu(props.value.transition ?? {}, ctxProps.value.transition ?? {}, defaultTransition))

  const previous = computed({
    get() {
      if (!props.value.layoutId)
        return {}
      return layouts.value[props.value.layoutId] ?? {}
    },
    set(value) {
      if (!props.value.layoutId)
        return
      layouts.value[props.value.layoutId] = value
    },
  })

  tryOnMounted(setup)
  tryOnBeforeUnmount(clean)

  function setup() {
    update()
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
      onComplete: props.value.onComplete,
    }

    const size = { width: bounding.width, height: bounding.height }
    const scale = { x: previous.value.width / size.width, y: previous.value.height / size.height }
    const previousBorderRadius = (previous.value?.borderRadius ?? 0) / scale.x

    const initial = { ...unref(previous), x: _x, y: _y, scaleX: scale.x, scaleY: scale.y, borderRadius: previousBorderRadius, ...size }
    const enter = { ...style.value, x: 0, y: 0, scaleX: 1, scaleY: 1, ...size, transition: _transition }

    motionInstance = useMotion(unref(target), {
      initial: omit(initial, props.value.ignore as any),
      enter: omit(enter, props.value.ignore as any),
    })
  }

  function clean() {
    update()
    bounding.x = x.value + width.value / 2
    bounding.y = y.value + height.value / 2
    const { transform } = useElementTransform(target)
    bounding.x = bounding.x + (transform.x as number ?? 0)
    bounding.y = bounding.y + (transform.y as number ?? 0)
    bounding.z = bounding.z + (transform.x as number ?? 0)
    const motionProperties = motionInstance ? motionInstance.motionProperties : style.value
    const _props = { ...motionProperties, ...bounding, borderRadius: useBorderRadius(target) }
    if (transform.scaleX)
      _props.width = _props.width * (transform.scaleX as number ?? 1)
    if (transform.scaleY)
      _props.height = _props.height * (transform.scaleY as number ?? 1)
    previous.value = _props
  }

  return {
    bounding,
    x,
    y,
    setup,
    clean,
  }
}
