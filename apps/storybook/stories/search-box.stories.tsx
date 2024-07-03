import type { StoryObj, Meta } from '@storybook/html'

const meta: Meta = {
  title: 'Public/SearchBox',
  component: 'search-box',
} satisfies Meta

export default meta
type Story = StoryObj

const Template = (args) => {
  return `<search-box theme-config='${JSON.stringify(args.theme)}'></search-box>`
}

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const Primary: Story = {
  render: Template,
  args: {
    theme: {
      colors: {
        light: {
          primaryColor: 'red'
        },
        dark: {
          primaryColor: 'blue'
        }
      }
    }
  }
}
