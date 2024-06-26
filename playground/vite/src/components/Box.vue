<script lang="ts" setup>
import { Hero } from 'hero-motion'
import { ref } from 'vue';
const showSecond = ref(false)
</script>

<template>
  <div class="wrap">
    <button layout class="button" @click="showSecond = !showSecond">Animate</button>

    <Hero as="div" v-if="showSecond" layout-id="rectangle" class="second-element" />
    <Hero v-else as="div" layout-id="rectangle" class="element" />

  </div>
</template>

<style>
.element {
  width: 48px;
  height: 48px;
  background: #fad658;
  border-radius: 12px;
}

.second-element {
  height: 96px;
  width: 96px;
  background: #fad658;
  border-radius: 12px;
}

.wrap {
  display: grid;
  height: 500px;
  width: 100vw;
  place-items: center;
}

.button {
  background: #000;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
}
</style>
