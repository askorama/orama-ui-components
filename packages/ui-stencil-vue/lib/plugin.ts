import type { Plugin } from 'vue'
import { defineCustomElements } from 'ui-stencil/loader'

export const ComponentLibrary: Plugin = {
  async install() {
    defineCustomElements()
  },
}

export * from './components'
export * from './plugin'

import 'ui-stencil/dist/orama-ui/orama-ui.css'
