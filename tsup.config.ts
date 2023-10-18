import { defineConfig } from 'tsup'
import vueJsx from 'unplugin-vue-jsx/esbuild'

export default defineConfig(() => ({
  entry: ['src'],
  esbuildPlugins: [vueJsx({})]
}))
