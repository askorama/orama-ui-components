import type { StoryObj, Meta } from '@storybook/html'

// More on how to set up stories at: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
const meta = {
  title: 'SearchBox',
  tags: ['autodocs']
} satisfies Meta

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
export const Button: Story = {
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
