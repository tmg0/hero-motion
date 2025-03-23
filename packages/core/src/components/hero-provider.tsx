import type { ExtractPropTypes, PropType } from 'vue'
import type { HeroContext } from '../composables/use-hero-context'
import type { Transition } from '../types'
import { computed, defineComponent, ref } from 'vue'
import { useProvideHeroContext } from '../composables/use-hero-context'

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
