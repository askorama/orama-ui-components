import { defineCustomElements } from './../../../packages/ui-stencil/loader'
import 'ui-stencil/dist/orama-ui/orama-ui.css'

defineCustomElements()

/** @type { import('@storybook/html').Preview } */
const preview = {
  tags: ['autodocs'],
  // TODO: Theme class should be a variable
  decorators: [(story) => `<div id="orama-ui" class="theme-dark">${story()}</div>`],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
