import type { App, Plugin } from 'vue'
import { defineCustomElements } from '@orama/wc-components/loader'
import { defineContainer } from './vue-component-lib/utils'

export const ComponentLibrary: Plugin = {
  install(app: App) {
    defineContainer(null, defineCustomElements)
  },
}
