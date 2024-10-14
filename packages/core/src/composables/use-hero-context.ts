import type { HeroProviderProps } from '../components/hero-provider'
import { createGlobalState } from '@vueuse/core'
import { type Ref, ref } from 'vue'

export interface Layout extends Record<string, any | undefined> {}

export interface HeroContext {
  layouts: Ref<Record<string, Layout[]>>
  props: Ref<HeroProviderProps>
}

const useState = createGlobalState(() => {
  const layouts = ref<Record<string, Layout[]>>({})
  const props = ref<HeroProviderProps>({})

  return {
    layouts,
    props,
  }
})

export function useProvideHeroContext(context: HeroContext) {
  const state = useState()
  state.layouts.value = context.layouts.value ?? {}
  state.props.value = context.props.value
}

export function useHeroContext(): HeroContext {
  return useState()
}
