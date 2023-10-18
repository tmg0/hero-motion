import { defineComponent, ref } from 'vue'
import { useProvideHeroContext, type HeroContext } from './use-hero-context'

const HeroProvider = defineComponent({
  setup (_, { slots }) {
    const context: HeroContext = ref({})
    useProvideHeroContext(context)

    return () => (
      <>
        {slots.default?.()}
      </>
    )
  }
})

export { HeroProvider }
