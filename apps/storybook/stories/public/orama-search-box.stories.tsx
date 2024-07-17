import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from 'ui-stencil'
type Story = StoryObj<Components.OramaSearchBox>

const meta: Meta<Components.OramaSearchBox> = {
  title: 'Public/SearchBox',
  component: 'orama-search-box',
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
          // '--text-color-primary': 'purple',
        },
        dark: {
          // '--text-color-primary': 'pink',
        },
      },
    },
  },
}
