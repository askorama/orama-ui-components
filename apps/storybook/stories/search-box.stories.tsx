import { spread } from '@open-wc/lit-helpers'
import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from 'ui-stencil'
import { html } from 'lit-html'
import { DARK_THEME_BG, LIGTH_THEME_BG } from '../constants'
type Story = StoryObj<Components.SearchBox>

const meta: Meta<Components.SearchBox> = {
  title: 'Public/SearchBox',
  component: 'search-box',
  argTypes: {
    colorScheme: {
      options: ['light', 'dark', 'system'],
      defaultValue: 'light',
      control: { type: 'radio' },
    },
  },
}
export default meta

// const Template = ({ colorScheme, ...args }, context) => {
//   // todo: I'd like to programatically update parameters background value of colorScheme changes and vice versa
//   console.log('colorScheme', colorScheme)
//   console.log('args', args.themeConfig)

//   return html`
//   <search-box ${spread(args)} color-scheme=${colorScheme}></search-box>
// `
// }

export const SearchBox: Story = {
  // render: Template,
  args: {
    open: true,
    facetProperty: 'category',
    resultMap: {
      description: 'title',
    },
    colorScheme: 'light',
    themeConfig: {
      colors: {
        light: {
          '--text-color-primary': 'purple',
        },
        dark: {
          '--text-color-primary': 'pink',
        },
      },
    },
  },
}
