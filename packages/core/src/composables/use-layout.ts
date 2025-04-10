import type { MaybeRef } from 'vue'
import type { HeroContext } from '../composables/use-hero-context'
import type { UseHeroProps } from './use-hero'
import { useElementBounding } from '@vueuse/core'
import { useElementTransform, useMotion } from '@vueuse/motion'
import { defu } from 'defu'
import { computed, nextTick, unref, watch } from 'vue'
import { useHeroContext } from '../composables/use-hero-context'
import { omit } from '../utils'
import { useScaleBorderRadius } from './use-border-radius'
import { useComputedStyle } from './use-computed-style'
import { useStyle } from './use-style'

export const defaultTransition = {}

const STYLE_INCLUDES = [
  'backgroundColor',
  'backgroundPosition',
  'opacity',
  'color',
  'borderColor',
  'outlineColor',
  'textDecorationColor',
  'boxShadow',
  'textShadow',
  'fontSize',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'wordSpacing',
  'textIndent',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
]

export function useLayout(target: MaybeRef<HTMLElement | SVGElement | undefined>, options: MaybeRef<UseHeroProps>, ctx?: HeroContext) {
  let motionInstance: any

  const bounding: Record<string, number> = { x: 0, y: 0, width: 0, height: 0 }
  const { layouts, props: ctxProps } = ctx ?? useHeroContext()
  const { height, width, x, y, update } = useElementBounding(target)
  const { style: computedStyle } = useComputedStyle(target, { filter: k => STYLE_INCLUDES.includes(k) })
  const props = computed(() => unref(options))
  const { transform } = useStyle(target)
  const { borderRadius } = useScaleBorderRadius(computedStyle)

  const scaleX = computed(() => transform.value.scaleX)
  const scaleY = computed(() => transform.value.scaleY)

  const style = computed(() => ({ ...computedStyle.value, ...borderRadius.value, ...props.value?.style ?? {} }))
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

  watch(() => [scaleX.value, scaleY.value], ([x, y]) => {
    const dom = unref(target)

    if (!dom)
      return

    for (let i = 0; i < dom.children.length; i++) {
      const child = dom.children[i] as HTMLElement
      child.style.transform = `scaleX(${1 / (x as number)}) scaleY(${1 / (y as number)})`
    }
  })

  async function setup() {
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

    await nextTick()

    const size = { width: bounding.width, height: bounding.height }
    const scale = { x: previous.value.width / size.width, y: previous.value.height / size.height }
    const { borderRadius: previousBorderRadius } = useScaleBorderRadius(previous.value, { scaleX: 1 / scale.x, scaleY: 1 / scale.y })

    const initial = { ...unref(previous), x: _x, y: _y, scaleX: scale.x, scaleY: scale.y, ...previousBorderRadius.value, ...size }
    const enter = { ...style.value, x: 0, y: 0, scaleX: 1, scaleY: 1, ...size, transition: _transition }

    motionInstance = useMotion(unref(target), {
      initial: omit(initial, props.value.ignore as any),
      enter: omit(enter, props.value.ignore as any),
    })

    snapshot()
  }

  function snapshot() {
    update()
    bounding.x = x.value + width.value / 2
    bounding.y = y.value + height.value / 2
    const { transform } = useElementTransform(target)
    bounding.x = bounding.x + (transform.x as number ?? 0)
    bounding.y = bounding.y + (transform.y as number ?? 0)
    bounding.z = bounding.z + (transform.x as number ?? 0)
    const motionProperties = motionInstance.motionProperties ?? {}
    const _props = { ...style.value, ...motionProperties, ...bounding, ...borderRadius.value }
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
    scaleX,
    scaleY,
    setup,
    snapshot,
  }
}
