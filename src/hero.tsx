import { type PropType, defineComponent, type ExtractPropTypes, ref } from 'vue'
import { useHero } from './use-hero'

interface Transition {
  type: string
  bounce: number
  duration: number
}

const props = {
  as: { type: String as PropType<'div'>, default: 'div' },
  layoutId: { type: [String, Number], default: undefined },
  transition: { type: Object as PropType<Partial<Transition>>, default: undefined },
  ignore: { type: Array as PropType<string[]>, default: () => [] }
}

export type HeroProps = ExtractPropTypes<typeof props>

const Hero = defineComponent({
  props,

  setup (props, { slots }) {
    const domRef = ref()
    useHero(props, { domRef })

    return () => (
      <props.as ref={domRef}>
        {slots.default?.()}
      </props.as>
    )
  }
})

export { Hero }
