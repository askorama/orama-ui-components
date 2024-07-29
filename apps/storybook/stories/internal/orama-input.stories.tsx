import type { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import type { Components } from '@orama/wc-components'
const meta: Meta<Components.OramaInput> = {
  title: 'Components/Internal/Form',
  component: 'orama-input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
}

export default meta
type Story = StoryObj<Components.OramaInput>

export const Input: Story = {
  args: {
    name: 'Input',
    label: 'Small size input',
    placeholder: 'Your name',
    size: 'small',
    type: 'text',
  },
}

export const SearchInput: Story = {
  args: {
    name: 'Input',
    size: 'large',
    placeholder: 'Search...',
    type: 'text',
    labelForScreenReaders: 'Search for something...',
  },
}
