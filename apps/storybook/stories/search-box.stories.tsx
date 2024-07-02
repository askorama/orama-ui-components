import type { StoryObj, Meta } from '@storybook/web-components'

const meta: Meta = {
  title: 'Public/SearchBox',
  component: 'search-box',
}

export default meta
type Story = StoryObj

const Template = (props) => {
  console.log(props)

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const element = document.createElement('search-box') as any
  element.theme = props.theme

  return element
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
