import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'

export type NuxtModule = ReturnType<typeof defineNuxtModule<any>>

const module: any = defineNuxtModule<any>({
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

    addComponent({
      name: 'Hero',
      filePath: resolver.resolve('./runtime/components/Hero.vue'),
    })
  },
})

export default module as NuxtModule
