// import { defineCustomElements } from '@orama/wc-components/loader'
import '@orama/wc-components/dist/orama-ui/orama-ui.css'
import { html } from 'lit-html'
import { DARK_THEME_BG, LIGTH_THEME_BG } from '../constants'

// defineCustomElements()

const preview = {
  decorators: [
    (story, context) => {
      const classTheme = context.globals?.backgrounds?.value === DARK_THEME_BG ? 'theme-dark' : 'theme-light'
      return html`<div id="orama-ui" class="${classTheme}">${story()}</div>`
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    backgrounds: {
      default: 'light',
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
