import type { HeroProviderProps } from './components/hero-provider'
import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions extends Omit<HeroProviderProps, 'as'> {}

export type NuxtModule = ReturnType<typeof defineNuxtModule<ModuleOptions>>

const module: any = defineNuxtModule<ModuleOptions>({
  setup(_, nuxt) {
    const resolver = createResolver(import.meta.url)
    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    nuxt.hook('modules:done', () => {
      addPlugin(resolver.resolve('./runtime/plugin'))
    })
  },
})

export default module as NuxtModule
