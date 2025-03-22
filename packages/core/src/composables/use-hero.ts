import type { MaybeRef } from 'vue'
import type { HeroProps } from '../components/hero'
import type { HeroContext } from '../composables/use-hero-context'
import { tryOnMounted } from '@vueuse/core'
import { tryOnActivated } from './try-on-activated'
import { useLayout } from './use-layout'

export interface UseHeroProps extends Omit<HeroProps, 'as' | 'ignore'> {
  ignore?: string[]
  watch?: boolean
  style?: Record<string, any>
  onComplete?: () => void
}

export function useHero(target: MaybeRef<HTMLElement | SVGElement | undefined>, options: MaybeRef<UseHeroProps>, ctx?: HeroContext) {
  const { scaleX, scaleY, setup, snapshot, update } = useLayout(target, options, ctx)

  tryOnMounted(setup)
  tryOnActivated(setup)

  return {
    scaleX,
    scaleY,
    mounted: setup,
    beforeUnmount: snapshot,
    update,
  }
}
