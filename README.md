# Hero motion

[![NPM version](https://img.shields.io/npm/v/hero-motion)](https://www.npmjs.com/package/hero-motion)

🌊 A shared layout animations for [vue](https://vuejs.org/) like [framer motion](https://www.framer.com/motion/), use `layoutId` prop and components will animate from one to another.

## Features

🏎 Smooth animations based on [@vueuse/motion](https://motion.vueuse.org/)

✨ Written with TypeScript

🙌 Easy to use

✅ Support most of the `@vueuse/motion`'s props

🚀 Support auto-import by `nuxt-module`

🖥️ Example [here](https://stackblitz.com/~/github.com/tmg0/hero-motion)

## Installation

```
npm install hero-motion @vueuse/motion
```

## Usage

### HeroProvider

Suggest to use this component wrap your hole project, this provider will provide private context for `Hero` component.

```vue
<script setup>
import { HeroProvider } from 'hero-motion'
</script>

<template>
  <HeroProvider>
    <RouterView />
  </HeroProvider>
</template>
```

### Hero

You can use `hero` with component, composable function or directive ways.

`Component`

```vue
<script setup>
import { Hero } from 'hero-motion'
</script>

<template>
  <Hero as="div" layout-id="ID" />
</template>
```

`Composable`

```vue
<script setup>
import { useHero } from 'hero-motion'
import { ref } from 'vue'

const domRef = ref()

useHero(domRef, {
  layoutId: 'LAYOUT_ID'
})
</script>

<template>
  <div ref="domRef" />
</template>
```

`Directive`

> [!IMPORTANT]
> _The usage of `directive` is currently under development, and there may be unforeseen issues. We recommend using `components` or `composables` for now._

```vue
<script setup>
import { directive } from 'hero-motion'
import { ref } from 'vue'

const vHero = directive()
</script>

<template>
  <div v-hero layout-id="LAYOUT_ID" />
</template>
```

### Nuxt (>= 0.4.0)

`hero-motion` also provides a Nuxt module for quick and easy integration

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['hero-motion/nuxt'],
})
```

`hero-motion/nuxt` will auto import the `Hero` component for you, eliminating the need to manually import it in each file where you want to use it.

```vue
<template>
  <Hero as="div" layout-id="ID" />
</template>
```

## Playground

- [vite](./playgrounds/vite).

- [nuxt](./playgrounds/nuxt).

### Live Vite Example

[Here!](https://stackblitz.com/~/github.com/tmg0/hero-motion)

### Run Locally

```sh
pnpm play
```

## Props

### `props.as`

- Type: `string`
- Default: `'div'`

### `props.layoutId`

- Type: `string | number`
- Default: `undefined`
- Required: `true`

### `props.ignore`

- Type: `string[]`
- Default: `[]`

### `props.transition`

- Type: `Transition`
- Default: `@vueuse/motion['Transition']`

Transition props can be used in both `HeroProvider` and `Hero`.

The configuration defined in `HeroProvider` will be used as global default value, and you do not need to re-declare it on each `Hero` components.

**Example:**

```vue
<Hero
  as="div"
  layout-id="cursor"
  :ignore="['width']"
  :transition="{
    duration: 1000,
    type: 'keyframes',
    bounce: 0
  }"
/>
```

## Emit

### `complete`

- Type: `() => void`
- Default: `() => {}`

## License

[MIT](./LICENSE) License © 2024-PRESENT [Tamago](https://github.com/tmg0)
