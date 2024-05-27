import { type ExtractPropTypes, type PropType, defineComponent, ref } from 'vue'
import { type HeroContext, useProvideHeroContext } from '../composables/use-hero-context'
import type { Transition } from '../types'

const props = {
  transition: { type: Object as PropType<Partial<Transition>>, default: undefined },
}

export type HeroProviderProps = ExtractPropTypes<typeof props>

const HeroProvider = defineComponent({
  props,

  setup(props, { slots }) {
    const context: HeroContext = { layouts: ref({}), props }
    useProvideHeroContext(context)

    return () => (
      <>
        {slots.default?.()}
      </>
    )
  },
})

export { HeroProvider }
