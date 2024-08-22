import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'
import demoIndexes from '../config'
import { html } from 'lit-html'

const meta: Meta<
  Components.OramaSearchButton & {
    openSearchbox: boolean
  }
> = {
  title: 'Components/SearchButton',
  component: 'orama-search-button',
  argTypes: {
    colorScheme: {
      options: ['light', 'dark', 'system'],
      table: {
        defaultValue: { summary: 'dark' },
      },
      control: { type: 'radio' },
    },
    themeConfig: {
      table: {
        type: {
          summary: 'Partial<TThemeOverrides>',
        },
      },
    },
    size: {
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: { summary: 'medium' },
      },
      control: { type: 'radio' },
    },
    openSearchbox: {
      table: {
        defaultValue: { summary: 'false' },
        type: {
          summary: 'boolean',
        },
      },
      control: { type: 'boolean' },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<Components.OramaSearchButton>

const Template = (label: string) => (args) => {
  return html`
    <div style="display: flex; justify-content: flex-start">
      <div style="width: 240px">
      <orama-search-button
        label="${args.label}"
        .colorScheme=${args.colorScheme}
        .size=${args.size}
      >
          ${label}
      </orama-search-button>
      </div>
      <orama-search-box
        .colorScheme=${args.colorScheme}
        .index=${demoIndexes.orama.index}
        .placeholder=${demoIndexes.orama.placeholder}
        .sourceBaseUrl=${demoIndexes.orama.sourceBaseUrl}
        .sourcesMap=${demoIndexes.orama.sourcesMap}
        .suggestions=${demoIndexes.orama.suggestions}
      >
      </orama-search-box>
    </div>
  `
}

export const SearchButton: Story = {
  render: Template('Search...'),
}
