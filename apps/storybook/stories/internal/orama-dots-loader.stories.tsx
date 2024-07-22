import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from 'ui-stencil'

const meta: Meta<Components.OramaDotsLoader> = {
  title: 'Internal/DotsLoader',
  component: 'orama-dots-loader',
}

export default meta

type Story = StoryObj<Components.OramaDotsLoader>

export const DotsLoader: Story = {
  args: {},
}
