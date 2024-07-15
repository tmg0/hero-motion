import { type ExtractPropTypes, type PropType, computed, defineComponent, ref } from 'vue'
import { useHero } from '../composables/use-hero'
import type { Transition } from '../types'

const props = {
  as: { type: String as PropType<keyof HTMLElementTagNameMap>, default: 'div' },
  layoutId: { type: [String, Number], default: undefined },
  transition: { type: Object as PropType<Partial<Transition>>, default: undefined },
  ignore: { type: Array as PropType<string[]>, default: () => [] },
}

export type HeroProps = ExtractPropTypes<typeof props>

const Hero = defineComponent({
  props,

  setup(props, { slots, emit }) {
    const domRef = ref<HTMLElement | SVGElement>()
    const options = computed(() => ({ ...props, onComplete }))

    function onComplete() {
      emit('complete')
    }

    useHero(domRef, options)

    return () => (
      <props.as ref={domRef}>
        {slots.default?.()}
      </props.as>
    )
  },
})

export { Hero }
