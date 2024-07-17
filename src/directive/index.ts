import type { DirectiveBinding, VNode } from 'vue'
import { useHero } from '../composables/use-hero'

export function directive() {
  return {
    mounted(el: HTMLElement | SVGElement, binding: DirectiveBinding, vnode: VNode<any, HTMLElement | SVGElement, Record<string, any>>) {
      const { props } = vnode
      const options = props as any
      options.layoutId = options['layout-id']
      useHero(el, options)
    },
  }
}
