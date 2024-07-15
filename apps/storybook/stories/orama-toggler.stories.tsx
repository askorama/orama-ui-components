import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from 'ui-stencil'

const meta: Meta<Components.OramaToggler> = {
  title: 'Internal/OramaToggler',
  component: 'orama-toggler',
} satisfies Meta

export default meta
type Story = StoryObj<Components.OramaToggler>

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const OramaToggler: Story = {}
