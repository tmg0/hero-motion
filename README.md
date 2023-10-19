# Hero motion

🌊 A shared layout animations for vue like farmer motion.

- 🏎 Smooth animations based on @vueuse/motion
- 🌐 SSR Ready
- ✨ Written in TypeScript

## Installation

```
npm install hero-motion
```

## Usage

### HeroProvider

Suggest to use this component wrap your hole project, this provider will provide private context for `Hero` component.

```
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

Component props

```
interface Props {
  as?: string
  layoutId?: string
  ignore?: string
  transition?: Transition
}

interface Transition {
  type: string
  bounce: number
  duration: number
}
```

Basic usage:

```
<script setup>
import { Hero } from 'hero-motion'
</script>

<template>
  <Hero as="div" layout-id="ID" />
</template>
```

## License

Made with 💖
