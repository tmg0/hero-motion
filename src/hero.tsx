import { type PropType, defineComponent, type ExtractPropTypes, ref } from 'vue'
import { useHero } from './use-hero'

interface Transition {
  type: 'spring'
  bounce: number
  duration: number
}

const defaultTransition = {
  type: 'spring',
  bounce: 0.15,
  duration: 500
}

const props = {
  as: { type: String as PropType<'div'>, default: 'div' },
  layoutId: { type: [String, Number], default: undefined },
  transition: { type: Object as PropType<Transition>, default: () => defaultTransition },
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
