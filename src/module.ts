import type { HeroProviderProps } from './components/hero-provider'
import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'

export interface ModuleOptions extends Omit<HeroProviderProps, 'as'> {}

export type NuxtModule = ReturnType<typeof defineNuxtModule<ModuleOptions>>

const module: any = defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'hero-motion/nuxt',
    configKey: 'hero',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.hero = defu(nuxt.options.runtimeConfig.public.hero ?? {}, { ...options })
    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    nuxt.hook('modules:done', () => {
      addPlugin(resolver.resolve('./runtime/plugin'))
    })
  },
})

export default module as NuxtModule
