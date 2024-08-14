import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'
import { useArgs } from '@storybook/preview-api'
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
  const [{ openSearchbox }, updateArgs] = useArgs()

  const searchbox = document.getElementById('orama-ui-search-box')
  searchbox?.addEventListener('searchboxClosed', () => {
    updateArgs({ openSearchbox: false })
  })

  return html`
    <div style="display: flex; justify-content: flex-start">
      <div style="width: 240px">
      <orama-search-button
        label="${args.label}"
        id="orama-ui-search-button"
        .colorScheme=${args.colorScheme}
        .size=${args.size}
        .onclick=${() => {
          updateArgs({ openSearchbox: !openSearchbox })
        }}
      >
          ${label}
      </orama-search-button>
      </div>
      <orama-search-box
        id="orama-ui-search-box"
        .open=${openSearchbox}
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
