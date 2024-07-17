import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from 'ui-stencil'
import { spread } from '@open-wc/lit-helpers'
import { html } from 'lit-html'

const meta: Meta<Components.OramaButton> = {
  title: 'Internal/OramaButton',
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

export const OramaPrimaryButton: Story = {
  render: Template('Primary button'),
  args: {
    variant: 'primary',
    class: 'my-optional-class',
    disabled: false,
  },
}

export const OramaSecondaryButton: Story = {
  render: Template('Secondary button'),
  args: {
    variant: 'secondary',
    class: 'my-optional-class',
    disabled: false,
  },
}

export const OramaIconButton: Story = {
  render: Template('🤯'),
  args: {
    variant: 'icon',
    class: 'my-optional-class',
    disabled: false,
  },
}
