import type { MaybeRefOrGetter } from '@vueuse/core'

export type { Transition } from '@vueuse/motion'

export type PermissiveTarget = MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>
