import type { Directive, DirectiveBinding, VNode } from 'vue'
import { useHero } from '../composables/use-hero'

export const vHero: Directive<HTMLElement | SVGElement> = {
  mounted(el, binding: DirectiveBinding, vnode: VNode<any, HTMLElement | SVGElement, Record<string, any>>) {
    const { props } = vnode
    useHero(el, props as any)
  },
}
