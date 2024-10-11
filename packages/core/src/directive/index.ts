import { camelCase } from 'scule'
import { ref } from 'vue'
import { useHero } from '../composables/use-hero'

export function directive() {
  const props = ref({})
  const domRef = ref<HTMLElement | SVGElement>()

  const { setup, clean } = useHero(domRef, props)

  return {
    mounted(dom: HTMLElement | SVGElement, _: any, vnode: any) {
      props.value = Object.entries(vnode.props).reduce((t: Record<string, any>, [k, v]) => {
        const key = camelCase(k)
        t[key] = v
        return t
      }, {})

      domRef.value = dom
      setup()
    },

    beforeUnmount() {
      clean()
    },
  }
}
