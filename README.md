# Hero motion

[![NPM version](https://img.shields.io/npm/v/hero-motion)](https://www.npmjs.com/package/hero-motion)

🌊 A shared layout animations for [vue](https://vuejs.org/) like [framer motion](https://www.framer.com/motion/), use `layoutId` prop and components will animate from one to another.

## Features

🏎 Smooth animations based on [@vueuse/motion](https://motion.vueuse.org/)

✨ Written in TypeScript

🙌 Easy to use

✅ Support most of the @vueuse/motion's props

## Installation

```
npm install hero-motion
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

You can use hero with both component and composable method.

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
import { ref } from 'vue'
import { useHero } from 'hero-motion'

const domRef = ref()

useHero(domRef, {
  layoutId: 'LAYOUT_ID'
})
</script>

<template>
  <div ref="domRef" />
</template>
```

## Playground

See [playground]('./playground').

`hero-motion` is typically used to optimize code structure

For better understanding, recommend exec `npm run play:vite` in the root directory of this project.

Here are two common examples:

### Tabs Component

There is a [Tabs Component]('./playground/vite/components/Tabs') in playgound vite example, and let's pay attention to the [TabCursor]('./playground/vite/components/Tabs/TabCursor.vue')

This is the slider cursor for each `Tab` under the `Tabs` component.

```vue
<script setup lang="ts">
import { Hero } from 'hero-motion'
</script>

<template>
  <Hero layout-id="tab-cursor" as="span" class="absolute z-0 inset-0 rounded-lg bg-white dark:bg-default shadow-small">
    <slot />
  </Hero>
</template>
```

Typically, to ensure the slider cursor is positioned on the currently active tab, `TabCursor` component should be placed directly under the `Tabs` component with multiple `Tab`s sharing a single `TabCursor`.

With `hero-motion`, each `Tab` can define its own slider cursor. This approach not only eliminates the need to manage specific position information but also leads to better code organization.

Let’s take a look at the content of the `Tab`, and this will show us how to control the display of the slider cursor using only `v-if`.

While also having transition animations.

```vue
<script setup lang="ts">
import TabCursor from './TabCursor.vue'

defineProps<{
  isActive: boolean
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <button @click="emit('click')">
    <div>
      <slot />
    </div>

    <TabCursor v-if="isActive" />
  </button>
</template>
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
- Default: `undefined`

Transition props can be used in both `HeroProvider` and `Hero`.

The configuration defined in `HeroProvider` will be used as global default value, and you do not need to re-declare it on each `Hero` components.

```ts
interface Transition {
  delay: number
  repeat: number
  repeatDelay: number
  repeatType: 'loop' | 'mirror' | 'reverse'
  type: 'spring' | 'keyframes'
  stiffness: number
  damping: number
  mass: number
  bounce: number
  duration: number
  ease: string
}
```

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

## License

[MIT](./LICENSE) License © 2024-PRESENT [Tamago](https://github.com/tmg0)
