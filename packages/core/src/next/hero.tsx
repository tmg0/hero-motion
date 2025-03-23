import type { PropType } from 'vue'
import { motion } from 'motion-v'
import { defineComponent } from 'vue'

type IntrinsicElementAttributes = keyof (typeof motion)
type MotionComponebt = typeof motion.div

export const Hero = defineComponent({
  props: {
    as: { type: String as PropType<IntrinsicElementAttributes>, default: 'div' },
    layoutId: { type: String, default: undefined },
  },

  setup(props, { slots }) {
    const Motion = (motion?.[props.as] as MotionComponebt) ?? motion.div

    return () => (
      <Motion layoutId={props.layoutId}>
        {slots.default?.()}
      </Motion>
    )
  },
})
