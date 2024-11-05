import { computed, type MaybeRefOrGetter, toRef } from 'vue'

interface UseScaleBorderRadiusOptions {
  scaleX: number
  scaleY: number
}

function useComputedCSSValue(value: MaybeRefOrGetter<string>, fn: (v: number) => number) {
  const vRef = toRef(value)

  return computed(() => {
    if (!vRef.value)
      return '0'

    const v = [0, 'px']
    const match = vRef.value.match(/^(-?(?:\d+(?:\.\d+)?|\.\d+))([a-z%]*)$/i)

    if (!match)
      return vRef.value

    const [_, n, u] = match
    v[0] = fn(Number.parseFloat(n))
    v[1] = u || 'px'

    return v.join('')
  })
}

function parseBorderRadius(value: string | number) {
  if (!value)
    return { x: '0', y: '0' }

  if (typeof value === 'number')
    return { x: String(value), y: String(value) }

  const [x, y] = value.split(' ')

  return {
    x,
    y: y ?? x,
  }
}

export function useBorderRadius(value: MaybeRefOrGetter<Record<string, string>>) {
  const style = toRef(value)
  const bl = computed(() => parseBorderRadius(style.value.borderBottomLeftRadius))
  const br = computed(() => parseBorderRadius(style.value.borderBottomRightRadius))
  const tl = computed(() => parseBorderRadius(style.value.borderTopLeftRadius))
  const tr = computed(() => parseBorderRadius(style.value.borderTopRightRadius))

  return {
    bl,
    br,
    tl,
    tr,
  }
}

export function useScaleBorderRadius(value: MaybeRefOrGetter<Record<string, string | number>>, options: MaybeRefOrGetter<Partial<UseScaleBorderRadiusOptions>> = {}) {
  const props = toRef(options)
  const style = toRef(value)
  const bl = computed(() => parseBorderRadius(style.value.borderBottomLeftRadius))
  const br = computed(() => parseBorderRadius(style.value.borderBottomRightRadius))
  const tl = computed(() => parseBorderRadius(style.value.borderTopLeftRadius))
  const tr = computed(() => parseBorderRadius(style.value.borderTopRightRadius))

  const blX = useComputedCSSValue(bl.value.x, v => v * (props.value?.scaleX ?? 1))
  const blY = useComputedCSSValue(bl.value.y, v => v * (props.value?.scaleY ?? 1))
  const brX = useComputedCSSValue(br.value.x, v => v * (props.value?.scaleX ?? 1))
  const brY = useComputedCSSValue(br.value.y, v => v * (props.value?.scaleY ?? 1))
  const tlX = useComputedCSSValue(tl.value.x, v => v * (props.value?.scaleX ?? 1))
  const tlY = useComputedCSSValue(tl.value.y, v => v * (props.value?.scaleY ?? 1))
  const trX = useComputedCSSValue(tr.value.x, v => v * (props.value?.scaleX ?? 1))
  const trY = useComputedCSSValue(tr.value.y, v => v * (props.value?.scaleY ?? 1))

  return computed(() => ({
    borderBottomLeftRadius: [blX.value, blY.value].join(' '),
    borderBottomRightRadius: [brX.value, brY.value].join(' '),
    borderTopLeftRadius: [tlX.value, tlY.value].join(' '),
    borderTopRightRadius: [trX.value, trY.value].join(' '),
  }))
}
