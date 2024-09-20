import { defineConfig } from 'tsup'
import VueJSX from 'unplugin-vue-jsx/esbuild'

export default defineConfig(options => ({
  entry: ['./src/index.ts'],
  splitting: true,
  treeshake: true,
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  minify: !options.watch,
  esbuildPlugins: [
    VueJSX({}),
  ],
}))
