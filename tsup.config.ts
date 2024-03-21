import { defineConfig } from 'tsup'
import VueJSX from 'unplugin-vue-jsx/esbuild'

export default defineConfig(options => ({
  entry: ['src'],
  splitting: true,
  clean: true,
  treeshake: true,
  dts: true,
  format: ['esm', 'cjs'],
  minify: !options.watch,
  esbuildPlugins: [VueJSX({})]
}))
