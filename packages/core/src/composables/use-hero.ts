import type { MaybeRef } from 'vue'
import type { HeroProps } from '../components/hero'
import type { HeroContext } from '../composables/use-hero-context'
import { tryOnBeforeUnmount, tryOnMounted } from '@vueuse/core'
import { useLayout } from './use-layout'

export interface UseHeroProps extends Omit<HeroProps, 'as' | 'ignore'> {
  ignore?: string[]
  style?: Record<string, any>
  onComplete?: () => void
}

export function useHero(target: MaybeRef<HTMLElement | SVGElement | undefined>, options: MaybeRef<UseHeroProps>, ctx?: HeroContext) {
  const { scaleX, scaleY, setup, snapshot } = useLayout(target, options, ctx)

  tryOnMounted(setup)
  tryOnBeforeUnmount(snapshot)

  return {
    scaleX,
    scaleY,
    mounted: setup,
    beforeUnmount: snapshot,
  }
}
