import { inject, provide, ref, type Ref } from 'vue'
import { PROVIDE_CONTEXT } from './constants'

export interface Layout extends Record<string, any | undefined> {}

export type HeroContext = Ref<Record<string, Layout>>

export const useProvideHeroContext = (context: HeroContext) => {
  provide(PROVIDE_CONTEXT, context)
}

export const useHeroContext = () => {
  return inject<HeroContext>(PROVIDE_CONTEXT, ref({}))
}
