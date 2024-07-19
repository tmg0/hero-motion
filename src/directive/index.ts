import { computed, ref, unref } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { useElementTransform, useMotion } from '@vueuse/motion'
import { defu } from 'defu'
import { useHeroContext } from '../composables/use-hero-context'
import { type UseHeroProps, defaultTransition, omit } from '../composables/use-hero'

export function directive() {
  let motionInstance: any

  let width = 0
  let height = 0
  let x = 0
  let y = 0

  const domRef = ref<HTMLElement | SVGElement>()
  const bounding: Record<string, number> = { x: 0, y: 0, width: 0, height: 0 }
  const { layouts, props: ctxProps } = useHeroContext()
  const props = ref<Partial<UseHeroProps>>({})

  const style = computed(() => props.value.style ?? {})
  const transition = computed(() => defu(props.value.transition ?? {}, ctxProps.transition ?? {}, defaultTransition))

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

  function setupAnimation() {
    bounding.x = x + width / 2
    bounding.y = y + height / 2
    bounding.width = width
    bounding.height = height

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

    const size = { width, height }
    const scale = { x: previous.value.width / size.width, y: previous.value.height / size.height }

    const initial = { ...unref(previous), x: _x, y: _y, scaleX: scale.x, scaleY: scale.y, ...size }
    const enter = { ...style.value, x: 0, y: 0, scaleX: 1, scaleY: 1, ...size, transition: _transition }

    motionInstance = useMotion(domRef, {
      initial: omit(initial, props.value.ignore as any),
      enter: omit(enter, props.value.ignore as any),
    })
  }

  function setPreviousState() {
    bounding.x = x + width / 2
    bounding.y = y + height / 2
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
  }

  return {
    mounted(dom: HTMLElement | SVGElement, _: any, vnode: any) {
      domRef.value = dom
      props.value = { ...vnode.props, layoutId: vnode.props['layout-id'] }
      const b = useElementBounding(dom)
      width = b.width.value
      height = b.height.value
      x = b.x.value
      y = b.y.value
      setupAnimation()
    },

    beforeUnmount() {
      setPreviousState()
    },
  }
}
