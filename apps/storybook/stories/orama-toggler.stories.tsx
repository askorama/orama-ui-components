import type { StoryObj, Meta } from '@storybook/html'

const meta: Meta = {
  title: 'Internal/Toggler',
  component: 'search-box-toggler'
} satisfies Meta

export default meta
type Story = StoryObj

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const OramaToggler: Story = {
  render: () => '<orama-toggler></orama-toggler>'
}
