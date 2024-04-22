import { type Ref, inject, provide, ref } from 'vue'
import { PROVIDE_CONTEXT } from '../constants'
import type { HeroProviderProps } from './hero-provider'

export interface Layout extends Record<string, any | undefined> {}

export interface HeroContext {
  layouts: Ref<Record<string, Layout>>
  props: HeroProviderProps
}

export function useProvideHeroContext(context: HeroContext) {
  provide(PROVIDE_CONTEXT, context)
}

const defaults = { layouts: ref({}), props: {} }

export function useHeroContext() {
  return inject<HeroContext>(PROVIDE_CONTEXT, defaults)
}
