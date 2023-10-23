import { inject, provide, ref, type Ref } from 'vue'
import { PROVIDE_CONTEXT } from './constants'
import type { HeroProviderProps } from './hero-provider'

export interface Layout extends Record<string, any | undefined> {}

export type HeroContext = {
  layouts: Ref<Record<string, Layout>>
  props: HeroProviderProps
}

export const useProvideHeroContext = (context: HeroContext) => {
  provide(PROVIDE_CONTEXT, context)
}

const defaults = { layouts: ref({}), props: {} }

export const useHeroContext = () => {
  return inject<HeroContext>(PROVIDE_CONTEXT, defaults)
}
