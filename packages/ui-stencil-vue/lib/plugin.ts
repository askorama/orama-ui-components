import type { Plugin } from 'vue'
import { defineCustomElements } from '@orama/wc-components/loader'

export const ComponentLibrary: Plugin = {
  async install() {
    defineCustomElements()
  },
}

export * from './components'
export * from './plugin'

import '@orama/wc-components/dist/orama-ui/orama-ui.css'
