import { defineConfig } from 'tsup'
import VueJSX from 'unplugin-vue-jsx/esbuild'
import Oxlint from 'unplugin-oxlint/esbuild'

export default defineConfig(options => ({
  entry: ['src'],
  splitting: true,
  clean: true,
  treeshake: true,
  dts: true,
  format: ['esm', 'cjs'],
  minify: !options.watch,
  esbuildPlugins: [
    VueJSX({}),
    Oxlint({
      watch: !!options.watch,
      includes: ['src/**/*.ts', 'playground/*/src/**/*.ts'],
      deny: ['correctness'],
      packageManager: 'npm',
    }),
  ],
}))
