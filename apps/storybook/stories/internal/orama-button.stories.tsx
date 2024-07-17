import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from 'ui-stencil'
import { spread } from '@open-wc/lit-helpers'
import { html } from 'lit-html'

const meta: Meta<Components.OramaButton> = {
  title: 'Internal/Button',
  component: 'orama-button',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'icon'],
    },
  },
}

export default meta

type Story = StoryObj<Components.OramaButton>

const Template = (content: string) => (args) => html`<orama-button ${spread(args)}>${content}</orama-button>`

export const Primary: Story = {
  render: Template('Primary button'),
  args: {
    variant: 'primary',
    class: 'my-optional-class',
    disabled: false,
  },
}

export const Secondary: Story = {
  render: Template('Secondary button'),
  args: {
    variant: 'secondary',
    class: 'my-optional-class',
    disabled: false,
  },
}

export const IconButton: Story = {
  render: Template('🤯'),
  args: {
    variant: 'icon',
    class: 'my-optional-class',
    disabled: false,
  },
}
