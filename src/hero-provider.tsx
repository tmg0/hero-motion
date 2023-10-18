import { defineComponent, ref, type PropType } from 'vue'
import { useProvideHeroContext, type HeroContext } from './use-hero-context'

const props = {
  as: { type: String as PropType<'div'>, default: 'div' }
}

const HeroProvider = defineComponent({
  props,

  setup (props, { slots }) {
    const context: HeroContext = ref({})
    useProvideHeroContext(context)

    return () => (
      <props.as>
        {slots.default?.()}
      </props.as>
    )
  }
})

export { HeroProvider }
