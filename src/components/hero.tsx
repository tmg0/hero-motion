import type { Transition } from '../types'
import { computed, defineComponent, type ExtractPropTypes, type PropType, ref } from 'vue'
import { useHero } from '../composables/use-hero'

const props = {
  as: { type: String as PropType<keyof HTMLElementTagNameMap>, default: 'div' },
  layoutId: { type: [String, Number], default: undefined },
  transition: { type: Object as PropType<Partial<Transition>>, default: undefined },
  ignore: { type: Array as PropType<string[]>, default: () => [] },
}

export type HeroProps = ExtractPropTypes<typeof props>

const Hero = defineComponent({
  props,

  setup(props, { slots, emit, attrs }) {
    const domRef = ref<HTMLElement | SVGElement>()
    const options = computed(() => ({ ...props, style: attrs.style ?? {}, onComplete }))

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
