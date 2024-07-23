import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'

const meta: Meta<Components.OramaToggler> = {
  title: 'Internal/Toggle',
  component: 'orama-toggler',
} satisfies Meta

export default meta
type Story = StoryObj<Components.OramaToggler>

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const Toggler: Story = {}
