import type { MaybeRef, MaybeRefOrGetter } from 'vue'
import { computed, toRef, unref } from 'vue'

interface UseScaleBorderRadiusOptions {
  scaleX: number
  scaleY: number
}

interface Position<T extends string | number = string> {
  x: T
  y: T
}

function useComputedPosition(value: MaybeRef<Position>, fn: (v: Position<number>) => Position<number>) {
  const RE = /^(-?(?:\d+(?:\.\d+)?|\.\d+))([a-z%]*)$/i

  return computed(() => {
    const { x, y } = unref(value)

    const matchX = x.match(RE)
    const matchY = y.match(RE)

    if (!matchX || !matchY)
      return { x, y }

    const [, nx, ux] = matchX
    const [, ny, uy] = matchY

    const p = fn({ x: Number.parseFloat(nx), y: Number.parseFloat(ny) })

    return {
      x: [p.x, ux].join(''),
      y: [p.y, uy].join(''),
    }
  })
}

function parseBorderRadius(value: string | number) {
  const defaults = { x: String(value), y: String(value) }

  if (!value)
    return defaults
  if (typeof value === 'number')
    return defaults

  const [x, y] = value.split(' ')

  return {
    x,
    y: y ?? x,
  }
}

export function useScaleBorderRadius(value: MaybeRefOrGetter<Record<string, string | number>>, options: MaybeRefOrGetter<Partial<UseScaleBorderRadiusOptions>> = {}) {
  const props = toRef(options)
  const style = toRef(value)

  const oBl = computed(() => parseBorderRadius(style.value.borderBottomLeftRadius))
  const oBr = computed(() => parseBorderRadius(style.value.borderBottomRightRadius))
  const oTl = computed(() => parseBorderRadius(style.value.borderTopLeftRadius))
  const oTr = computed(() => parseBorderRadius(style.value.borderTopRightRadius))

  function scale(p: Position<number>) {
    return {
      x: p.x * (props.value?.scaleX ?? 1),
      y: p.y * (props.value?.scaleY ?? 1),
    }
  }

  const bl = useComputedPosition(oBl, scale)
  const br = useComputedPosition(oBr, scale)
  const tl = useComputedPosition(oTl, scale)
  const tr = useComputedPosition(oTr, scale)

  const borderRadius = computed(() => ({
    borderBottomLeftRadius: [bl.value.x, bl.value.y].join(' '),
    borderBottomRightRadius: [br.value.x, br.value.y].join(' '),
    borderTopLeftRadius: [tl.value.x, tl.value.y].join(' '),
    borderTopRightRadius: [tr.value.x, tr.value.y].join(' '),
  }))

  return {
    borderRadius,
  }
}
