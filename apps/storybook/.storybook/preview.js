import { defineCustomElements } from './../../../packages/ui-stencil/loader'
import 'ui-stencil/dist/orama-ui/orama-ui.css'

defineCustomElements()

const LIGTH_THEME_BG = '#fbfbfb'
const DARK_THEME_BG = '#050505'

/** @type { import('@storybook/html').Preview } */
const preview = {
  decorators: [
    (story, context) => {
      const classTheme = context.globals?.backgrounds?.value === DARK_THEME_BG ? 'theme-dark' : 'theme-light'
      return `<div id="orama-ui" class="${classTheme}" style="padding: 20px">${story()}</div>`
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: DARK_THEME_BG,
        },
        {
          name: 'light',
          value: LIGTH_THEME_BG,
        },
      ],
    },
  },
}

export default preview
