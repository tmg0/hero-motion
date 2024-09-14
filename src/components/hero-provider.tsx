import type { Transition } from '../types'
import { computed, defineComponent, type ExtractPropTypes, type PropType, ref } from 'vue'
import { type HeroContext, useProvideHeroContext } from '../composables/use-hero-context'

const props = {
  transition: { type: Object as PropType<Partial<Transition>>, default: undefined },
}

export type HeroProviderProps = ExtractPropTypes<typeof props>

const HeroProvider = defineComponent({
  props,

  setup(props, { slots }) {
    const ctxProps = computed(() => props)
    const context: HeroContext = { layouts: ref({}), props: ctxProps }
    useProvideHeroContext(context)

    return () => (
      <>
        {slots.default?.()}
      </>
    )
  },
})

export { HeroProvider }
