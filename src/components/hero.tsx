import { type ExtractPropTypes, type PropType, defineComponent, ref } from 'vue'
import { useHero } from '../composables/use-hero'
import type { HTMLTag, Transition } from '../types'

const props = {
  as: { type: String as PropType<HTMLTag>, default: 'div' },
  layoutId: { type: [String, Number], default: undefined },
  transition: { type: Object as PropType<Partial<Transition>>, default: undefined },
  ignore: { type: Array as PropType<string[]>, default: () => [] },
}

export type HeroProps = ExtractPropTypes<typeof props>

const Hero = defineComponent({
  props,

  setup(props, { slots, emit }) {
    const domRef = ref()
    useHero(domRef, props, emit)

    return () => (
      <props.as ref={domRef}>
        {slots.default?.()}
      </props.as>
    )
  },
})

export { Hero }
