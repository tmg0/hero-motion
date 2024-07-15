import type { Directive, DirectiveBinding, VNode } from 'vue'

export const vHero: Directive<HTMLElement | SVGElement> = {
  created(_, binding: DirectiveBinding, vnode: VNode<any, HTMLElement | SVGElement, Record<string, any>>) {},
}
