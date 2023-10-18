import { inject, provide, ref, type Ref } from 'vue'
import { PROVIDE_CONTEXT } from './constants'

export interface SharedLayout {
  x?: number
  y?: number
  width?: number
  height?: number
}

export type HeroContext = Ref<Record<string, SharedLayout>>

export const useProvideHeroContext = (context: HeroContext) => {
  provide(PROVIDE_CONTEXT, context)
}

export const useHeroContext = () => {
  return inject<HeroContext>(PROVIDE_CONTEXT, ref({}))
}
