import { camelCase } from 'scule'
import { nextTick, ref, unref } from 'vue'
import { useHero } from '../composables/use-hero'

export function directive() {
  let props: any = {}
  const domRef = ref<HTMLElement | SVGElement>()

  nextTick().then(() => {
    const dom = unref(domRef)
    const p = Object.keys(props).reduce((t: Record<string, any>, k: string) => {
      const key = camelCase(k)
      t[key] = props[k]
      return t
    }, {})
    useHero(dom, p)
  })

  return {
    mounted(dom: HTMLElement | SVGElement, _: any, vnode: any) {
      props = vnode.props
      domRef.value = dom
    },
  }
}
