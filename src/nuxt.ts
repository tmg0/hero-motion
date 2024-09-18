import type { HeroProviderProps } from './components/hero-provider'
import { defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions extends Omit<HeroProviderProps, 'as'> {}

type NuxtModule = ReturnType<typeof defineNuxtModule<ModuleOptions>>

const module: any = defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'hero-motion',
    configKey: 'hero',
  },

  defaults: {},

  setup() {
    // console.log(this)
  },
})

export default module as NuxtModule
