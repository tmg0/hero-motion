import type { DirectiveBinding, VNode } from 'vue'
import { useHero } from '../composables/use-hero'
import { useHeroContext } from '../composables/use-hero-context'

export function directive() {
  const ctx = useHeroContext()

  return {
    mounted(el: HTMLElement | SVGElement, _: DirectiveBinding, vnode: VNode<any, HTMLElement | SVGElement, Record<string, any>>) {
      const { props } = vnode
      const options = props as any
      options.layoutId = options['layout-id']
      useHero(el, options, ctx).setupAnimation()
    },

    unmounted(el: HTMLElement | SVGElement, _: DirectiveBinding, vnode: VNode<any, HTMLElement | SVGElement, Record<string, any>>) {
      const { props } = vnode
      const options = props as any
      options.layoutId = options['layout-id']
      useHero(el, options, ctx).setPreviousState()
    },
  }
}
