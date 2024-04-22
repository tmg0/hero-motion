import { type ExtractPropTypes, type PropType, defineComponent, ref } from 'vue'
import { useHero } from '../composables/use-hero'

interface Transition {
  delay: number
  repeat: number
  repeatDelay: number
  repeatType: 'loop' | 'mirror' | 'reverse'
  type: 'spring' | 'keyframes'
  stiffness: number
  damping: number
  mass: number
  bounce: number
  duration: number
  ease: string
}

const props = {
  as: { type: String as PropType<'div'>, default: 'div' },
  layoutId: { type: [String, Number], default: undefined },
  transition: { type: Object as PropType<Partial<Transition>>, default: undefined },
  ignore: { type: Array as PropType<string[]>, default: () => [] },
}

export type HeroProps = ExtractPropTypes<typeof props>

const Hero = defineComponent({
  props,

  setup(props, { slots }) {
    const domRef = ref()
    useHero(domRef, props)

    return () => (
      <props.as ref={domRef}>
        {slots.default?.()}
      </props.as>
    )
  },
})

export { Hero }
