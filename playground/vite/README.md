# @hero-motio/playground-vite

[![NPM version](https://img.shields.io/npm/v/hero-motion)](https://www.npmjs.com/package/hero-motion)

`hero-motion` is typically used to optimize code structure, and here are some examples.

You can also run `pnpm play:vite` in the root dir on your local environment.

- `Tabs Component`

- `Transition Across Different Pages`

## Tabs Component

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

## Transition Across Different Pages

`hero-motion` support tansition across different pages, even when components are under different routes, ensure smooth transitions when navigating between them.

See the [Avatar]('./playground/vite/components/Avatar.vue') component in the playground:

```vue
<script setup lang="ts">
import { Hero } from 'hero-motion'

defineProps<{
  id: number | string
  size?: number | string
}>()
</script>

<template>
  <Hero :layout-id="`avatar:${id}`" :style="{ width: `${size}px`, height: `${size}px` }">
    <img>
  </Hero>
</template>
```

We can see that the `Avatar` component is used in both the list and detail pages， and there will be a transition effect between avatars with the same ID.

`hero-motion` will automatically handle transitions between positions and sizes.
