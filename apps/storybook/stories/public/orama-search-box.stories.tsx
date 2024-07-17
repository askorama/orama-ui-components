import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from 'ui-stencil'
type Story = StoryObj<Components.OramaSearchBox>

const meta: Meta<Components.OramaSearchBox> = {
  title: 'Public/SearchBox',
  component: 'orama-search-box',
  argTypes: {
    colorScheme: {
      options: ['light', 'dark', 'system'],
      table: {
        defaultValue: { summary: 'light' },
      },
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
    themeConfig: {
      colors: {
        light: {
          '--text-color-primary': '',
        },
        dark: {
          '--text-color-primary': '',
        },
      },
    },
    cloudIndex: {
      api_key: 'yl2JSnjLNBV6FVfUWEyadpjFr6KzPiDR',
      endpoint: 'https://cloud.orama.run/v1/indexes/recipes-m7w9mm',
    },
  },
}
